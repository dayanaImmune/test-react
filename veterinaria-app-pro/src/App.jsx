import { useMemo, useState } from "react";
import Header from "./components/Header";
import PetForm from "./components/PetForm";
import FilterBar from "./components/FilterBar";
import PetList from "./components/PetList";

const initialPets = [
  {
    id: 1,
    name: "Luna",
    owner: "Carlos",
    type: "Gato",
    urgent: true,
    attended: false,
  },
  {
    id: 2,
    name: "Toby",
    owner: "Ana",
    type: "Perro",
    urgent: false,
    attended: true,
  },
];

function App() {
  const [pets, setPets] = useState(initialPets);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("Todos");
  const [onlyUrgent, setOnlyUrgent] = useState(false);

  const addPet = (pet) => {
    const newPet = {
      ...pet,
      id: Date.now(),
      attended: false,
    };
    setPets((prev) => [...prev, newPet]);
  };

  const deletePet = (id) => {
    setPets((prev) => prev.filter((pet) => pet.id !== id));
  };

  const toggleAttended = (id) => {
    setPets((prev) =>
      prev.map((pet) =>
        pet.id === id ? { ...pet, attended: !pet.attended } : pet
      )
    );
  };

  const filteredPets = useMemo(() => {
    return pets.filter((pet) => {
      const matchesSearch = pet.name.toLowerCase().includes(search.toLowerCase());
      const matchesType = filterType === "Todos" || pet.type === filterType;
      const matchesUrgent = !onlyUrgent || pet.urgent;
      return matchesSearch && matchesType && matchesUrgent;
    });
  }, [pets, search, filterType, onlyUrgent]);

  return (
    <div className="app">
      <Header total={pets.length} pending={pets.filter((p) => !p.attended).length} />
      <PetForm onAddPet={addPet} />
      <FilterBar
        search={search}
        setSearch={setSearch}
        filterType={filterType}
        setFilterType={setFilterType}
        onlyUrgent={onlyUrgent}
        setOnlyUrgent={setOnlyUrgent}
      />
      <PetList
        pets={filteredPets}
        onDeletePet={deletePet}
        onToggleAttended={toggleAttended}
      />
    </div>
  );
}

export default App;
