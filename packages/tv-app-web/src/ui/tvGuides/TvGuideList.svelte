<script>
  export { tvGuides, selected };

  import { onMount } from "svelte";
  import * as _ from "lodash-es";

  let tvGuides = {},
    selected,
    tvGuideControl;

  onMount(async () => {
    tvGuideControl = document.querySelector("#tvGuideList");
    tvGuideControl.filterable = true;
  });

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

<style>
  smart-list-box {
    flex: auto;
  }
</style>

<div class="vertical-flex-container">
  <smart-list-box id="tvGuideList" placeholder="loading..." on:change={change} />
</div>
