function hienKetNoi() {
    const loai = document.getElementById("loaiKH").value;
    const ketNoiInput = document.getElementById("soKetNoi");
    const ketNoiLabel = document.getElementById("labelKetNoi");

    if (loai === "dan") {
      ketNoiInput.disabled = true;
      ketNoiInput.value = ""; // reset
    } else {
      ketNoiInput.disabled = false;
    }
  }

  function tinhTienCap() {
    const maKH = document.getElementById("maKH").value;
    const loai = document.getElementById("loaiKH").value;
    const soKetNoi = parseInt(document.getElementById("soKetNoi").value) || 0;
    const soKenh = parseInt(document.getElementById("soKenh").value);

    let tongTien = 0;

    if (loai === "dan") {
      tongTien = 4.5 + 20.5 + (7.5 * soKenh);
    } else if (loai === "doanhnghiep") {
      let phiDichVu = 75;
      if (soKetNoi > 10) {
        phiDichVu += (soKetNoi - 10) * 5;
      }
      tongTien = 15 + phiDichVu + (50 * soKenh);
    }

    document.getElementById("ketQua").innerText =
      `Mã KH: ${maKH} | Loại: ${loai === 'dan' ? 'Nhà dân' : 'Doanh nghiệp'} => Tổng tiền cáp: $${tongTien.toFixed(2)}`;
  }

  // Khởi tạo ban đầu
  hienKetNoi();