import Employee from './employee.js';
import EmployeeList from './employee-list.js';
import Validation from './validation.js';
const employeelist=new EmployeeList();

const validation = new Validation();
export const getId = (id) => {
return document.getElementById(id);
}


const getValue = () => {
    const username = getId("tknv").value;
    const fullName = getId("name").value; 
    const email = getId("email").value;
    const password = getId("password").value;
    const startDate = getId("datepicker").value;
    const salary = getId("luongCB").value;
    const position = getId("chucvu").value;
    const workingHours = getId("gioLam").value;
    

let isValid = true;

isValid = validation.checkUsername(username, "tbTKNV") && isValid && validation.checkUsernameExit(username,"tbTKNV","(*) UserName đã tồn tại !",employeelist.employees, currentEditingUsername);
isValid = validation.checkFullName(fullName, "tbTen") && isValid;
isValid = validation.checkEmail(email, "tbEmail") && isValid;
isValid = validation.checkPassword(password, "tbMatKhau") && isValid;
isValid = validation.checkStartDate(startDate, "tbNgay") && isValid;
isValid = validation.checkSalary(salary, "tbLuongCB") && isValid;
isValid = validation.checkSelectOption("chucvu", "tbChucVu", "Vui lòng chọn chức vụ!") && isValid;
isValid = validation.checkWorkingHours(workingHours, "tbGiolam") && isValid;

if(!isValid) return;
    
    const employee=new Employee(username, fullName, email, password, startDate, salary, position, workingHours);   

    employee.calculateTotalSalary();
    employee.getPerformanceRating();
    
    return employee;
}

const renderEmployeeList = (data) => {
    let html = '';
    for (let i = 0; i < data.length; i++) {
        const emp = data[i];
        html += `
            <tr>
                <td>${emp.username}</td>
                <td>${emp.fullName}</td>
                <td>${emp.email}</td>
                <td>${emp.startDate}</td>
                <td>${emp.position}</td>
                <td>${emp.priceSalary}</td>
                <td>${emp.performanceRating}</td>
                <td class="d-flex gap-2"> 
                
                <button class="btn btn-info btn-sm" data-toggle="modal" data-target="#myModal" onclick="editEmployee('${emp.username}')">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteEmployee('${emp.username}')">Delete</button></td>
            </tr>`;
      
    }
    getId("tableDanhSach").innerHTML = html;
}


const setLocalStorage = (data) => {
    localStorage.setItem ("EMPLOYEE_LIST",JSON.stringify(data));
}

const getLocalStorage = (key) => {
  const dataString = localStorage.getItem(key);
  if(!dataString) return;
  const dataJson = JSON.parse(dataString);
  employeelist.employees = dataJson;
  renderEmployeeList(employeelist.employees)
}

getLocalStorage("EMPLOYEE_LIST");

const resetForm = () => {
    getId("employeeForm").reset();
}

// Thêm
getId("btnThemNV").onclick = function() {
    const employee = getValue();
    if(!employee) return;
employeelist.addEmployee(employee);
// console.log(employee);
// console.log(employeelist.employees);

renderEmployeeList(employeelist.employees);

setLocalStorage(employeelist.employees);

getId("btnDong").click();
};

getId("btnThem").onclick= function(){
    getId("btnThemNV").style.display="block";
    getId("btnCapNhat").style.display="none";
    getId("header-title").innerHTML="Log In"
    getId("tknv").disabled=false;
    resetForm();
} 


// Xóa 
const deleteEmployee = (name) => {
    employeelist.deleteEmployee(name);
    renderEmployeeList(employeelist.employees);
    setLocalStorage(employeelist.employees);
  }
  window.deleteEmployee=deleteEmployee;
  
  let currentEditingUsername = "";

// sửa
  const editEmployee = (name) => {
    currentEditingUsername = name;
    getId("btnThemNV").style.display="none";
    getId("header-title").innerHTML='Update Employee';
    getId("btnCapNhat").style.display="block";
    const employee=employeelist.getEmployeeByName(name);
    if(employee){}
     getId("tknv").value=employee.username;
     getId("tknv").disabled=true;
     getId("name").value=employee.fullName; 
     getId("email").value=employee.email;
     getId("password").value=employee.password;
     getId("tbNgay").value=employee.startDate;
     getId("tbLuongCB").value=employee.salary;
     getId("chucvu").value=employee.position;
     getId("gioLam").value = employee.workingHours;
    
    }
    window.editEmployee=editEmployee;

  getId("btnCapNhat").onclick=function () {
    const employee = getValue();
    if (!employee) return;
    employeelist.updateEmployee(employee);
    renderEmployeeList(employeelist.employees);
    setLocalStorage(employeelist.employees);
    getId("btnDong").click();
  }

  getId("searchName").addEventListener("keyup", () =>{
    const searchName = getId("searchName").value;
    const findemployee=employeelist.searchEmployee(searchName);
    renderEmployeeList(findemployee);
    
  })