import PetCard from "./PetCard";

function PetList({ pets, onDeletePet, onToggleAttended }) {
  return (
    <section className="panel">
      <h2>Lista de pacientes</h2>
      {pets.length === 0 ? (
        <p className="muted">No hay pacientes registrados</p>
      ) : (
        <div className="list">
          {pets.map((pet) => (
            <PetCard
              key={pet.id}
              pet={pet}
              onDeletePet={onDeletePet}
              onToggleAttended={onToggleAttended}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default PetList;
