function Khung({ tieuDe, hanhDong, children }) {
  return (
    <section>
      <div>
        <h2>{tieuDe}</h2>
        {hanhDong}
      </div>

      {children}
    </section>
  )
}

export default Khung