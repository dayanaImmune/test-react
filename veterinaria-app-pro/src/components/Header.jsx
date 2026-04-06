function Header({ total, pending }) {
  return (
    <header className="panel">
      <h1>VeterinariaApp Pro</h1>
      <p data-testid="total-pets">Pacientes registrados: {total}</p>
      <p data-testid="pending-pets">Pacientes pendientes: {pending}</p>
    </header>
  );
}

export default Header;
