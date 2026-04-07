import { useEffect, useState } from "react";
import { getAnimalFact } from "../services/animalFactApi";

function AnimalFact() {
  const [fact, setFact] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadFact = async () => {
    setLoading(true);
    setError("");

    try {
      const animalFact = await getAnimalFact();
      setFact(animalFact);
    } catch (err) {
      setError("Error al cargar el dato animal");
      setFact("");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFact();
  }, []);

  return (
    <section className="panel">
      <h2>Dato animal del día</h2>

      {loading && <p>Cargando dato...</p>}

      {error && <p role="alert">{error}</p>}

      {!loading && !error && (
        <p data-testid="animal-fact">{fact}</p>
      )}

      <button className="secondary" onClick={loadFact}>
        Cargar otro dato
      </button>
    </section>
  );
}

export default AnimalFact;