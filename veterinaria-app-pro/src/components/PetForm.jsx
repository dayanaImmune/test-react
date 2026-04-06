import { useState } from "react";

const initialForm = {
  name: "",
  owner: "",
  type: "Perro",
  urgent: false,
};

function PetForm({ onAddPet }) {
  const [formData, setFormData] = useState(initialForm);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.owner.trim()) {
      setError("Nombre y dueño son obligatorios");
      return;
    }

    if (formData.name.trim().length < 3) {
      setError("El nombre debe tener al menos 3 caracteres");
      return;
    }

    setError("");
    onAddPet({
      name: formData.name.trim(),
      owner: formData.owner.trim(),
      type: formData.type,
      urgent: formData.urgent,
    });
    setFormData(initialForm);
  };

  return (
    <section className="panel">
      <h2>Registrar mascota</h2>
      {error && <p role="alert" className="error">{error}</p>}

      <form onSubmit={handleSubmit} className="grid grid-2">
        <div>
          <label htmlFor="name">Nombre de la mascota</label>
          <input
            id="name"
            name="name"
            placeholder="Nombre de la mascota"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="owner">Nombre del dueño</label>
          <input
            id="owner"
            name="owner"
            placeholder="Nombre del dueño"
            value={formData.owner}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="type">Tipo de animal</label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
          >
            <option value="Perro">Perro</option>
            <option value="Gato">Gato</option>
            <option value="Conejo">Conejo</option>
          </select>
        </div>

        <div>
          <label className="inline" htmlFor="urgent">
            <input
              id="urgent"
              type="checkbox"
              name="urgent"
              checked={formData.urgent}
              onChange={handleChange}
            />
            Caso urgente
          </label>
        </div>

        <div>
          <button className="primary" type="submit">Guardar paciente</button>
        </div>
      </form>
    </section>
  );
}

export default PetForm;
