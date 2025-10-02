function tinhKetQua() {
    let diemChuan = parseFloat(document.getElementById("diemChuan").value);
    let diem1 = parseFloat(document.getElementById("diem1").value);
    let diem2 = parseFloat(document.getElementById("diem2").value);
    let diem3 = parseFloat(document.getElementById("diem3").value);
    let khuVuc = document.getElementById("khuVuc").value;
    let doiTuong = parseInt(document.getElementById("doiTuong").value);

    let uuTienKhuVuc = 0;
    switch (khuVuc) {
      case "A": uuTienKhuVuc = 2; break;
      case "B": uuTienKhuVuc = 1; break;
      case "C": uuTienKhuVuc = 0.5; break;
      default: uuTienKhuVuc = 0;
    }

    let uuTienDoiTuong = 0;
    switch (doiTuong) {
      case 1: uuTienDoiTuong = 2.5; break;
      case 2: uuTienDoiTuong = 1.5; break;
      case 3: uuTienDoiTuong = 1; break;
      default: uuTienDoiTuong = 0;
    }

    let tongDiem = diem1 + diem2 + diem3 + uuTienKhuVuc + uuTienDoiTuong;
    let ketQua = "";

    if (diem1 === 0 || diem2 === 0 || diem3 === 0) {
      ketQua = "Thí sinh rớt vì có môn bị điểm 0.";
    } else if (tongDiem >= diemChuan) {
      ketQua = "Thí sinh ĐẬU. Tổng điểm: " + tongDiem;
    } else {
      ketQua = "Thí sinh RỚT. Tổng điểm: " + tongDiem;
    }

    document.getElementById("ketQua").innerText = ketQua;
  }