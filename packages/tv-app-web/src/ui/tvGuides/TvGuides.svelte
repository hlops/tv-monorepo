<script>
  import TvGuideList from "./TvGuideList.svelte";
  import TvGuideDetails from "./TvGuideDetails.svelte";
  import { guides } from "../../logic/client/TvGuides";

  let selectedGuide = {};
</script>

<div class="horizontal-flex-container">
  <TvGuideList tvGuides={$guides} bind:selected={selectedGuide} />
  <TvGuideDetails tvGuide={selectedGuide} />
</div>
