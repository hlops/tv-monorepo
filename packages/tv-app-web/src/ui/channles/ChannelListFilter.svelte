<script>
  export { filter };

  import "@smarthtmlelements/smart-elements/source/modules/smart.listbox.js";

  let filter;
  function change(e) {
    if (e && e.detail) {
      if (e.detail.selected) {
        filter = e.detail.value;
      }
    }
  }
</script>

<smart-drop-down-list selected-indexes="[{filter}]" on:change={change}>
  <smart-list-item value="0">Все</smart-list-item>
  <smart-list-item value="1">Смапленные</smart-list-item>
  <smart-list-item value="2">Несмапленные</smart-list-item>
</smart-drop-down-list>
