function PetCard({ pet, onDeletePet, onToggleAttended }) {
  return (
    <article
      className={`card ${pet.attended ? "attended" : ""}`}
      data-testid="pet-card"
    >
      <h3>{pet.name}</h3>
      <p>Dueño: {pet.owner}</p>
      <p>Tipo: {pet.type}</p>
      <p>Urgente: {pet.urgent ? "Sí" : "No"}</p>
      <p>Estado: {pet.attended ? "Atendido" : "Pendiente"}</p>

      <div className="actions">
        <button className="secondary" onClick={() => onToggleAttended(pet.id)}>
          {pet.attended ? "Marcar como pendiente" : "Marcar como atendido"}
        </button>
        <button className="danger" onClick={() => onDeletePet(pet.id)}>
          Eliminar
        </button>
      </div>
    </article>
  );
}

export default PetCard;
