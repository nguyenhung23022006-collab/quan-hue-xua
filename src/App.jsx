import { useEffect, useState } from 'react'
import Header from './components/Header'
import DanhSachMon from './components/DanhSachMon'
import GioHang from './components/GioHang'
import FormDatMon from './components/FormDatMon'
import Khung from './components/Khung'
import useLocalStorage from './hooks/useLocalStorage'

const dsMon = [
  {
    id: 1,
    ten: 'Bún bò Huế',
    moTa: 'Bún bò truyền thống đậm đà hương vị Huế',
    gia: 45000,
    daHet: false,
  },
  {
    id: 2,
    ten: 'Cơm hến',
    moTa: 'Cơm hến đặc sản dân dã của xứ Huế',
    gia: 35000,
    daHet: false,
  },
  {
    id: 3,
    ten: 'Bánh bột lọc',
    moTa: 'Bánh bột lọc nhân tôm thịt',
    gia: 30000,
    daHet: true,
  },
  {
    id: 4,
    ten: 'Bánh bèo',
    moTa: 'Bánh bèo Huế với tôm cháy và nước mắm',
    gia: 25000,
    daHet: false,
  },
  {
    id: 5,
    ten: 'Bánh nậm',
    moTa: 'Bánh nậm mềm thơm nhân tôm thịt',
    gia: 25000,
    daHet: false,
  },
  {
    id: 6,
    ten: 'Chè bắp',
    moTa: 'Chè bắp ngọt thanh từ bắp non',
    gia: 20000,
    daHet: true,
  },
  {
    id: 7,
    ten: 'Chè cung đình Huế',
    moTa: 'Chè cung đình với nhiều loại đậu và hạt',
    gia: 30000,
    daHet: false,
  },
  {
    id: 8,
    ten: 'Nem lụi',
    moTa: 'Nem lụi nướng thơm ăn kèm rau sống',
    gia: 50000,
    daHet: false,
  },
]

function App() {
  const [idDangChon, setIdDangChon] = useState(null)

  const [gio, setGio] = useLocalStorage('gio-hang', [])

  const [lanDatHang, setLanDatHang] = useState(0)

  const [thongBao, setThongBao] = useState('')

  const tenQuan = import.meta.env.VITE_TEN_QUAN

  function chonMon(id) {
    setIdDangChon(id)
  }

  function datMon(id) {
    setGio((gioCu) => {
      const monDaCo = gioCu.find((item) => item.id === id)

      if (monDaCo) {
        return gioCu.map((item) =>
          item.id === id
            ? {
                ...item,
                soLuong: item.soLuong + 1,
              }
            : item
        )
      }

      return [
        ...gioCu,
        {
          id: id,
          soLuong: 1,
        },
      ]
    })

    setThongBao('')
  }

  function xoaGioHang() {
    setGio([])
    setThongBao('')
  }

  const tongPhan = gio.reduce(
    (tong, item) => tong + item.soLuong,
    0
  )

  const choPhepGui = gio.length > 0

  function guiDon(duLieu) {
    setThongBao(`Đã nhận đơn của ${duLieu.hoTen}`)

    setGio([])

    setLanDatHang((lanCu) => lanCu + 1)
  }

  useEffect(() => {
    if (tongPhan === 0) {
      document.title = tenQuan
    } else {
      document.title = `(${tongPhan}) ${tenQuan}`
    }
  }, [tongPhan, tenQuan])

  return (
    <div>
      <Header tongPhan={tongPhan} />

      <DanhSachMon
        dsMon={dsMon}
        dangChon={idDangChon}
        onChon={chonMon}
        onDat={datMon}
      />

      <Khung
        tieuDe="Giỏ hàng"
        hanhDong={
          <button type="button" onClick={xoaGioHang}>
            Xóa giỏ hàng
          </button>
        }
      >
        <GioHang
          gio={gio}
          dsMon={dsMon}
        />
      </Khung>

      <Khung
        tieuDe="Đặt món"
        hanhDong={null}
      >
        <FormDatMon
          key={lanDatHang}
          onGui={guiDon}
          choPhepGui={choPhepGui}
        />
      </Khung>

      {thongBao && (
        <p role="status">
          {thongBao}
        </p>
      )}
    </div>
  )
}

export default App