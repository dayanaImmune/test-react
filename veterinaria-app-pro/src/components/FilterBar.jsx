function FilterBar({
  search,
  setSearch,
  filterType,
  setFilterType,
  onlyUrgent,
  setOnlyUrgent,
}) {
  return (
    <section className="panel">
      <h2>Filtros</h2>

      <div className="grid grid-2">
        <div>
          <label htmlFor="search">Buscar por nombre</label>
          <input
            id="search"
            placeholder="Buscar por nombre"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="filterType">Filtrar por tipo</label>
          <select
            id="filterType"
            aria-label="Filtrar por tipo"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="Todos">Todos</option>
            <option value="Perro">Perro</option>
            <option value="Gato">Gato</option>
            <option value="Conejo">Conejo</option>
          </select>
        </div>
      </div>

      <div className="actions">
        <label className="inline" htmlFor="onlyUrgent">
          <input
            id="onlyUrgent"
            type="checkbox"
            checked={onlyUrgent}
            onChange={(e) => setOnlyUrgent(e.target.checked)}
          />
          Mostrar solo urgentes
        </label>
      </div>
    </section>
  );
}

export default FilterBar;
