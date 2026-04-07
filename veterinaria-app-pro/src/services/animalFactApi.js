export async function getAnimalFact() {
  const response = await fetch("https://catfact.ninja/fact");

  if (!response.ok) {
    throw new Error("No se pudo cargar el dato animal");
  }

  const data = await response.json();

  return data.fact;
}