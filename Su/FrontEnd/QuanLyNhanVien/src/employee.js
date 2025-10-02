class Employee {
    constructor(username, fullName, email, password, startDate,salary, position, workingHours) {
        this.username = username;
        this.fullName = fullName;
        this.email = email;
        this.password = password;
        this.startDate = startDate;
        this.salary = salary;
        this.position = position;
        this.workingHours =workingHours;
        this.priceSalary = 0;
        this.performanceRating = '';
      }
      calculateTotalSalary(){
         switch (this.position) {
            case "Sếp":
                 this.priceSalary=this.salary * 3;
                 break;
            case "Trưởng phòng":
                this.priceSalary= this.salary * 2;
                break;
            case "Nhân viên":
                 this.priceSalary= this.salary ;
                 break;
            default:
                return 0;
      }
    }

    getPerformanceRating() {
        if (this.workingHours >= 192) {
            return this.performanceRating = "nhân viên xuất sắc";
        }else if (this.workingHours >= 176){
            return this.performanceRating =  "nhân viên giỏi";
        }else if (this.workingHours >= 160){
            return this.performanceRating = "nhân viên khá";
        }  else {
            return this.performanceRating = "nhân viên trung bình";
      }
    }
}

export default Employee;