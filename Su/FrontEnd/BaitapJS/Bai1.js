/**
 ** Đầu vào 
   -tạo biên luongNgay và gán giá trị là 100000
   -tạo biến soNgayLam và cho phép user nhập
   -
** Xử lý
   -tạo biến tongTien và gán giá trị là 0
   -tongTien được cập nhật giá trị là luongNgay * soNgayLam
   -
** Đầu ra
   -In ra tongTien(log)
   -
   -
 */
   const luongNgay=100000;
   let soNgayLam=prompt("Nhập số ngày làm:");
   let tongTien=0;
   tongTien=luongNgay*soNgayLam;
   console.log("Tổng số tiền là:"+tongTien);