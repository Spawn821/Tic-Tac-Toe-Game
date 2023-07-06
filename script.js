// Definiere den aktuellen Zustand der Felder
let fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
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
                symbol = generateCircleSVG();
            } else if (fieldValue === 'cross') {
                symbol = generateXSVG();
            }

            table += '<td onclick="handleClick(' + index + ')" id="td-' + index + '">' + symbol + '</td>';
        }

        table += '</tr>';
    }

    table += '</table>';

    document.getElementById('content').innerHTML = table;
}


// Funktion zum Handhaben des Klicks auf ein Feld
function handleClick(index) {
    if (fields[index] === null) {
        if (fields.filter(field => field !== null).length % 2 === 0) {
            fields[index] = 'circle';
        } else {
            fields[index] = 'cross';
        }

        const tdElement = document.getElementById('td-' + index);
        tdElement.innerHTML = (fields[index] === 'circle') ? generateCircleSVG() : generateXSVG();
        tdElement.onclick = null;

        if(checkGameOver()) {

            return;
        }
    }
}











// Funktion zum Überprüfen, ob das Spiel vorbei ist
function checkGameOver() {
    // Gewinnkombinationen
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontale Kombinationen
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertikale Kombinationen
        [0, 4, 8], [2, 4, 6] // Diagonale Kombinationen
    ];

    // Überprüfe alle möglichen Gewinnkombinationen
    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
            // Das Spiel ist vorbei, markiere die gewinnenden Elemente und zeichne die Linie
            const tdElementA = document.getElementById('td-' + a);
            const tdElementC = document.getElementById('td-' + c);

            drawWinningLine(tdElementA, tdElementC);

            return true;
        }
    }

    // Wenn alle Felder belegt sind und kein Gewinner vorhanden ist, ist das Spiel unentschieden
    if (fields.every(field => field !== null)) {
        alert('Unentschieden! Das Spiel ist vorbei.');
        return true;
    }

    return false;
}

// Funktion zum Zeichnen der Gewinnlinie
function drawWinningLine(startElement, endElement) {
    const startRect = startElement.getBoundingClientRect();
    const endRect = endElement.getBoundingClientRect();

    const startX = startRect.left + startRect.width / 2 - startElement.offsetParent.offsetLeft;
    const startY = startRect.top + startRect.height / 2 - startElement.offsetParent.offsetTop;
    const endX = endRect.left + endRect.width / 2 - endElement.offsetParent.offsetLeft;
    const endY = endRect.top + endRect.height / 2 - endElement.offsetParent.offsetTop;

    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', startX);
    line.setAttribute('y1', startY);
    line.setAttribute('x2', endX);
    line.setAttribute('y2', endY);
    line.setAttribute('stroke', '#FFFFFF');
    line.setAttribute('stroke-width', '5');

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.style.position = 'absolute';
    svg.style.top = '0';
    svg.style.left = '0';
    svg.appendChild(line);

    const table = document.querySelector('table');
    table.style.position = 'relative';
    table.appendChild(svg);
}


// Funktion zum Abrufen des horizontalen Versatzes der Tabelle
function getTableOffsetLeft() {
    const table = document.querySelector('table');
    const tableRect = table.getBoundingClientRect();
    const bodyRect = document.body.getBoundingClientRect();
    return tableRect.left - bodyRect.left;
}

// Funktion zum Abrufen des vertikalen Versatzes der Tabelle
function getTableOffsetTop() {
    const table = document.querySelector('table');
    const tableRect = table.getBoundingClientRect();
    const bodyRect = document.body.getBoundingClientRect();
    return tableRect.top - bodyRect.top;
}



/* Erstellt den Kreis mit einer Animation */
function generateCircleSVG() {
    color = '#00B0EF'
    const height = 70;
    const width = 70;

    const svgCode = `
        <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 70 70">
            <circle cx="35" cy="35" r="30" fill="none" stroke="${color}" stroke-width="5">
                <animate attributeName="stroke-dasharray" dur="250ms" from="0, 188.5" to="188.5, 0" fill="freeze" repeatCount="1" />
            </circle>
        </svg>
    `;
    
    return svgCode;
}


/* Erstellt des Kreuz mit einer Animation */
function generateXSVG() {
    color = '#FFC000'
    const height = 70;
    const width = 70;

    const svgCode = `
        <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 70 70">
            <line x1="5" y1="5" x2="65" y2="65" stroke="${color}" stroke-width="5">
                <animate attributeName="stroke-dasharray" dur="250ms" from="0, ${height}" to="${width}, 0" fill="freeze" repeatCount="1" />
            </line>
            <line x1="5" y1="65" x2="65" y2="5" stroke="${color}" stroke-width="5">
                <animate attributeName="stroke-dasharray" dur="250ms" from="0, ${height}" to="${width}, 0" fill="freeze" repeatCount="1" />
            </line>
        </svg>
    `;
    
    return svgCode;
}