/**
 ** Đầu vào 
   - Khai báo biến chieuDai và chieuRong, cho người dùng nhập (dùng prompt)
   -
** Xử lý
   - Tạo biến dienTich và chuVi
   - dienTich = chieuDai * chieuRong
   - chuVi = (chieuDai + chieuRong) * 2
   -
** Đầu ra
   - In ra diện tích và chu vi hình chữ nhật (console.log)
   -
   -
 */
   let chieuDai = parseFloat(prompt("Nhập chiều dài hình chữ nhật:"));
   let chieuRong = parseFloat(prompt("Nhập chiều rộng hình chữ nhật:"));
   
   let dienTich = chieuDai * chieuRong;
   let chuVi = (chieuDai + chieuRong) * 2;
   
   console.log("Diện tích hình chữ nhật là: " + dienTich);
   console.log("Chu vi hình chữ nhật là: " + chuVi);
   