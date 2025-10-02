/**
 ** Đầu vào 
   - Khai báo biến giaUsd và gán giá trị 23500
   - Khai báo biến soTienUsd và cho người dùng nhập (dùng prompt)
   -
** Xử lý
   - Tạo biến soTienVnd
   - soTienVnd = soTienUsd * giaUsd
   -
** Đầu ra
   - In ra số tiền sau quy đổi ra VND (console.log)
   -
   -
 */
   const giaUsd = 23500;
   let soTienUsd = parseFloat(prompt("Nhập số tiền USD cần quy đổi:"));
   let soTienVnd = soTienUsd * giaUsd;
   
   console.log("Số tiền sau quy đổi là: " + soTienVnd + " VND");
   