let number1=prompt("nhập số thứ 1:");
let number2=prompt("nhập số thứ 2:");
let number3=prompt("nhập số thứ 3:");
let number4=prompt("nhập số thứ 4:");
let number5=prompt("nhập số thứ 5:");
//chuyển đổi kiểu dữ liệu từ string(black) sang number(blue)
number1=Number(number1);
number2=Number(number2);
number3=Number(number3);
number4=Number(number4);
number5=Number(number5);



console.log(typeof number1);
console.log(typeof number2);
console.log(typeof number3);
console.log(typeof number4);
console.log(typeof number5);

let dtb=0;
dtb=(number1+number2+number3+number4+number5)/5;
console.log("trung bình cộng của 5 số là :"+dtb);
