<script>
  import "@smarthtmlelements/smart-elements/source/modules/smart.listbox.js";
  import { onDestroy } from "svelte";
  import * as _ from "lodash-es";
  import { channels, ModifiedChannelsTracker } from "../../logic/client/Channels";
  import ChannelListFilter from "./ChannelListFilter.svelte";
  import ChannelList from "./ChannelList.svelte";
  import ChannelDetails from "./ChannelDetails.svelte";

  let selectedChannel = {},
    filter = "0",
    filteredChannels;

  $: filteredChannels = _.filter($channels, channel => {
    switch (filter) {
      case "1":
        return channel.title.includes(1);
      case "2":
        return !channel.title.includes(1);
      default:
        return true;
    }
  });

  const modifiedChannelsTracker = new ModifiedChannelsTracker();
  onDestroy(() => modifiedChannelsTracker.onDestroy());
</script>

<div class="vertical-flex-container">
  <ChannelListFilter bind:filter />
  <div class="horizontal-flex-container">
    <ChannelList channels={filteredChannels} bind:selected={selectedChannel} />
    <ChannelDetails channel={selectedChannel} />
  </div>
</div>
