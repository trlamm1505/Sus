/**
 * Loop:
 *
 * while
 * do while
 * for
 */

/**
 * While loop
 * . i = 0; i < 2
 *             => true => "Hello CyberSoft"; i = 1;
 * . i = 1 ; i < 2
 *             => true => "Hello CyberSoft"; i = 2;
 * . i = 2 ; i < 2
 *             => false => stop
 */

function whileLoop() {
  let i = 0;
  while (i < 5) {
    // hanh dong
    console.log("TrLammm");
    // buoc nhay: tuỳ theo bài toán
    i++;
  }
}

whileLoop();

/**
 * Dem so le
 */
function clickDemSoLe() {
  const n = document.getElementById("num_1").value * 1;

  let i = 1;
  let count = 0;
  let content = "";

  while (i <= n) {
    if (i % 2 !== 0) {
      content += i + " ";
      // tang count len 1 dv
      count++;
    }
    //buoc nhay
    i++;
  }

  const rs = `Có ${count} số lẻ là: ${content}`;
  document.getElementById("showDemSoLe").innerHTML = rs;
}


/**
 * . i = 0; i = 1;"Trần Quốc Lâm"
 * . i = 1; i = 2; "Trần Quốc Lâm"
 * . i = 2; i = 3; "Trần Quốc Lâm"
 *       ==> false ==> stop
 */
function doWhileLoop(){
  let i=0;
  do{
   // hành động
  i++;
  console.log("Trần Quốc Lâm");
  
  }while(i<5);// điều kiện

}

doWhileLoop();



function clickTongSo() {
  const n=document.getElementById("num_2").value*1;
  
  let i = 1;
  let sum = 0;
  
  do{
    sum+=i;
    i++;
  }while(i <= n);

  document.getElementById("showTong").innerHTML=`Tổng từ 1 đến ${n} là : ${sum}`;
  
}

/**
 * for loop
 */
function forLoop() {
  for(let i = 1; i <= 5; i++){
     console.log("trần Ngọc Thy");
  } 
}

forLoop();

function clickGroupNumber() {
  let n=document.getElementById("num_3").value*1;
  let sochan="";
  let sole="";
  for(let i = 1; i <= n; i++){
    if(i % 2 ===0){
    sochan += i + " ";
    }else{
      sole += i + " ";
    }
  }

  
  document.getElementById("showGroupNumber").innerHTML=`Day so chan la : ${sochan} <br> Day so le la :${sole}`;
}