const table = document.getElementById("data-table");
const addRowBtn = document.getElementById("add-row-btn");
const removeRowBtn = document.getElementById("remove-row-btn");
const addColBtn = document.getElementById("add-col-btn");
const removeColBtn = document.getElementById("remove-col-btn");
const MIN_ROW_SIZE = 10;
const MIN_COL_SIZE = 5;
let rowCount = 10;
let colCount = 5;
let selectedCell = null;
let selectionRange = null;
let internalClipboard = null;
let tableData = [];
let isEditing = false;
let editBackupValue = "";
let chartInstance = null;
let chartConfig = null; // { xRange, yRange, type }


function normalizeSelectedCell() {
    if (!selectedCell) return;
    if (selectedCell.row >= rowCount) {
        selectedCell.row = rowCount - 1;
    }
    if (selectedCell.col >= colCount) {
        selectedCell.col = colCount - 1;
    }
}
function getColumnLabel(index) {
    return String.fromCharCode(65 + index);
}
// MODEL INITIALIZE
function initData() {
    tableData = [];
    for (let r = 0; r < rowCount; r++) {
        const row = [];
        for (let c = 0; c < colCount; c++) {
            row.push({
                value: "",
                formula: null
            });
        }
        tableData.push(row);
    }
}
// RENDER TABLE FROM MODEL
function renderTable() {
    table.innerHTML = "";
    table.addEventListener("contextmenu", (e) => {
        e.preventDefault();
    });

    // HEADER
    const headerRow = document.createElement("tr");
    headerRow.appendChild(document.createElement("th"));

    for (let c = 0; c < colCount; c++) {
        const th = document.createElement("th");
        th.textContent = getColumnLabel(c);
        headerRow.appendChild(th);
    }
    table.appendChild(headerRow);

    // ROWS
    for (let r = 0; r < rowCount; r++) {
        const tr = document.createElement("tr");

        const rowHeader = document.createElement("th");
        rowHeader.textContent = r + 1;
        tr.appendChild(rowHeader);

        for (let c = 0; c < colCount; c++) {
            const td = document.createElement("td");
            // data binding
            td.dataset.row = r;
            td.dataset.col = c;

            td.textContent = tableData[r][c].value;
            td.contentEditable = false;
            td.tabIndex = -1;

            // SELECTED STATE -> CSS
            if (
                selectedCell &&
                selectedCell.row === r &&
                selectedCell.col === c
            ) {
                td.classList.add("selected");
            }

            // RANGE SELECTED STATE (Shift + seçim)
            if (selectionRange) {
                const minRow = Math.min(selectionRange.start.row, selectionRange.end.row);
                const maxRow = Math.max(selectionRange.start.row, selectionRange.end.row);
                const minCol = Math.min(selectionRange.start.col, selectionRange.end.col);
                const maxCol = Math.max(selectionRange.start.col, selectionRange.end.col);

                if (
                    r >= minRow && r <= maxRow &&
                    c >= minCol && c <= maxCol
                ) {
                    td.classList.add("range-selected");
                }
            }

            // CHART HIGHLIGHT STATE (chartConfig varsa)
            if (chartConfig) {
                if (isCellInRange(r, c, chartConfig.xRange)) {
                    td.classList.add("chart-x");
                }
                if (isCellInRange(r, c, chartConfig.yRange)) {
                    td.classList.add("chart-y");
                }
            }


            // EVENT LISTENERS
            td.addEventListener("click", (e) => {
                if (isEditing) {
                    exitEditMode(true);
                }

                if (e.shiftKey && selectedCell) {
                    selectionRange = {
                        start: { ...selectedCell },
                        end: { row: r, col: c }
                    };
                } else {
                    selectedCell = { row: r, col: c };
                    selectionRange = null;
                }

                renderTable();
                td.focus();
            });

            td.addEventListener("dblclick", () => {
                selectedCell = { row: r, col: c };
                renderTable();
                enterEditMode(r, c);
            });

            tr.appendChild(td);
        }

        table.appendChild(tr);
    }
}
// === EVENTS ===
addRowBtn.addEventListener("click", () => {
    rowCount++;
    const newRow = Array.from({ length: colCount }, () => ({
        value: "",
        formula: null
    }));
    tableData.push(newRow);
    renderTable();
});
removeRowBtn.addEventListener("click", () => {
    if (rowCount > MIN_ROW_SIZE) {
        rowCount--;
        tableData.pop();
        normalizeSelectedCell();
        renderTable();
    }
});
addColBtn.addEventListener("click", () => {
    colCount++;
    tableData.forEach(row =>
        row.push({
            value: "",
            formula: null
        })
    );
    renderTable();
});
removeColBtn.addEventListener("click", () => {
    if (colCount > MIN_COL_SIZE) {
        colCount--;
        tableData.forEach(row => row.pop());
        normalizeSelectedCell();
        renderTable();
    }
});
function placeCursorAtEnd(element) {
    const range = document.createRange();
    const selection = window.getSelection();
    range.selectNodeContents(element);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
}

/* FORMÜL FONKSİYONLARI */
function cellRefToIndex(ref) {
    const match = ref.match(/^([A-Z]+)(\d+)$/);
    if (!match) return null;

    const colLetters = match[1];
    const rowNumber = parseInt(match[2], 10);

    let col = 0;
    for (let i = 0; i < colLetters.length; i++) {
        col = col * 26 + (colLetters.charCodeAt(i) - 64);
    }

    return {
        row: rowNumber - 1,
        col: col - 1
    };
}

function getCellNumericValue(row, col) {
    const cell = tableData[row][col];

    if (cell.formula) {
        return evaluateFormula(cell.formula, row, col);
    }

    const num = parseFloat(cell.value);
    return isNaN(num) ? 0 : num;
}

function getRangeValues(range) {
    const [startRef, endRef] = range.split(":");

    const start = cellRefToIndex(startRef);
    const end = cellRefToIndex(endRef);

    if (!start || !end) return [];

    const minRow = Math.min(start.row, end.row);
    const maxRow = Math.max(start.row, end.row);
    const minCol = Math.min(start.col, end.col);
    const maxCol = Math.max(start.col, end.col);

    const values = [];

    for (let r = minRow; r <= maxRow; r++) {
        for (let c = minCol; c <= maxCol; c++) {
            values.push(getCellNumericValue(r, c));
        }
    }

    return values;
}

function getCellsInRange(range) {
    const [start, end] = range.split(":");

    const startIndex = cellRefToIndex(start);
    const endIndex = cellRefToIndex(end);

    if (!startIndex || !endIndex) return [];

    const minRow = Math.min(startIndex.row, endIndex.row);
    const maxRow = Math.max(startIndex.row, endIndex.row);
    const minCol = Math.min(startIndex.col, endIndex.col);
    const maxCol = Math.max(startIndex.col, endIndex.col);

    const cells = [];

    for (let r = minRow; r <= maxRow; r++) {
        for (let c = minCol; c <= maxCol; c++) {
            cells.push({ row: r, col: c });
        }
    }

    return cells;
}

function calculateSUM(range) {
    const values = getRangeValues(range);
    return values.reduce((sum, v) => sum + v, 0);
}

function calculateAVG(range) {
    const values = getRangeValues(range);
    if (values.length === 0) return 0;
    return values.reduce((sum, v) => sum + v, 0) / values.length;
}

function calculateMIN(range) {
    const cells = getCellsInRange(range);
    let min = null;

    cells.forEach(({ row, col }) => {
        const val = getCellNumericValue(row, col);
        if (!isNaN(val)) {
            min = min === null ? val : Math.min(min, val);
        }
    });

    return min ?? 0;
}

function calculateMAX(range) {
    const cells = getCellsInRange(range);
    let max = null;

    cells.forEach(({ row, col }) => {
        const val = getCellNumericValue(row, col);
        if (!isNaN(val)) {
            max = max === null ? val : Math.max(max, val);
        }
    });

    return max ?? 0;
}

function evaluateFormula(formula, currentRow, currentCol) {
    let expr = formula.slice(1); // '=' çıkar

    // SUM
    expr = expr.replace(/SUM\(\s*([A-Z]+\d+:[A-Z]+\d+)\s*\)/gi, (_, range) => {
        return calculateSUM(range.toUpperCase());
    });
    //AVG 
    expr = expr.replace(/AVG\(\s*([A-Z]+\d+:[A-Z]+\d+)\s*\)/gi, (_, range) => {
        return calculateAVG(range.toUpperCase());
    });

    // MIN
    expr = expr.replace(
        /MIN\(\s*([A-Z]+\d+:[A-Z]+\d+)\s*\)/gi,
        (_, range) => calculateMIN(range.toUpperCase())
    );

    // MAX
    expr = expr.replace(
        /MAX\(\s*([A-Z]+\d+:[A-Z]+\d+)\s*\)/gi,
        (_, range) => calculateMAX(range.toUpperCase())
    );

    // TEKİL HÜCRELERİ ÇÖZ
    expr = expr.replace(/([A-Z]+[0-9]+)/gi, (match) => {
        const index = cellRefToIndex(match.toUpperCase());
        if (!index) return 0;

        // kendine referans → 0 (ilk sürüm)
        if (
            index.row === currentRow &&
            index.col === currentCol
        ) return 0;

        return getCellNumericValue(index.row, index.col);
    });

    try {
        const result = Function(`"use strict"; return (${expr})`)();

        if (!isFinite(result)) return 0;
        return isNaN(result) ? 0 : result;
    } catch {
        return 0;
    }
}

function recalculateAll() {
    for (let r = 0; r < rowCount; r++) {
        for (let c = 0; c < colCount; c++) {
            const cell = tableData[r][c];

            if (cell.formula) {
                cell.value = evaluateFormula(
                    cell.formula,
                    r,
                    c
                ).toString();
            }
        }
    }
}

function enterEditMode(row, col, initialChar = null) {
    const cell = document.querySelector(
        `td[data-row="${row}"][data-col="${col}"]`
    );
    if (!cell) {
        console.warn("HÜCRE BULUNAMADI");
        return;
    }

    isEditing = true;
    editBackupValue = tableData[row][col].formula ?? tableData[row][col].value;

    cell.contentEditable = "true";
    cell.classList.add("editing");
    cell.focus();

    if (initialChar !== null) {
        cell.textContent = initialChar;
    } else {
        cell.textContent = editBackupValue;
    }
    placeCursorAtEnd(cell);
}

function exitEditMode(save = true) {
    if (!isEditing || !selectedCell) return;
    const { row, col } = selectedCell;
    const cell = document.querySelector(
        `td[data-row="${row}"][data-col="${col}"]`
    );
    if (!cell) return;
    if (save) {
        const text = cell.textContent.trim();

        if (text.startsWith("=")) {
            tableData[row][col].formula = text;
        } else {
            tableData[row][col].formula = null;
            tableData[row][col].value = text;
        }

    } else {
        cell.textContent = editBackupValue;
    }
    cell.contentEditable = "false";
    cell.classList.remove("editing");
    isEditing = false;
    editBackupValue = "";

    if (tableData[row][col].formula) {
        tableData[row][col].value =
            evaluateFormula(
                tableData[row][col].formula,
                row,
                col
            ).toString();
    }

    recalculateAll();
    renderTable();
    if (chartConfig) {
        renderChartFromInputs();
    }

}

window.addEventListener("keydown", (e) => {
    // Eğer focus bir input veya textarea'daysa tablo klavyesi çalışmasın
    if (
        document.activeElement &&
        (
            document.activeElement.tagName === "INPUT" ||
            document.activeElement.tagName === "TEXTAREA"
        )
    ) {
        return;
    }
    // CTRL + C
    if (e.ctrlKey && e.code === "KeyC") {
        if (isEditing || !selectedCell) return;

        if (selectionRange) {
            const minRow = Math.min(selectionRange.start.row, selectionRange.end.row);
            const maxRow = Math.max(selectionRange.start.row, selectionRange.end.row);
            const minCol = Math.min(selectionRange.start.col, selectionRange.end.col);
            const maxCol = Math.max(selectionRange.start.col, selectionRange.end.col);

            internalClipboard = [];
            for (let r = minRow; r <= maxRow; r++) {
                const row = [];
                for (let c = minCol; c <= maxCol; c++) {
                    row.push({
                        value: tableData[r][c].value,
                        formula: tableData[r][c].formula
                    });
                }
                internalClipboard.push(row);
            }
        } else if (selectedCell) {
            const { row, col } = selectedCell;
            internalClipboard = [[tableData[row][col]]];
        }
        e.preventDefault();
        return;
    }
    // CTRL + V
    if (e.ctrlKey && e.code === "KeyV") {
        if (isEditing || !internalClipboard || !selectedCell) return;

        const startRow = selectedCell.row;
        const startCol = selectedCell.col;

        for (let r = 0; r < internalClipboard.length; r++) {
            for (let c = 0; c < internalClipboard[r].length; c++) {
                const targetRow = startRow + r;
                const targetCol = startCol + c;

                if (
                    targetRow < rowCount &&
                    targetCol < colCount
                ) {
                    tableData[targetRow][targetCol] = internalClipboard[r][c];
                }
            }
        }
        recalculateAll();
        renderTable();
        e.preventDefault();
        return;
    }

    if (!selectedCell) return;
    const { row, col } = selectedCell;
    // EDIT MODE
    if (isEditing) {
        if (e.key === "Enter") {
            e.preventDefault();
            exitEditMode(true);
            selectedCell = {
                row: Math.min(row + 1, rowCount - 1),
                col
            };
            renderTable();
            return;
        }
        if (e.key === "Escape") {
            e.preventDefault();
            exitEditMode(false);
            return;
        }
        return;
    }

    // SELECTION MODE → Delete / Backspace ile hücreyi temizle
    if (
        (e.key === "Delete" || e.key === "Backspace") &&
        !isEditing
    ) {
        e.preventDefault();

        tableData[row][col] = {
            value: "",
            formula: null
        };
        recalculateAll();
        renderTable();
        return;
    }

    // SELECTION MODE → yazı ile edit'e gir
    if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        enterEditMode(row, col, e.key);
        return;
    }
    let newRow = row;
    let newCol = col;
    const navigationKeys = [
        "ArrowUp",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight"
    ];

    // SADECE ok tuşlarına izin ver
    if (!navigationKeys.includes(e.key)) {
        e.preventDefault();
        return;
    }
    switch (e.key) {
        case "ArrowUp":
            newRow = Math.max(0, row - 1);
            break;
        case "ArrowDown":
            newRow = Math.min(rowCount - 1, row + 1);
            break;
        case "ArrowLeft":
            newCol = Math.max(0, col - 1);
            break;
        case "ArrowRight":
            newCol = Math.min(colCount - 1, col + 1);
            break;
    }
    e.preventDefault();

    if (newRow !== row || newCol !== col) {
        if (e.shiftKey) {
            if (!selectionRange) {
                selectionRange = {
                    start: { ...selectedCell },
                    end: { row: newRow, col: newCol }
                };
            } else {
                selectionRange.end = { row: newRow, col: newCol };
            }
        } else {
            selectedCell = { row: newRow, col: newCol };
            selectionRange = null;
        }
        renderTable();
    }
});
// INIT
initData();
renderTable();

//DRAW CHART
function getChartDataFromRange(range) {
    if (!range) return null;

    const minRow = Math.min(range.start.row, range.end.row);
    const maxRow = Math.max(range.start.row, range.end.row);
    const minCol = Math.min(range.start.col, range.end.col);
    const labels = [];
    const values = [];

    for (let r = minRow; r <= maxRow; r++) {
        const xCell = tableData[r][minCol];
        const yCell = tableData[r][minCol + 1];

        const yVal = Number(yCell.value);
        if (isNaN(yVal)) return null;

        labels.push(xCell.value);
        values.push(yVal);
    }

    return { labels, values };
}

function isCellInRange(row, col, range) {
    if (!range) return false;

    const minRow = Math.min(range.start.row, range.end.row);
    const maxRow = Math.max(range.start.row, range.end.row);
    const minCol = Math.min(range.start.col, range.end.col);
    const maxCol = Math.max(range.start.col, range.end.col);

    return (
        row >= minRow && row <= maxRow &&
        col >= minCol && col <= maxCol
    );
}

function getChartDataFromSelection() {
    if (!selectionRange) return null;

    const minRow = Math.min(selectionRange.start.row, selectionRange.end.row);
    const maxRow = Math.max(selectionRange.start.row, selectionRange.end.row);
    const minCol = Math.min(selectionRange.start.col, selectionRange.end.col);
    const maxCol = Math.max(selectionRange.start.col, selectionRange.end.col);

    // en az 2x2
    if ((maxRow - minRow + 1) < 2 || (maxCol - minCol + 1) < 2) {
        return null;
    }

    const labels = [];
    const values = [];

    for (let r = minRow; r <= maxRow; r++) {
        const xCell = tableData[r][minCol];
        const yCell = tableData[r][minCol + 1];

        const xVal = xCell.value;
        const yVal = Number(yCell.value);

        // Y ekseni kesin sayısal olmalı
        if (isNaN(yVal)) return null;

        labels.push(xVal);
        values.push(yVal);
    }

    return { labels, values };
}

function drawChart(labels, values, type) {
    const chartArea = document.getElementById("chart-area");
    const chartTypeArea = document.getElementById("chart-type");
    const canvas = document.getElementById("chartCanvas");

    chartArea.hidden = false;
    chartTypeArea.hidden = false;

    if (chartInstance) {
        chartInstance.destroy();
    }

    chartInstance = new Chart(canvas, {
        type: type,
        data: {
            labels: labels,
            datasets: [{
                label: "", //type.toUpperCase() + ' GRAPH',
                data: values,
                backgroundColor: [
                    "rgba(54, 162, 235, 0.6)",
                    "rgba(255, 99, 132, 0.6)",
                    "rgba(255, 206, 86, 0.6)",
                    "rgba(75, 192, 192, 0.6)"
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: type === "pie" ? {} : {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

document.querySelectorAll('input[name="chartType"]').forEach(radio => {
    radio.addEventListener("change", () => {
        if (!chartConfig) return;

        chartConfig.type = document.querySelector(
            'input[name="chartType"]:checked'
        ).value;

        renderChartFromInputs();
    });
});


["chart-x-range", "chart-y-range"].forEach(id => {
    document.getElementById(id).addEventListener("input", () => {
        if (chartConfig) renderChartFromInputs();
    });
});

document.getElementById("clear-chart-btn")
    .addEventListener("click", () => {
        chartConfig = null;
        //document.getElementById("chart-x-range").value = "";
        //document.getElementById("chart-y-range").value = "";

        if (chartInstance) {
            chartInstance.destroy();
            chartInstance = null;
        }

        document.getElementById("chart-area").hidden = true;
        document.getElementById("chart-type").hidden = true;
        renderTable();
    });

function parseRangeInput(input) {
    const match = input.match(/^([A-Z]+\d+):([A-Z]+\d+)$/i);
    if (!match) return null;

    return {
        start: cellRefToIndex(match[1].toUpperCase()),
        end: cellRefToIndex(match[2].toUpperCase())
    };
}

function getCellsFromRange(range) {
    const minRow = Math.min(range.start.row, range.end.row);
    const maxRow = Math.max(range.start.row, range.end.row);
    const minCol = Math.min(range.start.col, range.end.col);
    const maxCol = Math.max(range.start.col, range.end.col);

    const cells = [];
    for (let r = minRow; r <= maxRow; r++) {
        for (let c = minCol; c <= maxCol; c++) {
            cells.push({ row: r, col: c });
        }
    }
    return cells;
}
function buildChartData(xRange, yRange) {
    const xCells = getCellsFromRange(xRange);
    const yCells = getCellsFromRange(yRange);

    if (xCells.length !== yCells.length) return null;

    const labels = [];
    const values = [];

    for (let i = 0; i < xCells.length; i++) {
        const x = tableData[xCells[i].row][xCells[i].col].value;
        const y = Number(
            tableData[yCells[i].row][yCells[i].col].value
        );

        if (isNaN(y)) return null;

        labels.push(x);
        values.push(y);
    }

    return { labels, values };
}
function renderChartFromInputs() {
    const xInput = document.getElementById("chart-x-range").value.trim();
    const yInput = document.getElementById("chart-y-range").value.trim();

    const xRange = parseRangeInput(xInput);
    const yRange = parseRangeInput(yInput);

    if (!xRange || !yRange) return;

    const data = buildChartData(xRange, yRange);
    if (!data) return;

    chartConfig = {
        xRange,
        yRange,
        type: document.querySelector('input[name="chartType"]:checked').value
    };

    drawChart(data.labels, data.values, chartConfig.type);
    document.getElementById("chart-area").hidden = false;
    document.getElementById("chart-type").hidden = false;
    document.getElementById("chart-inputs").hidden = false;
    renderTable();
}
document.getElementById("draw-chart-btn")
    .addEventListener("click", renderChartFromInputs);
