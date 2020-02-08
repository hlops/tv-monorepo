<script>
  import "@smarthtmlelements/smart-elements/source/modules/smart.tabs.js";
  import TvGuidesUpload from "./ui/tvGuides/TvGuidesUpload.svelte";
  import Channels from "./ui/channles/Channels.svelte";
  import TvGuides from "./ui/tvGuides/TvGuides.svelte";
</script>

<style>
  smart-tabs {
    width: 100%;
    height: 100%;
  }
</style>

<smart-tabs selected-index="0">
  <smart-tab-item label="Каналы">
    <Channels />
  </smart-tab-item>
  <smart-tab-item label="Телепрограмма">
    <TvGuides />
  </smart-tab-item>
  <smart-tab-item label="Загрузка">
    <TvGuidesUpload />
  </smart-tab-item>
</smart-tabs>
