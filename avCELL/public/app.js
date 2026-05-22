//arama her zaman formül çubuğunun sağında gözüksün.
const table = document.getElementById("data-table");
const addRowBtn = document.getElementById("add-row-btn");
const removeRowBtn = document.getElementById("remove-row-btn");
const addColBtn = document.getElementById("add-col-btn");
const removeColBtn = document.getElementById("remove-col-btn");
const undoBtn = document.getElementById("undo-btn");
const redoBtn = document.getElementById("redo-btn");
const cellName = document.getElementById("cell-name");
const formulaInput = document.getElementById("formula-input");
const findPanel = document.getElementById("find-panel");
const findInput = document.getElementById("find-input");
const findCount = document.getElementById("find-count");
const findPrevBtn = document.getElementById("find-prev-btn");
const findNextBtn = document.getElementById("find-next-btn");
const findCloseBtn = document.getElementById("find-close-btn");
const fileMenuBtn = document.getElementById("file-menu-btn");
const fileMenu = document.getElementById("file-menu");
const openFileBtn = document.getElementById("open-file-btn");
const openFileInput = document.getElementById("open-file-input");
const saveFileBtn = document.getElementById("save-file-btn");
const saveAsFileBtn = document.getElementById("save-as-file-btn");
const editMenuBtn = document.getElementById("edit-menu-btn");
const editMenu = document.getElementById("edit-menu");
const menuUndoBtn = document.getElementById("menu-undo-btn");
const menuRedoBtn = document.getElementById("menu-redo-btn");
const menuCutBtn = document.getElementById("menu-cut-btn");
const menuCopyBtn = document.getElementById("menu-copy-btn");
const menuPasteBtn = document.getElementById("menu-paste-btn");
const contextMenu = document.getElementById("context-menu");
const borderBtn = document.getElementById("border-btn");
const borderMenu = document.getElementById("border-menu");
const mergeBtn = document.getElementById("merge-btn");
const boldBtn = document.getElementById("bold-btn");
const italicBtn = document.getElementById("italic-btn");
const underlineBtn = document.getElementById("underline-btn");
const fontSizeDecreaseBtn = document.getElementById("font-size-decrease-btn");
const fontSizeIncreaseBtn = document.getElementById("font-size-increase-btn");
const textColorBtn = document.getElementById("text-color-btn");
const fillColorBtn = document.getElementById("fill-color-btn");
const textColorInput = document.getElementById("text-color-input");
const fillColorInput = document.getElementById("fill-color-input");
const alignLeftBtn = document.getElementById("align-left-btn");
const alignCenterBtn = document.getElementById("align-center-btn");
const alignRightBtn = document.getElementById("align-right-btn");
const alignTopBtn = document.getElementById("align-top-btn");
const alignMiddleBtn = document.getElementById("align-middle-btn");
const alignBottomBtn = document.getElementById("align-bottom-btn");
const sheetTabs = document.getElementById("sheet-tabs");
const MIN_ROW_SIZE = 20;
const MIN_COL_SIZE = 10;
const DEFAULT_COL_WIDTH = 84;
const DEFAULT_ROW_HEIGHT = 26;
const MIN_COL_WIDTH = 48;
const MIN_ROW_HEIGHT = 22;
const DEFAULT_FONT_SIZE = 13;
const MIN_FONT_SIZE = 8;
const MAX_FONT_SIZE = 36;
const SAVE_NAME_COUNTER_KEY = "avcell.nextSaveNumber";
const AVC_FILE_TYPE = {
    description: "avCELL dosyası",
    accept: { "application/json": [".avc"] }
};
const SAVE_AS_FILE_TYPES = [
    AVC_FILE_TYPE,
    {
        description: "Excel 97-2003 çalışma kitabı",
        accept: { "application/vnd.ms-excel": [".xls"] }
    },
    {
        description: "Excel çalışma kitabı",
        accept: { "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"] }
    },
    {
        description: "LibreOffice Calc çalışma kitabı",
        accept: { "application/vnd.oasis.opendocument.spreadsheet": [".ods"] }
    },
    {
        description: "PDF dosyası",
        accept: { "application/pdf": [".pdf"] }
    }
];
let rowCount = 100;
let colCount = 26;
let selectedCell = { row: 0, col: 0 };
let selectionRange = null;
let selectionMode = "cell";
let extraSelections = [];
let internalClipboard = null;
let copiedRange = null;
let clipboardMode = null;
let contextMenuTarget = null;
let findResults = [];
let findResultIndex = -1;
let sheets = [];
let activeSheetIndex = 0;
let renamingSheetIndex = null;
let currentWorkbookFileName = null;
let currentWorkbookFileHandle = null;
let tableData = [];
let colWidths = [];
let rowHeights = [];
let isMouseSelecting = false;
let mouseSelectionMoved = false;
let headerSelectionState = null;
let moveSelectionState = null;
let suppressClickAfterMove = false;
let resizeState = null;
let undoStack = [];
let redoStack = [];
let isRestoringHistory = false;
let isEditing = false;
let editBackupValue = "";
let formulaInputBackupValue = "";
let chartInstance = null;
let chartConfig = null; // { xRange, yRange, type }
const CHARTS_ENABLED = false;
const MAX_HISTORY_SIZE = 60;


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
    let label = "";
    let current = index + 1;

    while (current > 0) {
        const remainder = (current - 1) % 26;
        label = String.fromCharCode(65 + remainder) + label;
        current = Math.floor((current - 1) / 26);
    }

    return label;
}

function getCellName(row, col) {
    return `${getColumnLabel(col)}${row + 1}`;
}

function getCellEditValue(row, col) {
    if (!isCellWithinBounds(row, col)) return "";

    const cell = tableData[row][col];
    return cell.formula ?? cell.value;
}

function updateFormulaBar() {
    if (!selectedCell || !cellName || !formulaInput) return;

    const { row, col } = selectedCell;
    const editValue = getCellEditValue(row, col);

    cellName.value = getCellName(row, col);
    setFormulaInputValue(editValue);
}

function updateToolbarState() {
    const isRowSelection = selectionMode === "row" && getSelectedRowIndexes().length > 0;
    const isColumnSelection = selectionMode === "column" && getSelectedColumnIndexes().length > 0;
    const selectedRowCount = getSelectedRowIndexes().length;
    const selectedColCount = getSelectedColumnIndexes().length;
    const canDeleteRows = isRowSelection && rowCount - selectedRowCount >= MIN_ROW_SIZE;
    const canDeleteCols = isColumnSelection && colCount - selectedColCount >= MIN_COL_SIZE;

    addRowBtn.disabled = !isRowSelection;
    removeRowBtn.disabled = !canDeleteRows;
    addColBtn.disabled = !isColumnSelection;
    removeColBtn.disabled = !canDeleteCols;
    addRowBtn.title = isRowSelection ? `Üste ${selectedRowCount} satır ekle` : "Satır seç";
    removeRowBtn.title = isRowSelection ? `${selectedRowCount} satır sil` : "Satır seç";
    addColBtn.title = isColumnSelection ? `Sola ${selectedColCount} sütun ekle` : "Sütun seç";
    removeColBtn.title = isColumnSelection ? `${selectedColCount} sütun sil` : "Sütun seç";
    undoBtn.disabled = undoStack.length === 0;
    redoBtn.disabled = redoStack.length === 0;

    const style = selectedCell ? getCellStyle(tableData[selectedCell.row]?.[selectedCell.col]) : createDefaultCellStyle();
    boldBtn?.classList.toggle("active", Boolean(style.bold));
    italicBtn?.classList.toggle("active", Boolean(style.italic));
    underlineBtn?.classList.toggle("active", Boolean(style.underline));
    alignLeftBtn?.classList.toggle("active", style.horizontalAlign === "left");
    alignCenterBtn?.classList.toggle("active", style.horizontalAlign === "center");
    alignRightBtn?.classList.toggle("active", style.horizontalAlign === "right");
    alignTopBtn?.classList.toggle("active", style.verticalAlign === "top");
    alignMiddleBtn?.classList.toggle("active", style.verticalAlign === "middle");
    alignBottomBtn?.classList.toggle("active", style.verticalAlign === "bottom");
    if (textColorInput) textColorInput.value = normalizeColorValue(style.color, "#202124");
    if (fillColorInput) fillColorInput.value = normalizeColorValue(style.backgroundColor, "#fff2cc");
    updateEditMenuState();
}

function updateEditMenuState() {
    const canUseSelection = Boolean(selectedCell) && !isEditing;
    if (menuUndoBtn) menuUndoBtn.disabled = undoStack.length === 0;
    if (menuRedoBtn) menuRedoBtn.disabled = redoStack.length === 0;
    if (menuCutBtn) menuCutBtn.disabled = !canUseSelection;
    if (menuCopyBtn) menuCopyBtn.disabled = !canUseSelection;
    if (menuPasteBtn) menuPasteBtn.disabled = !canUseSelection || !internalClipboard;
}

function enforceChartVisibility() {
    if (CHARTS_ENABLED) return;

    ["chart-inputs", "chart-type", "chart-area"].forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
            element.hidden = true;
        }
    });
}

function hideContextMenu() {
    if (!contextMenu) return;

    contextMenu.hidden = true;
}

function hideBorderMenu() {
    if (!borderMenu) return;

    borderMenu.hidden = true;
}

function hideFileMenu() {
    if (!fileMenu) return;

    fileMenu.hidden = true;
}

function hideEditMenu() {
    if (!editMenu) return;

    editMenu.hidden = true;
}

function showBorderMenu() {
    if (!borderBtn || !borderMenu) return;

    const buttonRect = borderBtn.getBoundingClientRect();
    borderMenu.hidden = false;
    const menuRect = borderMenu.getBoundingClientRect();
    const left = Math.min(buttonRect.left, window.innerWidth - menuRect.width - 8);
    const top = Math.min(buttonRect.bottom + 4, window.innerHeight - menuRect.height - 8);

    borderMenu.style.left = `${Math.max(8, left)}px`;
    borderMenu.style.top = `${Math.max(8, top)}px`;
}

function clearClipboardState(shouldRender = false, shouldFocus = true) {
    if (!internalClipboard && !copiedRange && !clipboardMode) return false;

    internalClipboard = null;
    copiedRange = null;
    clipboardMode = null;

    if (shouldRender) {
        renderTable();
        if (shouldFocus) {
            focusSelectedCell();
        }
    }

    return true;
}

function updateContextMenuState() {
    if (!contextMenu) return;

    const isRowContext = contextMenuTarget?.type === "row" && selectionMode === "row";
    const isColumnContext = contextMenuTarget?.type === "column" && selectionMode === "column";
    const isSheetContext = contextMenuTarget?.type === "sheet";
    const hasSelection = Boolean(selectedCell);
    const selectedRowCount = getSelectedRowIndexes().length || 1;
    const selectedColCount = getSelectedColumnIndexes().length || 1;
    const rowDeleteCount = Math.min(selectedRowCount, Math.max(0, rowCount - MIN_ROW_SIZE));
    const colDeleteCount = Math.min(selectedColCount, Math.max(0, colCount - MIN_COL_SIZE));
    const stateByAction = {
        cut: hasSelection,
        copy: hasSelection,
        paste: hasSelection && Boolean(internalClipboard),
        "insert-row-above": isRowContext,
        "delete-row": isRowContext && rowDeleteCount > 0,
        "insert-col-left": isColumnContext,
        "delete-col": isColumnContext && colDeleteCount > 0,
        "add-sheet": isSheetContext,
        "duplicate-sheet": isSheetContext,
        "rename-sheet": isSheetContext,
        "delete-sheet": isSheetContext && sheets.length > 1,
        clear: hasSelection && hasClearableContent(),
        note: hasSelection
    };

    contextMenu.querySelectorAll("[data-action]").forEach((button) => {
        const action = button.dataset.action;
        button.disabled = !stateByAction[action];
    });

    setContextMenuLabel("insert-row-above", `Üste ${selectedRowCount} satır ekle`);
    setContextMenuLabel("delete-row", `${selectedRowCount} satır sil`);
    setContextMenuLabel("insert-col-left", `Sola ${selectedColCount} sütun ekle`);
    setContextMenuLabel("delete-col", `${selectedColCount} sütun sil`);
}

function setContextMenuLabel(action, label) {
    const button = contextMenu?.querySelector(`[data-action="${action}"] span`);
    if (button) button.textContent = label;
}

function showContextMenu(e, target = null) {
    if (!contextMenu) return;

    e.preventDefault();
    e.stopPropagation();
    contextMenuTarget = target;
    updateContextMenuState();
    contextMenu.hidden = false;

    const menuRect = contextMenu.getBoundingClientRect();
    const left = Math.min(e.clientX, window.innerWidth - menuRect.width - 8);
    const top = Math.min(e.clientY, window.innerHeight - menuRect.height - 8);

    contextMenu.style.left = `${Math.max(8, left)}px`;
    contextMenu.style.top = `${Math.max(8, top)}px`;
}

function getActiveRange() {
    if (selectionRange) {
        return getNormalizedRange(selectionRange);
    }

    if (!selectedCell) return null;

    return {
        minRow: selectedCell.row,
        maxRow: selectedCell.row,
        minCol: selectedCell.col,
        maxCol: selectedCell.col
    };
}

function getActiveRanges() {
    const ranges = [];
    const primaryRange = getActiveRange();
    if (primaryRange) ranges.push(primaryRange);

    extraSelections.forEach((range) => {
        const normalizedRange = getNormalizedRange(range);
        if (normalizedRange) ranges.push(normalizedRange);
    });

    return ranges;
}

function hasClearableContent() {
    const ranges = getActiveRanges();
    if (!ranges.length) return false;

    for (const range of ranges) {
        for (let r = range.minRow; r <= range.maxRow; r++) {
            for (let c = range.minCol; c <= range.maxCol; c++) {
                const cell = tableData[r]?.[c];
                if (cell && (
                    cell.value ||
                    cell.formula ||
                    hasAnyBorder(cell) ||
                    hasNonDefaultStyle(cell) ||
                    cell.merge ||
                    cell.mergedTo
                )) {
                    return true;
                }
            }
        }
    }

    return false;
}

function setClipboardFromSelection(mode = "copy") {
    const range = getActiveRange();
    if (!range) return false;

    internalClipboard = [];
    for (let r = range.minRow; r <= range.maxRow; r++) {
        const row = [];
        for (let c = range.minCol; c <= range.maxCol; c++) {
            row.push(cloneClipboardCellData(tableData[r][c]));
        }
        internalClipboard.push(row);
    }

    copiedRange = {
        start: { row: range.minRow, col: range.minCol },
        end: { row: range.maxRow, col: range.maxCol }
    };
    clipboardMode = mode;
    renderTable();
    focusSelectedCell();
    return true;
}

function copySelection() {
    return setClipboardFromSelection("copy");
}

function pasteClipboard() {
    if (!internalClipboard || !selectedCell) return false;

    pushHistory();
    const startRow = selectedCell.row;
    const startCol = selectedCell.col;
    const sourceRange = copiedRange ? getNormalizedRange(copiedRange) : null;
    const requiredRows = startRow + internalClipboard.length;
    const requiredCols = startCol + Math.max(...internalClipboard.map((row) => row.length));

    ensureGridSize(requiredRows, requiredCols);

    const targetRange = {
        minRow: startRow,
        maxRow: startRow + internalClipboard.length - 1,
        minCol: startCol,
        maxCol: requiredCols - 1
    };

    for (let r = 0; r < internalClipboard.length; r++) {
        for (let c = 0; c < internalClipboard[r].length; c++) {
            const targetRow = startRow + r;
            const targetCol = startCol + c;

            tableData[targetRow][targetCol] = cloneCellData(internalClipboard[r][c]);
        }
    }

    if (clipboardMode === "cut" && sourceRange) {
        for (let r = sourceRange.minRow; r <= sourceRange.maxRow; r++) {
            for (let c = sourceRange.minCol; c <= sourceRange.maxCol; c++) {
                const isInsideTarget =
                    r >= targetRange.minRow &&
                    r <= targetRange.maxRow &&
                    c >= targetRange.minCol &&
                    c <= targetRange.maxCol;

                if (!isInsideTarget && r < rowCount && c < colCount) {
                    tableData[r][c] = createEmptyCell();
                }
            }
        }
        internalClipboard = null;
        copiedRange = null;
        clipboardMode = null;
    }

    recalculateAll();
    renderTable();
    focusSelectedCell();
    return true;
}

function clearSelection() {
    const ranges = getActiveRanges();
    if (!ranges.length) return false;

    pushHistory();
    ranges.forEach((range) => {
        for (let r = range.minRow; r <= range.maxRow; r++) {
            for (let c = range.minCol; c <= range.maxCol; c++) {
                tableData[r][c] = createEmptyCell();
            }
        }
    });

    recalculateAll();
    clearClipboardState();
    renderTable();
    focusSelectedCell();
    return true;
}

function applyBorderToSelection(action) {
    const ranges = getActiveRanges();
    if (!ranges.length) return false;

    pushHistory();
    ranges.forEach((range) => {
        for (let r = range.minRow; r <= range.maxRow; r++) {
            for (let c = range.minCol; c <= range.maxCol; c++) {
                const borders = action === "all"
                    ? createEmptyBorders()
                    : getCellBorders(tableData[r][c]);

                if (action === "clear") {
                    tableData[r][c].borders = createEmptyBorders();
                    continue;
                }

                if (action === "all") {
                    borders.top = true;
                    borders.left = true;
                    if (r === range.maxRow) borders.bottom = true;
                    if (c === range.maxCol) borders.right = true;
                }

                if (action === "outer") {
                    if (r === range.minRow) borders.top = true;
                    if (r === range.maxRow) borders.bottom = true;
                    if (c === range.minCol) borders.left = true;
                    if (c === range.maxCol) borders.right = true;
                }

                if (action === "inner") {
                    if (r < range.maxRow) borders.bottom = true;
                    if (c < range.maxCol) borders.right = true;
                }

                if (action === "top" && r === range.minRow) borders.top = true;
                if (action === "bottom" && r === range.maxRow) borders.bottom = true;
                if (action === "left" && c === range.minCol) borders.left = true;
                if (action === "right" && c === range.maxCol) borders.right = true;

                tableData[r][c].borders = borders;
            }
        }
    });

    renderTable();
    focusSelectedCell();
    return true;
}

function applyStyleToSelection(updater, options = {}) {
    const ranges = getActiveRanges();
    if (!ranges.length) return false;

    pushHistory();
    ranges.forEach((range) => {
        for (let r = range.minRow; r <= range.maxRow; r++) {
            for (let c = range.minCol; c <= range.maxCol; c++) {
                const cell = tableData[r]?.[c];
                if (!cell) continue;

                const style = getCellStyle(cell);
                updater(style, cell);
                cell.style = style;
            }
        }
    });

    if (options.autoFit) {
        ranges.forEach(fitRangeToContent);
    }

    renderTable();
    focusSelectedCell();
    return true;
}

function toggleStyleProperty(property) {
    if (!selectedCell) return false;

    const currentStyle = getCellStyle(tableData[selectedCell.row]?.[selectedCell.col]);
    const nextValue = !currentStyle[property];
    return applyStyleToSelection((style) => {
        style[property] = nextValue;
    });
}

function changeFontSize(delta) {
    return applyStyleToSelection((style) => {
        const currentSize = Number(style.fontSize) || DEFAULT_FONT_SIZE;
        style.fontSize = Math.max(MIN_FONT_SIZE, Math.min(MAX_FONT_SIZE, currentSize + delta));
    }, { autoFit: true });
}

function setTextColor(color) {
    return applyStyleToSelection((style) => {
        style.color = normalizeColorValue(color, "#202124");
    });
}

function setFillColor(color) {
    return applyStyleToSelection((style) => {
        style.backgroundColor = normalizeColorValue(color, "#fff2cc");
    });
}

function setHorizontalAlignment(value) {
    return applyStyleToSelection((style) => {
        style.horizontalAlign = value;
    });
}

function setVerticalAlignment(value) {
    return applyStyleToSelection((style) => {
        style.verticalAlign = value;
    });
}

function rangesIntersect(a, b) {
    return !(
        a.maxRow < b.minRow ||
        a.minRow > b.maxRow ||
        a.maxCol < b.minCol ||
        a.minCol > b.maxCol
    );
}

function getMergeRange(row, col) {
    const cell = tableData[row]?.[col];
    if (!cell) return null;

    if (cell.merge) {
        return {
            minRow: row,
            maxRow: row + cell.merge.rowspan - 1,
            minCol: col,
            maxCol: col + cell.merge.colspan - 1
        };
    }

    if (cell.mergedTo) {
        return getMergeRange(cell.mergedTo.row, cell.mergedTo.col);
    }

    return null;
}

function clearMergeAt(row, col) {
    const cell = tableData[row]?.[col];
    if (!cell?.merge) return;

    const { rowspan, colspan } = cell.merge;
    for (let r = row; r < row + rowspan; r++) {
        for (let c = col; c < col + colspan; c++) {
            if (!tableData[r]?.[c]) continue;
            tableData[r][c].mergedTo = null;
        }
    }

    cell.merge = null;
}

function clearMergesIntersectingRange(range) {
    const parents = [];

    for (let r = 0; r < rowCount; r++) {
        for (let c = 0; c < colCount; c++) {
            const mergeRange = getMergeRange(r, c);
            const isParent = tableData[r][c].merge;

            if (isParent && mergeRange && rangesIntersect(range, mergeRange)) {
                parents.push({ row: r, col: c });
            }
        }
    }

    parents.forEach(({ row, col }) => clearMergeAt(row, col));
}

function toggleMergeSelection() {
    const range = getActiveRange();
    if (!range) return false;

    const isSingleCell =
        range.minRow === range.maxRow &&
        range.minCol === range.maxCol;
    const existingMerge = isSingleCell
        ? getMergeRange(range.minRow, range.minCol)
        : null;

    if (existingMerge) {
        pushHistory();
        clearMergeAt(existingMerge.minRow, existingMerge.minCol);
        renderTable();
        focusSelectedCell();
        return true;
    }

    if (isSingleCell) return false;

    pushHistory();
    clearMergesIntersectingRange(range);

    const parent = tableData[range.minRow][range.minCol];
    parent.merge = {
        rowspan: range.maxRow - range.minRow + 1,
        colspan: range.maxCol - range.minCol + 1
    };
    parent.mergedTo = null;

    for (let r = range.minRow; r <= range.maxRow; r++) {
        for (let c = range.minCol; c <= range.maxCol; c++) {
            if (r === range.minRow && c === range.minCol) continue;

            tableData[r][c].value = "";
            tableData[r][c].formula = null;
            tableData[r][c].borders = createEmptyBorders();
            tableData[r][c].merge = null;
            tableData[r][c].mergedTo = {
                row: range.minRow,
                col: range.minCol
            };
        }
    }

    selectedCell = { row: range.minRow, col: range.minCol };
    selectionRange = null;
    selectionMode = "cell";
    extraSelections = [];
    clearClipboardState();
    renderTable();
    focusSelectedCell();
    return true;
}

function cutSelection() {
    return setClipboardFromSelection("cut");
}

function addNoteToSelection() {
    if (!selectedCell) return false;

    alert("Not ekleme daha sonra bağlanacak.");
    return true;
}

function handleContextMenuAction(action) {
    if (action === "cut") cutSelection();
    if (action === "copy") copySelection();
    if (action === "paste") pasteClipboard();
    if (action === "insert-row-above" && contextMenuTarget?.type === "row") insertRowsAboveSelection();
    if (action === "delete-row" && contextMenuTarget?.type === "row") deleteSelectedRows();
    if (action === "insert-col-left" && contextMenuTarget?.type === "column") insertColsLeftOfSelection();
    if (action === "delete-col" && contextMenuTarget?.type === "column") deleteSelectedColumns();
    if (action === "add-sheet") addSheet();
    if (action === "duplicate-sheet") duplicateSheet();
    if (action === "rename-sheet") renameActiveSheet();
    if (action === "delete-sheet") deleteActiveSheet();
    if (action === "clear") clearSelection();
    if (action === "note") addNoteToSelection();
}

function selectCell(row, col) {
    if (!isCellWithinBounds(row, col)) return false;

    selectedCell = { row, col };
    selectionRange = null;
    selectionMode = "cell";
    extraSelections = [];
    renderTable();
    focusSelectedCell();
    return true;
}

function isColumnHeaderActive(col) {
    if (!selectedCell) return false;
    if (selectionMode === "all") return true;
    if (selectionMode === "column") {
        return isColumnInColumnSelection(col);
    }
    if (selectionMode === "cell" || selectionMode === "range") return selectedCell.col === col;
    return false;
}

function isRowHeaderActive(row) {
    if (!selectedCell) return false;
    if (selectionMode === "all") return true;
    if (selectionMode === "row") {
        return isRowInRowSelection(row);
    }
    if (selectionMode === "cell" || selectionMode === "range") return selectedCell.row === row;
    return false;
}

function isColumnInColumnSelection(col) {
    if (selectionMode !== "column") return false;

    const ranges = [selectionRange, ...extraSelections].filter(Boolean);
    return ranges.some((range) => {
        const normalizedRange = getNormalizedRange(range);
        return normalizedRange && col >= normalizedRange.minCol && col <= normalizedRange.maxCol;
    });
}

function isRowInRowSelection(row) {
    if (selectionMode !== "row") return false;

    const ranges = [selectionRange, ...extraSelections].filter(Boolean);
    return ranges.some((range) => {
        const normalizedRange = getNormalizedRange(range);
        return normalizedRange && row >= normalizedRange.minRow && row <= normalizedRange.maxRow;
    });
}

function getSelectedColumnIndexes() {
    if (selectionMode !== "column") return [];

    const columns = new Set();
    [selectionRange, ...extraSelections].filter(Boolean).forEach((range) => {
        const normalizedRange = getNormalizedRange(range);
        if (!normalizedRange) return;

        for (let col = normalizedRange.minCol; col <= normalizedRange.maxCol; col++) {
            if (col >= 0 && col < colCount) columns.add(col);
        }
    });

    return [...columns].sort((a, b) => a - b);
}

function getSelectedRowIndexes() {
    if (selectionMode !== "row") return [];

    const rows = new Set();
    [selectionRange, ...extraSelections].filter(Boolean).forEach((range) => {
        const normalizedRange = getNormalizedRange(range);
        if (!normalizedRange) return;

        for (let row = normalizedRange.minRow; row <= normalizedRange.maxRow; row++) {
            if (row >= 0 && row < rowCount) rows.add(row);
        }
    });

    return [...rows].sort((a, b) => a - b);
}

function createColumnSelectionRange(col) {
    return {
        start: { row: 0, col },
        end: { row: rowCount - 1, col }
    };
}

function createRowSelectionRange(row) {
    return {
        start: { row, col: 0 },
        end: { row, col: colCount - 1 }
    };
}

function toggleExtraColumnSelection(col) {
    const existsAt = extraSelections.findIndex((range) => {
        const normalizedRange = getNormalizedRange(range);
        return normalizedRange?.minCol === col && normalizedRange?.maxCol === col;
    });

    if (existsAt >= 0) {
        extraSelections.splice(existsAt, 1);
    } else {
        extraSelections.push(createColumnSelectionRange(col));
    }
}

function toggleExtraRowSelection(row) {
    const existsAt = extraSelections.findIndex((range) => {
        const normalizedRange = getNormalizedRange(range);
        return normalizedRange?.minRow === row && normalizedRange?.maxRow === row;
    });

    if (existsAt >= 0) {
        extraSelections.splice(existsAt, 1);
    } else {
        extraSelections.push(createRowSelectionRange(row));
    }
}

function startHeaderSelection(type, index) {
    headerSelectionState = {
        type,
        start: index,
        moved: false
    };

    if (type === "column") {
        selectedCell = { row: 0, col: index };
        selectionMode = "column";
        selectionRange = createColumnSelectionRange(index);
    } else {
        selectedCell = { row: index, col: 0 };
        selectionMode = "row";
        selectionRange = createRowSelectionRange(index);
    }

    extraSelections = [];
    renderTable();
    focusSelectedCell();
}

function updateHeaderSelection(type, index) {
    if (!headerSelectionState || headerSelectionState.type !== type) return;
    if (headerSelectionState.start === index && !headerSelectionState.moved) return;

    headerSelectionState.moved = true;
    extraSelections = [];

    if (type === "column") {
        selectionMode = "column";
        selectionRange = {
            start: { row: 0, col: headerSelectionState.start },
            end: { row: rowCount - 1, col: index }
        };
    } else {
        selectionMode = "row";
        selectionRange = {
            start: { row: headerSelectionState.start, col: 0 },
            end: { row: index, col: colCount - 1 }
        };
    }

    renderTable();
    focusSelectedCell();
}

function startMoveSelection(type, startIndex) {
    moveSelectionState = {
        type,
        startIndex,
        targetIndex: startIndex,
        moved: false
    };
}

function updateMoveSelection(type, targetIndex) {
    if (!moveSelectionState || moveSelectionState.type !== type) return;

    moveSelectionState.targetIndex = targetIndex;
    moveSelectionState.moved = moveSelectionState.startIndex !== targetIndex;
    renderTable();
    focusSelectedCell();
}

function startCellMove(row, col) {
    const range = getActiveRange();
    if (!range) return false;

    moveSelectionState = {
        type: "cell",
        startIndex: { row, col },
        targetIndex: { row: range.minRow, col: range.minCol },
        sourceRange: { ...range },
        moved: false
    };
    return true;
}

function isNearSelectionEdge(e, cell, row, col) {
    const edgeSize = 6;
    const rect = cell.getBoundingClientRect();
    const visualRange = getVisualCellRange(row, col);
    const ranges = getActiveRanges();

    return ranges.some((range) => {
        if (!rangesIntersect(visualRange, range)) return false;

        const isTopEdge = visualRange.minRow <= range.minRow && e.clientY - rect.top <= edgeSize;
        const isBottomEdge = visualRange.maxRow >= range.maxRow && rect.bottom - e.clientY <= edgeSize;
        const isLeftEdge = visualRange.minCol <= range.minCol && e.clientX - rect.left <= edgeSize;
        const isRightEdge = visualRange.maxCol >= range.maxCol && rect.right - e.clientX <= edgeSize;

        return isTopEdge || isBottomEdge || isLeftEdge || isRightEdge;
    });
}

function updateCellMoveTarget(row, col) {
    if (!moveSelectionState || moveSelectionState.type !== "cell") return;

    moveSelectionState.targetIndex = { row, col };
    moveSelectionState.moved =
        row !== moveSelectionState.sourceRange.minRow ||
        col !== moveSelectionState.sourceRange.minCol;
    renderTable();
    focusSelectedCell();
}

function getCellMoveTargetRange() {
    if (!moveSelectionState || moveSelectionState.type !== "cell") return null;

    const { sourceRange, targetIndex } = moveSelectionState;
    const rowOffset = targetIndex.row - sourceRange.minRow;
    const colOffset = targetIndex.col - sourceRange.minCol;

    return {
        minRow: sourceRange.minRow + rowOffset,
        maxRow: sourceRange.maxRow + rowOffset,
        minCol: sourceRange.minCol + colOffset,
        maxCol: sourceRange.maxCol + colOffset
    };
}

function selectColumn(col, event = {}) {
    if (!isCellWithinBounds(0, col)) return;

    if (event.shiftKey && selectedCell && selectionMode === "column") {
        selectionMode = "column";
        extraSelections = [];
        selectionRange = {
            start: { row: 0, col: selectedCell.col },
            end: { row: rowCount - 1, col }
        };
        renderTable();
        focusSelectedCell();
        return;
    }

    if ((event.ctrlKey || event.metaKey) && selectedCell && selectionMode === "column") {
        toggleExtraColumnSelection(col);
        renderTable();
        focusSelectedCell();
        return;
    }

    selectedCell = { row: 0, col };
    selectionMode = "column";
    extraSelections = [];
    selectionRange = createColumnSelectionRange(col);
    renderTable();
    focusSelectedCell();
}

function selectRow(row, event = {}) {
    if (!isCellWithinBounds(row, 0)) return;

    if (event.shiftKey && selectedCell && selectionMode === "row") {
        selectionMode = "row";
        extraSelections = [];
        selectionRange = {
            start: { row: selectedCell.row, col: 0 },
            end: { row, col: colCount - 1 }
        };
        renderTable();
        focusSelectedCell();
        return;
    }

    if ((event.ctrlKey || event.metaKey) && selectedCell && selectionMode === "row") {
        toggleExtraRowSelection(row);
        renderTable();
        focusSelectedCell();
        return;
    }

    selectedCell = { row, col: 0 };
    selectionMode = "row";
    extraSelections = [];
    selectionRange = createRowSelectionRange(row);
    renderTable();
    focusSelectedCell();
}

function selectAllCells() {
    selectedCell = { row: 0, col: 0 };
    selectionMode = "all";
    extraSelections = [];
    selectionRange = {
        start: { row: 0, col: 0 },
        end: { row: rowCount - 1, col: colCount - 1 }
    };
    renderTable();
    focusSelectedCell();
}

function focusSelectedCell(shouldScroll = false) {
    if (!selectedCell) return;

    const cell = document.querySelector(
        `td[data-row="${selectedCell.row}"][data-col="${selectedCell.col}"]`
    );

    if (!cell) return;

    cell.focus({ preventScroll: !shouldScroll });

    if (shouldScroll) {
        cell.scrollIntoView({
            block: "nearest",
            inline: "nearest"
        });
    }
}

function getNormalizedRange(range) {
    if (!range) return null;

    return expandRangeForMerges({
        minRow: Math.min(range.start.row, range.end.row),
        maxRow: Math.max(range.start.row, range.end.row),
        minCol: Math.min(range.start.col, range.end.col),
        maxCol: Math.max(range.start.col, range.end.col)
    });
}

function expandRangeForMerges(range) {
    if (!range) return null;

    let expandedRange = { ...range };
    let didExpand = true;

    while (didExpand) {
        didExpand = false;

        for (let r = 0; r < rowCount; r++) {
            for (let c = 0; c < colCount; c++) {
                const cell = tableData[r]?.[c];
                if (!cell?.merge) continue;

                const mergeRange = getMergeRange(r, c);
                if (!mergeRange || !rangesIntersect(expandedRange, mergeRange)) continue;

                const nextRange = {
                    minRow: Math.min(expandedRange.minRow, mergeRange.minRow),
                    maxRow: Math.max(expandedRange.maxRow, mergeRange.maxRow),
                    minCol: Math.min(expandedRange.minCol, mergeRange.minCol),
                    maxCol: Math.max(expandedRange.maxCol, mergeRange.maxCol)
                };

                if (
                    nextRange.minRow !== expandedRange.minRow ||
                    nextRange.maxRow !== expandedRange.maxRow ||
                    nextRange.minCol !== expandedRange.minCol ||
                    nextRange.maxCol !== expandedRange.maxCol
                ) {
                    expandedRange = nextRange;
                    didExpand = true;
                }
            }
        }
    }

    return expandedRange;
}

function getVisualCellRange(row, col) {
    return getMergeRange(row, col) ?? {
        minRow: row,
        maxRow: row,
        minCol: col,
        maxCol: col
    };
}

function isCellInNormalizedRange(row, col, range) {
    if (!range) return false;

    return rangesIntersect(getVisualCellRange(row, col), range);
}

function isCellInCurrentSelection(row, col) {
    if (selectionRange && isCellInNormalizedRange(row, col, getNormalizedRange(selectionRange))) {
        return true;
    }

    if (extraSelections.some((range) =>
        isCellInNormalizedRange(row, col, getNormalizedRange(range))
    )) {
        return true;
    }

    return (
        selectedCell &&
        selectionMode === "cell" &&
        selectedCell.row === row &&
        selectedCell.col === col
    );
}

function addRangeBoundaryClasses(cell, row, col, range, prefix) {
    if (!isCellInNormalizedRange(row, col, range)) return;

    const visualRange = getVisualCellRange(row, col);

    cell.classList.add(`${prefix}-range`);
    if (visualRange.minRow <= range.minRow) cell.classList.add(`${prefix}-top`);
    if (visualRange.maxRow >= range.maxRow) cell.classList.add(`${prefix}-bottom`);
    if (visualRange.minCol <= range.minCol) cell.classList.add(`${prefix}-left`);
    if (visualRange.maxCol >= range.maxCol) cell.classList.add(`${prefix}-right`);
}

function addExtraCellSelection(row, col) {
    const existsAt = extraSelections.findIndex((range) => (
        range.start.row === row &&
        range.end.row === row &&
        range.start.col === col &&
        range.end.col === col
    ));

    if (existsAt >= 0) {
        extraSelections.splice(existsAt, 1);
    } else {
        extraSelections.push({
            start: { row, col },
            end: { row, col }
        });
    }
}

function cloneCellData(cell) {
    return {
        value: cell.value,
        formula: cell.formula,
        borders: { ...getCellBorders(cell) },
        style: { ...getCellStyle(cell) },
        merge: cell.merge ? { ...cell.merge } : null,
        mergedTo: cell.mergedTo ? { ...cell.mergedTo } : null
    };
}

function cloneClipboardCellData(cell) {
    return {
        value: cell.value,
        formula: cell.formula,
        borders: { ...getCellBorders(cell) },
        style: { ...getCellStyle(cell) },
        merge: null,
        mergedTo: null
    };
}

function createEmptyBorders() {
    return {
        top: false,
        right: false,
        bottom: false,
        left: false
    };
}

function getCellBorders(cell) {
    return {
        ...createEmptyBorders(),
        ...(cell?.borders ?? {})
    };
}

function hasAnyBorder(cell) {
    const borders = getCellBorders(cell);
    return borders.top || borders.right || borders.bottom || borders.left;
}

function createDefaultCellStyle() {
    return {
        bold: false,
        italic: false,
        underline: false,
        fontSize: DEFAULT_FONT_SIZE,
        color: "#202124",
        backgroundColor: "",
        horizontalAlign: "left",
        verticalAlign: "middle"
    };
}

function getCellStyle(cell) {
    return {
        ...createDefaultCellStyle(),
        ...(cell?.style ?? {})
    };
}

function hasNonDefaultStyle(cell) {
    const style = getCellStyle(cell);
    const defaults = createDefaultCellStyle();

    return (
        style.bold !== defaults.bold ||
        style.italic !== defaults.italic ||
        style.underline !== defaults.underline ||
        (Number(style.fontSize) || DEFAULT_FONT_SIZE) !== defaults.fontSize ||
        style.color !== defaults.color ||
        style.backgroundColor !== defaults.backgroundColor ||
        style.horizontalAlign !== defaults.horizontalAlign ||
        style.verticalAlign !== defaults.verticalAlign
    );
}

function normalizeColorValue(value, fallback) {
    return /^#[0-9a-f]{6}$/i.test(value ?? "") ? value : fallback;
}

function createEmptyCell() {
    return {
        value: "",
        formula: null,
        borders: createEmptyBorders(),
        style: createDefaultCellStyle(),
        merge: null,
        mergedTo: null
    };
}

function ensureGridSize(requiredRows, requiredCols) {
    while (rowCount < requiredRows) {
        rowCount++;
        rowHeights.push(DEFAULT_ROW_HEIGHT);
        tableData.push(Array.from({ length: colCount }, createEmptyCell));
    }

    while (colCount < requiredCols) {
        colCount++;
        colWidths.push(DEFAULT_COL_WIDTH);
        tableData.forEach((row) => {
            row.push(createEmptyCell());
        });
    }
}

function insertRowAt(index) {
    insertRowsAt(index, 1);
}

function insertRowsAt(index, count) {
    if (count <= 0) return;

    pushHistory();
    const targetIndex = Math.max(0, Math.min(index, rowCount));
    rowCount += count;
    rowHeights.splice(targetIndex, 0, ...Array.from({ length: count }, () => DEFAULT_ROW_HEIGHT));
    tableData.splice(
        targetIndex,
        0,
        ...Array.from({ length: count }, () => Array.from({ length: colCount }, createEmptyCell))
    );
    selectedCell = { row: targetIndex, col: selectedCell?.col ?? 0 };
    selectionRange = null;
    selectionMode = "cell";
    extraSelections = [];
    copiedRange = null;
    internalClipboard = null;
    clipboardMode = null;
    normalizeSelectedCell();
    renderTable();
    focusSelectedCell();
}

function insertColAt(index) {
    insertColsAt(index, 1);
}

function insertColsAt(index, count) {
    if (count <= 0) return;

    pushHistory();
    const targetIndex = Math.max(0, Math.min(index, colCount));
    colCount += count;
    colWidths.splice(targetIndex, 0, ...Array.from({ length: count }, () => DEFAULT_COL_WIDTH));
    tableData.forEach((row) => {
        row.splice(targetIndex, 0, ...Array.from({ length: count }, createEmptyCell));
    });
    selectedCell = { row: selectedCell?.row ?? 0, col: targetIndex };
    selectionRange = null;
    selectionMode = "cell";
    extraSelections = [];
    copiedRange = null;
    internalClipboard = null;
    clipboardMode = null;
    normalizeSelectedCell();
    renderTable();
    focusSelectedCell();
}

function deleteRowAt(index) {
    deleteRowsAt([index]);
}

function deleteRowsAt(indexes) {
    const uniqueIndexes = [...new Set(indexes)]
        .filter((index) => index >= 0 && index < rowCount)
        .sort((a, b) => b - a);
    const deleteCount = Math.min(uniqueIndexes.length, Math.max(0, rowCount - MIN_ROW_SIZE));
    if (deleteCount <= 0) return;

    const indexesToDelete = uniqueIndexes.slice(0, deleteCount);
    pushHistory();
    indexesToDelete.forEach((targetIndex) => {
        tableData.splice(targetIndex, 1);
        rowHeights.splice(targetIndex, 1);
    });
    rowCount -= indexesToDelete.length;
    const topDeletedIndex = Math.min(...indexesToDelete);
    selectedCell = {
        row: Math.min(topDeletedIndex, rowCount - 1),
        col: selectedCell?.col ?? 0
    };
    selectionRange = null;
    selectionMode = "cell";
    extraSelections = [];
    copiedRange = null;
    internalClipboard = null;
    clipboardMode = null;
    recalculateAll();
    normalizeSelectedCell();
    renderTable();
    focusSelectedCell();
}

function deleteColAt(index) {
    deleteColsAt([index]);
}

function deleteColsAt(indexes) {
    const uniqueIndexes = [...new Set(indexes)]
        .filter((index) => index >= 0 && index < colCount)
        .sort((a, b) => b - a);
    const deleteCount = Math.min(uniqueIndexes.length, Math.max(0, colCount - MIN_COL_SIZE));
    if (deleteCount <= 0) return;

    const indexesToDelete = uniqueIndexes.slice(0, deleteCount);
    pushHistory();
    indexesToDelete.forEach((targetIndex) => {
        colWidths.splice(targetIndex, 1);
        tableData.forEach((row) => {
            row.splice(targetIndex, 1);
        });
    });
    colCount -= indexesToDelete.length;
    const leftDeletedIndex = Math.min(...indexesToDelete);
    selectedCell = {
        row: selectedCell?.row ?? 0,
        col: Math.min(leftDeletedIndex, colCount - 1)
    };
    selectionRange = null;
    selectionMode = "cell";
    extraSelections = [];
    copiedRange = null;
    internalClipboard = null;
    clipboardMode = null;
    recalculateAll();
    normalizeSelectedCell();
    renderTable();
    focusSelectedCell();
}

function insertRowsAboveSelection() {
    const rows = getSelectedRowIndexes();
    const count = rows.length || 1;
    const targetIndex = rows.length ? Math.min(...rows) : contextMenuTarget?.row ?? selectedCell?.row ?? 0;
    insertRowsAt(targetIndex, count);
}

function insertColsLeftOfSelection() {
    const cols = getSelectedColumnIndexes();
    const count = cols.length || 1;
    const targetIndex = cols.length ? Math.min(...cols) : contextMenuTarget?.col ?? selectedCell?.col ?? 0;
    insertColsAt(targetIndex, count);
}

function deleteSelectedRows() {
    const rows = getSelectedRowIndexes();
    deleteRowsAt(rows.length ? rows : [contextMenuTarget?.row ?? selectedCell?.row ?? 0]);
}

function deleteSelectedColumns() {
    const cols = getSelectedColumnIndexes();
    deleteColsAt(cols.length ? cols : [contextMenuTarget?.col ?? selectedCell?.col ?? 0]);
}

function getCellSearchText(row, col) {
    const cell = tableData[row]?.[col];
    if (!cell) return "";

    return `${cell.formula ?? ""}\n${cell.value ?? ""}`;
}

function updateFindCount() {
    if (!findCount) return;

    findCount.textContent = findResults.length
        ? `${findResultIndex + 1}/${findResults.length}`
        : "0/0";
}

function runFindQuery(query, preferredStart = selectedCell) {
    findResults = [];
    findResultIndex = -1;
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
        updateFindCount();
        return;
    }

    for (let r = 0; r < rowCount; r++) {
        for (let c = 0; c < colCount; c++) {
            if (getCellSearchText(r, c).toLowerCase().includes(normalizedQuery)) {
                findResults.push({ row: r, col: c });
            }
        }
    }

    if (findResults.length) {
        const startRow = preferredStart?.row ?? 0;
        const startCol = preferredStart?.col ?? 0;
        const nextIndex = findResults.findIndex((result) => (
            result.row > startRow ||
            (result.row === startRow && result.col >= startCol)
        ));
        findResultIndex = nextIndex >= 0 ? nextIndex : 0;
    }

    updateFindCount();
}

function goToFindResult(index) {
    if (!findResults.length) {
        updateFindCount();
        return false;
    }

    findResultIndex = (index + findResults.length) % findResults.length;
    const result = findResults[findResultIndex];
    selectCell(result.row, result.col);
    focusSelectedCell(true);
    updateFindCount();
    findInput?.focus();
    findInput?.select();
    return true;
}

function findNext(step = 1) {
    if (!findInput) return false;

    if (!findResults.length) {
        runFindQuery(findInput.value);
    }

    return goToFindResult(findResultIndex + step);
}

function openFindPanel() {
    if (!findPanel || !findInput) return;

    if (isEditing) {
        exitEditMode(true);
    }

    findPanel.hidden = false;
    runFindQuery(findInput.value);
    findInput.focus();
    findInput.select();
}

function closeFindPanel() {
    if (!findPanel) return;

    findPanel.hidden = true;
    findResults = [];
    findResultIndex = -1;
    updateFindCount();
    focusSelectedCell();
}

function moveSelectedCellsTo(targetRow, targetCol) {
    const ranges = getActiveRanges();
    const sourceRange = getActiveRange();
    if (!ranges.length || !sourceRange) return false;

    const rowOffset = targetRow - sourceRange.minRow;
    const colOffset = targetCol - sourceRange.minCol;
    if (rowOffset === 0 && colOffset === 0) return false;

    const sourceCells = [];
    const seen = new Set();
    ranges.forEach((range) => {
        for (let r = range.minRow; r <= range.maxRow; r++) {
            for (let c = range.minCol; c <= range.maxCol; c++) {
                const key = `${r}:${c}`;
                if (seen.has(key)) continue;
                seen.add(key);
                sourceCells.push({
                    row: r,
                    col: c,
                    targetRow: r + rowOffset,
                    targetCol: c + colOffset,
                    cell: cloneCellData(tableData[r][c])
                });
            }
        }
    });

    const requiredRows = Math.max(...sourceCells.map((item) => item.targetRow)) + 1;
    const requiredCols = Math.max(...sourceCells.map((item) => item.targetCol)) + 1;
    if (Math.min(...sourceCells.map((item) => item.targetRow)) < 0) return false;
    if (Math.min(...sourceCells.map((item) => item.targetCol)) < 0) return false;

    pushHistory();
    ensureGridSize(requiredRows, requiredCols);

    sourceCells.forEach(({ row, col }) => {
        tableData[row][col] = createEmptyCell();
    });

    sourceCells.forEach(({ targetRow: row, targetCol: col, cell }) => {
        if (cell.mergedTo) {
            cell.mergedTo = {
                row: cell.mergedTo.row + rowOffset,
                col: cell.mergedTo.col + colOffset
            };
        }
        tableData[row][col] = cell;
    });

    selectedCell = { row: sourceRange.minRow + rowOffset, col: sourceRange.minCol + colOffset };
    selectionRange = {
        start: { row: sourceRange.minRow + rowOffset, col: sourceRange.minCol + colOffset },
        end: { row: sourceRange.maxRow + rowOffset, col: sourceRange.maxCol + colOffset }
    };
    selectionMode = "range";
    extraSelections = extraSelections.map((range) => ({
        start: { row: range.start.row + rowOffset, col: range.start.col + colOffset },
        end: { row: range.end.row + rowOffset, col: range.end.col + colOffset }
    }));
    clearClipboardState();
    recalculateAll();
    renderTable();
    focusSelectedCell();
    return true;
}

function moveSelectedRowsTo(targetIndex) {
    const selectedRows = getSelectedRowIndexes();
    if (!selectedRows.length || selectedRows.includes(targetIndex)) return false;

    const rowsAscending = [...selectedRows].sort((a, b) => a - b);
    const rowsDescending = [...selectedRows].sort((a, b) => b - a);
    const movedRows = rowsAscending.map((row) => cloneTableData([tableData[row]])[0]);
    const movedHeights = rowsAscending.map((row) => rowHeights[row]);
    let insertionIndex = Math.max(0, Math.min(targetIndex, rowCount));
    insertionIndex -= rowsAscending.filter((row) => row < insertionIndex).length;

    pushHistory();
    rowsDescending.forEach((row) => {
        tableData.splice(row, 1);
        rowHeights.splice(row, 1);
    });
    tableData.splice(insertionIndex, 0, ...movedRows);
    rowHeights.splice(insertionIndex, 0, ...movedHeights);

    selectedCell = { row: insertionIndex, col: 0 };
    selectionMode = "row";
    extraSelections = [];
    selectionRange = {
        start: { row: insertionIndex, col: 0 },
        end: { row: insertionIndex + movedRows.length - 1, col: colCount - 1 }
    };
    clearClipboardState();
    recalculateAll();
    renderTable();
    focusSelectedCell();
    return true;
}

function moveSelectedColumnsTo(targetIndex) {
    const selectedCols = getSelectedColumnIndexes();
    if (!selectedCols.length || selectedCols.includes(targetIndex)) return false;

    const colsAscending = [...selectedCols].sort((a, b) => a - b);
    const colsDescending = [...selectedCols].sort((a, b) => b - a);
    const movedWidths = colsAscending.map((col) => colWidths[col]);
    const movedCellsByRow = tableData.map((row) => colsAscending.map((col) => cloneCellData(row[col])));
    let insertionIndex = Math.max(0, Math.min(targetIndex, colCount));
    insertionIndex -= colsAscending.filter((col) => col < insertionIndex).length;

    pushHistory();
    colsDescending.forEach((col) => {
        colWidths.splice(col, 1);
        tableData.forEach((row) => row.splice(col, 1));
    });
    colWidths.splice(insertionIndex, 0, ...movedWidths);
    tableData.forEach((row, rowIndex) => {
        row.splice(insertionIndex, 0, ...movedCellsByRow[rowIndex]);
    });

    selectedCell = { row: 0, col: insertionIndex };
    selectionMode = "column";
    extraSelections = [];
    selectionRange = {
        start: { row: 0, col: insertionIndex },
        end: { row: rowCount - 1, col: insertionIndex + movedWidths.length - 1 }
    };
    clearClipboardState();
    recalculateAll();
    renderTable();
    focusSelectedCell();
    return true;
}

function finishMoveSelection() {
    if (!moveSelectionState) return;

    const state = moveSelectionState;
    moveSelectionState = null;
    if (!state.moved) return;

    suppressClickAfterMove = true;
    if (state.type === "cell") {
        moveSelectedCellsTo(state.targetIndex.row, state.targetIndex.col);
    }
    if (state.type === "row") {
        moveSelectedRowsTo(state.targetIndex);
    }
    if (state.type === "column") {
        moveSelectedColumnsTo(state.targetIndex);
    }
}

function cloneRange(range) {
    if (!range) return null;

    return {
        start: { ...range.start },
        end: { ...range.end }
    };
}

function cloneTableData(data) {
    return data.map((row) => row.map(cloneCellData));
}

function createBlankTableData(rows, cols) {
    return Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => createEmptyCell())
    );
}

function createSheetState(name) {
    return {
        name,
        rowCount,
        colCount,
        selectedCell: selectedCell ? { ...selectedCell } : { row: 0, col: 0 },
        selectionRange: cloneRange(selectionRange),
        selectionMode,
        tableData: cloneTableData(tableData),
        colWidths: [...colWidths],
        rowHeights: [...rowHeights]
    };
}

function createBlankSheetState(name) {
    return {
        name,
        rowCount: 100,
        colCount: 26,
        selectedCell: { row: 0, col: 0 },
        selectionRange: null,
        selectionMode: "cell",
        tableData: createBlankTableData(100, 26),
        colWidths: Array.from({ length: 26 }, () => DEFAULT_COL_WIDTH),
        rowHeights: Array.from({ length: 100 }, () => DEFAULT_ROW_HEIGHT)
    };
}

function cloneSheetState(sheet, name) {
    return {
        name,
        rowCount: sheet.rowCount,
        colCount: sheet.colCount,
        selectedCell: sheet.selectedCell ? { ...sheet.selectedCell } : { row: 0, col: 0 },
        selectionRange: cloneRange(sheet.selectionRange),
        selectionMode: sheet.selectionMode,
        tableData: cloneTableData(sheet.tableData),
        colWidths: [...sheet.colWidths],
        rowHeights: [...sheet.rowHeights]
    };
}

function captureCurrentSheet() {
    if (!sheets[activeSheetIndex]) return;

    sheets[activeSheetIndex] = createSheetState(sheets[activeSheetIndex].name);
}

function applySheetState(sheet) {
    rowCount = sheet.rowCount;
    colCount = sheet.colCount;
    selectedCell = sheet.selectedCell ? { ...sheet.selectedCell } : { row: 0, col: 0 };
    selectionRange = cloneRange(sheet.selectionRange);
    selectionMode = sheet.selectionMode;
    tableData = cloneTableData(sheet.tableData);
    colWidths = [...sheet.colWidths];
    rowHeights = [...sheet.rowHeights];
    extraSelections = [];
    copiedRange = null;
    internalClipboard = null;
    clipboardMode = null;
    isEditing = false;
}

function updateSheetRenameInputWidth(input) {
    const characterCount = Math.max(4, input.value.length + 1);
    input.style.width = `${characterCount}ch`;
}

function renderSheetTabs() {
    if (!sheetTabs) return;

    sheetTabs.innerHTML = "";
    sheets.forEach((sheet, index) => {
        if (index === renamingSheetIndex) {
            const input = document.createElement("input");
            input.type = "text";
            input.className = `sheet-tab sheet-tab-editor${index === activeSheetIndex ? " active" : ""}`;
            input.value = sheet.name;
            input.spellcheck = false;
            updateSheetRenameInputWidth(input);

            let isCancelled = false;
            input.addEventListener("input", () => {
                updateSheetRenameInputWidth(input);
            });
            input.addEventListener("keydown", (e) => {
                if (e.key === "Enter") {
                    e.preventDefault();
                    finishSheetRename(index, input.value, true);
                }

                if (e.key === "Escape") {
                    e.preventDefault();
                    isCancelled = true;
                    finishSheetRename(index, input.value, false);
                }
            });
            input.addEventListener("blur", () => {
                if (!isCancelled) {
                    finishSheetRename(index, input.value, true);
                }
            });

            sheetTabs.appendChild(input);
            setTimeout(() => {
                input.focus();
                input.select();
            }, 0);
            return;
        }

        const button = document.createElement("button");
        button.type = "button";
        button.className = `sheet-tab${index === activeSheetIndex ? " active" : ""}`;
        button.textContent = sheet.name;
        button.addEventListener("click", () => {
            if (index === activeSheetIndex) return;

            captureCurrentSheet();
            activeSheetIndex = index;
            applySheetState(sheets[activeSheetIndex]);
            undoStack = [];
            redoStack = [];
            renderSheetTabs();
            renderTable();
            focusSelectedCell();
        });
        button.addEventListener("contextmenu", (e) => {
            if (index !== activeSheetIndex) {
                captureCurrentSheet();
                activeSheetIndex = index;
                applySheetState(sheets[activeSheetIndex]);
                undoStack = [];
                redoStack = [];
                renderSheetTabs();
                renderTable();
            }
            showContextMenu(e, { type: "sheet", index });
        });
        button.addEventListener("dblclick", () => {
            startSheetRename(index);
        });
        sheetTabs.appendChild(button);
    });

    const addButton = document.createElement("button");
    addButton.type = "button";
    addButton.className = "sheet-add-btn";
    addButton.title = "Sayfa ekle";
    addButton.setAttribute("aria-label", "Sayfa ekle");
    addButton.textContent = "+";
    addButton.addEventListener("click", () => {
        addSheet();
    });
    sheetTabs.appendChild(addButton);
}

function addSheet() {
    captureCurrentSheet();
    const nextNumber = sheets.length + 1;
    sheets.push(createBlankSheetState(`Sayfa${nextNumber}`));
    activeSheetIndex = sheets.length - 1;
    applySheetState(sheets[activeSheetIndex]);
    undoStack = [];
    redoStack = [];
    renderSheetTabs();
    renderTable();
    focusSelectedCell();
}

function getUniqueSheetName(baseName) {
    const existingNames = new Set(sheets.map((sheet) => sheet.name));
    let candidate = `${baseName} kopya`;
    let counter = 2;

    while (existingNames.has(candidate)) {
        candidate = `${baseName} kopya ${counter}`;
        counter++;
    }

    return candidate;
}

function duplicateSheet() {
    const sourceIndex = contextMenuTarget?.index ?? activeSheetIndex;
    captureCurrentSheet();
    const sourceSheet = sheets[sourceIndex];
    if (!sourceSheet) return false;

    const copyName = getUniqueSheetName(sourceSheet.name);
    const copy = cloneSheetState(sourceSheet, copyName);
    const insertIndex = sourceIndex + 1;

    sheets.splice(insertIndex, 0, copy);
    activeSheetIndex = insertIndex;
    applySheetState(sheets[activeSheetIndex]);
    undoStack = [];
    redoStack = [];
    renderSheetTabs();
    renderTable();
    focusSelectedCell();
    return true;
}

function renameActiveSheet() {
    startSheetRename(contextMenuTarget?.index ?? activeSheetIndex);
}

function startSheetRename(index) {
    if (!sheets[index]) return;

    if (index !== activeSheetIndex) {
        captureCurrentSheet();
        activeSheetIndex = index;
        applySheetState(sheets[activeSheetIndex]);
        undoStack = [];
        redoStack = [];
        renderTable();
    }

    renamingSheetIndex = index;
    renderSheetTabs();
}

function finishSheetRename(index, name, shouldSave) {
    if (!sheets[index]) return;
    if (renamingSheetIndex !== index) return;

    if (shouldSave) {
        const trimmedName = name.trim();
        if (trimmedName) {
            captureCurrentSheet();
            sheets[index].name = trimmedName;
        }
    }

    renamingSheetIndex = null;
    renderSheetTabs();
}

function deleteActiveSheet() {
    if (sheets.length <= 1) return;

    sheets.splice(activeSheetIndex, 1);
    activeSheetIndex = Math.max(0, activeSheetIndex - 1);
    applySheetState(sheets[activeSheetIndex]);
    undoStack = [];
    redoStack = [];
    renderSheetTabs();
    renderTable();
    focusSelectedCell();
}

function getNextSaveNumber() {
    const storedValue = Number(localStorage.getItem(SAVE_NAME_COUNTER_KEY));
    return Number.isInteger(storedValue) && storedValue > 0 ? storedValue : 1;
}

function getDefaultSaveBaseName() {
    return `avcell${getNextSaveNumber()}`;
}

function updateNextSaveNumber(fileName) {
    const currentNumber = getNextSaveNumber();
    const match = fileName.match(/^avcell(\d+)(?:\.avc|\.avcell\.json|\.json)?$/i);
    const usedNumber = match ? Number(match[1]) : currentNumber;
    const nextNumber = Math.max(currentNumber + 1, usedNumber + 1);

    localStorage.setItem(SAVE_NAME_COUNTER_KEY, String(nextNumber));
}

function sanitizeFileName(name) {
    return name
        .trim()
        .replace(/[<>:"/\\|?*\x00-\x1F]/g, "_")
        .replace(/\.+$/g, "");
}

function ensureSaveExtension(fileName) {
    if (/\.avc$/i.test(fileName)) return fileName;
    if (/\.avcell\.json$/i.test(fileName)) return fileName.replace(/\.avcell\.json$/i, ".avc");
    if (/\.json$/i.test(fileName)) return fileName.replace(/\.json$/i, ".avc");
    return `${fileName}.avc`;
}

function getFileExtension(fileName) {
    const match = fileName.match(/\.([^.]+)$/);
    return match ? match[1].toLowerCase() : "";
}

function getFileBaseName(fileName) {
    return String(fileName || "").replace(/\.[^.]+$/, "");
}

function setCurrentWorkbookFile(fileName, handle = null) {
    if (getFileExtension(fileName) !== "avc") return;

    currentWorkbookFileName = fileName;
    currentWorkbookFileHandle = handle;
    document.title = `${fileName} - avCELL`;
}

function clearCurrentWorkbookFile() {
    currentWorkbookFileName = null;
    currentWorkbookFileHandle = null;
    document.title = "avCELL";
}

function getCurrentSaveBaseName() {
    return currentWorkbookFileName
        ? getFileBaseName(currentWorkbookFileName)
        : getDefaultSaveBaseName();
}

function createSavePayload() {
    captureCurrentSheet();

    return {
        app: "avCELL",
        version: 1,
        savedAt: new Date().toISOString(),
        activeSheetIndex,
        sheets: sheets.map((sheet) => ({
            ...sheet,
            selectedCell: sheet.selectedCell ? { ...sheet.selectedCell } : { row: 0, col: 0 },
            selectionRange: cloneRange(sheet.selectionRange),
            tableData: cloneTableData(sheet.tableData),
            colWidths: [...sheet.colWidths],
            rowHeights: [...sheet.rowHeights]
        }))
    };
}

function normalizeImportedCell(cell) {
    return {
        value: cell?.value ?? "",
        formula: cell?.formula ?? null,
        borders: { ...getCellBorders(cell) },
        style: { ...getCellStyle(cell) },
        merge: cell?.merge ? { ...cell.merge } : null,
        mergedTo: cell?.mergedTo ? { ...cell.mergedTo } : null
    };
}

function normalizeImportedRange(range, rowCountValue, colCountValue) {
    if (!range?.start || !range?.end) return null;

    return {
        start: {
            row: Math.max(0, Math.min(rowCountValue - 1, Number(range.start.row) || 0)),
            col: Math.max(0, Math.min(colCountValue - 1, Number(range.start.col) || 0))
        },
        end: {
            row: Math.max(0, Math.min(rowCountValue - 1, Number(range.end.row) || 0)),
            col: Math.max(0, Math.min(colCountValue - 1, Number(range.end.col) || 0))
        }
    };
}

function normalizeImportedSheet(sheet, index) {
    const safeRowCount = Math.max(MIN_ROW_SIZE, Number(sheet?.rowCount) || 100);
    const safeColCount = Math.max(MIN_COL_SIZE, Number(sheet?.colCount) || 26);
    const safeTableData = [];

    for (let r = 0; r < safeRowCount; r++) {
        const row = [];
        for (let c = 0; c < safeColCount; c++) {
            row.push(normalizeImportedCell(sheet?.tableData?.[r]?.[c]));
        }
        safeTableData.push(row);
    }

    return {
        name: String(sheet?.name || `Sayfa${index + 1}`),
        rowCount: safeRowCount,
        colCount: safeColCount,
        selectedCell: {
            row: Math.max(0, Math.min(safeRowCount - 1, Number(sheet?.selectedCell?.row) || 0)),
            col: Math.max(0, Math.min(safeColCount - 1, Number(sheet?.selectedCell?.col) || 0))
        },
        selectionRange: normalizeImportedRange(sheet?.selectionRange, safeRowCount, safeColCount),
        selectionMode: ["cell", "range", "row", "column", "all"].includes(sheet?.selectionMode)
            ? sheet.selectionMode
            : "cell",
        tableData: safeTableData,
        colWidths: Array.from({ length: safeColCount }, (_, col) =>
            Math.max(MIN_COL_WIDTH, Number(sheet?.colWidths?.[col]) || DEFAULT_COL_WIDTH)
        ),
        rowHeights: Array.from({ length: safeRowCount }, (_, row) =>
            Math.max(MIN_ROW_HEIGHT, Number(sheet?.rowHeights?.[row]) || DEFAULT_ROW_HEIGHT)
        )
    };
}

function loadWorkbookPayload(payload) {
    if (payload?.app !== "avCELL" || !Array.isArray(payload.sheets) || payload.sheets.length === 0) {
        throw new Error("Geçersiz avCELL dosyası.");
    }

    sheets = payload.sheets.map(normalizeImportedSheet);
    activeSheetIndex = Math.max(0, Math.min(sheets.length - 1, Number(payload.activeSheetIndex) || 0));
    undoStack = [];
    redoStack = [];
    renamingSheetIndex = null;
    extraSelections = [];
    clearClipboardState();
    applySheetState(sheets[activeSheetIndex]);
    normalizeSelectedCell();
    renderSheetTabs();
    renderTable();
    focusSelectedCell();
}

async function openWorkbookFile(file, handle = null) {
    if (!file) return false;

    const text = await file.text();
    const payload = JSON.parse(text);
    loadWorkbookPayload(payload);
    setCurrentWorkbookFile(file.name, handle);
    return true;
}

async function openWorkbook() {
    if ("showOpenFilePicker" in window) {
        const [handle] = await window.showOpenFilePicker({
            types: [AVC_FILE_TYPE],
            multiple: false
        });
        const file = await handle.getFile();
        await openWorkbookFile(file, handle);
        return true;
    }

    if (!openFileInput) return false;

    openFileInput.value = "";
    openFileInput.click();
    return true;
}

function xmlEscape(value) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}

function getSheetCellText(sheet, row, col) {
    const cell = sheet.tableData[row]?.[col];
    if (!cell) return "";

    return cell.formula ?? cell.value ?? "";
}

function getUsedSheetBounds(sheet) {
    let maxRow = 0;
    let maxCol = 0;

    for (let r = 0; r < sheet.rowCount; r++) {
        for (let c = 0; c < sheet.colCount; c++) {
            if (getSheetCellText(sheet, r, c) !== "") {
                maxRow = Math.max(maxRow, r);
                maxCol = Math.max(maxCol, c);
            }
        }
    }

    return { maxRow, maxCol };
}

function sanitizeSpreadsheetName(name, fallback) {
    const cleanedName = String(name || fallback)
        .replace(/[\[\]:*?/\\]/g, " ")
        .trim()
        .slice(0, 31);

    return cleanedName || fallback;
}

function buildXmlWorkbook(payload) {
    const worksheets = payload.sheets.map((sheet, index) => {
        const bounds = getUsedSheetBounds(sheet);
        const rows = [];

        for (let r = 0; r <= bounds.maxRow; r++) {
            const cells = [];
            for (let c = 0; c <= bounds.maxCol; c++) {
                const value = getSheetCellText(sheet, r, c);
                const formula = value.startsWith("=") ? ` ss:Formula="${xmlEscape(value)}"` : "";
                const plainValue = value.startsWith("=") ? "" : value;
                const type = plainValue.trim() !== "" && Number.isFinite(Number(plainValue)) ? "Number" : "String";
                cells.push(`<Cell${formula}><Data ss:Type="${type}">${xmlEscape(plainValue)}</Data></Cell>`);
            }
            rows.push(`<Row>${cells.join("")}</Row>`);
        }

        const sheetName = sanitizeSpreadsheetName(sheet.name, `Sayfa${index + 1}`);
        return `<Worksheet ss:Name="${xmlEscape(sheetName)}"><Table>${rows.join("")}</Table></Worksheet>`;
    });

    return `<?xml version="1.0" encoding="UTF-8"?><?mso-application progid="Excel.Sheet"?><Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"><DocumentProperties xmlns="urn:schemas-microsoft-com:office:office"><Author>avCELL</Author></DocumentProperties><ExcelWorkbook xmlns="urn:schemas-microsoft-com:office:excel"><ProtectStructure>False</ProtectStructure><ProtectWindows>False</ProtectWindows></ExcelWorkbook>${worksheets.join("")}</Workbook>`;
}

function createAvcBlob(payload) {
    return new Blob([JSON.stringify(payload, null, 2)], {
        type: "application/json"
    });
}

function createXlsBlob(payload) {
    return new Blob([buildXmlWorkbook(payload)], {
        type: "application/vnd.ms-excel"
    });
}

function createCrc32Table() {
    const table = [];
    for (let i = 0; i < 256; i++) {
        let value = i;
        for (let bit = 0; bit < 8; bit++) {
            value = value & 1 ? 0xedb88320 ^ (value >>> 1) : value >>> 1;
        }
        table.push(value >>> 0);
    }
    return table;
}

const CRC32_TABLE = createCrc32Table();

function getCrc32(bytes) {
    let crc = 0xffffffff;
    for (const byte of bytes) {
        crc = CRC32_TABLE[(crc ^ byte) & 0xff] ^ (crc >>> 8);
    }
    return (crc ^ 0xffffffff) >>> 0;
}

function writeUint16(view, offset, value) {
    view.setUint16(offset, value, true);
}

function writeUint32(view, offset, value) {
    view.setUint32(offset, value, true);
}

function createZipBlob(entries, type) {
    const encoder = new TextEncoder();
    const preparedEntries = entries.map((entry) => ({
        nameBytes: encoder.encode(entry.name),
        dataBytes: typeof entry.data === "string" ? encoder.encode(entry.data) : entry.data,
        name: entry.name
    }));
    const localParts = [];
    const centralParts = [];
    let offset = 0;

    preparedEntries.forEach((entry) => {
        const crc = getCrc32(entry.dataBytes);
        const localHeader = new Uint8Array(30);
        const localView = new DataView(localHeader.buffer);
        writeUint32(localView, 0, 0x04034b50);
        writeUint16(localView, 4, 20);
        writeUint16(localView, 6, 0);
        writeUint16(localView, 8, 0);
        writeUint16(localView, 10, 0);
        writeUint16(localView, 12, 0);
        writeUint32(localView, 14, crc);
        writeUint32(localView, 18, entry.dataBytes.length);
        writeUint32(localView, 22, entry.dataBytes.length);
        writeUint16(localView, 26, entry.nameBytes.length);
        writeUint16(localView, 28, 0);
        localParts.push(localHeader, entry.nameBytes, entry.dataBytes);

        const centralHeader = new Uint8Array(46);
        const centralView = new DataView(centralHeader.buffer);
        writeUint32(centralView, 0, 0x02014b50);
        writeUint16(centralView, 4, 20);
        writeUint16(centralView, 6, 20);
        writeUint16(centralView, 8, 0);
        writeUint16(centralView, 10, 0);
        writeUint16(centralView, 12, 0);
        writeUint16(centralView, 14, 0);
        writeUint32(centralView, 16, crc);
        writeUint32(centralView, 20, entry.dataBytes.length);
        writeUint32(centralView, 24, entry.dataBytes.length);
        writeUint16(centralView, 28, entry.nameBytes.length);
        writeUint16(centralView, 30, 0);
        writeUint16(centralView, 32, 0);
        writeUint16(centralView, 34, 0);
        writeUint16(centralView, 36, 0);
        writeUint32(centralView, 38, 0);
        writeUint32(centralView, 42, offset);
        centralParts.push(centralHeader, entry.nameBytes);

        offset += localHeader.length + entry.nameBytes.length + entry.dataBytes.length;
    });

    const centralOffset = offset;
    const centralSize = centralParts.reduce((sum, part) => sum + part.length, 0);
    const endHeader = new Uint8Array(22);
    const endView = new DataView(endHeader.buffer);
    writeUint32(endView, 0, 0x06054b50);
    writeUint16(endView, 8, preparedEntries.length);
    writeUint16(endView, 10, preparedEntries.length);
    writeUint32(endView, 12, centralSize);
    writeUint32(endView, 16, centralOffset);

    return new Blob([...localParts, ...centralParts, endHeader], { type });
}

function buildXlsxSheetXml(sheet) {
    const bounds = getUsedSheetBounds(sheet);
    const rows = [];

    for (let r = 0; r <= bounds.maxRow; r++) {
        const cells = [];
        for (let c = 0; c <= bounds.maxCol; c++) {
            const value = getSheetCellText(sheet, r, c);
            if (value === "") continue;

            const cellRef = `${getColumnLabel(c)}${r + 1}`;
            const formula = value.startsWith("=") ? value.slice(1) : null;
            const numericValue = !formula && value.trim() !== "" && Number.isFinite(Number(value));
            if (formula) {
                cells.push(`<c r="${cellRef}"><f>${xmlEscape(formula)}</f></c>`);
            } else if (numericValue) {
                cells.push(`<c r="${cellRef}"><v>${xmlEscape(value)}</v></c>`);
            } else {
                cells.push(`<c r="${cellRef}" t="inlineStr"><is><t>${xmlEscape(value)}</t></is></c>`);
            }
        }
        rows.push(`<row r="${r + 1}">${cells.join("")}</row>`);
    }

    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetData>${rows.join("")}</sheetData></worksheet>`;
}

function createXlsxBlob(payload) {
    const sheetFiles = payload.sheets.map((sheet, index) => ({
        name: `xl/worksheets/sheet${index + 1}.xml`,
        data: buildXlsxSheetXml(sheet)
    }));
    const sheetContentTypes = payload.sheets
        .map((_, index) => `<Override PartName="/xl/worksheets/sheet${index + 1}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>`)
        .join("");
    const sheetsXml = payload.sheets
        .map((sheet, index) => `<sheet name="${xmlEscape(sanitizeSpreadsheetName(sheet.name, `Sayfa${index + 1}`))}" sheetId="${index + 1}" r:id="rId${index + 1}"/>`)
        .join("");
    const sheetRels = payload.sheets
        .map((_, index) => `<Relationship Id="rId${index + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet${index + 1}.xml"/>`)
        .join("");

    return createZipBlob([
        {
            name: "[Content_Types].xml",
            data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>${sheetContentTypes}</Types>`
        },
        {
            name: "_rels/.rels",
            data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>`
        },
        {
            name: "xl/workbook.xml",
            data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets>${sheetsXml}</sheets></workbook>`
        },
        {
            name: "xl/_rels/workbook.xml.rels",
            data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">${sheetRels}<Relationship Id="rId${payload.sheets.length + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>`
        },
        {
            name: "xl/styles.xml",
            data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><fonts count="1"><font><sz val="11"/><name val="Arial"/></font></fonts><fills count="1"><fill><patternFill patternType="none"/></fill></fills><borders count="1"><border/></borders><cellStyleXfs count="1"><xf/></cellStyleXfs><cellXfs count="1"><xf/></cellXfs></styleSheet>`
        },
        ...sheetFiles
    ], "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
}

function buildOdsContentXml(payload) {
    const tables = payload.sheets.map((sheet) => {
        const bounds = getUsedSheetBounds(sheet);
        const rows = [];

        for (let r = 0; r <= bounds.maxRow; r++) {
            const cells = [];
            for (let c = 0; c <= bounds.maxCol; c++) {
                const value = getSheetCellText(sheet, r, c);
                const number = value.trim() !== "" && Number.isFinite(Number(value));
                if (number) {
                    cells.push(`<table:table-cell office:value-type="float" office:value="${xmlEscape(value)}"><text:p>${xmlEscape(value)}</text:p></table:table-cell>`);
                } else {
                    cells.push(`<table:table-cell office:value-type="string"><text:p>${xmlEscape(value)}</text:p></table:table-cell>`);
                }
            }
            rows.push(`<table:table-row>${cells.join("")}</table:table-row>`);
        }

        return `<table:table table:name="${xmlEscape(sheet.name)}">${rows.join("")}</table:table>`;
    });

    return `<?xml version="1.0" encoding="UTF-8"?><office:document-content xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0" xmlns:table="urn:oasis:names:tc:opendocument:xmlns:table:1.0" xmlns:text="urn:oasis:names:tc:opendocument:xmlns:text:1.0" office:version="1.2"><office:body><office:spreadsheet>${tables.join("")}</office:spreadsheet></office:body></office:document-content>`;
}

function createOdsBlob(payload) {
    return createZipBlob([
        {
            name: "mimetype",
            data: "application/vnd.oasis.opendocument.spreadsheet"
        },
        {
            name: "META-INF/manifest.xml",
            data: `<?xml version="1.0" encoding="UTF-8"?><manifest:manifest xmlns:manifest="urn:oasis:names:tc:opendocument:xmlns:manifest:1.0" manifest:version="1.2"><manifest:file-entry manifest:full-path="/" manifest:media-type="application/vnd.oasis.opendocument.spreadsheet"/><manifest:file-entry manifest:full-path="content.xml" manifest:media-type="text/xml"/></manifest:manifest>`
        },
        {
            name: "content.xml",
            data: buildOdsContentXml(payload)
        }
    ], "application/vnd.oasis.opendocument.spreadsheet");
}

function pdfEscape(value) {
    return String(value ?? "")
        .replace(/[^\x20-\x7e]/g, "?")
        .replace(/\\/g, "\\\\")
        .replace(/\(/g, "\\(")
        .replace(/\)/g, "\\)");
}

function buildPdfPages(payload) {
    const pages = [];
    const maxLinesPerPage = 42;

    payload.sheets.forEach((sheet) => {
        const bounds = getUsedSheetBounds(sheet);
        const lines = [sheet.name, ""];

        for (let r = 0; r <= bounds.maxRow; r++) {
            const cells = [];
            for (let c = 0; c <= bounds.maxCol; c++) {
                cells.push(getSheetCellText(sheet, r, c));
            }
            lines.push(cells.join("    "));
        }

        for (let i = 0; i < lines.length; i += maxLinesPerPage) {
            pages.push(lines.slice(i, i + maxLinesPerPage));
        }
    });

    return pages.length ? pages : [["avCELL"]];
}

function createPdfBlob(payload) {
    const pages = buildPdfPages(payload);
    const objects = [
        "<< /Type /Catalog /Pages 2 0 R >>",
        ""
    ];
    const pageObjectIds = [];

    pages.forEach((lines) => {
        const pageObjectId = objects.length + 1;
        const contentObjectId = pageObjectId + 1;
        pageObjectIds.push(pageObjectId);

        const textLines = lines.map((line, index) => {
            const y = 800 - index * 17;
            return `BT /F1 11 Tf 50 ${y} Td (${pdfEscape(line)}) Tj ET`;
        });
        const content = textLines.join("\n");

        objects.push(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 ${pages.length * 2 + 3} 0 R >> >> /Contents ${contentObjectId} 0 R >>`);
        objects.push(`<< /Length ${content.length} >>\nstream\n${content}\nendstream`);
    });

    objects[1] = `<< /Type /Pages /Kids [${pageObjectIds.map((id) => `${id} 0 R`).join(" ")}] /Count ${pageObjectIds.length} >>`;
    objects.push("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");

    let pdf = "%PDF-1.4\n";
    const offsets = [0];
    objects.forEach((object, index) => {
        offsets.push(pdf.length);
        pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
    });

    const xrefOffset = pdf.length;
    pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
    offsets.slice(1).forEach((offset) => {
        pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
    });
    pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

    return new Blob([pdf], { type: "application/pdf" });
}

function createBlobForFileName(fileName, payload) {
    const extension = getFileExtension(fileName);
    if (extension === "xls") return createXlsBlob(payload);
    if (extension === "xlsx") return createXlsxBlob(payload);
    if (extension === "ods") return createOdsBlob(payload);
    if (extension === "pdf") return createPdfBlob(payload);
    return createAvcBlob(payload);
}

function downloadSaveFile(blob, fileName) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
}

async function writeSaveFile(blob, fileName, types = [AVC_FILE_TYPE]) {
    if ("showSaveFilePicker" in window) {
        const handle = await window.showSaveFilePicker({
            suggestedName: fileName,
            types
        });
        const writable = await handle.createWritable();
        await writable.write(blob);
        await writable.close();
        return {
            fileName: handle.name || fileName,
            handle
        };
    }

    downloadSaveFile(blob, fileName);
    return {
        fileName,
        handle: null
    };
}

async function writeSaveAsFile(defaultName) {
    if ("showSaveFilePicker" in window) {
        const handle = await window.showSaveFilePicker({
            suggestedName: `${defaultName}.avc`,
            types: SAVE_AS_FILE_TYPES
        });
        const fileName = handle.name || `${defaultName}.avc`;
        const payload = createSavePayload();
        const blob = createBlobForFileName(fileName, payload);
        const writable = await handle.createWritable();

        await writable.write(blob);
        await writable.close();
        updateNextSaveNumber(fileName);
        setCurrentWorkbookFile(fileName, getFileExtension(fileName) === "avc" ? handle : null);
        return true;
    }

    const requestedName = prompt("Dosya adı (.avc, .xls, .xlsx, .ods, .pdf)", `${defaultName}.avc`);
    if (requestedName === null) return false;

    const safeName = sanitizeFileName(requestedName);
    if (!safeName) return false;

    const fileName = /\.(avc|xls|xlsx|ods|pdf)$/i.test(safeName) ? safeName : `${safeName}.avc`;
    const payload = createSavePayload();
    const blob = createBlobForFileName(fileName, payload);
    downloadSaveFile(blob, fileName);
    updateNextSaveNumber(fileName);
    setCurrentWorkbookFile(fileName);
    return true;
}

async function saveWorkbook() {
    const payload = createSavePayload();
    const blob = createAvcBlob(payload);

    try {
        if (currentWorkbookFileHandle) {
            const writable = await currentWorkbookFileHandle.createWritable();
            await writable.write(blob);
            await writable.close();
            updateNextSaveNumber(currentWorkbookFileName);
            return true;
        }

        const defaultName = getCurrentSaveBaseName();
        const requestedName = prompt("Dosya adı", defaultName);
        if (requestedName === null) return false;

        const safeName = sanitizeFileName(requestedName);
        if (!safeName) return false;

        const fileName = ensureSaveExtension(safeName);
        const result = await writeSaveFile(blob, fileName);
        setCurrentWorkbookFile(result.fileName, result.handle);
        updateNextSaveNumber(result.fileName);
        return true;
    } catch (error) {
        if (error?.name !== "AbortError") {
            alert("Dosya kaydedilemedi.");
        }
        return false;
    }
}

async function saveWorkbookAs() {
    const defaultName = getCurrentSaveBaseName();

    try {
        return await writeSaveAsFile(defaultName);
    } catch (error) {
        if (error?.name !== "AbortError") {
            alert("Dosya kaydedilemedi.");
        }
        return false;
    }
}

function createHistorySnapshot() {
    return {
        rowCount,
        colCount,
        selectedCell: selectedCell ? { ...selectedCell } : null,
        selectionRange: cloneRange(selectionRange),
        selectionMode,
        tableData: cloneTableData(tableData),
        colWidths: [...colWidths],
        rowHeights: [...rowHeights]
    };
}

function restoreHistorySnapshot(snapshot) {
    isRestoringHistory = true;

    rowCount = snapshot.rowCount;
    colCount = snapshot.colCount;
    selectedCell = snapshot.selectedCell ? { ...snapshot.selectedCell } : { row: 0, col: 0 };
    selectionRange = cloneRange(snapshot.selectionRange);
    selectionMode = snapshot.selectionMode;
    tableData = cloneTableData(snapshot.tableData);
    colWidths = [...snapshot.colWidths];
    rowHeights = [...snapshot.rowHeights];
    extraSelections = [];
    copiedRange = null;
    internalClipboard = null;
    clipboardMode = null;
    isEditing = false;
    editBackupValue = "";

    renderTable();
    focusSelectedCell();
    isRestoringHistory = false;
}

function pushHistory() {
    if (isRestoringHistory) return;

    undoStack.push(createHistorySnapshot());
    if (undoStack.length > MAX_HISTORY_SIZE) {
        undoStack.shift();
    }
    redoStack = [];
    updateToolbarState();
}

function undo() {
    if (undoStack.length === 0) return;

    redoStack.push(createHistorySnapshot());
    const snapshot = undoStack.pop();
    restoreHistorySnapshot(snapshot);
    updateToolbarState();
}

function redo() {
    if (redoStack.length === 0) return;

    undoStack.push(createHistorySnapshot());
    const snapshot = redoStack.pop();
    restoreHistorySnapshot(snapshot);
    updateToolbarState();
}

function setColumnWidth(element, col) {
    const width = colWidths[col] ?? DEFAULT_COL_WIDTH;
    element.style.width = `${width}px`;
    element.style.minWidth = `${width}px`;
    element.style.maxWidth = `${width}px`;
}

function setRowHeight(element, row) {
    const height = rowHeights[row] ?? DEFAULT_ROW_HEIGHT;
    element.style.height = `${height}px`;
}

function applyColumnWidth(col) {
    document
        .querySelectorAll(`[data-col="${col}"]`)
        .forEach((element) => setColumnWidth(element, col));
}

function applyRowHeight(row) {
    document
        .querySelectorAll(`[data-row="${row}"]`)
        .forEach((element) => setRowHeight(element, row));
}

function startColumnResize(e, col) {
    e.preventDefault();
    e.stopPropagation();
    if (e.detail > 1) return;
    pushHistory();

    resizeState = {
        type: "column",
        index: col,
        startPosition: e.clientX,
        startSize: colWidths[col] ?? DEFAULT_COL_WIDTH
    };
}

function startRowResize(e, row) {
    e.preventDefault();
    e.stopPropagation();
    if (e.detail > 1) return;
    pushHistory();

    resizeState = {
        type: "row",
        index: row,
        startPosition: e.clientY,
        startSize: rowHeights[row] ?? DEFAULT_ROW_HEIGHT
    };
}

function getDisplayText(row, col) {
    const cell = tableData[row]?.[col];
    if (!cell) return "";

    return cell.formula ?? cell.value ?? "";
}

function getCellFontSize(row, col) {
    const style = getCellStyle(tableData[row]?.[col]);
    return Math.max(MIN_FONT_SIZE, Math.min(MAX_FONT_SIZE, Number(style.fontSize) || DEFAULT_FONT_SIZE));
}

function getTextLineMetrics(row, col) {
    const text = getDisplayText(row, col);
    const lines = text ? text.split(/\r\n|\r|\n/) : [""];
    const fontSize = getCellFontSize(row, col);
    const longestLineLength = Math.max(...lines.map((line) => line.length), 1);

    return {
        lineCount: lines.length,
        fontSize,
        estimatedWidth: longestLineLength * fontSize * 0.62 + 24,
        estimatedHeight: lines.length * (fontSize + 7) + 6
    };
}

function fitColumnToContent(col, shouldApply = true, minWidth = MIN_COL_WIDTH) {
    const headerWidth = getColumnLabel(col).length * DEFAULT_FONT_SIZE * 0.72 + 24;
    let width = headerWidth;

    for (let row = 0; row < rowCount; row++) {
        width = Math.max(width, getTextLineMetrics(row, col).estimatedWidth);
    }

    colWidths[col] = Math.max(minWidth, Math.min(360, Math.ceil(width)));
    if (shouldApply) applyColumnWidth(col);
}

function fitRowToContent(row, shouldApply = true, minHeight = MIN_ROW_HEIGHT) {
    let height = DEFAULT_ROW_HEIGHT;

    for (let col = 0; col < colCount; col++) {
        height = Math.max(height, getTextLineMetrics(row, col).estimatedHeight);
    }

    rowHeights[row] = Math.max(minHeight, Math.min(160, Math.ceil(height)));
    if (shouldApply) applyRowHeight(row);
}

function fitRangeToContent(range) {
    if (!range) return;

    for (let col = range.minCol; col <= range.maxCol; col++) {
        fitColumnToContent(col, false, DEFAULT_COL_WIDTH);
    }

    for (let row = range.minRow; row <= range.maxRow; row++) {
        fitRowToContent(row, false, DEFAULT_ROW_HEIGHT);
    }
}

function autoFitColumn(col) {
    pushHistory();
    fitColumnToContent(col);
}

function autoFitRow(row) {
    pushHistory();
    fitRowToContent(row);
}
// MODEL INITIALIZE
function initData() {
    tableData = [];
    colWidths = Array.from({ length: colCount }, () => DEFAULT_COL_WIDTH);
    rowHeights = Array.from({ length: rowCount }, () => DEFAULT_ROW_HEIGHT);

    for (let r = 0; r < rowCount; r++) {
        const row = [];
        for (let c = 0; c < colCount; c++) {
            row.push(createEmptyCell());
        }
        tableData.push(row);
    }
}
// RENDER TABLE FROM MODEL
function renderTable() {
    table.innerHTML = "";
    table.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        hideContextMenu();
    });

    // HEADER
    const headerRow = document.createElement("tr");
    const cornerHeader = document.createElement("th");
    cornerHeader.classList.add("corner-header");
    if (selectionMode === "all") {
        cornerHeader.classList.add("active-header");
    }
    cornerHeader.addEventListener("click", () => {
        if (isEditing) {
            exitEditMode(true);
        }
        selectAllCells();
    });
    cornerHeader.addEventListener("contextmenu", (e) => {
        if (isEditing) {
            exitEditMode(true);
        }
        selectAllCells();
        showContextMenu(e, { type: "all" });
    });
    headerRow.appendChild(cornerHeader);

    for (let c = 0; c < colCount; c++) {
        const th = document.createElement("th");
        th.classList.add("column-header");
        th.dataset.col = c;
        setColumnWidth(th, c);
        th.textContent = getColumnLabel(c);
        const resizeHandle = document.createElement("span");
        resizeHandle.classList.add("col-resize-handle");
        resizeHandle.addEventListener("mousedown", (e) => {
            startColumnResize(e, c);
        });
        resizeHandle.addEventListener("click", (e) => {
            e.stopPropagation();
        });
        resizeHandle.addEventListener("dblclick", (e) => {
            e.preventDefault();
            e.stopPropagation();
            autoFitColumn(c);
        });
        th.appendChild(resizeHandle);
        if (isColumnHeaderActive(c)) {
            th.classList.add("active-header");
        }
        if (moveSelectionState?.type === "column" && moveSelectionState.targetIndex === c) {
            th.classList.add("move-target-header");
        }
        th.addEventListener("mousedown", (e) => {
            if (e.button !== 0 || resizeState || e.shiftKey || e.ctrlKey || e.metaKey) return;
            if (isEditing) {
                exitEditMode(true);
            }
            if (selectionMode === "column" && isColumnInColumnSelection(c)) {
                startMoveSelection("column", c);
                e.preventDefault();
                return;
            }
            startHeaderSelection("column", c);
            e.preventDefault();
        });
        th.addEventListener("mouseenter", () => {
            updateMoveSelection("column", c);
            updateHeaderSelection("column", c);
        });
        th.addEventListener("click", (e) => {
            if (suppressClickAfterMove) {
                suppressClickAfterMove = false;
                e.preventDefault();
                return;
            }
            if (headerSelectionState?.moved) {
                e.preventDefault();
                return;
            }
            if (isEditing) {
                exitEditMode(true);
            }
            selectColumn(c, e);
        });
        th.addEventListener("contextmenu", (e) => {
            if (isEditing) {
                exitEditMode(true);
            }
            if (!(selectionMode === "column" && isColumnInColumnSelection(c))) {
                selectColumn(c);
            }
            showContextMenu(e, { type: "column", col: c });
        });
        headerRow.appendChild(th);
    }
    table.appendChild(headerRow);

    // ROWS
    for (let r = 0; r < rowCount; r++) {
        const tr = document.createElement("tr");

        const rowHeader = document.createElement("th");
        rowHeader.classList.add("row-header");
        rowHeader.dataset.row = r;
        setRowHeight(rowHeader, r);
        rowHeader.textContent = r + 1;
        const resizeHandle = document.createElement("span");
        resizeHandle.classList.add("row-resize-handle");
        resizeHandle.addEventListener("mousedown", (e) => {
            startRowResize(e, r);
        });
        resizeHandle.addEventListener("click", (e) => {
            e.stopPropagation();
        });
        resizeHandle.addEventListener("dblclick", (e) => {
            e.preventDefault();
            e.stopPropagation();
            autoFitRow(r);
        });
        rowHeader.appendChild(resizeHandle);
        if (isRowHeaderActive(r)) {
            rowHeader.classList.add("active-header");
        }
        if (moveSelectionState?.type === "row" && moveSelectionState.targetIndex === r) {
            rowHeader.classList.add("move-target-header");
        }
        rowHeader.addEventListener("mousedown", (e) => {
            if (e.button !== 0 || resizeState || e.shiftKey || e.ctrlKey || e.metaKey) return;
            if (isEditing) {
                exitEditMode(true);
            }
            if (selectionMode === "row" && isRowInRowSelection(r)) {
                startMoveSelection("row", r);
                e.preventDefault();
                return;
            }
            startHeaderSelection("row", r);
            e.preventDefault();
        });
        rowHeader.addEventListener("mouseenter", () => {
            updateMoveSelection("row", r);
            updateHeaderSelection("row", r);
        });
        rowHeader.addEventListener("click", (e) => {
            if (suppressClickAfterMove) {
                suppressClickAfterMove = false;
                e.preventDefault();
                return;
            }
            if (headerSelectionState?.moved) {
                e.preventDefault();
                return;
            }
            if (isEditing) {
                exitEditMode(true);
            }
            selectRow(r, e);
        });
        rowHeader.addEventListener("contextmenu", (e) => {
            if (isEditing) {
                exitEditMode(true);
            }
            if (!(selectionMode === "row" && isRowInRowSelection(r))) {
                selectRow(r);
            }
            showContextMenu(e, { type: "row", row: r });
        });
        tr.appendChild(rowHeader);

        for (let c = 0; c < colCount; c++) {
            if (tableData[r][c].mergedTo) continue;

            const td = document.createElement("td");
            // data binding
            td.dataset.row = r;
            td.dataset.col = c;
            const merge = tableData[r][c].merge;
            if (merge) {
                td.colSpan = merge.colspan;
                td.rowSpan = merge.rowspan;
                td.classList.add("merged-cell");
                const width = colWidths
                    .slice(c, c + merge.colspan)
                    .reduce((sum, value) => sum + (value ?? DEFAULT_COL_WIDTH), 0);
                const height = rowHeights
                    .slice(r, r + merge.rowspan)
                    .reduce((sum, value) => sum + (value ?? DEFAULT_ROW_HEIGHT), 0);
                td.style.width = `${width}px`;
                td.style.minWidth = `${width}px`;
                td.style.maxWidth = `${width}px`;
                td.style.height = `${height}px`;
            } else {
                setColumnWidth(td, c);
                setRowHeight(td, r);
            }

            td.textContent = tableData[r][c].value;
            td.contentEditable = false;
            td.tabIndex = -1;
            const cellStyle = getCellStyle(tableData[r][c]);
            td.style.fontWeight = cellStyle.bold ? "700" : "400";
            td.style.fontStyle = cellStyle.italic ? "italic" : "normal";
            td.style.textDecoration = cellStyle.underline ? "underline" : "none";
            td.style.fontSize = `${Math.max(MIN_FONT_SIZE, Math.min(MAX_FONT_SIZE, Number(cellStyle.fontSize) || DEFAULT_FONT_SIZE))}px`;
            td.style.color = normalizeColorValue(cellStyle.color, "#202124");
            td.style.textAlign = cellStyle.horizontalAlign;
            td.style.verticalAlign = cellStyle.verticalAlign;
            if (cellStyle.backgroundColor) {
                td.style.backgroundColor = normalizeColorValue(cellStyle.backgroundColor, "#fff2cc");
            }
            const borders = getCellBorders(tableData[r][c]);
            if (borders.top) td.classList.add("cell-border-top");
            if (borders.right) td.classList.add("cell-border-right");
            if (borders.bottom) td.classList.add("cell-border-bottom");
            if (borders.left) td.classList.add("cell-border-left");

            // SELECTED STATE -> CSS
            if (
                selectedCell &&
                selectedCell.row === r &&
                selectedCell.col === c
            ) {
                td.classList.add("selected");
                if (!selectionRange && extraSelections.length === 0) {
                    td.classList.add("selection-handle-cell");
                }
            }

            // RANGE SELECTED STATE (Shift + seçim)
            if (selectionRange) {
                const range = getNormalizedRange(selectionRange);

                if (isCellInNormalizedRange(r, c, range)) {
                    td.classList.add("range-selected");
                    addRangeBoundaryClasses(td, r, c, range, "selection");
                    const visualRange = getVisualCellRange(r, c);
                    if (visualRange.maxRow === range.maxRow && visualRange.maxCol === range.maxCol) {
                        td.classList.add("selection-handle-cell");
                    }
                }
            }

            extraSelections.forEach((extraRange) => {
                const range = getNormalizedRange(extraRange);

                if (isCellInNormalizedRange(r, c, range)) {
                    td.classList.add("range-selected");
                    addRangeBoundaryClasses(td, r, c, range, "selection");
                }
            });

            if (copiedRange) {
                const range = getNormalizedRange(copiedRange);

                if (isCellInNormalizedRange(r, c, range)) {
                    td.classList.add("copied-range");
                    if (r === range.minRow) td.classList.add("copied-top");
                    if (r === range.maxRow) td.classList.add("copied-bottom");
                    if (c === range.minCol) td.classList.add("copied-left");
                    if (c === range.maxCol) td.classList.add("copied-right");
                }
            }

            const moveTargetRange = getCellMoveTargetRange();
            if (moveTargetRange && isCellInNormalizedRange(r, c, moveTargetRange)) {
                td.classList.add("move-target-cell");
                addRangeBoundaryClasses(td, r, c, moveTargetRange, "move-target");
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
            td.addEventListener("contextmenu", (e) => {
                if (isEditing) {
                    exitEditMode(true);
                }

                if (!isCellInCurrentSelection(r, c)) {
                    selectedCell = { row: r, col: c };
                    selectionRange = null;
                    selectionMode = "cell";
                    extraSelections = [];
                    renderTable();
                }

                showContextMenu(e, { type: "cell", row: r, col: c });
            });

            td.addEventListener("mousedown", (e) => {
                if (e.button !== 0 || isEditing || resizeState) return;

                if (e.detail > 1) {
                    clearClipboardState();
                    selectedCell = { row: r, col: c };
                    selectionRange = null;
                    selectionMode = "cell";
                    extraSelections = [];
                    renderTable();
                    enterEditMode(r, c);
                    e.preventDefault();
                    return;
                }

                if (e.shiftKey || e.ctrlKey || e.metaKey) return;

                if (
                    isCellInCurrentSelection(r, c) &&
                    isNearSelectionEdge(e, e.currentTarget, r, c) &&
                    startCellMove(r, c)
                ) {
                    e.preventDefault();
                    return;
                }

                isMouseSelecting = true;
                mouseSelectionMoved = false;
                selectedCell = { row: r, col: c };
                selectionRange = null;
                selectionMode = "cell";
                extraSelections = [];
                renderTable();
                focusSelectedCell();
                e.preventDefault();
            });

            td.addEventListener("mouseenter", () => {
                updateCellMoveTarget(r, c);
                if (!isMouseSelecting || !selectedCell) return;
                if (selectedCell.row === r && selectedCell.col === c) return;

                mouseSelectionMoved = true;
                selectionMode = "range";
                extraSelections = [];
                selectionRange = {
                    start: { ...selectedCell },
                    end: { row: r, col: c }
                };
                renderTable();
                focusSelectedCell();
            });

            td.addEventListener("mousemove", (e) => {
                if (isEditing || resizeState || moveSelectionState || isMouseSelecting) return;
                e.currentTarget.classList.toggle(
                    "selection-move-cursor",
                    isCellInCurrentSelection(r, c) && isNearSelectionEdge(e, e.currentTarget, r, c)
                );
            });

            td.addEventListener("mouseleave", (e) => {
                e.currentTarget.classList.remove("selection-move-cursor");
            });

            td.addEventListener("click", (e) => {
                if (suppressClickAfterMove) {
                    suppressClickAfterMove = false;
                    e.preventDefault();
                    return;
                }
                if (mouseSelectionMoved) {
                    mouseSelectionMoved = false;
                    e.preventDefault();
                    return;
                }

                if (isEditing) {
                    exitEditMode(true);
                }

                if ((e.ctrlKey || e.metaKey) && selectedCell) {
                    addExtraCellSelection(r, c);
                    selectionMode = "range";
                } else if (e.shiftKey && selectedCell) {
                    selectionMode = "range";
                    extraSelections = [];
                    selectionRange = {
                        start: { ...selectedCell },
                        end: { row: r, col: c }
                    };
                } else {
                    selectedCell = { row: r, col: c };
                    selectionRange = null;
                    selectionMode = "cell";
                    extraSelections = [];
                }

                renderTable();
                focusSelectedCell();
            });

            td.addEventListener("dblclick", () => {
                clearClipboardState();
                selectedCell = { row: r, col: c };
                selectionRange = null;
                selectionMode = "cell";
                extraSelections = [];
                renderTable();
                enterEditMode(r, c);
            });

            tr.appendChild(td);
        }

        table.appendChild(tr);
    }

    updateFormulaBar();
    updateToolbarState();
    enforceChartVisibility();
}
// === EVENTS ===
undoBtn.addEventListener("click", undo);
redoBtn.addEventListener("click", redo);

fileMenuBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    hideContextMenu();
    hideBorderMenu();
    hideEditMenu();
    if (fileMenu) {
        fileMenu.hidden = !fileMenu.hidden;
    }
});

openFileBtn?.addEventListener("click", async () => {
    hideFileMenu();
    try {
        await openWorkbook();
    } catch (error) {
        if (error?.name !== "AbortError") {
            alert(error?.message || "Dosya açılamadı.");
        }
    }
});

openFileInput?.addEventListener("change", async () => {
    const file = openFileInput.files?.[0];
    if (!file) return;

    try {
        await openWorkbookFile(file);
    } catch (error) {
        alert(error?.message || "Dosya açılamadı.");
    }
});

saveFileBtn?.addEventListener("click", async () => {
    hideFileMenu();
    await saveWorkbook();
});

saveAsFileBtn?.addEventListener("click", async () => {
    hideFileMenu();
    await saveWorkbookAs();
});

editMenuBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    hideContextMenu();
    hideBorderMenu();
    hideFileMenu();
    updateEditMenuState();
    if (editMenu) {
        editMenu.hidden = !editMenu.hidden;
    }
});

menuUndoBtn?.addEventListener("click", () => {
    hideEditMenu();
    undo();
});

menuRedoBtn?.addEventListener("click", () => {
    hideEditMenu();
    redo();
});

menuCutBtn?.addEventListener("click", () => {
    hideEditMenu();
    cutSelection();
});

menuCopyBtn?.addEventListener("click", () => {
    hideEditMenu();
    copySelection();
});

menuPasteBtn?.addEventListener("click", () => {
    hideEditMenu();
    pasteClipboard();
});

borderBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    hideContextMenu();
    hideFileMenu();
    hideEditMenu();
    if (borderMenu?.hidden) {
        showBorderMenu();
    } else {
        hideBorderMenu();
    }
});

borderMenu?.addEventListener("click", (e) => {
    e.stopPropagation();
    const button = e.target.closest("[data-border-action]");
    if (!button) return;

    applyBorderToSelection(button.dataset.borderAction);
    hideBorderMenu();
});

mergeBtn?.addEventListener("click", () => {
    hideContextMenu();
    hideBorderMenu();
    toggleMergeSelection();
});

boldBtn?.addEventListener("click", () => {
    hideContextMenu();
    hideBorderMenu();
    toggleStyleProperty("bold");
});

italicBtn?.addEventListener("click", () => {
    hideContextMenu();
    hideBorderMenu();
    toggleStyleProperty("italic");
});

underlineBtn?.addEventListener("click", () => {
    hideContextMenu();
    hideBorderMenu();
    toggleStyleProperty("underline");
});

fontSizeDecreaseBtn?.addEventListener("click", () => {
    hideContextMenu();
    hideBorderMenu();
    changeFontSize(-1);
});

fontSizeIncreaseBtn?.addEventListener("click", () => {
    hideContextMenu();
    hideBorderMenu();
    changeFontSize(1);
});

textColorBtn?.addEventListener("click", () => {
    hideContextMenu();
    hideBorderMenu();
    textColorInput?.click();
});

fillColorBtn?.addEventListener("click", () => {
    hideContextMenu();
    hideBorderMenu();
    fillColorInput?.click();
});

textColorInput?.addEventListener("input", () => {
    setTextColor(textColorInput.value);
});

fillColorInput?.addEventListener("input", () => {
    setFillColor(fillColorInput.value);
});

findInput?.addEventListener("input", () => {
    runFindQuery(findInput.value);
    updateFindCount();
});

findInput?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        findNext(e.shiftKey ? -1 : 1);
    }
    if (e.key === "Escape") {
        e.preventDefault();
        closeFindPanel();
    }
});

findPrevBtn?.addEventListener("click", () => {
    findNext(-1);
});

findNextBtn?.addEventListener("click", () => {
    findNext(1);
});

findCloseBtn?.addEventListener("click", () => {
    closeFindPanel();
});

alignLeftBtn?.addEventListener("click", () => {
    hideContextMenu();
    hideBorderMenu();
    setHorizontalAlignment("left");
});

alignCenterBtn?.addEventListener("click", () => {
    hideContextMenu();
    hideBorderMenu();
    setHorizontalAlignment("center");
});

alignRightBtn?.addEventListener("click", () => {
    hideContextMenu();
    hideBorderMenu();
    setHorizontalAlignment("right");
});

alignTopBtn?.addEventListener("click", () => {
    hideContextMenu();
    hideBorderMenu();
    setVerticalAlignment("top");
});

alignMiddleBtn?.addEventListener("click", () => {
    hideContextMenu();
    hideBorderMenu();
    setVerticalAlignment("middle");
});

alignBottomBtn?.addEventListener("click", () => {
    hideContextMenu();
    hideBorderMenu();
    setVerticalAlignment("bottom");
});

addRowBtn.addEventListener("click", () => {
    if (addRowBtn.disabled) return;
    insertRowsAboveSelection();
});
removeRowBtn.addEventListener("click", () => {
    if (removeRowBtn.disabled) return;
    deleteSelectedRows();
});
addColBtn.addEventListener("click", () => {
    if (addColBtn.disabled) return;
    insertColsLeftOfSelection();
});
removeColBtn.addEventListener("click", () => {
    if (removeColBtn.disabled) return;
    deleteSelectedColumns();
});
function placeCursorAtEnd(element) {
    const range = document.createRange();
    const selection = window.getSelection();
    range.selectNodeContents(element);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
}

function insertLineBreakAtCursor(element) {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    range.deleteContents();
    range.insertNode(document.createTextNode("\n"));
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
}

function setFormulaInputValue(value) {
    formulaInput.value = value;
    formulaInputBackupValue = value;
}

function getActiveEditingCell() {
    if (!isEditing || !selectedCell) return null;

    return document.querySelector(
        `td[data-row="${selectedCell.row}"][data-col="${selectedCell.col}"]`
    );
}

function syncFormulaBarFromEditingCell() {
    const cell = getActiveEditingCell();
    if (!cell) return;

    formulaInput.value = cell.textContent;
}

function syncEditingCellFromFormulaBar() {
    const cell = getActiveEditingCell();
    if (!cell) return;

    cell.textContent = formulaInput.value;
}

function handleEditingCellKeydown(e) {
    if (e.altKey && e.key === "Enter") {
        e.preventDefault();
        e.stopPropagation();
        insertLineBreakAtCursor(e.currentTarget);
        syncFormulaBarFromEditingCell();
    }
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

function isCellWithinBounds(row, col) {
    return (
        row >= 0 &&
        row < rowCount &&
        col >= 0 &&
        col < colCount
    );
}

function isRangeWithinBounds(start, end) {
    return (
        start &&
        end &&
        isCellWithinBounds(start.row, start.col) &&
        isCellWithinBounds(end.row, end.col)
    );
}

function getCellNumericValue(row, col) {
    if (!isCellWithinBounds(row, col)) return 0;

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

    if (!isRangeWithinBounds(start, end)) return [];

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

    if (!isRangeWithinBounds(startIndex, endIndex)) return [];

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

function calculateCOUNT(range) {
    const cells = getCellsInRange(range);
    let count = 0;

    cells.forEach(({ row, col }) => {
        const cell = tableData[row]?.[col];
        const value = cell?.formula ? getCellNumericValue(row, col) : parseFloat(cell?.value);

        if (!isNaN(value)) {
            count++;
        }
    });

    return count;
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
    // AVERAGE / AVG
    expr = expr.replace(/AVG\(\s*([A-Z]+\d+:[A-Z]+\d+)\s*\)/gi, (_, range) => {
        return calculateAVG(range.toUpperCase());
    });
    expr = expr.replace(/AVERAGE\(\s*([A-Z]+\d+:[A-Z]+\d+)\s*\)/gi, (_, range) => {
        return calculateAVG(range.toUpperCase());
    });

    // COUNT
    expr = expr.replace(/COUNT\(\s*([A-Z]+\d+:[A-Z]+\d+)\s*\)/gi, (_, range) => {
        return calculateCOUNT(range.toUpperCase());
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
    if (internalClipboard || copiedRange || clipboardMode) {
        clearClipboardState(true);
    }

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
    cell.addEventListener("keydown", handleEditingCellKeydown);
    cell.focus();

    if (initialChar !== null) {
        cell.textContent = initialChar;
    } else {
        cell.textContent = editBackupValue;
    }
    formulaInput.value = cell.textContent;

    cell.addEventListener("input", syncFormulaBarFromEditingCell);
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

        if (text !== editBackupValue) {
            pushHistory();
        }

        if (text.startsWith("=")) {
            tableData[row][col].formula = text;
        } else {
            tableData[row][col].formula = null;
            tableData[row][col].value = text;
        }

    } else {
        cell.textContent = editBackupValue;
        formulaInput.value = editBackupValue;
    }
    cell.removeEventListener("input", syncFormulaBarFromEditingCell);
    cell.removeEventListener("keydown", handleEditingCellKeydown);
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

function commitFormulaInput() {
    if (!selectedCell) return;

    const { row, col } = selectedCell;
    const text = formulaInput.value.trim();

    if (text === formulaInputBackupValue) return;

    if (isEditing) {
        const cell = getActiveEditingCell();
        if (cell) {
            cell.textContent = formulaInput.value;
        }
        exitEditMode(true);
        return;
    }

    pushHistory();

    if (text.startsWith("=")) {
        tableData[row][col].formula = text;
    } else {
        tableData[row][col].formula = null;
        tableData[row][col].value = text;
    }

    if (tableData[row][col].formula) {
        tableData[row][col].value = evaluateFormula(
            tableData[row][col].formula,
            row,
            col
        ).toString();
    }

    recalculateAll();
    copiedRange = null;
    internalClipboard = null;
    clipboardMode = null;
    renderTable();
    if (chartConfig) {
        renderChartFromInputs();
    }
}

function commitCellNameInput() {
    const index = cellRefToIndex(cellName.value.trim().toUpperCase());

    if (index && selectCell(index.row, index.col)) {
        focusSelectedCell(true);
        return;
    }

    updateFormulaBar();
}

cellName.addEventListener("focus", () => {
    cellName.select();
});

cellName.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        commitCellNameInput();
    }

    if (e.key === "Escape") {
        e.preventDefault();
        clearClipboardState(true);
        updateFormulaBar();
        focusSelectedCell();
    }
});

cellName.addEventListener("blur", updateFormulaBar);

formulaInput.addEventListener("keydown", (e) => {
    if (e.altKey && e.key === "Enter" && isEditing) {
        e.preventDefault();
        e.stopPropagation();
        const start = formulaInput.selectionStart;
        const end = formulaInput.selectionEnd;
        const value = formulaInput.value;
        formulaInput.value = `${value.slice(0, start)}\n${value.slice(end)}`;
        formulaInput.selectionStart = start + 1;
        formulaInput.selectionEnd = start + 1;
        syncEditingCellFromFormulaBar();
        return;
    }

    if (e.key === "Enter") {
        e.preventDefault();
        commitFormulaInput();
        focusSelectedCell();
    }

    if (e.key === "Escape") {
        e.preventDefault();
        clearClipboardState(true);
        if (isEditing) {
            exitEditMode(false);
        } else {
            updateFormulaBar();
        }
        focusSelectedCell();
    }
});

formulaInput.addEventListener("beforeinput", () => {
    if (!isEditing) {
        clearClipboardState(true, false);
    }
});

formulaInput.addEventListener("input", () => {
    if (isEditing) {
        syncEditingCellFromFormulaBar();
    }
});

formulaInput.addEventListener("blur", () => {
    if (selectedCell) {
        commitFormulaInput();
    }
});

window.addEventListener("click", (e) => {
    if (contextMenu && !contextMenu.contains(e.target)) {
        hideContextMenu();
    }
    if (borderMenu && !borderMenu.contains(e.target) && !borderBtn?.contains(e.target)) {
        hideBorderMenu();
    }
    if (fileMenu && !fileMenu.contains(e.target) && !fileMenuBtn?.contains(e.target)) {
        hideFileMenu();
    }
    if (editMenu && !editMenu.contains(e.target) && !editMenuBtn?.contains(e.target)) {
        hideEditMenu();
    }
});

window.addEventListener("mousedown", (e) => {
    if (e.button !== 0) return;
    if (contextMenu && !contextMenu.contains(e.target)) {
        hideContextMenu();
    }
});

window.addEventListener("contextmenu", (e) => {
    const isSpreadsheetTarget = e.target.closest(
        "#data-table td, #data-table th, #sheet-tabs .sheet-tab"
    );

    if (!isSpreadsheetTarget) {
        hideContextMenu();
    }
});

window.addEventListener("scroll", hideContextMenu, true);
window.addEventListener("scroll", hideBorderMenu, true);
window.addEventListener("scroll", hideFileMenu, true);
window.addEventListener("scroll", hideEditMenu, true);

contextMenu?.addEventListener("click", (e) => {
    e.stopPropagation();
    const button = e.target.closest("[data-action]");
    if (button && !button.disabled) {
        handleContextMenuAction(button.dataset.action);
    }
    hideContextMenu();
});

window.addEventListener("mousemove", (e) => {
    if (!resizeState) return;

    if (resizeState.type === "column") {
        const width = Math.max(
            MIN_COL_WIDTH,
            resizeState.startSize + e.clientX - resizeState.startPosition
        );
        colWidths[resizeState.index] = width;
        applyColumnWidth(resizeState.index);
    }

    if (resizeState.type === "row") {
        const height = Math.max(
            MIN_ROW_HEIGHT,
            resizeState.startSize + e.clientY - resizeState.startPosition
        );
        rowHeights[resizeState.index] = height;
        applyRowHeight(resizeState.index);
    }
});

window.addEventListener("mouseup", () => {
    finishMoveSelection();
    isMouseSelecting = false;
    headerSelectionState = null;
    resizeState = null;
});

window.addEventListener("keydown", (e) => {
    if (e.ctrlKey && !e.shiftKey && e.code === "KeyF") {
        e.preventDefault();
        openFindPanel();
        return;
    }

    if (e.key === "Escape") {
        if (findPanel && !findPanel.hidden) {
            e.preventDefault();
            closeFindPanel();
            return;
        }
        hideContextMenu();
        hideBorderMenu();
        hideFileMenu();
        hideEditMenu();
        if (!isEditing && clearClipboardState(true)) {
            e.preventDefault();
            return;
        }
    }

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
    if (e.ctrlKey && !e.shiftKey && e.code === "KeyZ") {
        e.preventDefault();
        undo();
        return;
    }
    if (
        (e.ctrlKey && e.code === "KeyY") ||
        (e.ctrlKey && e.shiftKey && e.code === "KeyZ")
    ) {
        e.preventDefault();
        redo();
        return;
    }
    if (e.ctrlKey && e.code === "KeyX") {
        if (isEditing || !selectedCell) return;

        cutSelection();
        e.preventDefault();
        return;
    }

    if (e.ctrlKey && e.code === "KeyC") {
        if (isEditing || !selectedCell) return;

        copySelection();
        e.preventDefault();
        return;
    }

    if (e.ctrlKey && e.code === "KeyV") {
        if (isEditing || !internalClipboard || !selectedCell) return;

        pasteClipboard();
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
            selectionRange = null;
            selectionMode = "cell";
            renderTable();
            focusSelectedCell();
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

        pushHistory();
        tableData[row][col] = {
            value: "",
            formula: null
        };
        recalculateAll();
        clearClipboardState();
        renderTable();
        focusSelectedCell();
        return;
    }

    // SELECTION MODE → yazı ile edit'e gir
    if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        clearClipboardState();
        enterEditMode(row, col, e.key);
        return;
    }
    const navigationBase = e.shiftKey && selectionRange
        ? selectionRange.end
        : selectedCell;
    const baseRow = navigationBase.row;
    const baseCol = navigationBase.col;
    let newRow = baseRow;
    let newCol = baseCol;
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
            newRow = Math.max(0, baseRow - 1);
            break;
        case "ArrowDown":
            newRow = Math.min(rowCount - 1, baseRow + 1);
            break;
        case "ArrowLeft":
            newCol = Math.max(0, baseCol - 1);
            break;
        case "ArrowRight":
            newCol = Math.min(colCount - 1, baseCol + 1);
            break;
    }
    e.preventDefault();

    if (newRow !== baseRow || newCol !== baseCol) {
        if (e.shiftKey) {
            extraSelections = [];
            if (!selectionRange) {
                selectionRange = {
                    start: { ...selectedCell },
                    end: { row: newRow, col: newCol }
                };
            } else {
                selectionRange.end = { row: newRow, col: newCol };
            }
            selectionMode = "range";
        } else {
            selectedCell = { row: newRow, col: newCol };
            selectionRange = null;
            selectionMode = "cell";
            extraSelections = [];
        }
        renderTable();
        focusSelectedCell();
    }
});
// INIT
initData();
sheets = [createSheetState("Sayfa1")];
renderSheetTabs();
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
    if (!CHARTS_ENABLED) return;

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
        if (!CHARTS_ENABLED) return;

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

    const start = cellRefToIndex(match[1].toUpperCase());
    const end = cellRefToIndex(match[2].toUpperCase());

    if (!isRangeWithinBounds(start, end)) return null;

    return {
        start,
        end
    };
}

function getCellsFromRange(range) {
    if (!range || !isRangeWithinBounds(range.start, range.end)) return [];

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
    if (!CHARTS_ENABLED) return;

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
