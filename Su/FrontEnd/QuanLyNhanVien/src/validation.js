import { getId } from "./main.js";

class Validation {
  // Kiểm tra username: không để trống và phải là 4-6 ký số
  checkUsername(value, idNoti) {
    if (value === "") {
      getId(idNoti).innerHTML = "(*) Vui lòng nhập username!";
      getId(idNoti).style.display = "block";
      return false;
    } else if (!/^\d{4,6}$/.test(value)) {
      getId(idNoti).innerHTML = "(*) Username phải là 4 đến 6 ký số!";
      getId(idNoti).style.display = "block";
      return false;
    } else {
      getId(idNoti).innerHTML = "";
      getId(idNoti).style.display = "none";
      return true;
    }
  }

  // Kiểm tra tên nhân viên: không để trống, chỉ chứa chữ cái và khoảng trắng
  checkFullName(value, idNoti) {
    if (value === "") {
      getId(idNoti).innerHTML = "(*) Vui lòng nhập tên nhân viên!";
      getId(idNoti).style.display = "block";
      return false;
    } else if (!/^[a-zA-ZÀ-ỹ\s]+$/.test(value)) {
      getId(idNoti).innerHTML = "(*) Tên nhân viên chỉ được chứa chữ cái!";
      getId(idNoti).style.display = "block";
      return false;
    } else {
      getId(idNoti).innerHTML = "";
      getId(idNoti).style.display = "none";
      return true;
    }
  }

  // Kiểm tra email: không để trống, đúng định dạng email
  checkEmail(value, idNoti) {
    if (value === "") {
      getId(idNoti).innerHTML = "(*) Vui lòng nhập email!";
      getId(idNoti).style.display = "block";
      return false;
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
      getId(idNoti).innerHTML = "(*) Email không đúng định dạng!";
      getId(idNoti).style.display = "block";
      return false;
    } else {
      getId(idNoti).innerHTML = "";
      getId(idNoti).style.display = "none";
      return true;
    }
  }

  // Kiểm tra mật khẩu: không để trống, từ 6-10 ký tự, chứa ít nhất 1 số, 1 chữ in hoa, 1 ký tự đặc biệt
  checkPassword(value, idNoti) {
    if (value === "") {
      getId(idNoti).innerHTML = "(*) Vui lòng nhập mật khẩu!";
      getId(idNoti).style.display = "block";
      return false;
    } else if (!/^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,10}$/.test(value)) {
      getId(idNoti).innerHTML =
        "(*) Mật khẩu phải từ 6-10 ký tự, chứa ít nhất 1 số, 1 chữ in hoa và 1 ký tự đặc biệt!";
      getId(idNoti).style.display = "block";
      return false;
    } else {
      getId(idNoti).innerHTML = "";
      getId(idNoti).style.display = "none";
      return true;
    }
  }

  // Kiểm tra ngày làm: không để trống, đúng định dạng mm/dd/yyyy (cho phép 1 hoặc 2 chữ số tháng/ngày)
  checkStartDate(value, idNoti) {
    const regex = /^(0?[1-9]|1[0-2])\/(0?[1-9]|[12]\d|3[01])\/\d{4}$/;
    if (value === "") {
      getId(idNoti).innerHTML = "(*) Vui lòng nhập ngày làm!";
      getId(idNoti).style.display = "block";
      return false;
    } else if (!regex.test(value)) {
      getId(idNoti).innerHTML = "(*) Ngày làm phải đúng định dạng mm/dd/yyyy!";
      getId(idNoti).style.display = "block";
      return false;
    } else {
      getId(idNoti).innerHTML = "";
      getId(idNoti).style.display = "none";
      return true;
    }
  }

  // Kiểm tra lương cơ bản: không để trống, phải là số, trong khoảng 1.000.000 - 20.000.000
  checkSalary(value, idNoti) {
    if (value === "") {
      getId(idNoti).innerHTML = "(*) Vui lòng nhập lương cơ bản!";
      getId(idNoti).style.display = "block";
      return false;
    } else if (isNaN(value) || value < 1000000 || value > 20000000) {
      getId(idNoti).innerHTML = "(*) Lương cơ bản phải từ 1.000.000 đến 20.000.000!";
      getId(idNoti).style.display = "block";
      return false;
    } else {
      getId(idNoti).innerHTML = "";
      getId(idNoti).style.display = "none";
      return true;
    }
  }

  // Kiểm tra chọn chức vụ: không được để mặc định (ví dụ giá trị mặc định là "")
  checkSelectOption(idSelect, idNoti, mess) {
    const selectElem = getId(idSelect);
    const notiElem = getId(idNoti);
  
    if (selectElem.selectedIndex !== 0) {
      notiElem.innerHTML = "";
      notiElem.style.display = "none";
      return true;
    } else {
      notiElem.innerHTML = mess;
      notiElem.style.display = "block";
      return false;
    }
  }
  
  checkWorkingHours(value, idNoti) {
    if (value === "") {
      getId(idNoti).innerHTML = "(*) Vui lòng nhập số giờ làm trong tháng!";
      getId(idNoti).style.display = "block";
      return false;
    } else if (isNaN(value) || value < 80 || value > 200) {
      getId(idNoti).innerHTML = "(*) Số giờ làm phải từ 80 đến 200 giờ!";
      getId(idNoti).style.display = "block";
      return false;
    } else {
      getId(idNoti).innerHTML = "";
      getId(idNoti).style.display = "none";
      return true;
    }
  }

  checkUsernameExit(value, idNoti, mess, employees, currentUsername = "") {
    const exists = employees.some(emp =>
      emp.username.toLowerCase() === value.toLowerCase() &&
      emp.username.toLowerCase() !== currentUsername.toLowerCase()
    );
    if (exists) {
      getId(idNoti).innerHTML = mess;
      getId(idNoti).style.display = "block";
      return false;
    }
    getId(idNoti).innerHTML = "";
    getId(idNoti).style.display = "none";
    return true;
  }
}  

export default Validation;
