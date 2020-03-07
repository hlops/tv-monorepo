<script>
  export { channels, selected };

  //  import { WiredListbox } from "wired-listbox";
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

<!--
<wired-listbox on:selected={change}>
  {#each filteredChannels as channel}
    <wired-item value={channel.id}>{channel.title}</wired-item>
  {/each}
</wired-listbox>
-->
<select size="10" bind:value>
  {#each filteredChannels as channel, i}
    <option value={i}>{channel.title}</option>
  {/each}
</select>
