import { useEffect, useRef, useState } from 'react'

function FormDatMon({ onGui, choPhepGui }) {
  const oHoTen = useRef(null)

  const [hoTen, setHoTen] = useState('')
  const [soDienThoai, setSoDienThoai] = useState('')
  const [ghiChu, setGhiChu] = useState('')

  const [loi, setLoi] = useState({})

  useEffect(() => {
    if (choPhepGui) {
      oHoTen.current?.focus()
    }
  }, [choPhepGui])

  function kiemTra(ten, dienThoai) {
    const loiMoi = {}

    if (ten.trim().length < 2) {
      loiMoi.hoTen = 'Họ tên cần ít nhất 2 ký tự'
    }

    if (!/^0\d{9}$/.test(dienThoai.trim())) {
      loiMoi.soDienThoai =
        'Số điện thoại gồm 10 chữ số, bắt đầu bằng 0'
    }

    return loiMoi
  }

  function kiemTraHoTen() {
    const loiMoi = kiemTra(hoTen, soDienThoai)

    setLoi((loiCu) => ({
      ...loiCu,
      hoTen: loiMoi.hoTen,
    }))
  }

  function kiemTraSoDienThoai() {
    const loiMoi = kiemTra(hoTen, soDienThoai)

    setLoi((loiCu) => ({
      ...loiCu,
      soDienThoai: loiMoi.soDienThoai,
    }))
  }

  function xuLySubmit(e) {
    e.preventDefault()

    const loiMoi = kiemTra(hoTen, soDienThoai)

    setLoi(loiMoi)

    if (Object.keys(loiMoi).length > 0) {
      return
    }

    onGui({
      hoTen: hoTen.trim(),
      soDienThoai: soDienThoai.trim(),
      ghiChu: ghiChu.trim(),
    })
  }

  return (
    <form onSubmit={xuLySubmit}>
      <div>
        <label htmlFor="ho-ten">Họ tên</label>

        <input
          id="ho-ten"
          name="hoTen"
          ref={oHoTen}
          type="text"
          value={hoTen}
          onChange={(e) => setHoTen(e.target.value)}
          onBlur={kiemTraHoTen}
        />

        {loi.hoTen && (
          <p className="loi" role="alert">
            {loi.hoTen}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="so-dien-thoai">
          Số điện thoại
        </label>

        <input
          id="so-dien-thoai"
          name="soDienThoai"
          type="text"
          value={soDienThoai}
          onChange={(e) => setSoDienThoai(e.target.value)}
          onBlur={kiemTraSoDienThoai}
        />

        {loi.soDienThoai && (
          <p className="loi" role="alert">
            {loi.soDienThoai}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="ghi-chu">Ghi chú</label>

        <textarea
          id="ghi-chu"
          name="ghiChu"
          value={ghiChu}
          onChange={(e) => setGhiChu(e.target.value)}
        />

        {loi.ghiChu && (
          <p className="loi" role="alert">
            {loi.ghiChu}
          </p>
        )}
      </div>

      <button type="submit" disabled={!choPhepGui}>
        Gửi đơn
      </button>
    </form>
  )
}

export default FormDatMon