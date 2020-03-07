<script>
  export { filter };

  import { WiredCombo } from "wired-combo";

  let filter;

  function change(e) {
    filter = e.detail.selected;
  }
</script>

<wired-combo selected={filter} on:selected={change}>
  <wired-item value="0">Все</wired-item>
  <wired-item value="1">Смапленные</wired-item>
  <wired-item value="2">Несмапленные</wired-item>
</wired-combo>
