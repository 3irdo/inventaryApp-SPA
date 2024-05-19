export async function addVisitaTecnica(visitaData){
    try {
        const response = await fetch("http://localhost:3000/historialVisitasTecnicas",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(visitaData)
        });

        const newVisitaTecnica = await response.json()
        console.log(newVisitaTecnica)
        return newVisitaTecnica

    } catch (error) {
        console.error("Error al agregar la visita técnica:", error);
        throw error;
      }
}