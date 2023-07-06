// Definiere den aktuellen Zustand der Felder
let fields = [
    'circle',
    'circle',
    'circle',
    null,
    null,
    null,
    'cross',
    null,
    null
];


// Lädt alle Startbedingungen
function init() {
    render();
}

// Funktion zum Rendern der Tabelle
function render() {
    let table = '<table>';

    for (let i = 0; i < 3; i++) {
        table += '<tr>';

        for (let j = 0; j < 3; j++) {
            const index = i * 3 + j;
            const fieldValue = fields[index];
            let symbol = '';

            if (fieldValue === 'circle') {
                symbol = 'O';
            } else if (fieldValue === 'cross') {
                symbol = 'X';
            }

            table += `<td onclick="handleClick(${index})">${symbol}</td>`;
        }

        table += '</tr>';
    }

    table += '</table>';

    document.getElementById('content').innerHTML = table;
}

// Funktion zum Handhaben des Klicks auf ein Feld
function handleClick(index) {
    if (fields[index] === null) {
        fields[index] = 'circle'; // Beispielhaft wird das Feld immer mit einem Kreis markiert

        render(); // Aktualisiere die Tabelle nach dem Klick
    }
}

// Rufe die render() Funktion auf, um die Tabelle zu initialisieren
render();
