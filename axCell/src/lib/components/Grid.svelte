<script lang="ts">
  import Cell from './Cell.svelte';
  import { sheetStore, addRow, removeRow, addCol, removeCol, updateCellStyle } from '$lib/stores/sheetStore';
  import { get } from 'svelte/store';

  $: rows = $sheetStore.rows;
  $: cols = $sheetStore.cols;

  // Dinamik sütun başlıkları (A, B, C...)
  $: colLabels = Array.from({ length: cols }, (_, i) =>
    String.fromCharCode('A'.charCodeAt(0) + i)
  );

  // Stil uygulama fonksiyonu
  function applyStyle(styleUpdate: any) {
    const state = get(sheetStore);
    if (state.range) {
      const rMin = Math.min(state.range.start.row, state.range.end.row);
      const rMax = Math.max(state.range.start.row, state.range.end.row);
      const cMin = Math.min(state.range.start.col, state.range.end.col);
      const cMax = Math.max(state.range.start.col, state.range.end.col);

      for (let r = rMin; r <= rMax; r++) {
        for (let c = cMin; c <= cMax; c++) {
          updateCellStyle(r, c, styleUpdate);
        }
      }
    } else if (state.selected) {
      updateCellStyle(state.selected.row, state.selected.col, styleUpdate);
    }
  }
</script>

<!-- Toolbar -->
<div class="mb-2 flex gap-2">
  <button on:click={() => applyStyle({ bold: true })}><b>B</b></button>
  <button on:click={() => applyStyle({ italic: true })}><i>I</i></button>
  <input type="color" on:input={(e) => applyStyle({ color: (e.target as HTMLInputElement).value })} title="Yazı rengi" />
  <input type="color" on:input={(e) => applyStyle({ background: (e.target as HTMLInputElement).value })} title="Dolgu rengi" />
</div>

<!-- Satır/Sütun ekle/sil butonları -->
<div class="mb-2 flex gap-2">
  <button on:click={addRow}>Satır Ekle</button>
  <button on:click={removeRow}>Satır Sil</button>
  <button on:click={addCol}>Sütun Ekle</button>
  <button on:click={removeCol}>Sütun Sil</button>
</div>

<!-- Grid -->
<div class="inline-block">
  <!-- Sütun başlıkları -->
  <div class="flex">
    <div class="w-12 h-10"></div>
    {#each colLabels as label}
      <div class="w-24 h-10 flex items-center justify-center font-bold border border-gray-300">{label}</div>
    {/each}
  </div>

  <!-- Satırlar -->
  {#each Array(rows) as _, rowIndex}
    <div class="flex">
      <!-- Satır başlığı -->
      <div class="w-12 h-10 flex items-center justify-center font-bold border border-gray-300">{rowIndex + 1}</div>

      <!-- Hücreler -->
      {#each Array(cols) as _, colIndex}
        <Cell
          row={rowIndex + 1}
          col={colIndex + 1}
        />
      {/each}
    </div>
  {/each}
</div>
