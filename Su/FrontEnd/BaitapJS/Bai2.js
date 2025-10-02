/**
 ** Đầu vào 
   - Khai báo 5 biến: so1, so2, so3, so4, so5 và cho phép người dùng nhập giá trị (dùng prompt)
   -
** Xử lý
   - Tạo biến tong và trungBinh
   - tong = so1 + so2 + so3 + so4 + so5
   - trungBinh = tong / 5
   -
** Đầu ra
   - In ra giá trị trung bình (console.log)
   -
   -
 */
   let so1 = parseFloat(prompt("Nhập số thứ 1:"));
   let so2 = parseFloat(prompt("Nhập số thứ 2:"));
   let so3 = parseFloat(prompt("Nhập số thứ 3:"));
   let so4 = parseFloat(prompt("Nhập số thứ 4:"));
   let so5 = parseFloat(prompt("Nhập số thứ 5:"));
   
   let tong = so1 + so2 + so3 + so4 + so5;
   let trungBinh = tong / 5;
   
   console.log("Giá trị trung bình là: " + trungBinh);
   