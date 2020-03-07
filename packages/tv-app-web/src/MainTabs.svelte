<script>
  import { WiredTab } from "./ui/wired/wired-tab";
  import { WiredTabs } from "./ui/wired/wired-tabs";
  import TvGuidesUpload from "./ui/tvGuides/TvGuidesUpload.svelte";
  import Channels from "./ui/channles/Channels.svelte";
  import TvGuides from "./ui/tvGuides/TvGuides.svelte";
</script>

<wired-tabs selected="Two">
  <wired-tab name="One" label="Каналы">
    <Channels />
  </wired-tab>
  <wired-tab name="Two" label="Телепрограмма">
    <TvGuides />
  </wired-tab>
  <wired-tab name="Three" label="Загрузка">
    <TvGuidesUpload />
  </wired-tab>
</wired-tabs>
