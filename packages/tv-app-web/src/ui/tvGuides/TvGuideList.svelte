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
  <wired-listbox id="tvGuideList" on:selected={change}>
    {#each tvGuides as giude}
      <wired-item>{giude}</wired-item>
    {/each}
  </wired-listbox>
</div>
