function getEle(id) {
  return document.getElementById(id);
}

function onClickHienThongTin() {
  // Lấy giá trị từ các input
  const _maSV = getEle("txtMaSV").value;
  const _tenSV = getEle("txtTenSV").value;
  const _loaiSV = getEle("loaiSV").value;
  const _diemToan = getEle("txtDiemToan").value * 1;
  const _diemVan = getEle("txtDiemVan").value * 1;

  // Tạo đối tượng sinh viên
  // sinhVien = this;
  let sinhVien = {
    maSV: _maSV,
    tenSV: _tenSV,
    loaiSV: _loaiSV,
    diemToan: _diemToan,
    diemVan: _diemVan,
    dtb: 0,

    tinhDTB: function () {
      this.dtb = (this.diemToan + this.diemVan) / 2;
    },
    xepLoai: function () {
      /**
       * Xếp loại sinh viên
       * 0 - 4.9: Yếu
       * 5 - 6.9: Trung Bình
       * 7 - 8.9: Khá
       * 9 - 10: Giỏi
       */
      let loaiHocLuc = "";
      if (9 <= this.dtb && this.dtb <= 10) {
        loaiHocLuc = "Giỏi";
      } else if (7 <= this.dtb && this.dtb < 9) {
        loaiHocLuc = "Khá";
      } else if (5 <= this.dtb && this.dtb < 7) {
        loaiHocLuc = "Trung Bình";
      } else if (0 <= this.dtb && this.dtb < 5) {
        loaiHocLuc = "Yếu";
      }
      return loaiHocLuc;
    },
  };

  // Hiển thị thông tin sinh viên
  getEle("spanTenSV").innerHTML = sinhVien.tenSV;
  getEle("spanMaSV").innerHTML = sinhVien.maSV;
  getEle("spanLoaiSV").innerHTML = sinhVien.loaiSV;

  // Tính điểm trung bình
  sinhVien.tinhDTB();
  getEle("spanDTB").innerHTML = sinhVien.dtb;
  getEle("spanXepLoai").innerHTML = sinhVien.xepLoai();
}
