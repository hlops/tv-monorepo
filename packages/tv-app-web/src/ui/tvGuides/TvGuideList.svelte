<script>
  export { tvGuides, selected };

  import * as _ from "lodash-es";

  let tvGuides = {},
    selected,
    tvGuideControl;

  $: if (tvGuideControl && !_.isEmpty(tvGuides)) {
    tvGuideControl.dataSource = [...tvGuides];
  }

  function change(e) {
    if (e && e.detail) {
      if (e.detail.selected) {
        selected = tvGuides[e.detail.value];
      } else {
        selected = undefined;
      }
    }
  }
</script>

<div class="vertical-flex-container">
  <select size="10" id="tvGuideList" on:selected={change} class="h-full">
    {#each tvGuides as giude}
      <option>{giude}</option>
    {/each}
  </select>
</div>
