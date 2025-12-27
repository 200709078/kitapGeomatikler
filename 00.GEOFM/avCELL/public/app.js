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
let tableData = [];
let isEditing = false;
let editBackupValue = "";
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
            row.push("");
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

            // 🔴 KRİTİK: data binding
            td.dataset.row = r;
            td.dataset.col = c;

            td.textContent = tableData[r][c];
            td.contentEditable = false;
            td.tabIndex = -1;

            if (
                selectedCell &&
                selectedCell.row === r &&
                selectedCell.col === c
            ) {
                td.classList.add("selected");
            }

            td.addEventListener("click", () => {
                // Eğer edit moddaysak → Enter gibi kaydet
                if (isEditing) {
                    exitEditMode(true);
                }
                selectedCell = { row: r, col: c };
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
    const newRow = Array(colCount).fill("");
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
    tableData.forEach(row => row.push(""));
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


function enterEditMode(row, col, initialChar = null) {
    const cell = document.querySelector(
        `td[data-row="${row}"][data-col="${col}"]`
    );

    if (!cell) {
        console.warn("HÜCRE BULUNAMADI");
        return;
    }

    isEditing = true;
    editBackupValue = tableData[row][col];

    cell.contentEditable = "true";
    cell.classList.add("editing");
    cell.focus();

    if (initialChar !== null) {
        cell.textContent = initialChar;
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
        tableData[row][col] = cell.textContent;
    } else {
        cell.textContent = editBackupValue;
    }
    cell.contentEditable = "false";
    cell.classList.remove("editing");
    isEditing = false;
    editBackupValue = "";
    renderTable();
}
document.addEventListener("keydown", (e) => {
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
        return; // edit-mode'da diğer tuşlara karışma
    }

    // SELECTION MODE → Delete / Backspace ile hücreyi temizle
    if (
        (e.key === "Delete" || e.key === "Backspace") &&
        !isEditing
    ) {
        e.preventDefault();

        tableData[row][col] = "";

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
        // Yazı, backspace, enter, tab vs. -> şu anlık engelle
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
        selectedCell = { row: newRow, col: newCol };
        renderTable();
    }
});
// INIT
initData();
renderTable();