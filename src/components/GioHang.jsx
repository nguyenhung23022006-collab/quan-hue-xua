import { useMemo } from 'react'

function GioHang({ gio, dsMon }) {
  const tongTien = useMemo(() => {
    return gio.reduce((tong, item) => {
      const mon = dsMon.find((mon) => mon.id === item.id)

      if (!mon) {
        return tong
      }

      return tong + mon.gia * item.soLuong
    }, 0)
  }, [gio, dsMon])

  if (gio.length === 0) {
    return (
      <section data-testid="gio-hang">
        <p>Giỏ hàng trống</p>
      </section>
    )
  }

  return (
    <section data-testid="gio-hang">
      <ul>
        {gio.map((item) => {
          const mon = dsMon.find((mon) => mon.id === item.id)

          if (!mon) {
            return null
          }

          const thanhTien = mon.gia * item.soLuong

          return (
            <li key={item.id}>
              {mon.ten} × {item.soLuong} —{' '}
              {thanhTien.toLocaleString('vi-VN')} đ
            </li>
          )
        })}
      </ul>

      <p>
        Tổng tiền:{' '}
        <span data-testid="tong-tien">
          {tongTien.toLocaleString('vi-VN')} đ
        </span>
      </p>
    </section>
  )
}

export default GioHang