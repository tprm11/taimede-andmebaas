async function loadPlants() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    const infoBox = document.getElementById("plantInfo");

    if (!id) {
        infoBox.innerHTML = "<p>QR-kood ei sisalda Plant-ID väärtust.</p>";
        return;
    }

    try {
        const response = await fetch("plants.json?v=" + Date.now());
        const data = await response.json();

        const plant = data[id];

        if (!plant) {
            infoBox.innerHTML = "<p>Taimi ei leitud ID-ga: <b>" + id + "</b></p>";
            return;
        }

        infoBox.innerHTML = `
            <div class='field-value'><span class='field-title'>Plant-ID:</span> ${plant.PlantID}</div>
            <div class='field-value'><span class='field-title'>Liik:</span> ${plant.Liik}</div>
            <div class='field-value'><span class='field-title'>Mulla niiskus:</span> ${plant.Mullaniskus}</div>
            <div class='field-value'><span class='field-title'>Viimane kastmine:</span> ${plant.ViimaneKastmine}</div>
            <div class='field-value'><span class='field-title'>Ülesanne täna:</span> 
                <span class='status-${plant.Ulesanne.toLowerCase()}'>
                    ${plant.Ulesanne}
                </span>
            </div>
        `;
    } catch (e) {
        infoBox.innerHTML = "<p>Viga andmete laadimisel.</p>";
    }
}

loadPlants();
