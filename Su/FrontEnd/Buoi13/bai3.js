function tinhThue() {
    const hoTen = document.getElementById("hoTen").value;
    const tongThuNhap = parseFloat(document.getElementById("thuNhap").value);
    const soNguoiPhuThuoc = parseInt(document.getElementById("nguoiPhuThuoc").value);

    if (isNaN(tongThuNhap) || tongThuNhap <= 0) {
      document.getElementById("ketQua").innerText = "Vui lòng nhập tổng thu nhập hợp lệ.";
      return;
    }

    const mienTru = 4 + soNguoiPhuThuoc * 1.6; // triệu
    const thuNhapChiuThue = tongThuNhap - mienTru;

    if (thuNhapChiuThue <= 0) {
      document.getElementById("ketQua").innerText = `Anh/chị ${hoTen} không phải nộp thuế.`;
      return;
    }

    let thueSuat = 0;

    if (thuNhapChiuThue <= 60) thueSuat = 5;
    else if (thuNhapChiuThue <= 120) thueSuat = 10;
    else if (thuNhapChiuThue <= 210) thueSuat = 15;
    else if (thuNhapChiuThue <= 384) thueSuat = 20;
    else if (thuNhapChiuThue <= 624) thueSuat = 25;
    else if (thuNhapChiuThue <= 960) thueSuat = 30;
    else thueSuat = 35;

    const tienThue = thuNhapChiuThue * thueSuat / 100;

    document.getElementById("ketQua").innerText = 
      `Anh/chị ${hoTen} có thu nhập chịu thuế ${thuNhapChiuThue.toFixed(2)} triệu và phải nộp: ${tienThue.toFixed(2)} triệu (${thueSuat}%)`;
  }