class EmployeeList{
    constructor() {
        this.employees = [];
    }

    
    getIndex(name) {
        let index = -1;
        name = name.trim().toLowerCase();
        for(let i = 0; i < this.employees.length; i++) {
          const employeeName = this.employees[i].username.trim().toLowerCase();
          if(employeeName === name) {
            index = i;
            break;
          }
        }
        return index;
      }
      

    addEmployee(employee) {
        this.employees.push(employee);
    }


    deleteEmployee(name) {
      const index=this.getIndex(name);

       if(index !== -1){
        this.employees.splice(index,1)
       }

    }
    getEmployeeByName(name) {
        const index=this.getIndex(name);
        if(index !== -1){
            return this.employees[index];
        }
        return null;
    } 

    updateEmployee(employee){
        const index=this.getIndex(employee.username);
        if(index != -1){
            this.employees[index]=employee;
        }
    }
    searchEmployee(keyword) {
      let findEmployee = [];
      for(let i = 0 ; i < this.employees.length; i++){
        const employee = this.employees[i];
        const employeeLowerCase=employee.performanceRating.toLowerCase();
        const keywordLowerCase=keyword.toLowerCase();
        const index = employeeLowerCase.indexOf(keywordLowerCase);
        if(index !== -1){
            findEmployee.push(employee);
        }
      }
      return findEmployee;
    }
}
export default EmployeeList;