<script>
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

<div class="flex flex-wrap -mx-3 mb-6">
  <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
    <label
      class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
      for="channelsQuery">
      Поиск
    </label>
    <input type="search" class="w-full" id="channelsQuery" placeholder="Search..." />
  </div>
  <div class="w-full md:w-2/3 px-3 mb-6 md:mb-0">
    <label
      class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
      for="channelsFilter">
      Фильтр
    </label>
    <ChannelListFilter bind:filter id="channelsFilter" />
  </div>
</div>
<div class="flex flex-wrap -mx-3 mb-6">
  <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
    <ChannelList channels={filteredChannels} bind:selected={selectedChannel} />
  </div>
  <div class="w-full md:w-2/3 px-3 mb-6 md:mb-0">
    <ChannelDetails channel={selectedChannel} />
  </div>
</div>
