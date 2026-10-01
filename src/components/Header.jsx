const tenQuan = import.meta.env.VITE_TEN_QUAN;

function Header({ tongPhan }) {
  return (
    <header>
      <h1>{tenQuan}</h1>

      <div>
        Số phần trong giỏ:{" "}
        <span data-testid="tong-phan">{tongPhan}</span>
      </div>
    </header>
  );
}

export default Header;