var domService1 = function(){
    var _changeClass = (element, className)=>{
		debugger
        document.getElementById(element).className = className;
    }

    var _getDataSet = (element,property) => {
		debugger
		var a =document.getElementById(element);
		var val = a.getAttribute('data-'+property);
		console.log('data-'+property+':'+val);
    }

    var _injectDom = (id,element,textNode) => {
		debugger
		var node = document.createElement(element);    //create node
		var textnode = document.createTextNode(textNode);         // Create a text node
		node.appendChild(textnode);                              // Append the text to node
		document.getElementById(id).appendChild(node);
    }
	var _getValues = () => {
		debugger
		console.log("name: "+document.getElementById("name").value);
		console.log("city: "+document.getElementById("city").value);
		console.log("address: "+document.getElementById("address").value);
		var ele = document.getElementsByName('gender');
              
            for(i = 0; i < ele.length; i++) {
                if(ele[i].checked){
                console.log("Gender: "+ele[i].value);}
            }
	}
	var _setValues = () => {
		debugger
		document.getElementById("name").value ="Ram Prasad";
		document.getElementById("city").value ="Butwal" ;
		document.getElementById("address").value="Kuleshwor";
		document.getElementById("female").checked = true;
	}


    return {
        changeClass: _changeClass,
        getDataSet: _getDataSet,
		injectDom :_injectDom,
		getValues:_getValues,
		setValues:_setValues,
    }
}();
