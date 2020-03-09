<script>
  export { channel };

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
</script>

<style>
  .block {
    @apply mb-2;
  }

  .block > label {
    @apply block text-gray-500 font-bold mb-1 pr-4;
  }

  .block > input,
  .block > select {
    @apply block w-full;
  }
</style>

<div class="block">
  <label for="channel-name">Название</label>
  <input value={channel.title} on:change={e => change('title', e)} id="channel-name" />
</div>

<div class="block">
  <label for="channel-url">URL</label>
  <input value={channel.url} on:change={e => change('url', e)} id="channel-url" />
</div>

<div class="block">
  <label for="channel-group">Группа</label>
  <select bind:value={channel.group} id="channel-group">
    {#each $channelGroups as group}
      <option value={group}>{group}</option>
    {/each}
  </select>
</div>

<div class="block">
  <label for="channel-group">Телепрограмма</label>
  <select selected={channel.guide}>
    {#each $guides as guide}
      <option value={guide}>{guide}</option>
    {/each}
  </select>
</div>
