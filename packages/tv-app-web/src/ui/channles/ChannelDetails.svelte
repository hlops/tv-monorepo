<script>
  export { channel };

  import { WiredInput } from "wired-input";
  import { onDestroy } from "svelte";
  import { channelGroups, ChannelsGroupsTracker, modifyChannel } from "../../logic/client/Channels";
  import { guides } from "../../logic/client/TvGuides";

  let channel = {},
    fields;

  let groupsComboControll, tvGuideComboControll;

  const channelsGroupsTracker = new ChannelsGroupsTracker();
  onDestroy(() => channelsGroupsTracker.onDestroy());

  function change(name, e) {
    channel[name] = e.detail.value;
    modifyChannel(channel);
  }

  $: console.log(channel);
</script>

<div>
  <wired-input value={channel.title} on:change={e => change('title', e)} />
  <br />
  <wired-input value={channel.url} on:change={e => change('url', e)} />
  <br />
  <select bind:value={channel.group}>
    {#each $channelGroups as group}
      <option value={group}>{group}</option>
    {/each}
  </select>
  <br />
  <select selected={channel.guide}>
    {#each $guides as guide}
      <option value={guide}>{guide}</option>
    {/each}
  </select>
  <br />
</div>
