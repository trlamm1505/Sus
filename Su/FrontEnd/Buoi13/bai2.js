function tinhTienDien() {
    let ten = document.getElementById("ten").value;
    let soKw = parseFloat(document.getElementById("soKw").value);
    let tongTien = 0;

    if (isNaN(soKw) || soKw <= 0) {
      document.getElementById("ketQua").innerText = "Vui lòng nhập số Kw hợp lệ.";
      return;
    }

    let kwConLai = soKw;

    if (kwConLai > 0) {
      let bac1 = Math.min(kwConLai, 50);
      tongTien += bac1 * 500;
      kwConLai -= bac1;
    }

    if (kwConLai > 0) {
      let bac2 = Math.min(kwConLai, 50);
      tongTien += bac2 * 650;
      kwConLai -= bac2;
    }

    if (kwConLai > 0) {
      let bac3 = Math.min(kwConLai, 100);
      tongTien += bac3 * 850;
      kwConLai -= bac3;
    }

    if (kwConLai > 0) {
      let bac4 = Math.min(kwConLai, 150);
      tongTien += bac4 * 1100;
      kwConLai -= bac4;
    }

    if (kwConLai > 0) {
      tongTien += kwConLai * 1300;
    }

    document.getElementById("ketQua").innerText = 
      `Khách hàng ${ten} đã sử dụng ${soKw}Kw điện. Tổng tiền là: ${tongTien.toLocaleString()}đ`;
  }