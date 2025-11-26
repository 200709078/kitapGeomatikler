<script lang="ts">
  import { sheetStore, selectCell, updateCell } from '$lib/stores/sheetStore';
  import { get } from 'svelte/store';

  export let row: number;
  export let col: number;

  let editing = false;
  let inputValue = '';

  // Tıklama
  function handleClick(event: MouseEvent) {
    selectCell(row, col, event.shiftKey);
  }

  function handleDblClick() {
    const state = get(sheetStore);
    const key = `${row},${col}`;
    inputValue = state.cells[key]?.value || '';
    editing = true;

    setTimeout(() => {
      const input = document.getElementById(`input-${row}-${col}`) as HTMLInputElement;
      input?.focus();
      input?.select();
    }, 0);
  }

  function handleKeyDown(event: KeyboardEvent) {
    const state = get(sheetStore);
    const maxRow = 20;
    const maxCol = 10;
    let { row: r, col: c } = state.selected || { row, col };

    if (!editing) {
      switch (event.key) {
        case 'ArrowUp': selectCell(Math.max(r - 1, 1), c); event.preventDefault(); break;
        case 'ArrowDown': selectCell(Math.min(r + 1, maxRow), c); event.preventDefault(); break;
        case 'ArrowLeft': selectCell(r, Math.max(c - 1, 1)); event.preventDefault(); break;
        case 'ArrowRight': selectCell(r, Math.min(c + 1, maxCol)); event.preventDefault(); break;
        case 'F2': handleDblClick(); break;
      }
    } else {
      if (event.key === 'Enter') save();
      if (event.key === 'Escape') editing = false;
    }
  }

  function save() {
    updateCell(row, col, inputValue);
    editing = false;
  }

  // Reactive values
  $: state = $sheetStore;
  $: isSelected = state.selected?.row === row && state.selected?.col === col;
  $: inRange = state.range
    ? row >= Math.min(state.range.start.row, state.range.end.row) &&
      row <= Math.max(state.range.start.row, state.range.end.row) &&
      col >= Math.min(state.range.start.col, state.range.end.col) &&
      col <= Math.max(state.range.start.col, state.range.end.col)
    : false;
  $: value = state.cells[`${row},${col}`]?.value || '';
</script>

{#if editing}
  <input
    id={"input-" + row + "-" + col}
    type="text"
    bind:value={inputValue}
    class="border-2 border-blue-500 w-24 h-10 text-center"
    on:keydown={handleKeyDown}
    on:blur={save}
  />
{:else}
  <button
    type="button"
    class="border w-24 h-10 flex items-center justify-center cursor-pointer focus:outline-none"
    class:selected={isSelected}
    class:filled={value && !isSelected}
    class:inrange={inRange}
    on:click={handleClick}
    on:dblclick={handleDblClick}
    on:keydown={handleKeyDown}
  >
    {value}
  </button>
{/if}

<style>
.selected {
  border: 2px solid #3b82f6;
  background-color: white;
}
.filled {
  background-color: #cce5ff;
}
.inrange {
  background-color: #bfdbfe; /* açık mavi dolgu */
}
</style>
