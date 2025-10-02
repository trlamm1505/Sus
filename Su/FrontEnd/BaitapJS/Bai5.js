/**
 ** Đầu vào 
   - Khai báo biến soHaiChuSo và cho người dùng nhập vào (dùng prompt)
   -
** Xử lý
   - Tạo biến hangChuc = Math.floor(soHaiChuSo / 10)
   - Tạo biến hangDonVi = soHaiChuSo % 10
   - Tạo biến tong = hangChuc + hangDonVi
   -
** Đầu ra
   - In ra tổng 2 ký số của số vừa nhập (console.log)
   -
   -
 */
   let soHaiChuSo = parseInt(prompt("Nhập vào một số có 2 chữ số:"));

   let hangChuc = Math.floor(soHaiChuSo / 10);
   let hangDonVi = soHaiChuSo % 10;
   
   let tong = hangChuc + hangDonVi;
   
   console.log("Tổng 2 ký số là: " + tong);
   