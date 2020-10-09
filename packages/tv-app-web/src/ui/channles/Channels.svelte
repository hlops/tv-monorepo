<script>
  import { onDestroy } from "svelte";
  import * as _ from "lodash-es";
  import { channels, channelGroups, ModifiedChannelsTracker } from "../../logic/client/Channels";
  import ChannelListFilter from "./ChannelListFilter.svelte";
  import ChannelList from "./ChannelList.svelte";
  import ChannelDetails from "./ChannelDetails.svelte";

  let selectedChannel,
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

<style>
  .block {
    @apply flex flex-wrap mb-3;
  }

  .block > div {
    @apply px-3 mb-6;
  }

  .block > div > label {
    @apply block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2;
  }
</style>

<div class="block">
  <div class="md:w-1/3">
    <label for="channels-query">Поиск</label>
    <input type="search" class="w-full" id="channels-query" placeholder="Search..." />
  </div>
  <div class="md:w-1/3">
    <label for="channel-filter-group">Группа</label>
    <select id="channel-filter-group">
      {#each $channelGroups as group}
        <option value={group}>{group}</option>
      {/each}
    </select>
  </div>
  <div class="md:w-1/3">
    <label for="channels-filter-mapping">Маппинг</label>
    <ChannelListFilter bind:filter id="channels-filter-mapping" />
  </div>
</div>
<div class="block">
  <div class="md:w-1/3">
    <ChannelList channels={filteredChannels} bind:selected={selectedChannel} />
  </div>
  <div class="md:w-2/3">
    {#if selectedChannel && selectedChannel.url}
      <ChannelDetails channel={selectedChannel} />
    {/if}
  </div>
</div>
