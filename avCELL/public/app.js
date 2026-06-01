// görünüm menüsündeki yakınlaştırma seçeneklerini (%100,%50 gibi) büyüteçli (içinde + olsa iyi olur.) simgesi olan bir sağa açılır Yakınlaştır menüsü altına toplayalım.
// görünüm menüsüne de bu satır/sütun dondurma özelliğini aynı icon ile sağa açılır bir Dondur menüsü altına ekleyelim.
const table = document.getElementById("data-table");
const addRowBtn = document.getElementById("add-row-btn");
const addRowDownBtn = document.getElementById("add-row-down-btn");
const removeRowBtn = document.getElementById("remove-row-btn");
const addColBtn = document.getElementById("add-col-btn");
const addColRightBtn = document.getElementById("add-col-right-btn");
const removeColBtn = document.getElementById("remove-col-btn");
const undoBtn = document.getElementById("undo-btn");
const redoBtn = document.getElementById("redo-btn");
const cellName = document.getElementById("cell-name");
const formulaInput = document.getElementById("formula-input");
const findToggleBtn = document.getElementById("find-toggle-btn");
const findPanel = document.getElementById("find-panel");
const findInput = document.getElementById("find-input");
const findCount = document.getElementById("find-count");
const findPrevBtn = document.getElementById("find-prev-btn");
const findNextBtn = document.getElementById("find-next-btn");
const replaceInput = document.getElementById("replace-input");
const replaceBtn = document.getElementById("replace-btn");
const replaceAllBtn = document.getElementById("replace-all-btn");
const findCloseBtn = document.getElementById("find-close-btn");
const fileMenuBtn = document.getElementById("file-menu-btn");
const fileMenu = document.getElementById("file-menu");
const newFileBtn = document.getElementById("new-file-btn");
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
const menuDeleteBtn = document.getElementById("menu-delete-btn");
const menuFindBtn = document.getElementById("menu-find-btn");
const viewMenuBtn = document.getElementById("view-menu-btn");
const viewMenu = document.getElementById("view-menu");
const menuViewToolbarBtn = document.getElementById("menu-view-toolbar-btn");
const menuViewFormulaBtn = document.getElementById("menu-view-formula-btn");
const menuViewGridlinesBtn = document.getElementById("menu-view-gridlines-btn");
const insertMenuBtn = document.getElementById("insert-menu-btn");
const insertMenu = document.getElementById("insert-menu");
const menuInsertRowsBtn = document.getElementById("menu-insert-rows-btn");
const menuInsertColsBtn = document.getElementById("menu-insert-cols-btn");
const insertChartBtn = document.getElementById("insert-chart-btn");
const dataMenuBtn = document.getElementById("data-menu-btn");
const dataMenu = document.getElementById("data-menu");
const menuSortAscBtn = document.getElementById("menu-sort-asc-btn");
const menuSortDescBtn = document.getElementById("menu-sort-desc-btn");
const menuFilterBtn = document.getElementById("menu-filter-btn");
const sortAscBtn = document.getElementById("sort-asc-btn");
const sortDescBtn = document.getElementById("sort-desc-btn");
const filterBtn = document.getElementById("filter-btn");
const hideAxisBtn = document.getElementById("hide-axis-btn");
const showAxisBtn = document.getElementById("show-axis-btn");
const freezeAxisBtn = document.getElementById("freeze-axis-btn");
const formatMenuBtn = document.getElementById("format-menu-btn");
const formatMenu = document.getElementById("format-menu");
const menuBoldBtn = document.getElementById("menu-bold-btn");
const menuItalicBtn = document.getElementById("menu-italic-btn");
const menuUnderlineBtn = document.getElementById("menu-underline-btn");
const menuStrikethroughBtn = document.getElementById("menu-strikethrough-btn");
const menuFontSizeIncreaseBtn = document.getElementById("menu-font-size-increase-btn");
const menuFontSizeDecreaseBtn = document.getElementById("menu-font-size-decrease-btn");
const menuTextColorBtn = document.getElementById("menu-text-color-btn");
const menuFillColorBtn = document.getElementById("menu-fill-color-btn");
const menuAlignBtn = document.getElementById("menu-align-btn");
const menuAlignLeftBtn = document.getElementById("menu-align-left-btn");
const menuAlignCenterBtn = document.getElementById("menu-align-center-btn");
const menuAlignRightBtn = document.getElementById("menu-align-right-btn");
const menuAlignJustifyBtn = document.getElementById("menu-align-justify-btn");
const menuAlignTopBtn = document.getElementById("menu-align-top-btn");
const menuAlignMiddleBtn = document.getElementById("menu-align-middle-btn");
const menuAlignBottomBtn = document.getElementById("menu-align-bottom-btn");
const menuBorderBtn = document.getElementById("menu-border-btn");
const menuMergeBtn = document.getElementById("menu-merge-btn");
const contextMenu = document.getElementById("context-menu");
const borderBtn = document.getElementById("border-btn");
const borderMenu = document.getElementById("border-menu");
const mergeBtn = document.getElementById("merge-btn");
const zoomValueBtn = document.getElementById("zoom-value-btn");
const zoomMenu = document.getElementById("zoom-menu");
const currencyFormatBtn = document.getElementById("currency-format-btn");
const percentFormatBtn = document.getElementById("percent-format-btn");
const decimalDecreaseBtn = document.getElementById("decimal-decrease-btn");
const decimalIncreaseBtn = document.getElementById("decimal-increase-btn");
const numberFormatMoreBtn = document.getElementById("number-format-more-btn");
const numberFormatMenu = document.getElementById("number-format-menu");
const boldBtn = document.getElementById("bold-btn");
const italicBtn = document.getElementById("italic-btn");
const underlineBtn = document.getElementById("underline-btn");
const strikethroughBtn = document.getElementById("strikethrough-btn");
const fontSizeDecreaseBtn = document.getElementById("font-size-decrease-btn");
const fontSizeIncreaseBtn = document.getElementById("font-size-increase-btn");
const textColorBtn = document.getElementById("text-color-btn");
const fillColorBtn = document.getElementById("fill-color-btn");
const textColorInput = document.getElementById("text-color-input");
const fillColorInput = document.getElementById("fill-color-input");
const alignLeftBtn = document.getElementById("align-left-btn");
const alignCenterBtn = document.getElementById("align-center-btn");
const alignRightBtn = document.getElementById("align-right-btn");
const alignJustifyBtn = document.getElementById("align-justify-btn");
const alignTopBtn = document.getElementById("align-top-btn");
const alignMiddleBtn = document.getElementById("align-middle-btn");
const alignBottomBtn = document.getElementById("align-bottom-btn");
const sheetTabs = document.getElementById("sheet-tabs");
const tableArea = document.getElementById("sheet-scroll");
const chartWindows = document.getElementById("chart-windows");
const chartSettingsPanel = document.getElementById("chart-settings-panel");
const chartSettingsTitle = document.getElementById("chart-settings-title");
const chartSettingsCloseBtn = document.getElementById("chart-settings-close-btn");
const chartSettingsTitleInput = document.getElementById("chart-settings-title-input");
const chartSettingsTypeInput = document.getElementById("chart-settings-type");
const chartSettingsTypeBtn = document.getElementById("chart-settings-type-btn");
const chartSettingsTypeMenu = document.getElementById("chart-settings-type-menu");
const chartSettingsLabelRangeInput = document.getElementById("chart-settings-label-range");
const chartSettingsValueRangeInput = document.getElementById("chart-settings-value-range");
const chartSettingsGridlinesInput = document.getElementById("chart-settings-gridlines");
const chartSettingsGridlinesField = chartSettingsGridlinesInput?.closest(".chart-settings-check");
const filterPopup = document.getElementById("filter-popup");
const filterPopupTitle = document.getElementById("filter-popup-title");
const filterPopupInput = document.getElementById("filter-popup-input");
const filterPopupApplyBtn = document.getElementById("filter-popup-apply-btn");
const filterPopupClearBtn = document.getElementById("filter-popup-clear-btn");
const MIN_ROW_SIZE = 20;
const MIN_COL_SIZE = 10;
const DEFAULT_COL_WIDTH = 84;
const DEFAULT_ROW_HEIGHT = 26;
const MIN_COL_WIDTH = 48;
const MIN_ROW_HEIGHT = 22;
const DEFAULT_FONT_SIZE = 13;
const MIN_FONT_SIZE = 8;
const MAX_FONT_SIZE = 36;
const MIN_ZOOM = 50;
const MAX_ZOOM = 200;
const ZOOM_LEVELS = [50, 75, 90, 100, 125, 150, 200];
const SAVE_NAME_COUNTER_KEY = "avcell.nextSaveNumber";
const VIEW_SETTINGS_KEY = "avcell.viewSettings";
const AUTOSAVE_KEY = "avcell.autosaveWorkbook";
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
let draggingSheetIndex = null;
let sheetDragOverIndex = null;
let currentWorkbookFileName = null;
let currentWorkbookFileHandle = null;
let tableData = [];
let colWidths = [];
let rowHeights = [];
let hiddenRows = new Set();
let hiddenCols = new Set();
let frozenRows = 0;
let frozenCols = 0;
let isMouseSelecting = false;
let mouseSelectionMoved = false;
let headerSelectionState = null;
let moveSelectionState = null;
let suppressClickAfterMove = false;
let resizeState = null;
let freezeDragState = null;
let undoStack = [];
let redoStack = [];
let isRestoringHistory = false;
let isAppInitialized = false;
let isLoadingWorkbook = false;
let autoSaveTimer = null;
let isEditing = false;
let editBackupValue = "";
let formulaInputBackupValue = "";
let activeFilter = null;
let filterPopupColumn = null;
let charts = [];
let nextChartNumber = 1;
let activeChart = null;
let chartZIndex = 20;
let chartDragState = null;
let chartResizeState = null;
const MAX_HISTORY_SIZE = 60;
const CHART_TYPES = ["bar", "line", "pie", "horizontalBar", "area", "doughnut", "radar"];
const COLOR_PALETTE = [
    "#000000", "#434343", "#666666", "#999999", "#cccccc", "#ffffff",
    "#d93025", "#f4511e", "#fbbc04", "#34a853", "#0f9d58", "#00acc1",
    "#1a73e8", "#3f51b5", "#673ab7", "#9c27b0", "#e91e63", "#795548",
    "#f4cccc", "#fce5cd", "#fff2cc", "#d9ead3", "#d0e0e3", "#cfe2f3",
    "#c9daf8", "#d9d2e9", "#ead1dc", "#efefef", "#b7b7b7", "#202124"
];


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

function parseFormulaReference(ref) {
    const match = String(ref).match(/^(\$?)([A-Z]+)(\$?)(\d+)$/i);
    if (!match) return null;

    const [, colAbsolute, colLetters, rowAbsolute, rowNumber] = match;
    const index = cellRefToIndex(`${colLetters}${rowNumber}`.toUpperCase());
    if (!index) return null;

    return {
        colAbsolute: Boolean(colAbsolute),
        rowAbsolute: Boolean(rowAbsolute),
        row: index.row,
        col: index.col
    };
}

function formatFormulaReference(ref) {
    return `${ref.colAbsolute ? "$" : ""}${getColumnLabel(ref.col)}${ref.rowAbsolute ? "$" : ""}${ref.row + 1}`;
}

function adjustFormulaReference(ref, rowOffset, colOffset) {
    const parsedRef = parseFormulaReference(ref);
    if (!parsedRef) return ref;

    const nextRef = {
        ...parsedRef,
        row: parsedRef.rowAbsolute ? parsedRef.row : parsedRef.row + rowOffset,
        col: parsedRef.colAbsolute ? parsedRef.col : parsedRef.col + colOffset
    };

    if (nextRef.row < 0 || nextRef.col < 0) return "#REF!";
    return formatFormulaReference(nextRef);
}

function adjustFormulaReferences(formula, rowOffset, colOffset) {
    if (!formula || (!rowOffset && !colOffset)) return formula;

    return formula.replace(/(^|[^A-Z0-9_])(\$?[A-Z]+\$?\d+)/gi, (match, prefix, ref) => (
        `${prefix}${adjustFormulaReference(ref, rowOffset, colOffset)}`
    ));
}

function countIndexesBefore(indexes, position) {
    return indexes.filter((index) => index < position).length;
}

function mapDeletedAxisPosition(position, deletedIndexes) {
    if (deletedIndexes.includes(position)) return null;
    return position - countIndexesBefore(deletedIndexes, position);
}

function adjustCellReferenceForGridChange(ref, change) {
    const parsedRef = parseFormulaReference(ref);
    if (!parsedRef) return ref;

    const nextRef = { ...parsedRef };

    if (change.mode === "insert") {
        if (change.axis === "row" && parsedRef.row >= change.index) {
            nextRef.row += change.count;
        }
        if (change.axis === "column" && parsedRef.col >= change.index) {
            nextRef.col += change.count;
        }
        return formatFormulaReference(nextRef);
    }

    const deletedIndexes = change.indexes ?? [];
    if (change.axis === "row") {
        const mappedRow = mapDeletedAxisPosition(parsedRef.row, deletedIndexes);
        if (mappedRow === null) return "#REF!";
        nextRef.row = mappedRow;
    }
    if (change.axis === "column") {
        const mappedCol = mapDeletedAxisPosition(parsedRef.col, deletedIndexes);
        if (mappedCol === null) return "#REF!";
        nextRef.col = mappedCol;
    }

    return formatFormulaReference(nextRef);
}

function getRemainingAxisBounds(minPosition, maxPosition, deletedIndexes) {
    const remaining = [];

    for (let position = minPosition; position <= maxPosition; position++) {
        if (!deletedIndexes.includes(position)) remaining.push(position);
    }

    if (!remaining.length) return null;

    return {
        min: mapDeletedAxisPosition(remaining[0], deletedIndexes),
        max: mapDeletedAxisPosition(remaining[remaining.length - 1], deletedIndexes)
    };
}

function adjustFormulaRangeForGridChange(startRef, endRef, change) {
    const start = parseFormulaReference(startRef);
    const end = parseFormulaReference(endRef);
    if (!start || !end) return `${startRef}:${endRef}`;

    const nextStart = { ...start };
    const nextEnd = { ...end };

    if (change.mode === "insert") {
        if (change.axis === "row") {
            if (nextStart.row >= change.index) nextStart.row += change.count;
            if (nextEnd.row >= change.index) nextEnd.row += change.count;
        }
        if (change.axis === "column") {
            if (nextStart.col >= change.index) nextStart.col += change.count;
            if (nextEnd.col >= change.index) nextEnd.col += change.count;
        }

        return `${formatFormulaReference(nextStart)}:${formatFormulaReference(nextEnd)}`;
    }

    const deletedIndexes = change.indexes ?? [];

    if (change.axis === "row") {
        const minRow = Math.min(start.row, end.row);
        const maxRow = Math.max(start.row, end.row);
        const remainingRows = getRemainingAxisBounds(minRow, maxRow, deletedIndexes);
        if (!remainingRows) return "#REF!";

        if (start.row <= end.row) {
            nextStart.row = remainingRows.min;
            nextEnd.row = remainingRows.max;
        } else {
            nextStart.row = remainingRows.max;
            nextEnd.row = remainingRows.min;
        }

        nextStart.col = mapDeletedAxisPosition(start.col, []);
        nextEnd.col = mapDeletedAxisPosition(end.col, []);
    }

    if (change.axis === "column") {
        const minCol = Math.min(start.col, end.col);
        const maxCol = Math.max(start.col, end.col);
        const remainingCols = getRemainingAxisBounds(minCol, maxCol, deletedIndexes);
        if (!remainingCols) return "#REF!";

        if (start.col <= end.col) {
            nextStart.col = remainingCols.min;
            nextEnd.col = remainingCols.max;
        } else {
            nextStart.col = remainingCols.max;
            nextEnd.col = remainingCols.min;
        }
    }

    return `${formatFormulaReference(nextStart)}:${formatFormulaReference(nextEnd)}`;
}

function adjustFormulaForGridChange(formula, change) {
    if (!formula) return formula;

    const rangePlaceholders = [];
    let nextFormula = formula.replace(
        /(\$?[A-Z]+\$?\d+):(\$?[A-Z]+\$?\d+)/gi,
        (match, startRef, endRef) => {
            const placeholder = `@@AVCELL_RANGE_${rangePlaceholders.length}@@`;
            rangePlaceholders.push(adjustFormulaRangeForGridChange(startRef, endRef, change));
            return placeholder;
        }
    );

    nextFormula = nextFormula.replace(/(^|[^A-Z0-9_])(\$?[A-Z]+\$?\d+)/gi, (match, prefix, ref) => (
        `${prefix}${adjustCellReferenceForGridChange(ref, change)}`
    ));

    rangePlaceholders.forEach((range, index) => {
        nextFormula = nextFormula.replace(`@@AVCELL_RANGE_${index}@@`, range);
    });

    return nextFormula;
}

function adjustAllFormulasForGridChange(change) {
    for (let r = 0; r < rowCount; r++) {
        for (let c = 0; c < colCount; c++) {
            const cell = tableData[r]?.[c];
            if (cell?.formula) {
                cell.formula = adjustFormulaForGridChange(cell.formula, change);
            }
        }
    }
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
    const canUseSelection = Boolean(selectedCell) && !isEditing;
    const canMergeSelection = hasMultiCellActiveRange() && !isEditing;
    const canDeleteRows = isRowSelection && rowCount - selectedRowCount >= MIN_ROW_SIZE;
    const canDeleteCols = isColumnSelection && colCount - selectedColCount >= MIN_COL_SIZE;

    addRowBtn.disabled = !isRowSelection;
    addRowDownBtn.disabled = !isRowSelection;
    removeRowBtn.disabled = !canDeleteRows;
    addColBtn.disabled = !isColumnSelection;
    addColRightBtn.disabled = !isColumnSelection;
    removeColBtn.disabled = !canDeleteCols;
    addRowBtn.title = isRowSelection ? `Üste ${selectedRowCount} satır ekle` : "Satır seç";
    addRowDownBtn.title = isRowSelection ? `Alta ${selectedRowCount} satır ekle` : "Satır seç";
    removeRowBtn.title = isRowSelection ? `${selectedRowCount} satır sil` : "Satır seç";
    addColBtn.title = isColumnSelection ? `Sola ${selectedColCount} sütun ekle` : "Sütun seç";
    addColRightBtn.title = isColumnSelection ? `Sağa ${selectedColCount} sütun ekle` : "Sütun seç";
    removeColBtn.title = isColumnSelection ? `${selectedColCount} sütun sil` : "Sütun seç";
    undoBtn.disabled = undoStack.length === 0;
    redoBtn.disabled = redoStack.length === 0;
    const canSort = canSortActiveRange();
    const hasFilter = Boolean(activeFilter);
    if (sortAscBtn) sortAscBtn.disabled = !canSort;
    if (sortDescBtn) sortDescBtn.disabled = !canSort;
    if (filterBtn) filterBtn.disabled = !canSort;
    filterBtn?.classList.toggle("active", hasFilter);
    if (filterBtn) {
        filterBtn.title = hasFilter ? "Filtreyi kaldır" : "Filtre oluştur";
    }

    [
        borderBtn,
        boldBtn,
        italicBtn,
        underlineBtn,
        strikethroughBtn,
        fontSizeDecreaseBtn,
        fontSizeIncreaseBtn,
        textColorBtn,
        fillColorBtn,
        currencyFormatBtn,
        percentFormatBtn,
        decimalDecreaseBtn,
        decimalIncreaseBtn,
        numberFormatMoreBtn,
        alignLeftBtn,
        alignCenterBtn,
        alignRightBtn,
        alignJustifyBtn,
        alignTopBtn,
        alignMiddleBtn,
        alignBottomBtn
    ].forEach((button) => {
        if (button) button.disabled = !canUseSelection;
    });
    if (mergeBtn) mergeBtn.disabled = !canMergeSelection;

    const style = selectedCell ? getCellStyle(tableData[selectedCell.row]?.[selectedCell.col]) : createDefaultCellStyle();
    boldBtn?.classList.toggle("active", Boolean(style.bold));
    italicBtn?.classList.toggle("active", Boolean(style.italic));
    underlineBtn?.classList.toggle("active", Boolean(style.underline));
    strikethroughBtn?.classList.toggle("active", Boolean(style.strikeThrough));
    alignLeftBtn?.classList.toggle("active", style.horizontalAlign === "left");
    alignCenterBtn?.classList.toggle("active", style.horizontalAlign === "center");
    alignRightBtn?.classList.toggle("active", style.horizontalAlign === "right");
    alignJustifyBtn?.classList.toggle("active", style.horizontalAlign === "justify");
    alignTopBtn?.classList.toggle("active", style.verticalAlign === "top");
    alignMiddleBtn?.classList.toggle("active", style.verticalAlign === "middle");
    alignBottomBtn?.classList.toggle("active", style.verticalAlign === "bottom");
    const activeTextColor = normalizeColorValue(style.color, "#202124");
    if (textColorInput) textColorInput.value = activeTextColor;
    updateTextColorIndicator(activeTextColor);
    const activeFillColor = normalizeColorValue(style.backgroundColor, "#fff2cc");
    if (fillColorInput) fillColorInput.value = activeFillColor;
    updateFillColorIndicator(activeFillColor);
    updateEditMenuState();
    updateInsertMenuState();
    updateDataMenuState();
    updateFormatMenuState();
}

function updateTextColorIndicator(color) {
    const normalizedColor = normalizeColorValue(color, "#202124");
    [textColorBtn, menuTextColorBtn].forEach((button) => {
        button?.style.setProperty("--text-color-indicator", normalizedColor);
    });
}

function updateFillColorIndicator(color) {
    const normalizedColor = normalizeColorValue(color, "#fff2cc");
    [fillColorBtn, menuFillColorBtn].forEach((button) => {
        button?.style.setProperty("--fill-color-indicator", normalizedColor);
    });
}

function updateEditMenuState() {
    const canUseSelection = Boolean(selectedCell) && !isEditing;
    const selectedRowCount = getSelectedRowIndexes().length;
    const selectedColCount = getSelectedColumnIndexes().length;
    const canDeleteRows = selectionMode === "row" && selectedRowCount > 0 && rowCount - selectedRowCount >= MIN_ROW_SIZE && !isEditing;
    const canDeleteCols = selectionMode === "column" && selectedColCount > 0 && colCount - selectedColCount >= MIN_COL_SIZE && !isEditing;
    const canDeleteSheet = sheets.length > 1 && !isEditing;
    const canClearCells = canUseSelection && hasClearableContent();
    if (menuUndoBtn) menuUndoBtn.disabled = undoStack.length === 0;
    if (menuRedoBtn) menuRedoBtn.disabled = redoStack.length === 0;
    if (menuCutBtn) menuCutBtn.disabled = !canUseSelection;
    if (menuCopyBtn) menuCopyBtn.disabled = !canUseSelection;
    if (menuPasteBtn) menuPasteBtn.disabled = !canUseSelection || !internalClipboard;
    if (menuDeleteBtn) menuDeleteBtn.disabled = false;
    editMenu?.querySelectorAll("[data-delete-action]").forEach((button) => {
        const action = button.dataset.deleteAction;
        if (action === "row") button.disabled = !canDeleteRows;
        if (action === "column") button.disabled = !canDeleteCols;
        if (action === "sheet") button.disabled = !canDeleteSheet;
        if (action === "clear") button.disabled = !canClearCells;
    });
}

function getDefaultViewSettings() {
    return {
        toolbar: true,
        formulaBar: true,
        gridlines: true,
        zoom: 100
    };
}

function normalizeZoom(value) {
    const numericValue = Number(value);
    if (!Number.isFinite(numericValue)) return 100;

    const boundedValue = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, numericValue));
    return ZOOM_LEVELS.reduce((closest, level) => (
        Math.abs(level - boundedValue) < Math.abs(closest - boundedValue) ? level : closest
    ), 100);
}

function getCurrentZoom() {
    return normalizeZoom(loadViewSettings().zoom);
}

function getZoomScale() {
    return getCurrentZoom() / 100;
}

function loadViewSettings() {
    try {
        return {
            ...getDefaultViewSettings(),
            ...JSON.parse(localStorage.getItem(VIEW_SETTINGS_KEY) || "{}")
        };
    } catch {
        return getDefaultViewSettings();
    }
}

function saveViewSettings(settings) {
    localStorage.setItem(VIEW_SETTINGS_KEY, JSON.stringify(settings));
}

function updateViewMenuState(settings = loadViewSettings()) {
    const setCheck = (button, isChecked) => {
        const check = button?.querySelector(".menu-check");
        if (check) check.classList.toggle("unchecked", !isChecked);
    };

    setCheck(menuViewToolbarBtn, settings.toolbar);
    setCheck(menuViewFormulaBtn, settings.formulaBar);
    setCheck(menuViewGridlinesBtn, settings.gridlines);

    const zoom = normalizeZoom(settings.zoom);
    if (zoomValueBtn) zoomValueBtn.textContent = `${zoom}%`;
    document.querySelectorAll("[data-zoom-value]").forEach((button) => {
        const isActive = Number(button.dataset.zoomValue) === zoom;
        button.classList.toggle("active", isActive);
        const check = button.querySelector(".menu-check");
        if (check) check.classList.toggle("unchecked", !isActive);
    });
}

function applyViewSettings(settings = loadViewSettings(), shouldSave = false) {
    document.body.classList.toggle("toolbar-hidden", !settings.toolbar);
    document.body.classList.toggle("formula-hidden", !settings.formulaBar);
    document.body.classList.toggle("gridlines-hidden", !settings.gridlines);
    settings.zoom = normalizeZoom(settings.zoom);
    updateViewMenuState(settings);

    if (shouldSave) {
        saveViewSettings(settings);
    }
}

function toggleViewSetting(key) {
    const settings = loadViewSettings();
    settings[key] = !settings[key];
    applyViewSettings(settings, true);
}

function setZoom(zoomValue) {
    const settings = loadViewSettings();
    settings.zoom = normalizeZoom(zoomValue);
    applyViewSettings(settings, true);
    renderTable();
    focusSelectedCell();
}

function updateFormatMenuState() {
    const canUseSelection = Boolean(selectedCell) && !isEditing;
    const canMergeSelection = hasMultiCellActiveRange() && !isEditing;
    [
        menuBoldBtn,
        menuItalicBtn,
        menuUnderlineBtn,
        menuStrikethroughBtn,
        menuFontSizeIncreaseBtn,
        menuFontSizeDecreaseBtn,
        menuTextColorBtn,
        menuFillColorBtn,
        menuAlignBtn,
        menuAlignLeftBtn,
        menuAlignCenterBtn,
        menuAlignRightBtn,
        menuAlignJustifyBtn,
        menuAlignTopBtn,
        menuAlignMiddleBtn,
        menuAlignBottomBtn,
        menuBorderBtn
    ].forEach((button) => {
        if (button) button.disabled = !canUseSelection;
    });
    if (menuMergeBtn) menuMergeBtn.disabled = !canMergeSelection;
}

function updateNumberFormatMenuState() {
    const activeFormat = selectedCell
        ? getCellStyle(tableData[selectedCell.row]?.[selectedCell.col]).numberFormat
        : "automatic";

    numberFormatMenu?.querySelectorAll("[data-number-format]").forEach((button) => {
        const isActive = button.dataset.numberFormat === activeFormat;
        button.classList.toggle("active", isActive);
        const check = button.querySelector(".menu-check");
        if (check) check.classList.toggle("unchecked", !isActive);
    });
}

function updateInsertMenuState() {
    const isRowSelection = selectionMode === "row" && getSelectedRowIndexes().length > 0 && !isEditing;
    const isColumnSelection = selectionMode === "column" && getSelectedColumnIndexes().length > 0 && !isEditing;

    if (menuInsertRowsBtn) menuInsertRowsBtn.disabled = false;
    if (menuInsertColsBtn) menuInsertColsBtn.disabled = false;

    insertMenu?.querySelectorAll("[data-insert-action='row-above'], [data-insert-action='row-below']").forEach((button) => {
        button.disabled = !isRowSelection;
    });
    insertMenu?.querySelectorAll("[data-insert-action='col-left'], [data-insert-action='col-right']").forEach((button) => {
        button.disabled = !isColumnSelection;
    });
}

function canSortActiveRange() {
    const range = getActiveRange();
    if (!range || isEditing) return false;

    return range.maxRow > range.minRow && range.maxCol >= range.minCol;
}

function updateDataMenuState() {
    const canSort = canSortActiveRange();
    const hasFilter = Boolean(activeFilter);
    if (menuSortAscBtn) menuSortAscBtn.disabled = !canSort;
    if (menuSortDescBtn) menuSortDescBtn.disabled = !canSort;
    if (menuFilterBtn) {
        menuFilterBtn.disabled = !canSort && !hasFilter;
        const label = menuFilterBtn.querySelector("span");
        if (label) label.textContent = hasFilter ? "Filtreyi kaldır" : "Filtre oluştur";
    }
    if (sortAscBtn) sortAscBtn.disabled = !canSort;
    if (sortDescBtn) sortDescBtn.disabled = !canSort;
    if (filterBtn) filterBtn.disabled = !canSort && !hasFilter;
    filterBtn?.classList.toggle("active", hasFilter);
    if (filterBtn) {
        filterBtn.title = hasFilter ? "Filtreyi kaldır" : "Filtre oluştur";
    }
    const isRowSelection = selectionMode === "row" && getSelectedRowIndexes().length > 0;
    const isColumnSelection = selectionMode === "column" && getSelectedColumnIndexes().length > 0;
    if (hideAxisBtn) {
        hideAxisBtn.disabled = !(isRowSelection || isColumnSelection) || isEditing;
        hideAxisBtn.title = isRowSelection
            ? "Seçili satırları gizle"
            : isColumnSelection
                ? "Seçili sütunları gizle"
                : "Satır veya sütun seç";
    }
    if (showAxisBtn) {
        showAxisBtn.disabled = (hiddenRows.size === 0 && hiddenCols.size === 0) || isEditing;
    }
    if (freezeAxisBtn) {
        const canFreezeAxis = isRowSelection || isColumnSelection;
        freezeAxisBtn.disabled = !canFreezeAxis || isEditing;
        freezeAxisBtn.classList.toggle("active", Boolean(frozenRows || frozenCols));

        if (isRowSelection) {
            const rows = getSelectedRowIndexes();
            const selectedFreezeLine = Math.max(...rows) + 1;

            freezeAxisBtn.title =
                frozenRows === selectedFreezeLine
                    ? "Seçilen satırı çöz"
                    : "Seçilen satırı dondur";
        } else if (isColumnSelection) {
            const cols = getSelectedColumnIndexes();
            const selectedFreezeLine = Math.max(...cols) + 1;

            freezeAxisBtn.title =
                frozenCols === selectedFreezeLine
                    ? "Seçilen sütunu çöz"
                    : "Seçilen sütunu dondur";
        } else {
            freezeAxisBtn.title = "Satır veya sütun seç";
        }
    }
}

function hideContextMenu() {
    if (!contextMenu) return;

    contextMenu.hidden = true;
}

function hideBorderMenu() {
    if (!borderMenu) return;

    borderMenu.hidden = true;
}

function hideColorPaletteMenus() {
    document.querySelectorAll(".color-palette-menu").forEach((menu) => {
        menu.hidden = true;
    });
}

function hideZoomMenu() {
    if (!zoomMenu) return;

    zoomMenu.hidden = true;
}

function hideNumberFormatMenu() {
    if (!numberFormatMenu) return;

    numberFormatMenu.hidden = true;
}

function hideChartTypeMenu() {
    if (!chartSettingsTypeMenu) return;

    chartSettingsTypeMenu.hidden = true;
    chartSettingsTypeBtn?.setAttribute("aria-expanded", "false");
}

function hideFilterPopup() {
    if (!filterPopup) return;

    filterPopup.hidden = true;
    filterPopupColumn = null;
}

function updateTextMenuActiveState() {
    fileMenuBtn?.classList.toggle("active", Boolean(fileMenu && !fileMenu.hidden));
    editMenuBtn?.classList.toggle("active", Boolean(editMenu && !editMenu.hidden));
    viewMenuBtn?.classList.toggle("active", Boolean(viewMenu && !viewMenu.hidden));
    insertMenuBtn?.classList.toggle("active", Boolean(insertMenu && !insertMenu.hidden));
    dataMenuBtn?.classList.toggle("active", Boolean(dataMenu && !dataMenu.hidden));
    formatMenuBtn?.classList.toggle("active", Boolean(formatMenu && !formatMenu.hidden));
}

function hasOpenTextMenu() {
    return Boolean(
        (fileMenu && !fileMenu.hidden) ||
        (editMenu && !editMenu.hidden) ||
        (viewMenu && !viewMenu.hidden) ||
        (insertMenu && !insertMenu.hidden) ||
        (dataMenu && !dataMenu.hidden) ||
        (formatMenu && !formatMenu.hidden)
    );
}

function openTextMenu(menuName) {
    hideFileMenu();
    hideEditMenu();
    hideViewMenu();
    hideInsertMenu();
    hideDataMenu();
    hideFormatMenu();
    hideZoomMenu();
    hideNumberFormatMenu();
    hideContextMenu();
    hideBorderMenu();
    hideColorPaletteMenus();

    if (menuName === "file" && fileMenu) fileMenu.hidden = false;
    if (menuName === "edit" && editMenu) {
        updateEditMenuState();
        editMenu.hidden = false;
    }
    if (menuName === "view" && viewMenu) {
        updateViewMenuState();
        viewMenu.hidden = false;
    }
    if (menuName === "insert" && insertMenu) {
        updateInsertMenuState();
        insertMenu.hidden = false;
    }
    if (menuName === "data" && dataMenu) {
        updateDataMenuState();
        dataMenu.hidden = false;
    }
    if (menuName === "format" && formatMenu) {
        updateFormatMenuState();
        formatMenu.hidden = false;
    }
    updateTextMenuActiveState();
}

function hideFileMenu() {
    if (!fileMenu) return;

    fileMenu.hidden = true;
    updateTextMenuActiveState();
}

function hideEditMenu() {
    if (!editMenu) return;

    editMenu.hidden = true;
    updateTextMenuActiveState();
}

function hideViewMenu() {
    if (!viewMenu) return;

    viewMenu.hidden = true;
    updateTextMenuActiveState();
}

function hideInsertMenu() {
    if (!insertMenu) return;

    insertMenu.hidden = true;
    updateTextMenuActiveState();
}

function hideDataMenu() {
    if (!dataMenu) return;

    dataMenu.hidden = true;
    updateTextMenuActiveState();
}

function hideFormatMenu() {
    if (!formatMenu) return;

    formatMenu.hidden = true;
    updateTextMenuActiveState();
}

function showBorderMenu(anchor = borderBtn) {
    if (!anchor || !borderMenu) return;

    const buttonRect = anchor.getBoundingClientRect();
    borderMenu.hidden = false;
    const menuRect = borderMenu.getBoundingClientRect();
    const left = Math.min(buttonRect.left, window.innerWidth - menuRect.width - 8);
    const top = Math.min(buttonRect.bottom + 4, window.innerHeight - menuRect.height - 8);

    borderMenu.style.left = `${Math.max(8, left)}px`;
    borderMenu.style.top = `${Math.max(8, top)}px`;
}

function showZoomMenu() {
    if (!zoomMenu || !zoomValueBtn) return;

    const buttonRect = zoomValueBtn.getBoundingClientRect();
    zoomMenu.hidden = false;
    updateViewMenuState();
    const menuRect = zoomMenu.getBoundingClientRect();
    const left = Math.min(buttonRect.left, window.innerWidth - menuRect.width - 8);
    const top = Math.min(buttonRect.bottom + 4, window.innerHeight - menuRect.height - 8);

    zoomMenu.style.left = `${Math.max(8, left)}px`;
    zoomMenu.style.top = `${Math.max(8, top)}px`;
}

function showNumberFormatMenu() {
    if (!numberFormatMenu || !numberFormatMoreBtn) return;

    const buttonRect = numberFormatMoreBtn.getBoundingClientRect();
    numberFormatMenu.hidden = false;
    updateNumberFormatMenuState();
    const menuRect = numberFormatMenu.getBoundingClientRect();
    const left = Math.min(buttonRect.left, window.innerWidth - menuRect.width - 8);
    const top = Math.min(buttonRect.bottom + 4, window.innerHeight - menuRect.height - 8);

    numberFormatMenu.style.left = `${Math.max(8, left)}px`;
    numberFormatMenu.style.top = `${Math.max(8, top)}px`;
}

function createColorPaletteMenu(id, applyColor, resetLabel) {
    const menu = document.createElement("div");
    menu.id = id;
    menu.className = "toolbar-menu color-palette-menu";
    menu.hidden = true;

    const resetButton = document.createElement("button");
    resetButton.type = "button";
    resetButton.className = "color-reset-btn";
    resetButton.dataset.colorReset = "true";
    resetButton.title = resetLabel;
    resetButton.setAttribute("aria-label", resetLabel);
    resetButton.innerHTML = `<span></span>`;
    menu.appendChild(resetButton);

    COLOR_PALETTE.forEach((color) => {
        const button = document.createElement("button");
        button.type = "button";
        button.dataset.color = color;
        button.title = color;
        button.style.backgroundColor = color;
        button.setAttribute("aria-label", color);
        menu.appendChild(button);
    });

    menu.addEventListener("click", (e) => {
        e.stopPropagation();
        const button = e.target.closest("[data-color], [data-color-reset]");
        if (!button) return;

        applyColor(button.dataset.colorReset ? "" : button.dataset.color);
        menu.hidden = true;
    });

    document.body.appendChild(menu);
    return menu;
}

const textColorPaletteMenu = createColorPaletteMenu("text-color-palette-menu", setTextColor, "Otomatik");
const fillColorPaletteMenu = createColorPaletteMenu("fill-color-palette-menu", setFillColor, "Dolgu yok");

function showColorPaletteMenu(menu, anchor) {
    if (!menu || !anchor) return;

    hideColorPaletteMenus();
    hideBorderMenu();
    hideZoomMenu();
    hideNumberFormatMenu();
    hideFilterPopup();

    const buttonRect = anchor.getBoundingClientRect();
    menu.hidden = false;
    const menuRect = menu.getBoundingClientRect();
    const left = Math.min(buttonRect.left, window.innerWidth - menuRect.width - 8);
    const top = Math.min(buttonRect.bottom + 4, window.innerHeight - menuRect.height - 8);

    menu.style.left = `${Math.max(8, left)}px`;
    menu.style.top = `${Math.max(8, top)}px`;
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
    const isCellContext = contextMenuTarget?.type === "cell" || contextMenuTarget?.type === "all";
    const isSelectionContext = isCellContext || isRowContext || isColumnContext;
    const hasHiddenAxes = hiddenRows.size > 0 || hiddenCols.size > 0;
    const hasSelection = Boolean(selectedCell);
    const selectedRowCount = getSelectedRowIndexes().length || 1;
    const selectedColCount = getSelectedColumnIndexes().length || 1;
    const rowDeleteCount = Math.min(selectedRowCount, Math.max(0, rowCount - MIN_ROW_SIZE));
    const colDeleteCount = Math.min(selectedColCount, Math.max(0, colCount - MIN_COL_SIZE));
    const visibleByAction = {
        cut: isSelectionContext,
        copy: isSelectionContext,
        paste: isSelectionContext,
        "insert-row-above": isRowContext,
        "insert-row-below": isRowContext,
        "delete-row": isRowContext,
        "hide-axis": isRowContext || isColumnContext,
        "freeze-axis": isRowContext || isColumnContext,
        "show-axes": (isRowContext || isColumnContext) && hasHiddenAxes,
        "insert-col-left": isColumnContext,
        "insert-col-right": isColumnContext,
        "delete-col": isColumnContext,
        "add-sheet": isSheetContext,
        "duplicate-sheet": isSheetContext,
        "rename-sheet": isSheetContext,
        "delete-sheet": isSheetContext,
        clear: isSelectionContext,
        note: isCellContext
    };
    const stateByAction = {
        cut: hasSelection,
        copy: hasSelection,
        paste: hasSelection && Boolean(internalClipboard),
        "insert-row-above": isRowContext,
        "insert-row-below": isRowContext,
        "delete-row": isRowContext && rowDeleteCount > 0,
        "hide-axis": isRowContext || isColumnContext,
        "freeze-axis": isRowContext || isColumnContext,
        "show-axes": hiddenRows.size > 0 || hiddenCols.size > 0,
        "insert-col-left": isColumnContext,
        "insert-col-right": isColumnContext,
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
        button.hidden = !visibleByAction[action];
        button.disabled = !stateByAction[action];
    });
    updateContextMenuSeparators();

    setContextMenuLabel("insert-row-above", `Üste ${selectedRowCount} satır ekle`);
    setContextMenuLabel("insert-row-below", `Alta ${selectedRowCount} satır ekle`);
    setContextMenuLabel("delete-row", `${selectedRowCount} satır sil`);
    setContextMenuLabel(
        "hide-axis",
        isRowContext
            ? `${selectedRowCount} satır gizle`
            : isColumnContext
                ? `${selectedColCount} sütun gizle`
                : "Seçili satır/sütunları gizle"
    );
    setContextMenuLabel(
        "freeze-axis",
        getFreezeAxisLabel(isRowContext, isColumnContext)
    );
    setContextMenuLabel("insert-col-left", `Sola ${selectedColCount} sütun ekle`);
    setContextMenuLabel("insert-col-right", `Sağa ${selectedColCount} sütun ekle`);
    setContextMenuLabel("delete-col", `${selectedColCount} sütun sil`);
}

function updateContextMenuSeparators() {
    if (!contextMenu) return;

    const items = [...contextMenu.children];
    items.forEach((item, index) => {
        if (item.tagName !== "HR") return;

        const previousSeparatorIndex = items
            .slice(0, index)
            .map((sibling, siblingIndex) => sibling.tagName === "HR" ? siblingIndex : -1)
            .filter((siblingIndex) => siblingIndex >= 0)
            .pop() ?? -1;
        const nextSeparatorOffset = items
            .slice(index + 1)
            .findIndex((sibling) => sibling.tagName === "HR");
        const nextSeparatorIndex = nextSeparatorOffset >= 0
            ? index + 1 + nextSeparatorOffset
            : items.length;
        const hasVisibleBefore = items
            .slice(previousSeparatorIndex + 1, index)
            .some((sibling) => !sibling.hidden);
        const hasVisibleAfter = items
            .slice(index + 1, nextSeparatorIndex)
            .some((sibling) => !sibling.hidden);

        item.hidden = !(hasVisibleBefore && hasVisibleAfter);
    });
}

function getFreezeAxisLabel(isRowContext, isColumnContext) {
    if (isRowContext) {
        const rows = getSelectedRowIndexes();
        const selectedFreezeLine = rows.length ? Math.max(...rows) + 1 : 0;
        return frozenRows === selectedFreezeLine
            ? "Seçilen satırı çöz"
            : "Seçilen satırı dondur";
    }

    if (isColumnContext) {
        const cols = getSelectedColumnIndexes();
        const selectedFreezeLine = cols.length ? Math.max(...cols) + 1 : 0;
        return frozenCols === selectedFreezeLine
            ? "Seçilen sütunu çöz"
            : "Seçilen sütunu dondur";
    }

    return "Seçili satır/sütunu dondur";
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

function hasMultiCellActiveRange() {
    const range = getActiveRange();
    if (!range) return false;

    return range.minRow !== range.maxRow || range.minCol !== range.maxCol;
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

function formatStatusNumber(value) {
    if (!Number.isFinite(value)) return "";

    return Number.isInteger(value)
        ? String(value)
        : value.toLocaleString("tr-TR", { maximumFractionDigits: 6 });
}

function getSelectionSummary() {
    const ranges = getActiveRanges();
    const seen = new Set();
    let count = 0;
    let numberCount = 0;
    let sum = 0;

    ranges.forEach((range) => {
        for (let r = range.minRow; r <= range.maxRow; r++) {
            for (let c = range.minCol; c <= range.maxCol; c++) {
                const key = `${r}:${c}`;
                if (seen.has(key)) continue;
                seen.add(key);

                const cell = tableData[r]?.[c];
                if (!cell) continue;

                const rawValue = cell.formula ? cell.value : cell.value;
                const text = String(rawValue ?? "").trim();
                if (text !== "") {
                    count++;
                }

                const numericValue = Number(text);
                if (text !== "" && Number.isFinite(numericValue)) {
                    numberCount++;
                    sum += numericValue;
                }
            }
        }
    });

    return {
        count,
        numberCount,
        sum,
        average: numberCount ? sum / numberCount : 0
    };
}

function updateStatusSummary() {
    const status = document.getElementById("status-summary");
    if (!status) return;

    status.innerHTML = "";
    const hasRangeSelection = Boolean(selectionRange || extraSelections.length || selectionMode === "row" || selectionMode === "column" || selectionMode === "all");
    if (!hasRangeSelection) {
        return;
    }

    const summary = getSelectionSummary();
    if (!summary.count && !summary.numberCount) {
        return;
    }

    const parts = [`Sayım: ${summary.count}`];
    if (summary.numberCount) {
        parts.unshift(`Ortalama: ${formatStatusNumber(summary.average)}`);
        parts.unshift(`Toplam: ${formatStatusNumber(summary.sum)}`);
    }

    parts.forEach((part) => {
        const item = document.createElement("span");
        item.className = "status-summary-item";
        item.textContent = part;
        status.appendChild(item);
    });
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
    const isCutPaste = clipboardMode === "cut" && sourceRange;
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
            const formulaOffset = clipboardMode === "copy" && sourceRange
                ? {
                    rowOffset: startRow - sourceRange.minRow,
                    colOffset: startCol - sourceRange.minCol
                }
                : null;

            tableData[targetRow][targetCol] = cloneCellData(internalClipboard[r][c], formulaOffset);
        }
    }

    if (isCutPaste) {
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
    refreshChartsForChangedRange(targetRange);
    if (isCutPaste) {
        refreshChartsForChangedRange(sourceRange);
    }
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
    ranges.forEach(refreshChartsForChangedRange);
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
    const hasCustomColor = /^#[0-9a-f]{6}$/i.test(color ?? "");
    const normalizedColor = hasCustomColor ? normalizeColorValue(color, "#202124") : "";
    const indicatorColor = normalizedColor || "#202124";
    if (textColorInput) textColorInput.value = indicatorColor;
    updateTextColorIndicator(indicatorColor);
    return applyStyleToSelection((style) => {
        style.color = normalizedColor;
    });
}

function setFillColor(color) {
    const hasCustomColor = /^#[0-9a-f]{6}$/i.test(color ?? "");
    const normalizedColor = hasCustomColor ? normalizeColorValue(color, "#fff2cc") : "";
    const indicatorColor = normalizedColor || "#fff2cc";
    if (fillColorInput) fillColorInput.value = indicatorColor;
    updateFillColorIndicator(indicatorColor);
    return applyStyleToSelection((style) => {
        style.backgroundColor = normalizedColor;
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

function setNumberFormat(format) {
    return applyStyleToSelection((style) => {
        style.numberFormat = format;
        if (!Number.isInteger(Number(style.decimalPlaces))) {
            style.decimalPlaces = format === "percent" ? 0 : 2;
        }
    });
}

function setNumberFormatWithDecimalPlaces(format, decimalPlaces) {
    return applyStyleToSelection((style) => {
        style.numberFormat = format;
        style.decimalPlaces = Math.max(0, Math.min(8, decimalPlaces));
    });
}

function changeDecimalPlaces(delta) {
    return applyStyleToSelection((style) => {
        const currentPlaces = Number.isInteger(Number(style.decimalPlaces))
            ? Number(style.decimalPlaces)
            : 2;
        style.decimalPlaces = Math.max(0, Math.min(8, currentPlaces + delta));
        if (!["currency", "percent", "number", "date", "time"].includes(style.numberFormat)) {
            style.numberFormat = "number";
        }
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
    if (action === "insert-row-below" && contextMenuTarget?.type === "row") insertRowsBelowSelection();
    if (action === "delete-row" && contextMenuTarget?.type === "row") deleteSelectedRows();
    if (action === "hide-axis") hideSelectedRowsOrColumns();
    if (action === "freeze-axis") toggleFreezeSelectedAxis();
    if (action === "show-axes") showHiddenRowsAndColumns();
    if (action === "insert-col-left" && contextMenuTarget?.type === "column") insertColsLeftOfSelection();
    if (action === "insert-col-right" && contextMenuTarget?.type === "column") insertColsRightOfSelection();
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

function cloneCellData(cell, formulaOffset = null) {
    const clonedCell = {
        value: cell.value,
        formula: cell.formula,
        borders: { ...getCellBorders(cell) },
        style: { ...getCellStyle(cell) },
        merge: cell.merge ? { ...cell.merge } : null,
        mergedTo: cell.mergedTo ? { ...cell.mergedTo } : null
    };

    if (formulaOffset && clonedCell.formula) {
        clonedCell.formula = adjustFormulaReferences(
            clonedCell.formula,
            formulaOffset.rowOffset,
            formulaOffset.colOffset
        );
    }

    return clonedCell;
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
        strikeThrough: false,
        fontSize: DEFAULT_FONT_SIZE,
        color: "#202124",
        backgroundColor: "",
        horizontalAlign: "left",
        verticalAlign: "middle",
        numberFormat: "automatic",
        decimalPlaces: 2
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
        style.strikeThrough !== defaults.strikeThrough ||
        (Number(style.fontSize) || DEFAULT_FONT_SIZE) !== defaults.fontSize ||
        style.color !== defaults.color ||
        style.backgroundColor !== defaults.backgroundColor ||
        style.horizontalAlign !== defaults.horizontalAlign ||
        style.verticalAlign !== defaults.verticalAlign ||
        style.numberFormat !== defaults.numberFormat ||
        (Number(style.decimalPlaces) || 0) !== defaults.decimalPlaces
    );
}

function normalizeColorValue(value, fallback) {
    return /^#[0-9a-f]{6}$/i.test(value ?? "") ? value : fallback;
}

function parseCellNumberForDisplay(cell) {
    const value = cell?.formula ? cell.value : cell?.value;
    if (value === null || value === undefined || String(value).trim() === "") return null;

    const number = Number(String(value).trim().replace(",", "."));
    return Number.isFinite(number) ? number : null;
}

function formatCellDateValue(cell) {
    const rawValue = cell?.formula ? cell.value : cell?.value;
    const text = String(rawValue ?? "").trim();
    if (!text) return "";

    const dateMatch = text.match(/^(\d{1,2})[./-](\d{1,2})[./-](\d{2,4})$/);
    if (dateMatch) {
        const day = Number(dateMatch[1]);
        const month = Number(dateMatch[2]);
        const year = Number(dateMatch[3].padStart(4, "20"));
        const date = new Date(year, month - 1, day);
        if (date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day) {
            return [
                String(day).padStart(2, "0"),
                String(month).padStart(2, "0"),
                String(year).padStart(4, "0")
            ].join(".");
        }
    }

    const parsedDate = new Date(text);
    if (Number.isNaN(parsedDate.getTime())) return rawValue ?? "";

    return [
        String(parsedDate.getDate()).padStart(2, "0"),
        String(parsedDate.getMonth() + 1).padStart(2, "0"),
        String(parsedDate.getFullYear()).padStart(4, "0")
    ].join(".");
}

function formatCellTimeValue(cell) {
    const rawValue = cell?.formula ? cell.value : cell?.value;
    const text = String(rawValue ?? "").trim();
    if (!text) return "";

    const timeMatch = text.match(/^(\d{1,2}):(\d{1,2})(?::(\d{1,2}))?$/);
    if (timeMatch) {
        const hours = Number(timeMatch[1]);
        const minutes = Number(timeMatch[2]);
        const seconds = Number(timeMatch[3] ?? 0);
        if (hours < 24 && minutes < 60 && seconds < 60) {
            return [
                String(hours).padStart(2, "0"),
                String(minutes).padStart(2, "0"),
                String(seconds).padStart(2, "0")
            ].join(":");
        }
    }

    const parsedDate = new Date(text);
    if (Number.isNaN(parsedDate.getTime())) return rawValue ?? "";

    return [
        String(parsedDate.getHours()).padStart(2, "0"),
        String(parsedDate.getMinutes()).padStart(2, "0"),
        String(parsedDate.getSeconds()).padStart(2, "0")
    ].join(":");
}

function formatCellDisplayValue(cell) {
    const style = getCellStyle(cell);
    if (style.numberFormat === "date") {
        return formatCellDateValue(cell);
    }
    if (style.numberFormat === "time") {
        return formatCellTimeValue(cell);
    }

    const number = parseCellNumberForDisplay(cell);
    if (number === null) return cell?.value ?? "";

    const decimalPlaces = Math.max(0, Math.min(8, Number(style.decimalPlaces) || 0));
    if (style.numberFormat === "currency") {
        return `${number.toLocaleString("tr-TR", {
            minimumFractionDigits: decimalPlaces,
            maximumFractionDigits: decimalPlaces
        })} ₺`;
    }

    if (style.numberFormat === "percent") {
        return `${(number * 100).toLocaleString("tr-TR", {
            minimumFractionDigits: decimalPlaces,
            maximumFractionDigits: decimalPlaces
        })}%`;
    }

    if (style.numberFormat === "number") {
        return number.toLocaleString("tr-TR", {
            minimumFractionDigits: decimalPlaces,
            maximumFractionDigits: decimalPlaces
        });
    }

    return cell?.value ?? "";
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
    hiddenRows = new Set([...hiddenRows].map((row) => row >= targetIndex ? row + count : row));
    if (targetIndex < frozenRows) frozenRows += count;
    tableData.splice(
        targetIndex,
        0,
        ...Array.from({ length: count }, () => Array.from({ length: colCount }, createEmptyCell))
    );
    adjustAllFormulasForGridChange({
        mode: "insert",
        axis: "row",
        index: targetIndex,
        count
    });
    recalculateAll();
    selectedCell = { row: targetIndex, col: selectedCell?.col ?? 0 };
    selectionRange = null;
    selectionMode = "cell";
    extraSelections = [];
    copiedRange = null;
    internalClipboard = null;
    clipboardMode = null;
    normalizeSelectedCell();
    renderTable();
    refreshChartsFromConfigs();
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
    hiddenCols = new Set([...hiddenCols].map((col) => col >= targetIndex ? col + count : col));
    if (targetIndex < frozenCols) frozenCols += count;
    tableData.forEach((row) => {
        row.splice(targetIndex, 0, ...Array.from({ length: count }, createEmptyCell));
    });
    adjustAllFormulasForGridChange({
        mode: "insert",
        axis: "column",
        index: targetIndex,
        count
    });
    recalculateAll();
    selectedCell = { row: selectedCell?.row ?? 0, col: targetIndex };
    selectionRange = null;
    selectionMode = "cell";
    extraSelections = [];
    copiedRange = null;
    internalClipboard = null;
    clipboardMode = null;
    normalizeSelectedCell();
    renderTable();
    refreshChartsFromConfigs();
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
    const deletedRowsAscending = [...indexesToDelete].sort((a, b) => a - b);
    indexesToDelete.forEach((targetIndex) => {
        tableData.splice(targetIndex, 1);
        rowHeights.splice(targetIndex, 1);
    });
    rowCount -= indexesToDelete.length;
    hiddenRows = new Set([...hiddenRows]
        .map((row) => mapDeletedAxisPosition(row, deletedRowsAscending))
        .filter((row) => row !== null && row >= 0 && row < rowCount));
    frozenRows = Math.max(0, frozenRows - deletedRowsAscending.filter((row) => row < frozenRows).length);
    adjustAllFormulasForGridChange({
        mode: "delete",
        axis: "row",
        indexes: [...indexesToDelete].sort((a, b) => a - b)
    });
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
    refreshChartsFromConfigs();
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
    const deletedColsAscending = [...indexesToDelete].sort((a, b) => a - b);
    indexesToDelete.forEach((targetIndex) => {
        colWidths.splice(targetIndex, 1);
        tableData.forEach((row) => {
            row.splice(targetIndex, 1);
        });
    });
    colCount -= indexesToDelete.length;
    hiddenCols = new Set([...hiddenCols]
        .map((col) => mapDeletedAxisPosition(col, deletedColsAscending))
        .filter((col) => col !== null && col >= 0 && col < colCount));
    frozenCols = Math.max(0, frozenCols - deletedColsAscending.filter((col) => col < frozenCols).length);
    adjustAllFormulasForGridChange({
        mode: "delete",
        axis: "column",
        indexes: [...indexesToDelete].sort((a, b) => a - b)
    });
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
    refreshChartsFromConfigs();
    focusSelectedCell();
}

function insertRowsAboveSelection() {
    const rows = getSelectedRowIndexes();
    const count = rows.length || 1;
    const targetIndex = rows.length ? Math.min(...rows) : contextMenuTarget?.row ?? selectedCell?.row ?? 0;
    insertRowsAt(targetIndex, count);
}

function insertRowsBelowSelection() {
    const rows = getSelectedRowIndexes();
    const count = rows.length || 1;
    const targetIndex = rows.length ? Math.max(...rows) + 1 : (contextMenuTarget?.row ?? selectedCell?.row ?? 0) + 1;
    insertRowsAt(targetIndex, count);
}

function insertColsLeftOfSelection() {
    const cols = getSelectedColumnIndexes();
    const count = cols.length || 1;
    const targetIndex = cols.length ? Math.min(...cols) : contextMenuTarget?.col ?? selectedCell?.col ?? 0;
    insertColsAt(targetIndex, count);
}

function insertColsRightOfSelection() {
    const cols = getSelectedColumnIndexes();
    const count = cols.length || 1;
    const targetIndex = cols.length ? Math.max(...cols) + 1 : (contextMenuTarget?.col ?? selectedCell?.col ?? 0) + 1;
    insertColsAt(targetIndex, count);
}

function getCellSortValue(cell) {
    const rawValue = String(cell?.formula ? cell.value : cell?.value ?? "").trim();
    if (rawValue === "") {
        return { type: "blank", value: "" };
    }

    const normalizedNumber = rawValue.replace(",", ".");
    const numberValue = Number(normalizedNumber);
    if (Number.isFinite(numberValue)) {
        return { type: "number", value: numberValue };
    }

    return { type: "text", value: rawValue.toLocaleLowerCase("tr-TR") };
}

function compareSortValues(a, b, direction) {
    if (a.type === "blank" && b.type !== "blank") return 1;
    if (a.type !== "blank" && b.type === "blank") return -1;
    if (a.type === "blank" && b.type === "blank") return 0;

    const typeOrder = { number: 0, text: 1 };
    const orderDiff = typeOrder[a.type] - typeOrder[b.type];
    if (orderDiff !== 0) return orderDiff * direction;

    if (a.value < b.value) return -1 * direction;
    if (a.value > b.value) return 1 * direction;
    return 0;
}

function sortActiveRange(direction = "asc") {
    const range = getActiveRange();
    if (!range || !canSortActiveRange()) return false;

    const directionMultiplier = direction === "desc" ? -1 : 1;
    const rows = [];

    for (let row = range.minRow; row <= range.maxRow; row++) {
        rows.push({
            row,
            height: rowHeights[row],
            cells: tableData[row]
                .slice(range.minCol, range.maxCol + 1)
                .map((cell) => cloneCellData(cell)),
            sortValue: getCellSortValue(tableData[row][range.minCol])
        });
    }

    rows.sort((a, b) => {
        const valueDiff = compareSortValues(a.sortValue, b.sortValue, directionMultiplier);
        return valueDiff || (a.row - b.row);
    });

    pushHistory();
    rows.forEach((item, offset) => {
        const targetRow = range.minRow + offset;
        for (let col = range.minCol; col <= range.maxCol; col++) {
            tableData[targetRow][col] = cloneCellData(item.cells[col - range.minCol]);
        }
        if (range.minCol === 0 && range.maxCol === colCount - 1) {
            rowHeights[targetRow] = item.height;
        }
    });

    recalculateAll();
    renderTable();
    refreshChartsForChangedRange(range);
    focusSelectedCell();
    return true;
}

function normalizeFilter(filter) {
    if (!filter?.range || !Number.isInteger(filter.column)) return null;

    const range = {
        minRow: Math.max(0, Math.min(rowCount - 1, Number(filter.range.minRow) || 0)),
        maxRow: Math.max(0, Math.min(rowCount - 1, Number(filter.range.maxRow) || 0)),
        minCol: Math.max(0, Math.min(colCount - 1, Number(filter.range.minCol) || 0)),
        maxCol: Math.max(0, Math.min(colCount - 1, Number(filter.range.maxCol) || 0))
    };

    if (range.maxRow <= range.minRow || range.maxCol < range.minCol) return null;

    return {
        range,
        column: Math.max(range.minCol, Math.min(range.maxCol, filter.column)),
        query: String(filter.query || "")
    };
}

function isRowHiddenByFilter(row) {
    const filter = normalizeFilter(activeFilter);
    if (!filter) return false;
    if (row <= filter.range.minRow || row > filter.range.maxRow) return false;
    if (!filter.query.trim()) return false;

    const cellText = getCellEditableText(row, filter.column).toLocaleLowerCase("tr-TR");
    return !cellText.includes(filter.query.toLocaleLowerCase("tr-TR"));
}

function createFilterFromSelection() {
    const range = getActiveRange();
    if (!range || !canSortActiveRange()) return false;

    activeFilter = {
        range: { ...range },
        column: range.minCol,
        query: ""
    };
    selectedCell = { row: range.minRow, col: range.minCol };

    renderTable();
    focusSelectedCell();
    updateToolbarState();
    scheduleAutoSave();
    return true;
}

function hideSelectedRowsOrColumns() {
    const rows = getSelectedRowIndexes();
    const cols = getSelectedColumnIndexes();

    if (selectionMode === "row" && rows.length) {
        pushHistory();
        rows.forEach((row) => hiddenRows.add(row));
        renderTable();
        focusSelectedCell();
        updateToolbarState();
        scheduleAutoSave();
        return true;
    }

    if (selectionMode === "column" && cols.length) {
        pushHistory();
        cols.forEach((col) => hiddenCols.add(col));
        renderTable();
        focusSelectedCell();
        updateToolbarState();
        scheduleAutoSave();
        return true;
    }

    return false;
}

function showHiddenRows() {
    if (hiddenRows.size === 0) return false;

    pushHistory();
    hiddenRows.clear();
    renderTable();
    focusSelectedCell();
    updateToolbarState();
    scheduleAutoSave();
    return true;
}

function showHiddenColumns() {
    if (hiddenCols.size === 0) return false;

    pushHistory();
    hiddenCols.clear();
    renderTable();
    focusSelectedCell();
    updateToolbarState();
    scheduleAutoSave();
    return true;
}

function showHiddenRowsAndColumns() {
    if (hiddenRows.size === 0 && hiddenCols.size === 0) return false;

    pushHistory();
    hiddenRows.clear();
    hiddenCols.clear();
    renderTable();
    focusSelectedCell();
    updateToolbarState();
    scheduleAutoSave();
    return true;
}

function clampFrozenPanes() {
    frozenRows = Math.max(0, Math.min(rowCount, Number(frozenRows) || 0));
    frozenCols = Math.max(0, Math.min(colCount, Number(frozenCols) || 0));
}

function toggleFreezeSelectedAxis() {
    const rows = getSelectedRowIndexes();
    const cols = getSelectedColumnIndexes();

    if (selectionMode === "row" && rows.length) {
        const nextFrozenRows = Math.max(...rows) + 1;
        pushHistory();
        frozenRows = frozenRows === nextFrozenRows ? 0 : nextFrozenRows;
        clampFrozenPanes();
        renderTable();
        focusSelectedCell();
        updateToolbarState();
        scheduleAutoSave();
        return true;
    }

    if (selectionMode === "column" && cols.length) {
        const nextFrozenCols = Math.max(...cols) + 1;
        pushHistory();
        frozenCols = frozenCols === nextFrozenCols ? 0 : nextFrozenCols;
        clampFrozenPanes();
        renderTable();
        focusSelectedCell();
        updateToolbarState();
        scheduleAutoSave();
        return true;
    }

    return false;
}

function removeFreezeDividers() {
    tableArea?.querySelectorAll(".freeze-divider").forEach((divider) => divider.remove());
}

function updateFreezeDividerPositions() {
    if (!tableArea) return;

    const rowDivider = tableArea.querySelector(".freeze-row-divider");
    if (rowDivider) {
        const top = Number(rowDivider.dataset.freezeTop) || 0;
        rowDivider.style.top = `${tableArea.scrollTop + top - 2}px`;
        rowDivider.style.left = `${tableArea.scrollLeft}px`;
        rowDivider.style.width = `${tableArea.clientWidth}px`;
    }

    const colDivider = tableArea.querySelector(".freeze-col-divider");
    if (colDivider) {
        const left = Number(colDivider.dataset.freezeLeft) || 0;
        colDivider.style.left = `${tableArea.scrollLeft + left - 2}px`;
        colDivider.style.top = `${tableArea.scrollTop}px`;
        colDivider.style.height = `${tableArea.clientHeight}px`;
    }
}

function getFreezeDividerMetrics() {
    const zoomScale = getZoomScale();
    let frozenTop = DEFAULT_ROW_HEIGHT;
    let frozenLeft = 46;

    for (let row = 0; row < frozenRows; row++) {
        if (hiddenRows.has(row) || isRowHiddenByFilter(row)) continue;
        frozenTop += Math.round((rowHeights[row] ?? DEFAULT_ROW_HEIGHT) * zoomScale);
    }

    for (let col = 0; col < frozenCols; col++) {
        if (hiddenCols.has(col)) continue;
        frozenLeft += Math.round((colWidths[col] ?? DEFAULT_COL_WIDTH) * zoomScale);
    }

    return { frozenTop, frozenLeft };
}

function refreshFreezeDividers() {
    const { frozenTop, frozenLeft } = getFreezeDividerMetrics();
    renderFreezeDividers(frozenTop, frozenLeft);
}

function renderFreezeDividers(frozenTop, frozenLeft) {
    if (!tableArea) return;

    removeFreezeDividers();

    if (frozenRows > 0) {
        const rowDivider = document.createElement("div");
        rowDivider.className = "freeze-divider freeze-row-divider";
        rowDivider.dataset.freezeTop = String(frozenTop);
        rowDivider.title = "Donmuş satır sınırını taşı";
        rowDivider.addEventListener("mousedown", (e) => startFreezeDividerDrag(e, "row"));
        tableArea.appendChild(rowDivider);
    }

    if (frozenCols > 0) {
        const colDivider = document.createElement("div");
        colDivider.className = "freeze-divider freeze-col-divider";
        colDivider.dataset.freezeLeft = String(frozenLeft);
        colDivider.title = "Donmuş sütun sınırını taşı";
        colDivider.addEventListener("mousedown", (e) => startFreezeDividerDrag(e, "column"));
        tableArea.appendChild(colDivider);
    }

    updateFreezeDividerPositions();
}

function startFreezeDividerDrag(e, type) {
    e.preventDefault();
    e.stopPropagation();

    pushHistory();
    freezeDragState = {
        type,
        startRows: frozenRows,
        startCols: frozenCols
    };
    tableArea?.querySelector(`.freeze-${type === "row" ? "row" : "col"}-divider`)?.classList.add("dragging");
}

function getFreezeRowFromPointer(clientY) {
    const tableRect = table.getBoundingClientRect();
    const contentY = clientY - tableRect.top;
    const headerHeight = DEFAULT_ROW_HEIGHT;
    if (contentY <= headerHeight) return 0;

    let bottom = headerHeight;
    for (let row = 0; row < rowCount; row++) {
        if (hiddenRows.has(row) || isRowHiddenByFilter(row)) continue;
        bottom += Math.round((rowHeights[row] ?? DEFAULT_ROW_HEIGHT) * getZoomScale());
        if (contentY < bottom) return row + 1;
    }

    return rowCount;
}

function getFreezeColFromPointer(clientX) {
    const tableRect = table.getBoundingClientRect();
    const contentX = clientX - tableRect.left;
    const rowHeaderWidth = 46;
    if (contentX <= rowHeaderWidth) return 0;

    let right = rowHeaderWidth;
    for (let col = 0; col < colCount; col++) {
        if (hiddenCols.has(col)) continue;
        right += Math.round((colWidths[col] ?? DEFAULT_COL_WIDTH) * getZoomScale());
        if (contentX < right) return col + 1;
    }

    return colCount;
}

function updateFreezeDividerDrag(e) {
    if (!freezeDragState) return false;

    if (freezeDragState.type === "row") {
        const nextFrozenRows = getFreezeRowFromPointer(e.clientY);
        if (nextFrozenRows !== frozenRows) {
            frozenRows = nextFrozenRows;
            renderTable();
        }
        return true;
    }

    const nextFrozenCols = getFreezeColFromPointer(e.clientX);
    if (nextFrozenCols !== frozenCols) {
        frozenCols = nextFrozenCols;
        renderTable();
    }
    return true;
}

function finishFreezeDividerDrag() {
    if (!freezeDragState) return false;

    const changed = frozenRows !== freezeDragState.startRows || frozenCols !== freezeDragState.startCols;
    freezeDragState = null;
    tableArea?.querySelectorAll(".freeze-divider.dragging").forEach((divider) => divider.classList.remove("dragging"));
    updateToolbarState();
    if (changed) scheduleAutoSave();
    return true;
}

function hasHiddenRowAfter(row) {
    if (row < 0 || row >= rowCount - 1) return false;
    if (!hiddenRows.has(row + 1)) return false;

    for (let nextRow = row + 2; nextRow < rowCount; nextRow++) {
        if (!hiddenRows.has(nextRow)) return !isRowHiddenByFilter(nextRow);
    }

    return false;
}

function hasHiddenRowBefore(row) {
    if (row <= 0 || row >= rowCount) return false;
    if (!hiddenRows.has(row - 1)) return false;

    for (let prevRow = row - 2; prevRow >= 0; prevRow--) {
        if (!hiddenRows.has(prevRow)) return !isRowHiddenByFilter(prevRow);
    }

    return false;
}

function hasHiddenColAfter(col) {
    if (col < 0 || col >= colCount - 1) return false;
    if (!hiddenCols.has(col + 1)) return false;

    for (let nextCol = col + 2; nextCol < colCount; nextCol++) {
        if (!hiddenCols.has(nextCol)) return true;
    }

    return false;
}

function hasHiddenColBefore(col) {
    if (col <= 0 || col >= colCount) return false;
    if (!hiddenCols.has(col - 1)) return false;

    for (let prevCol = col - 2; prevCol >= 0; prevCol--) {
        if (!hiddenCols.has(prevCol)) return true;
    }

    return false;
}

function toggleFilterFromSelection() {
    if (activeFilter) {
        return clearActiveFilter();
    }

    return createFilterFromSelection();
}

function applyFilterValue(column, query) {
    const filter = normalizeFilter(activeFilter);
    if (!filter || column < filter.range.minCol || column > filter.range.maxCol) return false;

    activeFilter = {
        ...filter,
        column,
        query: String(query || "").trim()
    };
    selectedCell = { row: filter.range.minRow, col: column };
    hideFilterPopup();
    renderTable();
    focusSelectedCell();
    updateToolbarState();
    scheduleAutoSave();
    return true;
}

function showFilterPopup(anchor, column) {
    const filter = normalizeFilter(activeFilter);
    if (!filter || !filterPopup || !filterPopupInput) return false;

    filterPopupColumn = column;
    const headerName = getCellEditableText(filter.range.minRow, column) || getCellName(filter.range.minRow, column);
    if (filterPopupTitle) filterPopupTitle.textContent = `${headerName} filtresi`;
    filterPopupInput.value = column === filter.column ? filter.query : "";

    const anchorRect = anchor.getBoundingClientRect();
    filterPopup.hidden = false;
    const popupRect = filterPopup.getBoundingClientRect();
    const left = Math.min(anchorRect.left, window.innerWidth - popupRect.width - 8);
    const top = Math.min(anchorRect.bottom + 6, window.innerHeight - popupRect.height - 8);

    filterPopup.style.left = `${Math.max(8, left)}px`;
    filterPopup.style.top = `${Math.max(8, top)}px`;
    filterPopupInput.focus();
    filterPopupInput.select();
    return true;
}

function clearActiveFilter() {
    if (!activeFilter) return false;

    activeFilter = null;
    renderTable();
    focusSelectedCell();
    updateToolbarState();
    scheduleAutoSave();
    return true;
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

function getCellEditableText(row, col) {
    const cell = tableData[row]?.[col];
    if (!cell) return "";

    return cell.formula ?? cell.value ?? "";
}

function escapeRegExp(text) {
    return String(text).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function setCellText(row, col, text) {
    const cell = tableData[row]?.[col];
    if (!cell) return false;

    if (String(text).startsWith("=")) {
        cell.formula = String(text);
        cell.value = evaluateFormula(cell.formula, row, col);
    } else {
        cell.formula = null;
        cell.value = String(text);
    }

    return true;
}

function replaceInCell(row, col, query, replacement, replaceAll = false) {
    const normalizedQuery = query.trim();
    if (!normalizedQuery) return false;

    const originalText = getCellEditableText(row, col);
    const flags = replaceAll ? "gi" : "i";
    const pattern = new RegExp(escapeRegExp(normalizedQuery), flags);
    if (!pattern.test(originalText)) return false;

    const nextText = originalText.replace(pattern, replacement);
    return setCellText(row, col, nextText);
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

function replaceCurrentFindResult() {
    if (!findInput || !replaceInput) return false;
    const query = findInput.value.trim();
    if (!query) return false;

    if (!findResults.length) {
        runFindQuery(query);
    }

    if (!findResults.length || findResultIndex < 0) {
        updateFindCount();
        return false;
    }

    const result = findResults[findResultIndex];
    pushHistory();
    const changed = replaceInCell(result.row, result.col, query, replaceInput.value, false);
    if (!changed) {
        undoStack.pop();
        return false;
    }

    recalculateAll();
    renderTable();
    refreshChartsForChangedCell(result.row, result.col);
    runFindQuery(query, { row: result.row, col: result.col });

    if (findResults.length) {
        goToFindResult(findResultIndex);
    } else {
        selectedCell = { row: result.row, col: result.col };
        updateFormulaBar();
        updateFindCount();
        focusSelectedCell();
    }

    return true;
}

function replaceAllFindResults() {
    if (!findInput || !replaceInput) return false;
    const query = findInput.value.trim();
    if (!query) return false;

    let changeCount = 0;
    pushHistory();

    for (let r = 0; r < rowCount; r++) {
        for (let c = 0; c < colCount; c++) {
            if (replaceInCell(r, c, query, replaceInput.value, true)) {
                changeCount++;
            }
        }
    }

    if (!changeCount) {
        undoStack.pop();
        updateFindCount();
        return false;
    }

    recalculateAll();
    renderTable();
    refreshChartsFromConfigs();
    runFindQuery(query);
    if (findCount) {
        findCount.textContent = `${changeCount} değişti`;
    }
    focusSelectedCell();
    return true;
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

function toggleFindPanel() {
    if (!findPanel || findPanel.hidden) {
        openFindPanel();
    } else {
        closeFindPanel();
    }
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
                    cell: cloneCellData(tableData[r][c], { rowOffset, colOffset })
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
    refreshChartsForChangedRange(sourceRange);
    refreshChartsForChangedRange(selectionRange ? getNormalizedRange(selectionRange) : sourceRange);
    focusSelectedCell();
    return true;
}

function moveSelectedRowsTo(targetIndex) {
    const selectedRows = getSelectedRowIndexes();
    if (!selectedRows.length || selectedRows.includes(targetIndex)) return false;

    const rowsAscending = [...selectedRows].sort((a, b) => a - b);
    const rowsDescending = [...selectedRows].sort((a, b) => b - a);
    const movedHeights = rowsAscending.map((row) => rowHeights[row]);
    let insertionIndex = Math.max(0, Math.min(targetIndex, rowCount));
    insertionIndex -= rowsAscending.filter((row) => row < insertionIndex).length;
    const movedRows = rowsAscending.map((row, moveIndex) => {
        const rowOffset = insertionIndex + moveIndex - row;
        return tableData[row].map((cell) => cloneCellData(cell, { rowOffset, colOffset: 0 }));
    });

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
    refreshChartsFromConfigs();
    focusSelectedCell();
    return true;
}

function moveSelectedColumnsTo(targetIndex) {
    const selectedCols = getSelectedColumnIndexes();
    if (!selectedCols.length || selectedCols.includes(targetIndex)) return false;

    const colsAscending = [...selectedCols].sort((a, b) => a - b);
    const colsDescending = [...selectedCols].sort((a, b) => b - a);
    const movedWidths = colsAscending.map((col) => colWidths[col]);
    let insertionIndex = Math.max(0, Math.min(targetIndex, colCount));
    insertionIndex -= colsAscending.filter((col) => col < insertionIndex).length;
    const movedCellsByRow = tableData.map((row) => colsAscending.map((col, moveIndex) => {
        const colOffset = insertionIndex + moveIndex - col;
        return cloneCellData(row[col], { rowOffset: 0, colOffset });
    }));

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
    refreshChartsFromConfigs();
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

function cloneChartRange(range) {
    if (!range) return null;
    if (Array.isArray(range)) return range.map(cloneChartRange).filter(Boolean);

    return cloneRange(range);
}

function cloneFilter(filter) {
    if (!filter) return null;

    return {
        range: { ...filter.range },
        column: filter.column,
        query: filter.query
    };
}

function cloneTableData(data) {
    return data.map((row) => row.map((cell) => cloneCellData(cell)));
}

function createBlankTableData(rows, cols) {
    return Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => createEmptyCell())
    );
}

function cloneChartConfig(config) {
    if (!config) return null;

    return {
        xRange: cloneChartRange(config.xRange),
        yRange: cloneChartRange(config.yRange),
        type: CHART_TYPES.includes(config.type) ? config.type : "bar",
        showGridlines: config.showGridlines ?? true
    };
}

function getFiniteNumber(value, fallback) {
    const number = Number(value);
    return Number.isFinite(number) ? number : fallback;
}

function cloneChartState(chart) {
    const elementLeft = Number.parseFloat(chart.element?.style.left);
    const elementTop = Number.parseFloat(chart.element?.style.top);
    const elementWidth = Number.parseFloat(chart.element?.style.width);
    const elementHeight = Number.parseFloat(chart.element?.style.height);

    return {
        id: Number(chart.id) || 1,
        title: String(chart.title || `Grafik ${Number(chart.id) || 1}`),
        config: cloneChartConfig(chart.config),
        settings: { ...(chart.settings ?? {}) },
        color: chart.color ? { ...chart.color } : null,
        dataColors: Array.isArray(chart.dataColors) ? chart.dataColors.map((color) => ({ ...color })) : [],
        titleReference: chart.titleReference ? { ...chart.titleReference } : null,
        left: Number.isFinite(elementLeft) ? elementLeft : getFiniteNumber(chart.element?.offsetLeft, 96),
        top: Number.isFinite(elementTop) ? elementTop : getFiniteNumber(chart.element?.offsetTop, 64),
        width: Number.isFinite(elementWidth) ? elementWidth : getFiniteNumber(chart.element?.offsetWidth, 420),
        height: Number.isFinite(elementHeight) ? elementHeight : getFiniteNumber(chart.element?.offsetHeight, 280),
        minimized: chart.element?.classList.contains("minimized") ?? false,
        restoreState: chart.restoreState ? { ...chart.restoreState } : null
    };
}

function cloneSavedChartState(chart) {
    if (!chart) return null;

    return {
        id: Number(chart.id) || 1,
        title: String(chart.title || `Grafik ${Number(chart.id) || 1}`),
        config: cloneChartConfig(chart.config),
        settings: { ...(chart.settings ?? {}) },
        color: chart.color ? { ...chart.color } : null,
        dataColors: Array.isArray(chart.dataColors) ? chart.dataColors.map((color) => ({ ...color })) : [],
        titleReference: chart.titleReference ? { ...chart.titleReference } : null,
        left: getFiniteNumber(chart.left, 96),
        top: getFiniteNumber(chart.top, 64),
        width: getFiniteNumber(chart.width, 420),
        height: getFiniteNumber(chart.height, 280),
        minimized: Boolean(chart.minimized),
        restoreState: chart.restoreState ? { ...chart.restoreState } : null
    };
}

function createSheetState(name) {
    return {
        name,
        rowCount,
        colCount,
        selectedCell: selectedCell ? { ...selectedCell } : { row: 0, col: 0 },
        selectionRange: cloneRange(selectionRange),
        selectionMode,
        activeFilter: cloneFilter(activeFilter),
        tableData: cloneTableData(tableData),
        colWidths: [...colWidths],
        rowHeights: [...rowHeights],
        hiddenRows: [...hiddenRows],
        hiddenCols: [...hiddenCols],
        frozenRows,
        frozenCols,
        charts: charts.map(cloneChartState).filter(Boolean),
        nextChartNumber,
        activeChartId: activeChart?.id ?? null
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
        activeFilter: null,
        tableData: createBlankTableData(100, 26),
        colWidths: Array.from({ length: 26 }, () => DEFAULT_COL_WIDTH),
        rowHeights: Array.from({ length: 100 }, () => DEFAULT_ROW_HEIGHT),
        hiddenRows: [],
        hiddenCols: [],
        frozenRows: 0,
        frozenCols: 0,
        charts: [],
        nextChartNumber: 1,
        activeChartId: null
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
        activeFilter: cloneFilter(sheet.activeFilter),
        tableData: cloneTableData(sheet.tableData),
        colWidths: [...sheet.colWidths],
        rowHeights: [...sheet.rowHeights],
        hiddenRows: [...(sheet.hiddenRows ?? [])],
        hiddenCols: [...(sheet.hiddenCols ?? [])],
        frozenRows: Math.max(0, Math.min(sheet.rowCount, Number(sheet.frozenRows) || 0)),
        frozenCols: Math.max(0, Math.min(sheet.colCount, Number(sheet.frozenCols) || 0)),
        charts: Array.isArray(sheet.charts) ? sheet.charts.map(cloneSavedChartState).filter(Boolean) : [],
        nextChartNumber: Math.max(1, Number(sheet.nextChartNumber) || 1),
        activeChartId: sheet.activeChartId ?? null
    };
}

function hasCellContent(cell) {
    return Boolean(
        cell?.value ||
        cell?.formula ||
        hasAnyBorder(cell) ||
        hasNonDefaultStyle(cell) ||
        cell?.merge ||
        cell?.mergedTo
    );
}

function isSheetEmpty(sheet) {
    if (!sheet) return true;

    if ((Number(sheet.rowCount) || 0) !== 100 || (Number(sheet.colCount) || 0) !== 26) return false;
    if (sheet.activeFilter) return false;
    if ((sheet.hiddenRows?.length ?? 0) > 0 || (sheet.hiddenCols?.length ?? 0) > 0) return false;
    if ((Number(sheet.frozenRows) || 0) > 0 || (Number(sheet.frozenCols) || 0) > 0) return false;
    if ((sheet.charts?.length ?? 0) > 0) return false;
    if ((sheet.rowHeights ?? []).some((height) => height !== DEFAULT_ROW_HEIGHT)) return false;
    if ((sheet.colWidths ?? []).some((width) => width !== DEFAULT_COL_WIDTH)) return false;

    return !(sheet.tableData ?? []).some((row) =>
        row.some((cell) => hasCellContent(cell))
    );
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
    activeFilter = cloneFilter(sheet.activeFilter);
    tableData = cloneTableData(sheet.tableData);
    colWidths = [...sheet.colWidths];
    rowHeights = [...sheet.rowHeights];
    hiddenRows = new Set(sheet.hiddenRows ?? []);
    hiddenCols = new Set(sheet.hiddenCols ?? []);
    frozenRows = Math.max(0, Math.min(rowCount, Number(sheet.frozenRows) || 0));
    frozenCols = Math.max(0, Math.min(colCount, Number(sheet.frozenCols) || 0));
    extraSelections = [];
    copiedRange = null;
    internalClipboard = null;
    clipboardMode = null;
    isEditing = false;
    clearChartWorkspace();
    nextChartNumber = Math.max(1, Number(sheet.nextChartNumber) || 1);
    restoreChartWorkspace(sheet.charts, sheet.activeChartId);
}

function updateSheetRenameInputWidth(input) {
    const characterCount = Math.max(4, input.value.length + 1);
    input.style.width = `${characterCount}ch`;
}

function updateSheetDragOverVisual(index) {
    sheetDragOverIndex = index;
    sheetTabs?.querySelectorAll(".sheet-tab").forEach((tab, tabIndex) => {
        tab.classList.toggle("drag-over", tabIndex === index);
    });
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
        button.className = `sheet-tab${index === activeSheetIndex ? " active" : ""}${index === sheetDragOverIndex ? " drag-over" : ""}`;
        button.draggable = true;
        button.textContent = sheet.name;
        button.addEventListener("dragstart", (e) => {
            draggingSheetIndex = index;
            sheetDragOverIndex = index;
            e.dataTransfer.effectAllowed = "move";
            e.dataTransfer.setData("text/plain", String(index));
            button.classList.add("dragging");
        });
        button.addEventListener("dragend", () => {
            draggingSheetIndex = null;
            sheetDragOverIndex = null;
            renderSheetTabs();
        });
        button.addEventListener("dragover", (e) => {
            if (draggingSheetIndex === null || draggingSheetIndex === index) return;

            e.preventDefault();
            e.dataTransfer.dropEffect = "move";
            if (sheetDragOverIndex !== index) {
                updateSheetDragOverVisual(index);
            }
        });
        button.addEventListener("drop", (e) => {
            e.preventDefault();
            const fromIndex = draggingSheetIndex ?? Number(e.dataTransfer.getData("text/plain"));
            draggingSheetIndex = null;
            sheetDragOverIndex = null;
            reorderSheet(fromIndex, index);
        });
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

    const statusSummary = document.createElement("div");
    statusSummary.id = "status-summary";
    statusSummary.setAttribute("aria-live", "polite");
    sheetTabs.appendChild(statusSummary);
    updateStatusSummary();
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

function reorderSheet(fromIndex, toIndex) {
    if (fromIndex === toIndex) return false;
    if (!sheets[fromIndex] || !sheets[toIndex]) return false;

    captureCurrentSheet();
    const [movedSheet] = sheets.splice(fromIndex, 1);
    sheets.splice(toIndex, 0, movedSheet);

    if (activeSheetIndex === fromIndex) {
        activeSheetIndex = toIndex;
    } else if (fromIndex < activeSheetIndex && toIndex >= activeSheetIndex) {
        activeSheetIndex--;
    } else if (fromIndex > activeSheetIndex && toIndex <= activeSheetIndex) {
        activeSheetIndex++;
    }

    applySheetState(sheets[activeSheetIndex]);
    undoStack = [];
    redoStack = [];
    renderSheetTabs();
    renderTable();
    focusSelectedCell();
    return true;
}

function deleteActiveSheet() {
    if (sheets.length <= 1) return false;

    captureCurrentSheet();
    const sheet = sheets[activeSheetIndex];
    if (!isSheetEmpty(sheet)) {
        const sheetName = sheet?.name || "Bu sayfa";
        const shouldDelete = window.confirm(`"${sheetName}" boş değil. Yine de silmek istiyor musunuz?`);
        if (!shouldDelete) return false;
    }

    sheets.splice(activeSheetIndex, 1);
    activeSheetIndex = Math.max(0, activeSheetIndex - 1);
    applySheetState(sheets[activeSheetIndex]);
    undoStack = [];
    redoStack = [];
    renderSheetTabs();
    renderTable();
    focusSelectedCell();
    return true;
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

function createNewWorkbook() {
    if (!confirm("Mevcut çalışma temizlenip boş bir avCELL dosyası oluşturulsun mu?")) {
        return false;
    }

    isLoadingWorkbook = true;
    rowCount = 100;
    colCount = 26;
    selectedCell = { row: 0, col: 0 };
    selectionRange = null;
    selectionMode = "cell";
    extraSelections = [];
    internalClipboard = null;
    copiedRange = null;
    clipboardMode = null;
    contextMenuTarget = null;
    findResults = [];
    findResultIndex = -1;
    activeFilter = null;
    hiddenRows = new Set();
    hiddenCols = new Set();
    frozenRows = 0;
    frozenCols = 0;
    activeSheetIndex = 0;
    renamingSheetIndex = null;
    undoStack = [];
    redoStack = [];
    isEditing = false;
    editBackupValue = "";
    formulaInputBackupValue = "";
    clearCurrentWorkbookFile();
    localStorage.removeItem(AUTOSAVE_KEY);

    clearChartWorkspace();
    sheets = [createBlankSheetState("Sayfa1")];
    applySheetState(sheets[activeSheetIndex]);
    renderSheetTabs();
    renderTable();
    focusSelectedCell();
    isLoadingWorkbook = false;
    saveAutoSavedWorkbook();
    return true;
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
            activeFilter: cloneFilter(sheet.activeFilter),
            tableData: cloneTableData(sheet.tableData),
            colWidths: [...sheet.colWidths],
            rowHeights: [...sheet.rowHeights],
            hiddenRows: [...(sheet.hiddenRows ?? [])],
            hiddenCols: [...(sheet.hiddenCols ?? [])],
            charts: Array.isArray(sheet.charts) ? sheet.charts.map(cloneSavedChartState).filter(Boolean) : [],
            nextChartNumber: Math.max(1, Number(sheet.nextChartNumber) || 1),
            activeChartId: sheet.activeChartId ?? null
        }))
    };
}

function saveAutoSavedWorkbook() {
    if (!isAppInitialized || isLoadingWorkbook) return;

    try {
        localStorage.setItem(AUTOSAVE_KEY, JSON.stringify(createSavePayload()));
    } catch {
        // localStorage doluysa sessiz geç; normal dosyaya kaydetme çalışmaya devam eder.
    }
}

function scheduleAutoSave() {
    if (!isAppInitialized || isLoadingWorkbook) return;

    window.clearTimeout(autoSaveTimer);
    autoSaveTimer = window.setTimeout(saveAutoSavedWorkbook, 250);
}

function loadAutoSavedWorkbook() {
    const storedPayload = localStorage.getItem(AUTOSAVE_KEY);
    if (!storedPayload) return false;

    try {
        isLoadingWorkbook = true;
        loadWorkbookPayload(JSON.parse(storedPayload));
        return true;
    } catch {
        localStorage.removeItem(AUTOSAVE_KEY);
        return false;
    } finally {
        isLoadingWorkbook = false;
    }
}

function isPageReload() {
    const navigationEntry = performance.getEntriesByType?.("navigation")?.[0];
    if (navigationEntry?.type) {
        return navigationEntry.type === "reload";
    }

    return performance.navigation?.type === performance.navigation?.TYPE_RELOAD;
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

function normalizeImportedChartRange(range, rowCountValue, colCountValue) {
    if (!range) return null;
    if (Array.isArray(range)) {
        const ranges = range
            .map((item) => normalizeImportedChartRange(item, rowCountValue, colCountValue))
            .filter(Boolean);
        return ranges.length ? ranges : null;
    }

    return normalizeImportedRange(range, rowCountValue, colCountValue);
}

function isCellWithinImportedBounds(row, col, rowCountValue, colCountValue) {
    return (
        Number.isInteger(row) &&
        Number.isInteger(col) &&
        row >= 0 &&
        row < rowCountValue &&
        col >= 0 &&
        col < colCountValue
    );
}

function normalizeImportedChartState(chart, rowCountValue, colCountValue, index) {
    if (!chart) return null;

    const type = CHART_TYPES.includes(chart.config?.type) ? chart.config.type : "bar";
    const xRange = normalizeImportedChartRange(chart.config?.xRange, rowCountValue, colCountValue);
    const yRange = normalizeImportedChartRange(chart.config?.yRange, rowCountValue, colCountValue);
    const id = Math.max(1, Number(chart.id) || index + 1);
    const settings = {
        ...(chart.settings ?? {}),
        type: CHART_TYPES.includes(chart.settings?.type) ? chart.settings.type : type,
        showGridlines: chart.settings?.showGridlines ?? chart.config?.showGridlines ?? true
    };

    return {
        id,
        title: String(chart.title || settings.title || `Grafik ${id}`),
        config: yRange ? {
            xRange,
            yRange,
            type,
            showGridlines: chart.config?.showGridlines ?? settings.showGridlines
        } : null,
        settings,
        color: chart.color ? { ...chart.color } : null,
        dataColors: Array.isArray(chart.dataColors) ? chart.dataColors.map((color) => ({ ...color })) : [],
        titleReference: chart.titleReference &&
            Number.isInteger(chart.titleReference.row) &&
            Number.isInteger(chart.titleReference.col) &&
            isCellWithinImportedBounds(chart.titleReference.row, chart.titleReference.col, rowCountValue, colCountValue)
            ? { row: chart.titleReference.row, col: chart.titleReference.col }
            : null,
        left: Math.max(0, getFiniteNumber(chart.left, 96)),
        top: Math.max(0, getFiniteNumber(chart.top, 64)),
        width: Math.max(220, getFiniteNumber(chart.width, 420)),
        height: Math.max(32, getFiniteNumber(chart.height, 280)),
        minimized: Boolean(chart.minimized),
        restoreState: chart.restoreState ? { ...chart.restoreState } : null
    };
}

function normalizeImportedFilter(filter, rowCountValue, colCountValue) {
    if (!filter?.range) return null;

    const range = {
        minRow: Math.max(0, Math.min(rowCountValue - 1, Number(filter.range.minRow) || 0)),
        maxRow: Math.max(0, Math.min(rowCountValue - 1, Number(filter.range.maxRow) || 0)),
        minCol: Math.max(0, Math.min(colCountValue - 1, Number(filter.range.minCol) || 0)),
        maxCol: Math.max(0, Math.min(colCountValue - 1, Number(filter.range.maxCol) || 0))
    };

    if (range.maxRow <= range.minRow || range.maxCol < range.minCol) return null;

    return {
        range,
        column: Math.max(range.minCol, Math.min(range.maxCol, Number(filter.column) || range.minCol)),
        query: String(filter.query || "")
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
    const normalizedCharts = Array.isArray(sheet?.charts)
        ? sheet.charts
            .map((chart, chartIndex) => normalizeImportedChartState(chart, safeRowCount, safeColCount, chartIndex))
            .filter(Boolean)
        : [];
    const nextImportedChartNumber = Math.max(
        1,
        Number(sheet?.nextChartNumber) || 1,
        ...normalizedCharts.map((chart) => chart.id + 1)
    );

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
        activeFilter: normalizeImportedFilter(sheet?.activeFilter, safeRowCount, safeColCount),
        tableData: safeTableData,
        colWidths: Array.from({ length: safeColCount }, (_, col) =>
            Math.max(MIN_COL_WIDTH, Number(sheet?.colWidths?.[col]) || DEFAULT_COL_WIDTH)
        ),
        rowHeights: Array.from({ length: safeRowCount }, (_, row) =>
            Math.max(MIN_ROW_HEIGHT, Number(sheet?.rowHeights?.[row]) || DEFAULT_ROW_HEIGHT)
        ),
        hiddenRows: Array.isArray(sheet?.hiddenRows)
            ? sheet.hiddenRows
                .map((row) => Number(row))
                .filter((row) => Number.isInteger(row) && row >= 0 && row < safeRowCount)
            : [],
        hiddenCols: Array.isArray(sheet?.hiddenCols)
            ? sheet.hiddenCols
                .map((col) => Number(col))
                .filter((col) => Number.isInteger(col) && col >= 0 && col < safeColCount)
            : [],
        frozenRows: Math.max(0, Math.min(safeRowCount, Number(sheet?.frozenRows) || 0)),
        frozenCols: Math.max(0, Math.min(safeColCount, Number(sheet?.frozenCols) || 0)),
        charts: normalizedCharts,
        nextChartNumber: nextImportedChartNumber,
        activeChartId: sheet?.activeChartId ?? null
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
    scheduleAutoSave();
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
        activeFilter: cloneFilter(activeFilter),
        tableData: cloneTableData(tableData),
        colWidths: [...colWidths],
        rowHeights: [...rowHeights],
        hiddenRows: [...hiddenRows],
        hiddenCols: [...hiddenCols],
        frozenRows,
        frozenCols
    };
}

function restoreHistorySnapshot(snapshot) {
    isRestoringHistory = true;

    rowCount = snapshot.rowCount;
    colCount = snapshot.colCount;
    selectedCell = snapshot.selectedCell ? { ...snapshot.selectedCell } : { row: 0, col: 0 };
    selectionRange = cloneRange(snapshot.selectionRange);
    selectionMode = snapshot.selectionMode;
    activeFilter = cloneFilter(snapshot.activeFilter);
    tableData = cloneTableData(snapshot.tableData);
    colWidths = [...snapshot.colWidths];
    rowHeights = [...snapshot.rowHeights];
    hiddenRows = new Set(snapshot.hiddenRows ?? []);
    hiddenCols = new Set(snapshot.hiddenCols ?? []);
    frozenRows = Math.max(0, Math.min(rowCount, Number(snapshot.frozenRows) || 0));
    frozenCols = Math.max(0, Math.min(colCount, Number(snapshot.frozenCols) || 0));
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
    const width = Math.max(24, Math.round((colWidths[col] ?? DEFAULT_COL_WIDTH) * getZoomScale()));
    element.style.width = `${width}px`;
    element.style.minWidth = `${width}px`;
    element.style.maxWidth = `${width}px`;
}

function setRowHeight(element, row) {
    const height = Math.max(18, Math.round((rowHeights[row] ?? DEFAULT_ROW_HEIGHT) * getZoomScale()));
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
    frozenRows = 0;
    frozenCols = 0;

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
    clampFrozenPanes();

    const zoomScale = getZoomScale();
    const headerHeight = DEFAULT_ROW_HEIGHT;
    const rowHeaderWidth = 46;
    const frozenRowTops = new Map();
    const frozenColLefts = new Map();
    let frozenTop = headerHeight;
    let frozenLeft = rowHeaderWidth;

    for (let r = 0; r < frozenRows; r++) {
        if (hiddenRows.has(r) || isRowHiddenByFilter(r)) continue;
        frozenRowTops.set(r, frozenTop);
        frozenTop += Math.round((rowHeights[r] ?? DEFAULT_ROW_HEIGHT) * zoomScale);
    }

    for (let c = 0; c < frozenCols; c++) {
        if (hiddenCols.has(c)) continue;
        frozenColLefts.set(c, frozenLeft);
        frozenLeft += Math.round((colWidths[c] ?? DEFAULT_COL_WIDTH) * zoomScale);
    }

    const applyFrozenPosition = (element, row, col) => {
        const hasFrozenRow = frozenRowTops.has(row);
        const hasFrozenCol = frozenColLefts.has(col);
        if (!hasFrozenRow && !hasFrozenCol) return;

        element.classList.add("frozen-pane-cell");
        element.style.position = "sticky";
        element.style.backgroundColor = element.style.backgroundColor || "#ffffff";
        if (hasFrozenRow) element.style.top = `${frozenRowTops.get(row)}px`;
        if (hasFrozenCol) element.style.left = `${frozenColLefts.get(col)}px`;
        element.style.zIndex = hasFrozenRow && hasFrozenCol ? "7" : hasFrozenRow ? "5" : "3";
    };
    renderFreezeDividers(frozenTop, frozenLeft);

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
        if (hiddenCols.has(c)) continue;

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
        if (hasHiddenColAfter(c)) {
            th.classList.add("hidden-col-after");
        }
        if (hasHiddenColBefore(c)) {
            th.classList.add("hidden-col-before");
        }
        if (frozenColLefts.has(c)) {
            th.classList.add("frozen-pane-header");
            th.style.left = `${frozenColLefts.get(c)}px`;
            th.style.zIndex = "6";
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
        if (hiddenRows.has(r)) continue;
        if (isRowHiddenByFilter(r)) continue;

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
        if (hasHiddenRowAfter(r)) {
            rowHeader.classList.add("hidden-row-after");
        }
        if (hasHiddenRowBefore(r)) {
            rowHeader.classList.add("hidden-row-before");
        }
        if (frozenRowTops.has(r)) {
            rowHeader.classList.add("frozen-pane-header");
            rowHeader.style.top = `${frozenRowTops.get(r)}px`;
            rowHeader.style.zIndex = "7";
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
            if (hiddenCols.has(c)) continue;
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
                const zoomedWidth = Math.max(24, Math.round(width * getZoomScale()));
                const zoomedHeight = Math.max(18, Math.round(height * getZoomScale()));
                td.style.width = `${zoomedWidth}px`;
                td.style.minWidth = `${zoomedWidth}px`;
                td.style.maxWidth = `${zoomedWidth}px`;
                td.style.height = `${zoomedHeight}px`;
            } else {
                setColumnWidth(td, c);
                setRowHeight(td, r);
            }

            td.textContent = formatCellDisplayValue(tableData[r][c]);
            td.contentEditable = false;
            td.tabIndex = -1;
            const cellStyle = getCellStyle(tableData[r][c]);
            td.style.fontWeight = cellStyle.bold ? "700" : "400";
            td.style.fontStyle = cellStyle.italic ? "italic" : "normal";
            const textDecorations = [];
            if (cellStyle.underline) textDecorations.push("underline");
            if (cellStyle.strikeThrough) textDecorations.push("line-through");
            td.style.textDecoration = textDecorations.length ? textDecorations.join(" ") : "none";
            td.style.fontSize = `${Math.max(6, Math.round(Math.max(MIN_FONT_SIZE, Math.min(MAX_FONT_SIZE, Number(cellStyle.fontSize) || DEFAULT_FONT_SIZE)) * getZoomScale()))}px`;
            td.style.color = normalizeColorValue(cellStyle.color, "#202124");
            td.style.textAlign = cellStyle.horizontalAlign;
            td.style.verticalAlign = cellStyle.verticalAlign;
            if (cellStyle.backgroundColor) {
                td.style.backgroundColor = normalizeColorValue(cellStyle.backgroundColor, "#fff2cc");
            }
            applyFrozenPosition(td, r, c);
            if (
                activeFilter &&
                r === activeFilter.range.minRow &&
                c >= activeFilter.range.minCol &&
                c <= activeFilter.range.maxCol
            ) {
                td.classList.add("filter-header-cell");
                if (c === activeFilter.column && activeFilter.query) {
                    td.classList.add("filter-active-cell");
                }
                const filterButton = document.createElement("button");
                filterButton.type = "button";
                filterButton.className = "cell-filter-btn";
                filterButton.title = "Filtre seçenekleri";
                filterButton.innerHTML = '<img src="icons/filter.svg" alt="" />';
                filterButton.addEventListener("mousedown", (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                });
                filterButton.addEventListener("click", (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    showFilterPopup(filterButton, c);
                });
                td.appendChild(filterButton);
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

            // Grafik veri aralığı vurgusu.
            if (activeChart?.config && isCellInRange(r, c, activeChart.config.xRange)) {
                td.style.backgroundColor = activeChart.color?.labelHighlight ?? "#e6f4ea";
            }
            if (activeChart?.config && isCellInRange(r, c, activeChart.config.yRange)) {
                td.style.backgroundColor = activeChart.color?.dataHighlight ?? "#ceead6";
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
    updateStatusSummary();
    scheduleAutoSave();
}
// === EVENTS ===
undoBtn.addEventListener("click", undo);
redoBtn.addEventListener("click", redo);

zoomValueBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    hideContextMenu();
    hideBorderMenu();
    hideNumberFormatMenu();
    hideFilterPopup();
    hideFileMenu();
    hideEditMenu();
    hideViewMenu();
    hideInsertMenu();
    hideDataMenu();
    hideFormatMenu();

    if (zoomMenu?.hidden) {
        showZoomMenu();
    } else {
        hideZoomMenu();
    }
});

fileMenuBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    hideContextMenu();
    hideBorderMenu();
    hideFilterPopup();
    hideEditMenu();
    hideViewMenu();
    hideInsertMenu();
    hideDataMenu();
    hideFormatMenu();
    if (fileMenu) {
        fileMenu.hidden = !fileMenu.hidden;
        updateTextMenuActiveState();
    }
});

fileMenuBtn?.addEventListener("mouseenter", () => {
    if (hasOpenTextMenu()) openTextMenu("file");
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

newFileBtn?.addEventListener("click", () => {
    hideFileMenu();
    createNewWorkbook();
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
    hideFilterPopup();
    hideFileMenu();
    hideViewMenu();
    hideInsertMenu();
    hideDataMenu();
    hideFormatMenu();
    updateEditMenuState();
    if (editMenu) {
        editMenu.hidden = !editMenu.hidden;
        updateTextMenuActiveState();
    }
});

editMenuBtn?.addEventListener("mouseenter", () => {
    if (hasOpenTextMenu()) openTextMenu("edit");
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

menuFindBtn?.addEventListener("click", () => {
    hideEditMenu();
    openFindPanel();
});

editMenu?.addEventListener("click", (e) => {
    const button = e.target.closest("[data-delete-action]");
    if (!button || button.disabled) return;

    e.stopPropagation();
    hideEditMenu();

    if (button.dataset.deleteAction === "row") deleteSelectedRows();
    if (button.dataset.deleteAction === "column") deleteSelectedColumns();
    if (button.dataset.deleteAction === "sheet") deleteActiveSheet();
    if (button.dataset.deleteAction === "clear") clearSelection();
});

viewMenuBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    hideContextMenu();
    hideBorderMenu();
    hideFilterPopup();
    hideFileMenu();
    hideEditMenu();
    hideDataMenu();
    hideInsertMenu();
    hideFormatMenu();
    updateViewMenuState();
    if (viewMenu) {
        viewMenu.hidden = !viewMenu.hidden;
        updateTextMenuActiveState();
    }
});

viewMenuBtn?.addEventListener("mouseenter", () => {
    if (hasOpenTextMenu()) openTextMenu("view");
});

menuViewToolbarBtn?.addEventListener("click", () => {
    toggleViewSetting("toolbar");
    hideViewMenu();
});

menuViewFormulaBtn?.addEventListener("click", () => {
    toggleViewSetting("formulaBar");
    hideViewMenu();
});

menuViewGridlinesBtn?.addEventListener("click", () => {
    toggleViewSetting("gridlines");
    hideViewMenu();
});

formatMenuBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    hideContextMenu();
    hideBorderMenu();
    hideFilterPopup();
    hideFileMenu();
    hideEditMenu();
    hideViewMenu();
    hideInsertMenu();
    hideDataMenu();
    updateFormatMenuState();
    if (formatMenu) {
        formatMenu.hidden = !formatMenu.hidden;
        updateTextMenuActiveState();
    }
});

formatMenuBtn?.addEventListener("mouseenter", () => {
    if (hasOpenTextMenu()) openTextMenu("format");
});

insertMenuBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    const wasOpen = Boolean(insertMenu && !insertMenu.hidden);
    hideContextMenu();
    hideBorderMenu();
    hideFilterPopup();
    hideFileMenu();
    hideEditMenu();
    hideViewMenu();
    hideInsertMenu();
    hideDataMenu();
    hideFormatMenu();
    updateInsertMenuState();
    if (insertMenu) {
        insertMenu.hidden = wasOpen;
        updateTextMenuActiveState();
    }
});

insertMenuBtn?.addEventListener("mouseenter", () => {
    if (hasOpenTextMenu()) openTextMenu("insert");
});

insertMenu?.addEventListener("click", (e) => {
    const button = e.target.closest("[data-insert-action]");
    if (!button || button.disabled) return;

    e.stopPropagation();
    hideInsertMenu();

    if (button.dataset.insertAction === "row-above") insertRowsAboveSelection();
    if (button.dataset.insertAction === "row-below") insertRowsBelowSelection();
    if (button.dataset.insertAction === "col-left") insertColsLeftOfSelection();
    if (button.dataset.insertAction === "col-right") insertColsRightOfSelection();
    if (button.dataset.insertAction === "chart") insertChartFromSelection();
    if (button.dataset.insertAction === "sheet") addSheet();
});

dataMenuBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    const wasOpen = Boolean(dataMenu && !dataMenu.hidden);
    hideContextMenu();
    hideBorderMenu();
    hideFileMenu();
    hideEditMenu();
    hideViewMenu();
    hideInsertMenu();
    hideDataMenu();
    hideFormatMenu();
    updateDataMenuState();
    if (dataMenu) {
        dataMenu.hidden = wasOpen;
        updateTextMenuActiveState();
    }
});

dataMenuBtn?.addEventListener("mouseenter", () => {
    if (hasOpenTextMenu()) openTextMenu("data");
});

function handleZoomChoice(button, shouldHideViewMenu = false) {
    if (!button) return false;

    const value = Number(button.dataset.zoomValue);
    if (!ZOOM_LEVELS.includes(value)) return false;

    setZoom(value);
    hideZoomMenu();
    if (shouldHideViewMenu) hideViewMenu();
    return true;
}

viewMenu?.addEventListener("click", (e) => {
    const zoomButton = e.target.closest("[data-zoom-value]");
    if (zoomButton) {
        e.stopPropagation();
        handleZoomChoice(zoomButton, true);
    }
});

zoomMenu?.addEventListener("click", (e) => {
    const zoomButton = e.target.closest("[data-zoom-value]");
    if (zoomButton) {
        e.stopPropagation();
        handleZoomChoice(zoomButton);
    }
});

menuSortAscBtn?.addEventListener("click", () => {
    hideDataMenu();
    sortActiveRange("asc");
});

menuSortDescBtn?.addEventListener("click", () => {
    hideDataMenu();
    sortActiveRange("desc");
});

menuFilterBtn?.addEventListener("click", () => {
    hideDataMenu();
    toggleFilterFromSelection();
});

sortAscBtn?.addEventListener("click", () => {
    hideContextMenu();
    hideBorderMenu();
    sortActiveRange("asc");
});

sortDescBtn?.addEventListener("click", () => {
    hideContextMenu();
    hideBorderMenu();
    sortActiveRange("desc");
});

filterBtn?.addEventListener("click", () => {
    hideContextMenu();
    hideBorderMenu();
    hideFilterPopup();
    toggleFilterFromSelection();
});

hideAxisBtn?.addEventListener("click", () => {
    hideContextMenu();
    hideBorderMenu();
    hideFilterPopup();
    hideSelectedRowsOrColumns();
});

showAxisBtn?.addEventListener("click", () => {
    hideContextMenu();
    hideBorderMenu();
    hideFilterPopup();
    showHiddenRowsAndColumns();
});

tableArea?.addEventListener("scroll", updateFreezeDividerPositions);

window.addEventListener("mouseup", () => {
    finishFreezeDividerDrag();
});

freezeAxisBtn?.addEventListener("click", () => {
    if (freezeAxisBtn.disabled) return;
    hideContextMenu();
    hideBorderMenu();
    hideFilterPopup();
    toggleFreezeSelectedAxis();
});

insertChartBtn?.addEventListener("click", () => {
    hideContextMenu();
    hideBorderMenu();
    hideFilterPopup();
    hideNumberFormatMenu();
    insertChartFromSelection();
});

chartSettingsCloseBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    closeChartSettingsPanel();
});

chartSettingsTitleInput?.addEventListener("input", updateChartTitleFromPanel);
chartSettingsTypeBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    if (!chartSettingsTypeMenu) return;

    const willOpen = chartSettingsTypeMenu.hidden;
    chartSettingsTypeMenu.hidden = !willOpen;
    chartSettingsTypeBtn.setAttribute("aria-expanded", String(willOpen));
});
chartSettingsTypeMenu?.addEventListener("click", (e) => {
    e.stopPropagation();
    const button = e.target.closest("[data-chart-type]");
    if (!button) return;

    setChartSettingsType(button.dataset.chartType);
    hideChartTypeMenu();
    applyChartSettingsFromPanel();
});
chartSettingsLabelRangeInput?.addEventListener("change", applyChartSettingsFromPanel);
chartSettingsValueRangeInput?.addEventListener("change", applyChartSettingsFromPanel);
chartSettingsGridlinesInput?.addEventListener("change", applyChartSettingsFromPanel);

filterPopupApplyBtn?.addEventListener("click", () => {
    if (filterPopupColumn === null) return;
    applyFilterValue(filterPopupColumn, filterPopupInput?.value ?? "");
});

filterPopupClearBtn?.addEventListener("click", () => {
    if (filterPopupColumn === null) return;
    applyFilterValue(filterPopupColumn, "");
});

filterPopupInput?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        if (filterPopupColumn !== null) {
            applyFilterValue(filterPopupColumn, filterPopupInput.value);
        }
    }
    if (e.key === "Escape") {
        e.preventDefault();
        hideFilterPopup();
        focusSelectedCell();
    }
});

document.querySelectorAll(".text-menu > button").forEach((button) => {
    button.addEventListener("mouseenter", () => {
        if (!hasOpenTextMenu()) return;

        hideFileMenu();
        hideEditMenu();
        hideViewMenu();
        hideInsertMenu();
        hideDataMenu();
        hideFormatMenu();
    });
});

function runFormatMenuAction(action) {
    if (!selectedCell || isEditing) return;

    if (action === "text-color" || action === "fill-color") {
        hideContextMenu();
        hideBorderMenu();
        hideNumberFormatMenu();
        showColorPaletteMenu(
            action === "text-color" ? textColorPaletteMenu : fillColorPaletteMenu,
            action === "text-color" ? menuTextColorBtn : menuFillColorBtn
        );
        hideFormatMenu();
        return;
    }

    hideFormatMenu();
    hideContextMenu();
    hideBorderMenu();
    hideNumberFormatMenu();

    if (action === "bold") toggleStyleProperty("bold");
    if (action === "italic") toggleStyleProperty("italic");
    if (action === "underline") toggleStyleProperty("underline");
    if (action === "strikethrough") toggleStyleProperty("strikeThrough");
    if (action === "font-size-increase") changeFontSize(1);
    if (action === "font-size-decrease") changeFontSize(-1);
    if (action === "align-left") setHorizontalAlignment("left");
    if (action === "align-center") setHorizontalAlignment("center");
    if (action === "align-right") setHorizontalAlignment("right");
    if (action === "align-justify") setHorizontalAlignment("justify");
    if (action === "align-top") setVerticalAlignment("top");
    if (action === "align-middle") setVerticalAlignment("middle");
    if (action === "align-bottom") setVerticalAlignment("bottom");
    if (action === "merge") toggleMergeSelection();
}

menuBoldBtn?.addEventListener("click", () => runFormatMenuAction("bold"));
menuItalicBtn?.addEventListener("click", () => runFormatMenuAction("italic"));
menuUnderlineBtn?.addEventListener("click", () => runFormatMenuAction("underline"));
menuStrikethroughBtn?.addEventListener("click", () => runFormatMenuAction("strikethrough"));
menuFontSizeIncreaseBtn?.addEventListener("click", () => runFormatMenuAction("font-size-increase"));
menuFontSizeDecreaseBtn?.addEventListener("click", () => runFormatMenuAction("font-size-decrease"));
menuTextColorBtn?.addEventListener("click", () => runFormatMenuAction("text-color"));
menuFillColorBtn?.addEventListener("click", () => runFormatMenuAction("fill-color"));
menuAlignLeftBtn?.addEventListener("click", () => runFormatMenuAction("align-left"));
menuAlignCenterBtn?.addEventListener("click", () => runFormatMenuAction("align-center"));
menuAlignRightBtn?.addEventListener("click", () => runFormatMenuAction("align-right"));
menuAlignJustifyBtn?.addEventListener("click", () => runFormatMenuAction("align-justify"));
menuAlignTopBtn?.addEventListener("click", () => runFormatMenuAction("align-top"));
menuAlignMiddleBtn?.addEventListener("click", () => runFormatMenuAction("align-middle"));
menuAlignBottomBtn?.addEventListener("click", () => runFormatMenuAction("align-bottom"));
menuMergeBtn?.addEventListener("click", () => runFormatMenuAction("merge"));
menuBorderBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    e.preventDefault();
});

formatMenu?.addEventListener("click", (e) => {
    const formatButton = e.target.closest("[data-format-action]");
    if (formatButton && !formatButton.disabled) {
        e.stopPropagation();
        runFormatMenuAction(formatButton.dataset.formatAction);
        return;
    }

    const borderButton = e.target.closest("[data-border-action]");
    if (borderButton && !borderButton.disabled) {
        e.stopPropagation();
        hideFormatMenu();
        hideContextMenu();
        hideBorderMenu();
        applyBorderToSelection(borderButton.dataset.borderAction);
    }
});

borderBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    hideContextMenu();
    hideNumberFormatMenu();
    hideFileMenu();
    hideEditMenu();
    hideViewMenu();
    hideFormatMenu();
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

strikethroughBtn?.addEventListener("click", () => {
    hideContextMenu();
    hideBorderMenu();
    toggleStyleProperty("strikeThrough");
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

textColorBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    hideContextMenu();
    hideBorderMenu();
    hideFileMenu();
    hideEditMenu();
    hideViewMenu();
    hideInsertMenu();
    hideDataMenu();
    hideFormatMenu();
    showColorPaletteMenu(textColorPaletteMenu, textColorBtn);
});

fillColorBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    hideContextMenu();
    hideBorderMenu();
    hideFileMenu();
    hideEditMenu();
    hideViewMenu();
    hideInsertMenu();
    hideDataMenu();
    hideFormatMenu();
    showColorPaletteMenu(fillColorPaletteMenu, fillColorBtn);
});

currencyFormatBtn?.addEventListener("click", () => {
    hideContextMenu();
    hideBorderMenu();
    hideNumberFormatMenu();
    setNumberFormat("currency");
});

percentFormatBtn?.addEventListener("click", () => {
    hideContextMenu();
    hideBorderMenu();
    hideNumberFormatMenu();
    setNumberFormat("percent");
});

decimalDecreaseBtn?.addEventListener("click", () => {
    hideContextMenu();
    hideBorderMenu();
    hideNumberFormatMenu();
    changeDecimalPlaces(-1);
});

decimalIncreaseBtn?.addEventListener("click", () => {
    hideContextMenu();
    hideBorderMenu();
    hideNumberFormatMenu();
    changeDecimalPlaces(1);
});

numberFormatMoreBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    if (numberFormatMoreBtn.disabled) return;

    hideContextMenu();
    hideBorderMenu();
    hideZoomMenu();
    hideFilterPopup();
    if (numberFormatMenu?.hidden) {
        showNumberFormatMenu();
    } else {
        hideNumberFormatMenu();
    }
});

numberFormatMenu?.addEventListener("click", (e) => {
    e.stopPropagation();
    const button = e.target.closest("[data-number-format]");
    if (!button || button.disabled) return;

    if (button.dataset.numberFormat === "number") {
        setNumberFormatWithDecimalPlaces("number", 2);
    } else {
        setNumberFormat(button.dataset.numberFormat);
    }
    updateNumberFormatMenuState();
    hideNumberFormatMenu();
});

textColorInput?.addEventListener("input", () => {
    setTextColor(textColorInput.value);
});

fillColorInput?.addEventListener("input", () => {
    setFillColor(fillColorInput.value);
});

findToggleBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    hideContextMenu();
    hideBorderMenu();
    hideFileMenu();
    hideEditMenu();
    hideViewMenu();
    hideFormatMenu();
    toggleFindPanel();
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

replaceInput?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        if (e.shiftKey) {
            replaceAllFindResults();
        } else {
            replaceCurrentFindResult();
        }
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

replaceBtn?.addEventListener("click", () => {
    replaceCurrentFindResult();
});

replaceAllBtn?.addEventListener("click", () => {
    replaceAllFindResults();
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

alignJustifyBtn?.addEventListener("click", () => {
    hideContextMenu();
    hideBorderMenu();
    setHorizontalAlignment("justify");
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
addRowDownBtn.addEventListener("click", () => {
    if (addRowDownBtn.disabled) return;
    insertRowsBelowSelection();
});
removeRowBtn.addEventListener("click", () => {
    if (removeRowBtn.disabled) return;
    deleteSelectedRows();
});
addColBtn.addEventListener("click", () => {
    if (addColBtn.disabled) return;
    insertColsLeftOfSelection();
});
addColRightBtn.addEventListener("click", () => {
    if (addColRightBtn.disabled) return;
    insertColsRightOfSelection();
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
    const match = ref.match(/^\$?([A-Z]+)\$?(\d+)$/);
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
        const formulaValue = evaluateFormula(cell.formula, row, col);
        const num = parseFloat(formulaValue);
        return isNaN(num) ? 0 : num;
    }

    const num = parseFloat(cell.value);
    return isNaN(num) ? 0 : num;
}

function getCellReferenceValue(row, col, currentRow, currentCol) {
    if (!isCellWithinBounds(row, col)) return 0;
    if (row === currentRow && col === currentCol) return 0;

    const cell = tableData[row][col];
    return cell?.value ?? "";
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
    let expr = formula.slice(1).trim(); // '=' çıkar
    const singleReference = expr.match(/^\$?[A-Z]+\$?\d+$/i);

    if (singleReference) {
        const index = cellRefToIndex(singleReference[0].toUpperCase());
        if (!index) return 0;

        return getCellReferenceValue(index.row, index.col, currentRow, currentCol);
    }

    // SUM
    expr = expr.replace(/SUM\(\s*(\$?[A-Z]+\$?\d+:\$?[A-Z]+\$?\d+)\s*\)/gi, (_, range) => {
        return calculateSUM(range.toUpperCase());
    });
    // AVERAGE / AVG
    expr = expr.replace(/AVG\(\s*(\$?[A-Z]+\$?\d+:\$?[A-Z]+\$?\d+)\s*\)/gi, (_, range) => {
        return calculateAVG(range.toUpperCase());
    });
    expr = expr.replace(/AVERAGE\(\s*(\$?[A-Z]+\$?\d+:\$?[A-Z]+\$?\d+)\s*\)/gi, (_, range) => {
        return calculateAVG(range.toUpperCase());
    });

    // COUNT
    expr = expr.replace(/COUNT\(\s*(\$?[A-Z]+\$?\d+:\$?[A-Z]+\$?\d+)\s*\)/gi, (_, range) => {
        return calculateCOUNT(range.toUpperCase());
    });

    // MIN
    expr = expr.replace(
        /MIN\(\s*(\$?[A-Z]+\$?\d+:\$?[A-Z]+\$?\d+)\s*\)/gi,
        (_, range) => calculateMIN(range.toUpperCase())
    );

    // MAX
    expr = expr.replace(
        /MAX\(\s*(\$?[A-Z]+\$?\d+:\$?[A-Z]+\$?\d+)\s*\)/gi,
        (_, range) => calculateMAX(range.toUpperCase())
    );

    // TEKİL HÜCRELERİ ÇÖZ
    expr = expr.replace(/(\$?[A-Z]+\$?[0-9]+)/gi, (match) => {
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
    const chartSignaturesBefore = captureChartDependencySignatures();

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

    refreshChartsWithChangedCalculatedValues(chartSignaturesBefore);
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
    updateToolbarState();

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
    updateToolbarState();

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
    refreshChartsForChangedCell(row, col);

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
    refreshChartsForChangedCell(row, col);
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

window.addEventListener("pointerdown", (e) => {
    const isTextMenuTarget =
        fileMenu?.contains(e.target) ||
        fileMenuBtn?.contains(e.target) ||
        editMenu?.contains(e.target) ||
        editMenuBtn?.contains(e.target) ||
        viewMenu?.contains(e.target) ||
        viewMenuBtn?.contains(e.target) ||
        insertMenu?.contains(e.target) ||
        insertMenuBtn?.contains(e.target) ||
        dataMenu?.contains(e.target) ||
        dataMenuBtn?.contains(e.target) ||
        formatMenu?.contains(e.target) ||
        formatMenuBtn?.contains(e.target);

    if (!isTextMenuTarget) {
        hideFileMenu();
        hideEditMenu();
        hideViewMenu();
        hideInsertMenu();
        hideDataMenu();
        hideFormatMenu();
    }
}, true);

window.addEventListener("click", (e) => {
    if (contextMenu && !contextMenu.contains(e.target)) {
        hideContextMenu();
    }
    if (borderMenu && !borderMenu.contains(e.target) && !borderBtn?.contains(e.target)) {
        hideBorderMenu();
    }
    if (
        !e.target.closest(".color-palette-menu") &&
        !textColorBtn?.contains(e.target) &&
        !fillColorBtn?.contains(e.target) &&
        !menuTextColorBtn?.contains(e.target) &&
        !menuFillColorBtn?.contains(e.target)
    ) {
        hideColorPaletteMenus();
    }
    if (zoomMenu && !zoomMenu.contains(e.target) && !zoomValueBtn?.contains(e.target)) {
        hideZoomMenu();
    }
    if (
        numberFormatMenu &&
        !numberFormatMenu.contains(e.target) &&
        !numberFormatMoreBtn?.contains(e.target)
    ) {
        hideNumberFormatMenu();
    }
    if (
        chartSettingsTypeMenu &&
        !chartSettingsTypeMenu.contains(e.target) &&
        !chartSettingsTypeBtn?.contains(e.target)
    ) {
        hideChartTypeMenu();
    }
    if (fileMenu && !fileMenu.contains(e.target) && !fileMenuBtn?.contains(e.target)) {
        hideFileMenu();
    }
    if (editMenu && !editMenu.contains(e.target) && !editMenuBtn?.contains(e.target)) {
        hideEditMenu();
    }
    if (viewMenu && !viewMenu.contains(e.target) && !viewMenuBtn?.contains(e.target)) {
        hideViewMenu();
    }
    if (insertMenu && !insertMenu.contains(e.target) && !insertMenuBtn?.contains(e.target)) {
        hideInsertMenu();
    }
    if (dataMenu && !dataMenu.contains(e.target) && !dataMenuBtn?.contains(e.target)) {
        hideDataMenu();
    }
    if (formatMenu && !formatMenu.contains(e.target) && !formatMenuBtn?.contains(e.target)) {
        hideFormatMenu();
    }
    if (
        filterPopup &&
        !filterPopup.contains(e.target) &&
        !e.target.closest(".cell-filter-btn")
    ) {
        hideFilterPopup();
    }
});

window.addEventListener("mousedown", (e) => {
    if (e.button !== 0) return;
    if (contextMenu && !contextMenu.contains(e.target)) {
        hideContextMenu();
    }
});

table?.addEventListener("mousedown", () => {
    hideColorPaletteMenus();
}, true);

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
window.addEventListener("scroll", hideColorPaletteMenus, true);
window.addEventListener("scroll", hideFilterPopup, true);
window.addEventListener("scroll", hideZoomMenu, true);
window.addEventListener("scroll", hideNumberFormatMenu, true);
window.addEventListener("scroll", hideChartTypeMenu, true);
window.addEventListener("scroll", hideFileMenu, true);
window.addEventListener("scroll", hideEditMenu, true);
window.addEventListener("scroll", hideViewMenu, true);
window.addEventListener("scroll", hideInsertMenu, true);
window.addEventListener("scroll", hideFormatMenu, true);
tableArea?.addEventListener("scroll", () => {
    charts
        .filter((chart) => chart.element.classList.contains("minimized"))
        .forEach(positionMinimizedChartWindow);
});
window.addEventListener("resize", () => {
    charts
        .filter((chart) => chart.element.classList.contains("minimized"))
        .forEach(positionMinimizedChartWindow);
});

window.addEventListener("beforeunload", () => {
    if (isEditing) {
        exitEditMode(true);
    }
    window.clearTimeout(autoSaveTimer);
    saveAutoSavedWorkbook();
});

contextMenu?.addEventListener("click", (e) => {
    e.stopPropagation();
    const button = e.target.closest("[data-action]");
    if (button && !button.disabled) {
        handleContextMenuAction(button.dataset.action);
    }
    hideContextMenu();
});

window.addEventListener("mousemove", (e) => {
    if (freezeDragState) {
        e.preventDefault();
        updateFreezeDividerDrag(e);
        return;
    }

    if (chartResizeState) {
        e.preventDefault();
        resizeChartWindow(e);
        return;
    }

    if (chartDragState) {
        e.preventDefault();
        const chart = chartDragState.chart;
        const position = clampChartWindowPosition(
            chart,
            chartDragState.left + e.clientX - chartDragState.pointerX,
            chartDragState.top + e.clientY - chartDragState.pointerY
        );
        chart.element.style.left = `${position.left}px`;
        chart.element.style.top = `${position.top}px`;
        return;
    }

    if (!resizeState) return;

    if (resizeState.type === "column") {
        const width = Math.max(
            MIN_COL_WIDTH,
            resizeState.startSize + e.clientX - resizeState.startPosition
        );
        colWidths[resizeState.index] = width;
        applyColumnWidth(resizeState.index);
        if (resizeState.index < frozenCols) refreshFreezeDividers();
    }

    if (resizeState.type === "row") {
        const height = Math.max(
            MIN_ROW_HEIGHT,
            resizeState.startSize + e.clientY - resizeState.startPosition
        );
        rowHeights[resizeState.index] = height;
        applyRowHeight(resizeState.index);
        if (resizeState.index < frozenRows) refreshFreezeDividers();
    }
});

window.addEventListener("mouseup", () => {
    if (chartDragState || chartResizeState) {
        scheduleAutoSave();
    }
    chartDragState = null;
    chartResizeState = null;
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
        hideViewMenu();
        hideInsertMenu();
        hideFormatMenu();
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
applyViewSettings();
if (!isPageReload()) {
    localStorage.removeItem(AUTOSAVE_KEY);
}
if (!(isPageReload() && loadAutoSavedWorkbook())) {
    initData();
    sheets = [createSheetState("Sayfa1")];
    renderSheetTabs();
    renderTable();
}
isAppInitialized = true;
scheduleAutoSave();

function isCellInRange(row, col, range) {
    if (!range) return false;
    if (Array.isArray(range)) {
        return range.some((item) => isCellInRange(row, col, item));
    }

    const minRow = Math.min(range.start.row, range.end.row);
    const maxRow = Math.max(range.start.row, range.end.row);
    const minCol = Math.min(range.start.col, range.end.col);
    const maxCol = Math.max(range.start.col, range.end.col);

    return (
        row >= minRow && row <= maxRow &&
        col >= minCol && col <= maxCol
    );
}

function formatChartRange(range) {
    if (Array.isArray(range)) {
        return range.map(formatChartRange).filter(Boolean).join(";");
    }
    if (!range?.start || !range?.end) return "";

    const start = getCellName(range.start.row, range.start.col);
    const end = getCellName(range.end.row, range.end.col);
    return start === end ? start : `${start}:${end}`;
}

function parseChartRangeInput(value) {
    const text = String(value ?? "").trim().toUpperCase();
    if (!text) return null;

    const ranges = text.split(";").map((part) => part.trim()).filter(Boolean).map((part) => {
        const refs = part.split(":");
        const [startRef, endRef = startRef] = refs;
        if (!startRef || refs.length > 2) return null;

        const start = cellRefToIndex(startRef);
        const end = cellRefToIndex(endRef);
        if (!isRangeWithinBounds(start, end)) return null;

        return { start, end };
    });

    if (!ranges.length || ranges.some((range) => !range)) return null;
    return ranges.length === 1 ? ranges[0] : ranges;
}

function getChartRangeValues(range, numeric = false) {
    if (!range) return null;
    if (Array.isArray(range)) {
        const values = [];
        for (const item of range) {
            const itemValues = getChartRangeValues(item, numeric);
            if (!itemValues) return null;
            values.push(...itemValues);
        }
        return values;
    }

    const minRow = Math.min(range.start.row, range.end.row);
    const maxRow = Math.max(range.start.row, range.end.row);
    const minCol = Math.min(range.start.col, range.end.col);
    const maxCol = Math.max(range.start.col, range.end.col);
    const values = [];

    for (let r = minRow; r <= maxRow; r++) {
        for (let c = minCol; c <= maxCol; c++) {
            const value = tableData[r]?.[c]?.value;
            if (!numeric) {
                values.push(value);
                continue;
            }

            const text = String(value ?? "").trim();
            const number = text === "" ? 0 : Number(text);
            if (Number.isNaN(number)) return null;
            values.push(number);
        }
    }

    return values;
}

function createDefaultChartLabels(count) {
    return Array.from({ length: count }, () => "");
}

function createChartColor() {
    const hue = Math.floor(Math.random() * 360);
    return {
        hue,
        base: `hsl(${hue}, 72%, 45%)`,
        fill: `hsla(${hue}, 72%, 45%, 0.6)`,
        dataHighlight: `hsla(${hue}, 72%, 45%, 0.34)`,
        labelHighlight: `hsla(${hue}, 72%, 45%, 0.16)`
    };
}

function ensureChartDataColors(chart, count) {
    if (!Array.isArray(chart.dataColors)) {
        chart.dataColors = [];
    }
    while (chart.dataColors.length < count) {
        chart.dataColors.push(createChartColor());
    }
    chart.dataColors = chart.dataColors.slice(0, count);
    chart.color = chart.dataColors[0] ?? createChartColor();
}

function getHorizontalNumericChartValues(row, minCol, maxCol) {
    const values = [];
    let hasNumericValue = false;

    for (let c = minCol; c <= maxCol; c++) {
        const valueText = String(tableData[row]?.[c]?.value ?? "").trim();
        const value = valueText === "" ? 0 : Number(valueText);
        if (Number.isNaN(value)) return null;
        if (valueText !== "") hasNumericValue = true;
        values.push(value);
    }

    return hasNumericValue ? values : null;
}

function getTwoRowChartSelection(range) {
    if (!range || range.maxRow - range.minRow !== 1 || range.maxCol <= range.minCol) return null;

    const bottomValues = getHorizontalNumericChartValues(range.maxRow, range.minCol, range.maxCol);
    const topValues = getHorizontalNumericChartValues(range.minRow, range.minCol, range.maxCol);
    const valueRow = bottomValues ? range.maxRow : (topValues ? range.minRow : null);
    if (valueRow === null) return null;

    const labelRow = valueRow === range.maxRow ? range.minRow : range.maxRow;
    const values = valueRow === range.maxRow ? bottomValues : topValues;
    const labels = [];

    for (let c = range.minCol; c <= range.maxCol; c++) {
        labels.push(tableData[labelRow]?.[c]?.value ?? "");
    }

    return {
        data: { labels, values },
        config: {
            xRange: {
                start: { row: labelRow, col: range.minCol },
                end: { row: labelRow, col: range.maxCol }
            },
            yRange: {
                start: { row: valueRow, col: range.minCol },
                end: { row: valueRow, col: range.maxCol }
            },
            type: "bar"
        }
    };
}

function getSingleRowLabelValueChartSelection(range) {
    if (!range || range.minRow !== range.maxRow || range.maxCol - range.minCol !== 1) return null;

    const labelText = String(tableData[range.minRow]?.[range.minCol]?.value ?? "").trim();
    if (labelText === "" || !Number.isNaN(Number(labelText))) return null;

    const valueText = String(tableData[range.minRow]?.[range.maxCol]?.value ?? "").trim();
    const value = valueText === "" ? 0 : Number(valueText);
    if (Number.isNaN(value)) return null;

    return {
        data: { labels: [labelText], values: [value] },
        config: {
            xRange: {
                start: { row: range.minRow, col: range.minCol },
                end: { row: range.minRow, col: range.minCol }
            },
            yRange: {
                start: { row: range.minRow, col: range.maxCol },
                end: { row: range.minRow, col: range.maxCol }
            },
            type: "bar"
        }
    };
}

function getChartDataFromSelection() {
    const range = getActiveRange();
    if (!range) return null;

    const { minRow, maxRow, minCol, maxCol } = range;
    const twoRowSelection = getTwoRowChartSelection(range);
    if (twoRowSelection) return twoRowSelection.data;
    const singleRowLabelValueSelection = getSingleRowLabelValueChartSelection(range);
    if (singleRowLabelValueSelection) return singleRowLabelValueSelection.data;

    const labels = [];
    const values = [];
    const isSingleRow = minRow === maxRow;
    const isSingleCol = minCol === maxCol;
    const hasLabelColumn = !isSingleRow && !isSingleCol && maxCol > minCol;
    const valueCol = hasLabelColumn ? minCol + 1 : minCol;

    if (isSingleRow) {
        for (let c = minCol; c <= maxCol; c++) {
            const valueText = String(tableData[minRow]?.[c]?.value ?? "").trim();
            const value = valueText === "" ? 0 : Number(valueText);
            if (Number.isNaN(value)) return null;

            labels.push("");
            values.push(value);
        }
    } else {
        for (let r = minRow; r <= maxRow; r++) {
            const valueText = String(tableData[r]?.[valueCol]?.value ?? "").trim();
            const value = valueText === "" ? 0 : Number(valueText);
            if (Number.isNaN(value)) return null;

            labels.push(hasLabelColumn ? tableData[r]?.[minCol]?.value : "");
            values.push(value);
        }
    }

    return { labels, values };
}

function createChartWindow(config = null, data = null, savedState = null, shouldActivate = true) {
    if (!chartWindows) return null;

    const chartNumber = savedState?.id ?? nextChartNumber++;
    nextChartNumber = Math.max(nextChartNumber, chartNumber + 1);
    const settings = {
        title: savedState?.settings?.title ?? savedState?.title ?? `Grafik ${chartNumber}`,
        titleText: savedState?.settings?.titleText ?? savedState?.title ?? `Grafik ${chartNumber}`,
        type: savedState?.settings?.type ?? config?.type ?? "bar",
        labelRangeText: savedState?.settings?.labelRangeText ?? formatChartRange(config?.xRange),
        valueRangeText: savedState?.settings?.valueRangeText ?? formatChartRange(config?.yRange),
        showGridlines: savedState?.settings?.showGridlines ?? config?.showGridlines ?? true
    };
    const chart = {
        id: chartNumber,
        title: savedState?.title ?? settings.title ?? `Grafik ${chartNumber}`,
        config,
        color: savedState?.color ? { ...savedState.color } : createChartColor(),
        dataColors: Array.isArray(savedState?.dataColors) ? savedState.dataColors.map((color) => ({ ...color })) : [],
        settings,
        element: document.createElement("section"),
        canvas: document.createElement("canvas"),
        instance: null,
        restoreState: savedState?.restoreState ? { ...savedState.restoreState } : null
    };
    chart.titleReference = savedState?.titleReference ? { ...savedState.titleReference } : null;

    chart.element.className = "chart-panel";
    chart.element.style.left = `${savedState?.left ?? 96 + ((chartNumber - 1) % 6) * 28}px`;
    chart.element.style.top = `${savedState?.top ?? 64 + ((chartNumber - 1) % 6) * 28}px`;
    if (savedState?.width) chart.element.style.width = `${savedState.width}px`;
    if (savedState?.height) chart.element.style.height = `${savedState.height}px`;
    chart.element.innerHTML = `
        <div class="chart-titlebar">
            <span class="chart-window-title"></span>
            <div class="chart-window-actions">
                <button class="chart-minimize-btn" type="button" title="Simge durumuna küçült">−</button>
                <button class="chart-close-btn" type="button" title="Kapat">×</button>
            </div>
        </div>
        <div class="chart-window-body">
            <div class="chart-placeholder">Geçerli Bir Veri Aralığı Seçin</div>
        </div>
        <div class="chart-resize-handle resize-n" data-chart-resize="n"></div>
        <div class="chart-resize-handle resize-e" data-chart-resize="e"></div>
        <div class="chart-resize-handle resize-s" data-chart-resize="s"></div>
        <div class="chart-resize-handle resize-w" data-chart-resize="w"></div>
        <div class="chart-resize-handle resize-ne" data-chart-resize="ne"></div>
        <div class="chart-resize-handle resize-se" data-chart-resize="se"></div>
        <div class="chart-resize-handle resize-sw" data-chart-resize="sw"></div>
        <div class="chart-resize-handle resize-nw" data-chart-resize="nw"></div>
    `;

    chart.element.querySelector(".chart-window-title").textContent = chart.title;
    chart.element.querySelector(".chart-window-body").appendChild(chart.canvas);
    chartWindows.appendChild(chart.element);
    charts.push(chart);
    bindChartWindowEvents(chart);
    if (shouldActivate) {
        setActiveChart(chart, false);
    }

    if (data) {
        drawChart(chart, data.labels, data.values, config.type);
    } else {
        showEmptyChartPanel(chart);
    }
    if (savedState?.minimized) {
        chart.restoreState = savedState.restoreState ?? {
            left: savedState.left ?? chart.element.offsetLeft,
            top: savedState.top ?? chart.element.offsetTop,
            width: savedState.width ?? chart.element.offsetWidth,
            height: savedState.height ?? chart.element.offsetHeight
        };
        chart.element.classList.add("minimized");
        chart.element.style.width = "220px";
        chart.element.style.height = "32px";
        updateChartMinimizeButton(chart, true);
        positionMinimizedChartWindow(chart);
    }

    if (shouldActivate) {
        scheduleAutoSave();
    }
    return chart;
}

function bindChartWindowEvents(chart) {
    chart.element.addEventListener("mousedown", (e) => {
        if (e.target.closest(".chart-window-actions")) return;
        if (chart.element.classList.contains("minimized")) return;

        setActiveChart(chart);
    });

    chart.element.querySelector(".chart-close-btn")?.addEventListener("click", (e) => {
        e.stopPropagation();
        closeChartWindow(chart);
    });

    chart.element.querySelector(".chart-minimize-btn")?.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleChartMinimize(chart);
    });

    chart.element.querySelector(".chart-window-actions")?.addEventListener("mousedown", (e) => {
        e.stopPropagation();
    });

    chart.element.querySelector(".chart-titlebar")?.addEventListener("mousedown", (e) => {
        if (e.button !== 0 || e.target.closest(".chart-window-actions")) return;
        if (chart.element.classList.contains("minimized")) return;

        e.preventDefault();
        e.stopPropagation();
        setActiveChart(chart);
        chartDragState = {
            chart,
            pointerX: e.clientX,
            pointerY: e.clientY,
            left: chart.element.offsetLeft,
            top: chart.element.offsetTop
        };
    });

    chart.element.querySelectorAll("[data-chart-resize]").forEach((handle) => {
        handle.addEventListener("mousedown", (e) => {
            if (e.button !== 0 || chart.element.classList.contains("minimized")) return;

            e.preventDefault();
            e.stopPropagation();
            chartResizeState = {
                chart,
                direction: handle.dataset.chartResize,
                pointerX: e.clientX,
                pointerY: e.clientY,
                left: chart.element.offsetLeft,
                top: chart.element.offsetTop,
                width: chart.element.offsetWidth,
                height: chart.element.offsetHeight
            };
        });
    });
}

function setChartTitle(chart, title) {
    if (!chart) return;

    const cleanTitle = String(title ?? "").trim() || `Grafik ${chart.id}`;
    chart.title = cleanTitle;
    chart.element.querySelector(".chart-window-title").textContent = cleanTitle;
    if (chart.instance?.data?.datasets?.[0]) {
        chart.instance.data.datasets[0].label = cleanTitle;
        chart.instance.update();
    }
    if (activeChart === chart && chartSettingsTitle) {
        chartSettingsTitle.textContent = `${cleanTitle} Ayarlar`;
    }
}

function getChartTitleReference(titleText) {
    const text = String(titleText ?? "").trim().toUpperCase();
    if (!/^\$?[A-Z]+\$?\d+$/.test(text)) return null;

    const index = cellRefToIndex(text);
    return isCellWithinBounds(index?.row, index?.col) ? index : null;
}

function resolveChartTitle(chart, titleText) {
    const reference = getChartTitleReference(titleText);
    if (!reference) return String(titleText ?? "").trim();

    return tableData[reference.row]?.[reference.col]?.value ?? "";
}

function applyChartTitle(chart, titleText) {
    if (!chart) return;

    const rawTitle = String(titleText ?? "").trim();
    const resolvedTitle = resolveChartTitle(chart, rawTitle);
    chart.titleReference = getChartTitleReference(rawTitle);
    setChartTitle(chart, resolvedTitle || `Grafik ${chart.id}`);
    chart.settings = {
        ...(chart.settings ?? {}),
        titleText: rawTitle,
        title: chart.title
    };
}

function showEmptyChartPanel(chart) {
    if (!chart?.element) return;

    chart.element.classList.add("empty");
    chart.element.classList.remove("minimized");
    updateChartMinimizeButton(chart, false);
    if (chart.instance) {
        chart.instance.destroy();
        chart.instance = null;
    }
}

function setActiveChart(chart, shouldRenderTable = true) {
    if (!chart) return;

    const previousActiveChart = activeChart;
    activeChart = chart;
    chart.element.style.zIndex = String(++chartZIndex);
    charts.forEach((item) => {
        item.element.classList.toggle("active", item === chart);
    });
    updateChartSettingsPanel();
    if (shouldRenderTable && previousActiveChart !== chart) {
        renderTable();
    }
}

function updateChartSettingsPanel() {
    if (!activeChart || !chartSettingsPanel) return;

    chartSettingsPanel.hidden = false;
    chartSettingsPanel.style.zIndex = String(++chartZIndex);
    if (chartSettingsTitle) chartSettingsTitle.textContent = `${activeChart.title} Ayarlar`;
    if (chartSettingsTitleInput) chartSettingsTitleInput.value = activeChart.settings?.titleText ?? activeChart.settings?.title ?? activeChart.title;
    setChartSettingsType(activeChart.settings?.type ?? activeChart.config?.type ?? "bar");
    if (chartSettingsLabelRangeInput) {
        chartSettingsLabelRangeInput.value = activeChart.settings?.labelRangeText ?? formatChartRange(activeChart.config?.xRange);
    }
    if (chartSettingsValueRangeInput) {
        chartSettingsValueRangeInput.value = activeChart.settings?.valueRangeText ?? formatChartRange(activeChart.config?.yRange);
    }
    if (chartSettingsGridlinesInput) {
        chartSettingsGridlinesInput.checked = activeChart.settings?.showGridlines ?? activeChart.config?.showGridlines ?? true;
    }
    positionMinimizedChartWindows();
}

function getChartSettingsType() {
    return chartSettingsTypeInput?.dataset.value ?? "bar";
}

function setChartSettingsType(type) {
    const safeType = CHART_TYPES.includes(type) ? type : "bar";
    const selectedOption = chartSettingsTypeMenu?.querySelector(`[data-chart-type="${safeType}"]`);

    if (chartSettingsTypeInput) chartSettingsTypeInput.dataset.value = safeType;
    if (chartSettingsTypeBtn && selectedOption) {
        chartSettingsTypeBtn.innerHTML = selectedOption.innerHTML;
    }
    chartSettingsTypeMenu?.querySelectorAll("[data-chart-type]").forEach((button) => {
        const isActive = button.dataset.chartType === safeType;
        button.classList.toggle("active", isActive);
        button.setAttribute("aria-selected", String(isActive));
    });
    updateChartGridlinesVisibility(safeType);
}

function updateChartGridlinesVisibility(type = getChartSettingsType()) {
    if (!chartSettingsGridlinesField) return;

    chartSettingsGridlinesField.hidden = ["pie", "doughnut"].includes(type);
}

function closeChartSettingsPanel() {
    if (!chartSettingsPanel) return;

    chartSettingsPanel.hidden = true;
    positionMinimizedChartWindows();
}

function clearChartWorkspace() {
    charts.forEach((chart) => {
        chart.instance?.destroy();
    });
    charts = [];
    activeChart = null;
    chartDragState = null;
    chartResizeState = null;
    nextChartNumber = 1;
    chartWindows?.replaceChildren();
    closeChartSettingsPanel();
}

function restoreChartWorkspace(savedCharts = [], savedActiveChartId = null) {
    if (!Array.isArray(savedCharts) || savedCharts.length === 0) return;

    const restoredCharts = savedCharts
        .map(cloneSavedChartState)
        .filter(Boolean)
        .map((savedChart) => {
            const data = savedChart.config ? buildChartDataFromConfig(savedChart.config) : null;
            return createChartWindow(savedChart.config, data, savedChart, false);
        })
        .filter(Boolean);

    restoredCharts
        .filter((chart) => chart.element.classList.contains("minimized"))
        .forEach(positionMinimizedChartWindow);

    const activeSavedChartId = Number(savedActiveChartId);
    const activeSavedChart = restoredCharts.find((chart) => chart.id === activeSavedChartId);
    if (activeSavedChart && !activeSavedChart.element.classList.contains("minimized")) {
        setActiveChart(activeSavedChart, false);
    } else {
        closeChartSettingsPanel();
    }
}

function clearActiveChart(chart, shouldRenderTable = true) {
    if (activeChart !== chart) return;

    activeChart = null;
    charts.forEach((item) => {
        item.element.classList.remove("active");
    });
    closeChartSettingsPanel();
    if (shouldRenderTable) {
        renderTable();
    }
}

function drawChart(chart, labels, values, type) {
    chart.element.classList.remove("empty", "minimized");
    updateChartMinimizeButton(chart, false);
    const hasVisibleLabels = labels.some((label) => String(label ?? "").trim() !== "");
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);
    const chartType = type === "horizontalBar" ? "bar" : (type === "area" ? "line" : type);
    const hasCartesianScale = !["pie", "doughnut", "radar"].includes(chartType);
    const showGridlines = chart.config?.showGridlines ?? chart.settings?.showGridlines ?? true;
    ensureChartDataColors(chart, values.length);
    const pointColors = chart.dataColors.map((color) => color.fill);
    const pointBorderColors = chart.dataColors.map((color) => color.base);
    const blackStrokeTypes = ["bar", "horizontalBar", "line", "area", "pie", "doughnut"];
    const arcLegendLabels = Chart.overrides?.[chartType]?.plugins?.legend?.labels;
    const arcLegendOnClick = Chart.overrides?.[chartType]?.plugins?.legend?.onClick;
    const chartLabelPlugin = {
        id: "avcellChartLabels",
        afterDatasetsDraw(chartInstance) {
            if (!hasVisibleLabels || !["pie", "doughnut"].includes(chartType)) return;

            const { ctx } = chartInstance;
            const meta = chartInstance.getDatasetMeta(0);
            ctx.save();
            ctx.font = "600 12px Arial, sans-serif";
            meta.data.forEach((element, index) => {
                if (!chartInstance.getDataVisibility(index)) return;

                const label = String(chartInstance.data.labels[index] ?? "").trim();
                if (!label) return;

                const text = label.length > 16 ? `${label.slice(0, 15)}...` : label;
                const { x, y } = element.tooltipPosition();
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";

                ctx.lineWidth = 3;
                ctx.strokeStyle = "rgba(255,255,255,0.85)";
                ctx.fillStyle = "#202124";
                ctx.strokeText(text, x, y);
                ctx.fillText(text, x, y);
            });
            ctx.restore();
        }
    };

    if (chart.instance) {
        chart.instance.destroy();
    }

    chart.instance = new Chart(chart.canvas, {
        type: chartType,
        data: {
            labels,
            datasets: [{
                label: chart.title,
                data: values,
                backgroundColor: type === "area" ? chart.color?.fill : pointColors,
                borderColor: blackStrokeTypes.includes(type) ? "#000000" : pointBorderColors,
                borderWidth: type === "line" || type === "area" ? 2 : 1,
                fill: type === "area",
                showLine: type === "line" || type === "area",
                tension: 0,
                pointBackgroundColor: pointBorderColors,
                pointBorderColor: type === "line" || type === "area" ? "#000000" : pointBorderColors
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: type === "horizontalBar" ? "y" : "x",
            plugins: {
                legend: {
                    display: (["pie", "doughnut"].includes(chartType) && hasVisibleLabels) || type === "line",
                    labels: {
                        generateLabels(chartInstance) {
                            if (type !== "line") {
                                return arcLegendLabels?.generateLabels
                                    ? arcLegendLabels.generateLabels(chartInstance)
                                    : Chart.defaults.plugins.legend.labels.generateLabels(chartInstance);
                            }

                            const defaultLabels = Chart.defaults.plugins.legend.labels.generateLabels(chartInstance);
                            const datasetLabel = defaultLabels[0];
                            return [
                                datasetLabel,
                                {
                                    ...datasetLabel,
                                    text: "Çizgi",
                                    hidden: chartInstance.data.datasets[0]?.showLine === false,
                                    datasetIndex: 0,
                                    lineOnly: true
                                }
                            ];
                        }
                    },
                    onClick(e, legendItem, legend) {
                        if (type !== "line") {
                            if (arcLegendOnClick) {
                                arcLegendOnClick(e, legendItem, legend);
                            } else {
                                Chart.defaults.plugins.legend.onClick(e, legendItem, legend);
                            }
                            return;
                        }

                        if (!legendItem.lineOnly) {
                            Chart.defaults.plugins.legend.onClick(e, legendItem, legend);
                            return;
                        }

                        const dataset = legend.chart.data.datasets[legendItem.datasetIndex];
                        dataset.showLine = dataset.showLine === false;
                        legend.chart.update();
                    }
                }
            },
            scales: chartType === "radar" ? {
                r: {
                    min: minValue - 1,
                    max: maxValue + 1,
                    grid: {
                        display: showGridlines
                    },
                    angleLines: {
                        display: showGridlines
                    },
                    pointLabels: {
                        display: hasVisibleLabels
                    }
                }
            } : (!hasCartesianScale ? {} : {
                x: {
                    min: type === "horizontalBar" ? minValue - 1 : undefined,
                    max: type === "horizontalBar" ? maxValue + 1 : undefined,
                    grid: {
                        display: showGridlines
                    },
                    ticks: {
                        display: type === "horizontalBar" ? true : hasVisibleLabels
                    }
                },
                y: {
                    min: type === "horizontalBar" ? undefined : minValue - 1,
                    max: type === "horizontalBar" ? undefined : maxValue + 1,
                    grid: {
                        display: showGridlines
                    },
                    ticks: {
                        display: type === "horizontalBar" ? hasVisibleLabels : true
                    }
                }
            })
        },
        plugins: hasVisibleLabels && ["pie", "doughnut"].includes(chartType) ? [chartLabelPlugin] : []
    });
}

function buildChartDataFromConfig(config) {
    if (!config?.yRange) return null;

    const values = getChartRangeValues(config.yRange, true);
    if (!values || values.length === 0) return null;

    const labelValues = config.xRange ? getChartRangeValues(config.xRange) : null;
    const labels = labelValues?.length === values.length
        ? labelValues
        : createDefaultChartLabels(values.length);

    return { labels, values };
}

function refreshChartFromConfig(chart) {
    if (!chart?.config) return;
    if (chart.element.classList.contains("minimized")) return;

    const data = buildChartDataFromConfig(chart.config);
    if (!data) {
        showEmptyChartPanel(chart);
        return;
    }

    drawChart(chart, data.labels, data.values, chart.config.type);
}

function refreshChartsFromConfigs() {
    charts.forEach(refreshChartFromConfig);
}

function getChartDependencySignature(chart) {
    if (!chart?.config) return null;

    const titleValue = chart.titleReference
        ? tableData[chart.titleReference.row]?.[chart.titleReference.col]?.value ?? ""
        : "";
    const labels = chart.config.xRange ? getChartRangeValues(chart.config.xRange) : null;
    const values = chart.config.yRange ? getChartRangeValues(chart.config.yRange, true) : null;

    return JSON.stringify({ titleValue, labels, values });
}

function captureChartDependencySignatures() {
    if (!charts.length) return null;

    return new Map(charts.map((chart) => [chart, getChartDependencySignature(chart)]));
}

function refreshChartsWithChangedCalculatedValues(previousSignatures) {
    if (!previousSignatures) return;

    charts.forEach((chart) => {
        if (!previousSignatures.has(chart)) return;

        const previousSignature = previousSignatures.get(chart);
        const nextSignature = getChartDependencySignature(chart);
        if (previousSignature === nextSignature) return;

        if (chart.titleReference) {
            applyChartTitle(chart, chart.settings?.titleText ?? chart.title);
        }
        refreshChartFromConfig(chart);
    });
}

function chartUsesCell(chart, row, col) {
    return (
        (chart.titleReference?.row === row && chart.titleReference?.col === col) ||
        isCellInRange(row, col, chart.config?.xRange) ||
        isCellInRange(row, col, chart.config?.yRange)
    );
}

function chartRangeIntersects(range, chartRange) {
    if (!range || !chartRange) return false;
    if (Array.isArray(chartRange)) {
        return chartRange.some((item) => chartRangeIntersects(range, item));
    }

    const normalizedChartRange = {
        minRow: Math.min(chartRange.start.row, chartRange.end.row),
        maxRow: Math.max(chartRange.start.row, chartRange.end.row),
        minCol: Math.min(chartRange.start.col, chartRange.end.col),
        maxCol: Math.max(chartRange.start.col, chartRange.end.col)
    };

    return !(
        range.maxRow < normalizedChartRange.minRow ||
        range.minRow > normalizedChartRange.maxRow ||
        range.maxCol < normalizedChartRange.minCol ||
        range.minCol > normalizedChartRange.maxCol
    );
}

function chartUsesRange(chart, range) {
    return (
        chartRangeIntersects(range, chart.config?.xRange) ||
        chartRangeIntersects(range, chart.config?.yRange) ||
        (
            chart.titleReference &&
            chart.titleReference.row >= range.minRow &&
            chart.titleReference.row <= range.maxRow &&
            chart.titleReference.col >= range.minCol &&
            chart.titleReference.col <= range.maxCol
        )
    );
}

function refreshChartsForChangedCell(row, col) {
    charts.forEach((chart) => {
        if (!chartUsesCell(chart, row, col)) return;

        if (chart.titleReference?.row === row && chart.titleReference?.col === col) {
            applyChartTitle(chart, chart.settings?.titleText ?? chart.title);
        }
        refreshChartFromConfig(chart);
    });
}

function refreshChartsForChangedRange(range) {
    charts.forEach((chart) => {
        if (!chartUsesRange(chart, range)) return;

        if (
            chart.titleReference &&
            chart.titleReference.row >= range.minRow &&
            chart.titleReference.row <= range.maxRow &&
            chart.titleReference.col >= range.minCol &&
            chart.titleReference.col <= range.maxCol
        ) {
            applyChartTitle(chart, chart.settings?.titleText ?? chart.title);
        }
        refreshChartFromConfig(chart);
    });
}

function applyChartSettingsFromPanel() {
    if (!activeChart) return;

    const type = getChartSettingsType();
    const title = chartSettingsTitleInput?.value ?? activeChart.title;
    const labelRangeText = chartSettingsLabelRangeInput?.value ?? "";
    const valueRangeText = chartSettingsValueRangeInput?.value ?? "";
    const showGridlines = chartSettingsGridlinesInput?.checked ?? true;
    const xRange = labelRangeText.trim() ? parseChartRangeInput(labelRangeText) : null;
    const yRange = parseChartRangeInput(valueRangeText);

    applyChartTitle(activeChart, title);
    activeChart.settings = { ...(activeChart.settings ?? {}), type, labelRangeText, valueRangeText, showGridlines };

    if ((labelRangeText.trim() && !xRange) || !yRange) {
        activeChart.config = null;
        showEmptyChartPanel(activeChart);
        renderTable();
        scheduleAutoSave();
        return;
    }

    activeChart.config = { xRange, yRange, type, showGridlines };
    refreshChartFromConfig(activeChart);
    renderTable();
    scheduleAutoSave();
}

function updateChartTitleFromPanel() {
    if (!activeChart) return;

    applyChartTitle(activeChart, chartSettingsTitleInput?.value ?? activeChart.title);
    scheduleAutoSave();
}

function clearSelectionRangeAfterChartInsert() {
    selectionRange = null;
    extraSelections = [];
    selectionMode = "cell";
}

function insertChartFromSelection() {
    const data = getChartDataFromSelection();
    if (!data) {
        createChartWindow();
        clearSelectionRangeAfterChartInsert();
        renderTable();
        return;
    }

    const range = getActiveRange();
    const twoRowSelection = getTwoRowChartSelection(range);
    if (twoRowSelection) {
        createChartWindow(twoRowSelection.config, twoRowSelection.data);
        clearSelectionRangeAfterChartInsert();
        renderTable();
        return;
    }
    const singleRowLabelValueSelection = getSingleRowLabelValueChartSelection(range);
    if (singleRowLabelValueSelection) {
        createChartWindow(singleRowLabelValueSelection.config, singleRowLabelValueSelection.data);
        clearSelectionRangeAfterChartInsert();
        renderTable();
        return;
    }

    const isSingleRow = range.minRow === range.maxRow;
    const isSingleCol = range.minCol === range.maxCol;
    const hasLabelColumn = !isSingleRow && !isSingleCol && range.maxCol > range.minCol;
    const config = {
        xRange: hasLabelColumn ? {
            start: { row: range.minRow, col: range.minCol },
            end: { row: range.maxRow, col: range.minCol }
        } : null,
        yRange: {
            start: { row: range.minRow, col: hasLabelColumn ? range.minCol + 1 : range.minCol },
            end: {
                row: range.maxRow,
                col: isSingleRow ? range.maxCol : (hasLabelColumn ? range.minCol + 1 : range.minCol)
            }
        },
        type: "bar"
    };
    createChartWindow(config, data);
    clearSelectionRangeAfterChartInsert();
    renderTable();
}

function closeChartWindow(chart) {
    if (!chart) return;

    clearActiveChart(chart);
    if (chart.instance) {
        chart.instance.destroy();
    }
    chart.element.remove();
    charts = charts.filter((item) => item !== chart);
    chartDragState = null;
    chartResizeState = null;
    charts
        .filter((item) => item.element.classList.contains("minimized"))
        .forEach(positionMinimizedChartWindow);
    renderTable();
    scheduleAutoSave();
}

function updateChartMinimizeButton(chart, isMinimized) {
    const button = chart.element.querySelector(".chart-minimize-btn");
    if (!button) return;

    if (isMinimized) {
        button.innerHTML = `
            <svg class="chart-restore-icon" viewBox="0 0 24 24" aria-hidden="true">
                <rect x="6" y="4.5" width="12" height="11" rx="1.2" fill="none" stroke="currentColor" stroke-width="1.8" />
            </svg>
        `;
    } else {
        button.textContent = "−";
    }
    button.title = isMinimized ? "Geri yükle" : "Simge durumuna küçült";
}

function toggleChartMinimize(chart) {
    if (!chart?.element) return;

    if (chart.element.classList.contains("minimized")) {
        chart.element.classList.remove("minimized");
        if (chart.restoreState) {
            chart.element.style.left = `${chart.restoreState.left}px`;
            chart.element.style.top = `${chart.restoreState.top}px`;
            chart.element.style.width = `${chart.restoreState.width}px`;
            chart.element.style.height = `${chart.restoreState.height}px`;
        }
        updateChartMinimizeButton(chart, false);
        refreshChartFromConfig(chart);
        chart.instance?.resize();
        setActiveChart(chart);
        scheduleAutoSave();
        return;
    }

    chart.restoreState = {
        left: chart.element.offsetLeft,
        top: chart.element.offsetTop,
        width: chart.element.offsetWidth,
        height: chart.element.offsetHeight
    };
    chart.element.classList.add("minimized");
    chart.element.style.width = "220px";
    chart.element.style.height = "32px";
    updateChartMinimizeButton(chart, true);
    clearActiveChart(chart);
    positionMinimizedChartWindows();
    scheduleAutoSave();
}

function clampChartWindowPosition(chart, left, top) {
    if (!tableArea || !chart?.element) return { left, top };

    const maxLeft = Math.max(0, tableArea.scrollLeft + tableArea.clientWidth - chart.element.offsetWidth);
    const maxTop = Math.max(0, tableArea.scrollTop + tableArea.clientHeight - chart.element.offsetHeight);
    return {
        left: Math.max(tableArea.scrollLeft, Math.min(left, maxLeft)),
        top: Math.max(tableArea.scrollTop, Math.min(top, maxTop))
    };
}

function getMinimizedChartIndex(chart) {
    return charts.filter((item) => item.element.classList.contains("minimized")).indexOf(chart);
}

function positionMinimizedChartWindows() {
    requestAnimationFrame(() => {
        charts
            .filter((item) => item.element.classList.contains("minimized"))
            .forEach(positionMinimizedChartWindow);
    });
}

function positionMinimizedChartWindow(chart) {
    if (!tableArea || !chart?.element) return;

    const index = Math.max(0, getMinimizedChartIndex(chart));
    const width = chart.element.offsetWidth;
    const height = chart.element.offsetHeight;
    const left = tableArea.scrollLeft + tableArea.clientWidth - width - 12;
    const top = tableArea.scrollTop + tableArea.clientHeight - height - 12 - (index * (height + 6));
    const position = clampChartWindowPosition(chart, left, top);
    chart.element.style.left = `${position.left}px`;
    chart.element.style.top = `${position.top}px`;
}

function resizeChartWindow(e) {
    if (!chartResizeState || !tableArea) return;

    const dx = e.clientX - chartResizeState.pointerX;
    const dy = e.clientY - chartResizeState.pointerY;
    const chart = chartResizeState.chart;
    const direction = chartResizeState.direction;
    const minWidth = 280;
    const minHeight = 180;
    const maxWidth = Math.max(minWidth, tableArea.clientWidth - 16);
    const maxHeight = Math.max(minHeight, tableArea.clientHeight - 16);
    let left = chartResizeState.left;
    let top = chartResizeState.top;
    let width = chartResizeState.width;
    let height = chartResizeState.height;

    if (direction.includes("e")) {
        width = Math.max(minWidth, Math.min(maxWidth, chartResizeState.width + dx));
    }
    if (direction.includes("s")) {
        height = Math.max(minHeight, Math.min(maxHeight, chartResizeState.height + dy));
    }
    if (direction.includes("w")) {
        width = Math.max(minWidth, Math.min(maxWidth, chartResizeState.width - dx));
        left = chartResizeState.left + chartResizeState.width - width;
    }
    if (direction.includes("n")) {
        height = Math.max(minHeight, Math.min(maxHeight, chartResizeState.height - dy));
        top = chartResizeState.top + chartResizeState.height - height;
    }

    const position = clampChartWindowPosition(chart, left, top);
    chart.element.style.left = `${position.left}px`;
    chart.element.style.top = `${position.top}px`;
    chart.element.style.width = `${width}px`;
    chart.element.style.height = `${height}px`;
    chart.instance?.resize();
}
