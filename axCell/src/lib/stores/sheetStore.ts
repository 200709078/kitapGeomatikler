import { writable } from 'svelte/store';

export type CellData = {
  value: string;
  style?: {
    bold?: boolean;
    italic?: boolean;
    color?: string;       // yazı rengi
    background?: string;  // dolgu rengi
    fontSize?: string;
  };
};

export type SheetState = {
    cells: Record<string, CellData>;
    selected: { row: number; col: number } | null;
    range?: { start: { row: number; col: number }; end: { row: number; col: number } };
    rows: number;
    cols: number;
};

export const sheetStore = writable<SheetState>({
    cells: {},
    selected: null,
    range: undefined,
    rows: 20,
    cols: 10
});
// Satır ekleme
export function addRow() {
    sheetStore.update(state => ({ ...state, rows: state.rows + 1 }));
}

// Satır silme (son satırı kaldır)
export function removeRow() {
    sheetStore.update(state => ({ ...state, rows: Math.max(1, state.rows - 1) }));
}

// Sütun ekleme
export function addCol() {
    sheetStore.update(state => ({ ...state, cols: state.cols + 1 }));
}

// Sütun silme (son sütunu kaldır)
export function removeCol() {
    sheetStore.update(state => ({ ...state, cols: Math.max(1, state.cols - 1) }));
}
// Tek hücre seçimi
export function selectCell(row: number, col: number, shiftKey = false) {
    sheetStore.update(state => {
        if (shiftKey && state.selected) {
            // Range selection
            return {
                ...state,
                range: {
                    start: state.selected,
                    end: { row, col }
                },
                selected: { row, col }
            };
        } else {
            return { ...state, selected: { row, col }, range: undefined };
        }
    });
}

// Hücre güncelleme
export function updateCell(row: number, col: number, value: string) {
    const key = `${row},${col}`;
    sheetStore.update(state => {
        const newCells = { ...state.cells };
        if (value.trim() === '') {
            delete newCells[key];
        } else {
            newCells[key] = { value };
        }
        return { ...state, cells: newCells };
    });
}

export function updateCellStyle(row: number, col: number, newStyle: Partial<CellData["style"]>) {
  const key = `${row},${col}`;
  sheetStore.update(state => {
    const cells = { ...state.cells };
    const prev = cells[key] || { value: "" };
    cells[key] = { ...prev, style: { ...prev.style, ...newStyle } };
    return { ...state, cells };
  });
}

