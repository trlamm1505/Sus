let mucluong=document.getElementById("mucluong");
mucluong.onclick=function(event){
    event.preventDefault(); // ngăn hành vi mặc định
    let luong=document.getElementById("luong").value*1;
    let songay=document.getElementById("songay").value*1;
    let total=luong*songay;

    let inra=document.getElementById("inra");
    inra.innerHTML=`mức lương là : ${total}`;
}
    