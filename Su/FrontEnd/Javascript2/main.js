// //DOM
// let user=document.getElementById("lam")
// console.log(user.value);

// // Dom tới thẻ button có id là btnClick
// let click=document.getElementById("click")
// // Bấm vào cái nút button click
// click.onclick=function(){
// // thực thi các lệnh bên trong
// // lấy value người dùng nhập vào input #textUser
// let user=document.getElementById("lam").value
// console.log(user);

// // lấy value người dùng nhập vào input #lamm
// let password=document.getElementById("lamm").value
// // console.log(password);
// }

/**
 * Cộng 2 số
 */

let btnCong2So=document.getElementById("btnCong2So");
btnCong2So.onclick=function(){
    // lấy giá trị của 2 input

let num_1=document.getElementById("num_1").value*1;
let num_2=document.getElementById("num_2").value*1;

// chuyển đổi kiểu dữ liệu sang number
// num_1=Number(num_1);
// num_2=Number(num_2);
 
// Xử lý:cộng 2 số
let result=num_1 + num_2;

// hiển thị ra kết quả
// let output="Tổng 2 số là"+result;

// string  template

result=result.toLocaleString('vi', {style : 'currency', currency : 'VND'});
let output=`Tổng 2 số là : ${result}`;
console.log(output);

let tong2so=document.getElementById("tong2so");
tong2so.innerHTML=output;

// tong2so.style.backgroundColor="red";
// tong2so.style.color="yellow";
tong2so.className="infor";
// tong2so.classList.add("infor");
}
