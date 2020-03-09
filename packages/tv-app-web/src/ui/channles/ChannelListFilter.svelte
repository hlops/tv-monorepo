<script>
  export { filter };

  let filter;

  function change(e) {
    filter = e.detail.selected;
  }
</script>

<select selected={filter} on:selected={change}>
  <option value="0">Все</option>
  <option value="1">Есть</option>
  <option value="2">Нет</option>
</select>
