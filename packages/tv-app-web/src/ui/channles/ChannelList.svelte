<script>
  export { channels, selected };

  import ChannelListFilter from "./ChannelListFilter.svelte";
  import * as _ from "lodash-es";

  let channels = {},
    selected,
    filteredChannels,
    value;

  $: filteredChannels = _.map(_.values(channels), channel => ({
    id: channel.id,
    title: channel.title,
    url: channel.url,
    group: channel.group
  }));

  $: selected = filteredChannels[value] || {};
</script>

<select size="10" bind:value class="h-full">
  {#each filteredChannels as channel, i}
    <option value={i}>{channel.title}</option>
  {/each}
</select>
