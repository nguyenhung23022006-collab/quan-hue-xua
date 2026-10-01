import MonAnCard from './MonAnCard'

function DanhSachMon({ dsMon, dangChon, onChon, onDat }) {
  return (
    <section>
      <h2>Thực đơn</h2>

      <div>
        {dsMon.map((mon) => (
          <MonAnCard
            key={mon.id}
            mon={mon}
            dangChon={dangChon === mon.id}
            onChon={onChon}
            onDat={onDat}
          />
        ))}
      </div>
    </section>
  )
}

export default DanhSachMon