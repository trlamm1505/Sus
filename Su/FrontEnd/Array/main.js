/**
 * Array (Mảng)
 */

let users = ["Trần Quốc Lâm", "Trần Ngọc Thy", "TrLammm",];

console.log(users);
console.log(`Độ dài của mảng là : ${users.length}`);
console.log(`Phần tử đầu tiên có index là 0`);
console.log(`Phần tử cuối cùng có index = length-1 là: ${users.length-1}`);
console.log(`Phần tử đầu tiên có index = 0 là: ${users[0]}`);
console.log(`Phần tử cuối cùng có index = length-1 là: ${users[users.length-1]}`);


for(let i = 0; i < users.length; i++){
    console.log(`Phần tử thứ users[${i}] là :${users[i]}`); 
}


let a=[];
// Add new member to a
a.push("Trần Quốc Lâm")
a.push("Trần Ngọc Thy")
console.log(a);


let b=[];
b.push(5);
b.unshift(15);
b.push(2004);
b.pop();
b.shift();
console.log(b);

let lam=[];
function addNumberToArray() {
   const number= document.getElementById("number_1").value*1;
    lam.push(number);

    document.getElementById("resultArray").innerHTML=`Phần tử trong mảng là : ${lam}`;

}


function demSoChan() {
    let count=0;
    for(i = 0; i < lam.length; i++){
     if(lam[i] % 2 ===0){
      count++;
     }
    }
    document.getElementById("resultDemSoChan").innerHTML=`Số chẵn có trong mảng là : ${count}`;
}