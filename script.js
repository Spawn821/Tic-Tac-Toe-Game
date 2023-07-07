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
    const table = generateTable();
    document.getElementById('content').innerHTML = table;
}

// Funktion zur Generierung der Tabelle
function generateTable() {
    let table = '<table>';

    for (let i = 0; i < 3; i++) {
        table += generateTableRow(i);
    }

    table += '</table>';
        
    return table;
}

// Funktion zur Generierung einer Tabellenzeile
function generateTableRow(row) {
    let rowHtml = '<tr>';

    for (let j = 0; j < 3; j++) {
        const index = row * 3 + j;
        const fieldValue = fields[index];
        const symbol = generateSymbol(fieldValue, index);
        rowHtml += generateTableCell(symbol, index);
    }

    rowHtml += '</tr>';

    return rowHtml;
}

// Funktion zur Generierung einer Tabellenzelle
function generateTableCell(symbol, index) {
    return '<td onclick="handleClick(' + index + ')" id="td-' + index + '">' + symbol + '</td>';
}

// Funktion zur Generierung des Symbols für eine Tabellenzelle
function generateSymbol(fieldValue, index) {
    if (fieldValue === 'circle') {
        return generateCircleSVG();
    } else if (fieldValue === 'cross') {
        return generateXSVG();
    }
    return '';
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

        if (checkGameOver()) {

            return;
        }
    }
}


// Funktion zum Überprüfen, ob das Spiel vorbei ist
function checkGameOver() {
    const winningCombinations = getWinningCombinations();
    const displayEndGame = document.getElementById('display-end-game');

    for (let combination of winningCombinations) {
        if (isWinningCombination(combination)) {
            const [a, b, c] = combination;
            const tdElementA = document.getElementById('td-' + a);
            const tdElementC = document.getElementById('td-' + c);
            drawWinningLine(tdElementA, tdElementC);
            displayEndGame.classList.remove('d-none');
            displayEndGame.innerHTML = `Spieler \'${fields[a]}\' hat gewonnen.<br>Das Spiel ist vorbei!`;
            return true;
        }
    }

    if (isGameDraw()) {
        displayEndGame.classList.remove('d-none');
        displayEndGame.innerHTML = `Unentschieden.<br> Das Spiel ist vorbei!`;
        return true;
    }

    return false;
}

// Funktion zur Erstellung der Gewinnkombinationen
function getWinningCombinations() {
    return [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontale Kombinationen
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertikale Kombinationen
        [0, 4, 8], [2, 4, 6] // Diagonale Kombinationen
    ];
}

// Funktion zur Überprüfung, ob eine Gewinnkombination erfüllt ist
function isWinningCombination(combination) {
    const [a, b, c] = combination;
    return fields[a] && fields[a] === fields[b] && fields[a] === fields[c];
}

// Funktion zur Überprüfung, ob das Spiel unentschieden ist
function isGameDraw() {
    return fields.every(field => field !== null);
}


// Funktion zum Zeichnen der Gewinnlinie
function drawWinningLine(startElement, endElement) {
    const startRect = startElement.getBoundingClientRect();
    const endRect = endElement.getBoundingClientRect();
    const [startX, startY] = getRelativeCoordinates(startElement, startRect);
    const [endX, endY] = getRelativeCoordinates(endElement, endRect);

    const line = createSvgLine(startX, startY, endX, endY);
    const svg = createSvgElement();
    svg.appendChild(line);

    const table = document.querySelector('table');
    table.style.position = 'relative';
    table.appendChild(svg);
}

// Hilfsfunktion zur Berechnung der relativen Koordinaten
function getRelativeCoordinates(element, rect) {
    const tableRect = element.offsetParent.getBoundingClientRect();
    const x = rect.left + rect.width / 2 - tableRect.left;
    const y = rect.top + rect.height / 2 - tableRect.top;
    return [x, y];
}

// Hilfsfunktion zur Erstellung einer SVG-Linie
function createSvgLine(x1, y1, x2, y2) {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', x1);
    line.setAttribute('y1', y1);
    line.setAttribute('x2', x2);
    line.setAttribute('y2', y2);
    line.setAttribute('stroke', '#FFFFFF');
    line.setAttribute('stroke-width', '5');
    return line;
}

// Hilfsfunktion zur Erstellung eines SVG-Elements
function createSvgElement() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.style.position = 'absolute';
    svg.style.top = '0';
    svg.style.left = '0';
    return svg;
}


// Das Spiel wird neu gestartet
function newGame() {
    fields = [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null
    ]

    document.getElementById('display-end-game').classList.add('d-none');

    init();
}


// Erstellt den Kreis mit einer Animation
function generateCircleSVG() {
    color = '#00B0EF'
    const height = 70;
    const width = 70;
    const radius = (70 - 10) / 2

    const svgCode = `
        <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
            <circle cx="${width / 2}" cy="${height / 2}" r="${radius}" fill="none" stroke="${color}" stroke-width="5">
                <animate attributeName="stroke-dasharray" dur="250ms" from="0, 188.5" to="188.5, 0" fill="freeze" repeatCount="1" />
            </circle>
        </svg>
    `;

    return svgCode;
}


// Erstellt des Kreuz mit einer Animation
function generateXSVG() {
    color = '#FFC000'
    const startWidth = 5;
    const startHeight = 5;
    const height = 70;
    const width = 70;

    const svgCode = `
        <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
            <line x1="${startWidth}" y1="${startHeight}" x2="${width - startWidth}" y2="${height - startHeight}" stroke="${color}" stroke-width="5">
                <animate attributeName="stroke-dasharray" dur="250ms" from="0, ${height}" to="${width}, 0" fill="freeze" repeatCount="1" />
            </line>
            <line x1="${startWidth}" y1="${height - startHeight}" x2="${width - startWidth}" y2="${startWidth}" stroke="${color}" stroke-width="5">
                <animate attributeName="stroke-dasharray" dur="250ms" from="0, ${height}" to="${width}, 0" fill="freeze" repeatCount="1" />
            </line>
        </svg>
    `;

    return svgCode;
}