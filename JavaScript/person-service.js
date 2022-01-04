/** 
 * Third way of definig external js
 * this is used to make a group of related code as a single block using Json model (personService is actually is a Json model)
 * all property and methods in personService are public.
*/

var personService = {
  apiUrl: "",
  personList: [],

  // all person related methods
  savePerson: (event) => {
    event.preventDefault();
    const model = personDomService.getFormValues();
    
    if(model.id > 0){
        // update
        const index = personService.personList.findIndex(x=>x.id === model.id);
        if(index > -1){
            var oldData = personService.personList[index];
            var newData = {...oldData, ...model};
            personService.personList[index] = newData;
            personDomService.refreshTableRowData(personService.personList[index]);
        }
    }
    else{
        // add
        let lastPersonId = 0;
        if (personService.personList.length) {
        const lastIndex = personService.personList.length - 1;
        lastPersonId = personService.personList[lastIndex].id;
        }
        model.id = lastPersonId + 1;
        /**
         * Note:
         * In this type of js file (i.e js file with json structure) you always have to access properties using personService even from inside of its own method.
         * like below.
         */
        personService.personList.push(model);

        personDomService.renderTableRows([model]);
    }
    
    personDomService.setFormValues(null);
    console.log("%c Saved Person ", "background-color:green", model);
  },

  editPerson: (element, event) => {
    const id = Number(element.dataset.id ?? "0");
    if (id > 0) {
      const data = personService.personList.find((x) => x.id === id);
      if (data) {
        personDomService.setFormValues(data);
      }
    }
  },

  deletePerson: (element, event) => {
    const id = Number(element.dataset.id ?? "0");
    if (id > 0) {
      const index = personService.personList.findIndex((x) => x.id === id);
      if (index > -1) {
        personService.personList.splice(index, 1);
      }
      personDomService.removeTableRowById(id);
    }
  },

  clearData: () =>{
    personService.personList = [];
    personDomService.clearTable();
  }
};
