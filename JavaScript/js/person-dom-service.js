
/** 
 * Second way of definig external js
 * this is used to make a group of related code as a single block using function 
 * 	(personDomService is actually a function that include different function and methods and return json model).
 * you can only able to call function that are returned from top level function i.e returned by personDomService
 * this service is just made just for sample purpose to show the implementation. 
 * you can also freely manupulate dom from 'person-service.js' file. for demo purpose i seperated dom related activity to seperate file here.
 * you can also freely handle dom related activities from with in a html file's script tag depending on developer
 * 
 * with this way you can manage private and public scope. where as in 3rd way all methods and props are public
 * property and function returned from below function are public. all other local variable and method are private
*/

var personDomService = function(){

	// private methods/variables/properties
	const _tableColumn = [{
		name:'id',
		displayName: 'Id'
	},
	{
		name:'name',
		displayName: 'Name'
	}, 
	{
		name:'gender',
		displayName: 'Gender'
	},
	{
		name:'city',
		displayName: 'City'
	},
	{
		name:'address',
		displayName: 'Address'
	},
	{
		name:'actions',
		displayName: 'Actions'
	}];

	let _tBodyRef = null;
	let _domElements = null;

	

	const _getGenderChecked = () => {
		return Array.from(_domElements.genders).find(x =>x.checked == true);
	};


	// public methods since these are returned as json model in last line.

	const _initDomElements = () => {
		_domElements = {
			id: document.getElementById("id"),
			name: document.getElementById("name"),
			city: document.getElementById("city"),
			address: document.getElementById("address"),
			// note querySelectorAll: return array of element & querySelector return only one element
			genders: document.querySelectorAll(".gender-radio[name=gender]"),
			// we can define getter as below with in json object
			get genderChecked() {
				return Array.from(_domElements.genders).find(x =>x.checked == true);
			},

			resultSection: document.getElementById("resultSection")
		};

		_createResultTable();
	}

    const _changeClass = (element, className)=>{
		debugger
        document.getElementById(element).className = className;
    }

    const _getDataSet = (element,property) => {
		debugger
		const a =document.getElementById(element);
		const val = a.getAttribute('data-'+property);
		console.log('data-'+property+':'+val);
    }

    const _injectDom = (id,element,textNode) => {
		debugger
		const node = document.createElement(element);    //create node
		const textnode = document.createTextNode(textNode);         // Create a text node
		node.appendChild(textnode);                              // Append the text to node
		document.getElementById(id).appendChild(node);
    }
	

	// form related methods start
	const _getFormValues = () => {
		let values = {
			id: Number(_domElements.id?.value ?? '0'),
			name: _domElements.name?.value ?? null,
			city: _domElements.city?.value ?? null,
			address: _domElements.address?.value ?? null,
			gender: _domElements.genderChecked?.value ?? null,
			// gender: _getGenderChecked()?.value ?? null,
		}
		return values;
	}
	/**
	 * 
	 * @param {name, city, address, gender} model pass null to reset form value 
	 */
	const _setFormValues = (model) => {
		// pass null value as 
		document.getElementById("id").value =model?.id ?? 0;
		document.getElementById("name").value =model?.name ?? null;
		document.getElementById("city").value =model?.city ?? null;
		document.getElementById("address").value=model?.address ?? null;

		switch(model?.gender){
			case 'female':
				document.getElementById("female").checked = true;
				break;
			case 'male':
				document.getElementById("male").checked = true;
				break;
			default: 
				document.getElementById("female").checked = false;
				document.getElementById("male").checked = false;
				break;
		}
	}
	// form related methods end


	// table related methods start
	const _createResultTable = (initialData = []) => {
		const table = document.createElement('table');
		const trHead = document.createElement('tr');
		const tHead = document.createElement('thead');
		const tBody = document.createElement('tbody');
		_tableColumn.forEach((col) => {
			const cellText = document.createTextNode(col.displayName);
			const cell = document.createElement("th");
			cell.appendChild(cellText);
			trHead.appendChild(cell);
		});
		tHead.appendChild(trHead);
		table.appendChild(tHead);
		table.appendChild(tBody);
		_domElements.resultSection.appendChild(table);
		_tBodyRef = tBody;
	}

	const _generateTableRow = (data) => {
		const tr = document.createElement('tr');
			tr.dataset.uuid = `r-${data.id}`;
			_tableColumn.forEach((col, i) => {
				let cellContent = null;
				if(col.name === 'actions'){
					const actionWrapper = document.createElement('span');

					// edit button
					const btnEdit = document.createElement('button');
					btnEdit.textContent = "edit";
					btnEdit.classList.add('btn-edit');
					btnEdit.setAttribute("onclick","personService.editPerson(this, event,)");
					btnEdit.dataset.id = data.id;

					// delete button
					const btnDelete = document.createElement('button');
					btnDelete.textContent = "delete"
					btnDelete.classList.add('btn-delete');
					btnDelete.setAttribute("onclick","personService.deletePerson(this, event)");
					btnDelete.dataset.id = data.id;

					actionWrapper.appendChild(btnEdit);
					actionWrapper.appendChild(btnDelete);
					cellContent = actionWrapper;
				}
				else{
					const cellText = document.createTextNode(data[col.name]);
					cellContent = cellText;
				}
				const cell = document.createElement("td");
				cell.appendChild(cellContent);
				tr.appendChild(cell);
			});
			return tr;
	}


	const renderTableRows = (rows = []) => {
		/**
		 * here iam creating rows programmatically. but you can also use html templates instead
		 * check it for html template tag https://www.w3schools.com/tags/tag_template.asp
		 */
		rows.forEach((data) => {
			const tr = _generateTableRow(data);
			_tBodyRef.appendChild(tr);
		})
	}

	const removeTableRowById = (id = 0) => {
		if(id > 0){
			const row = _tBodyRef.querySelector("tr[data-uuid=r-"+id+"]");
			row.remove();
		}
	}

	refreshTableRowData = (data) => {
		if(data.id > 0){
			const newTr = _generateTableRow(data);
			const oldTr = _tBodyRef.querySelector("tr[data-uuid=r-"+data.id+"]");
			//_tBodyRef.replaceChild(oldTr, newTr);
			// _tBodyRef.replaceChildren(...[newTr], ...[oldTr]);
			oldTr.parentNode.replaceChild(newTr, oldTr);
		}
	}

	const clearTable = () => {
		const allTrs = _tBodyRef.querySelectorAll("tr");
		allTrs.forEach(x => x.remove());
	}
	// table related methods ends

	// only below returned function are public. all other are private to personDomService function.
    return {
		initDomElements: _initDomElements,
        changeClass: _changeClass,
        getDataSet: _getDataSet,
		injectDom :_injectDom,
		getFormValues:_getFormValues,
		setFormValues:_setFormValues,
		// you can also return like below without defining key. in such case its own name is its key (its json feature of defining modle)
		renderTableRows,
		removeTableRowById,
		refreshTableRowData,
		clearTable
    }
}();
