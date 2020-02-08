<script>
  export { channel };

  import "@smarthtmlelements/smart-elements/source/modules/smart.textbox.js";
  import "@smarthtmlelements/smart-elements/source/modules/smart.combobox.js";
  import * as _ from "lodash-es";
  import { onDestroy, onMount } from "svelte";
  import { channelGroups, ChannelsGroupsTracker, modifyChannel } from "../../logic/client/Channels";
  import { guides } from "../../logic/client/TvGuides";

  let channel = {},
    fields;

  $: fields = [
    { name: "title", value: channel.title || "" },
    { name: "url", value: channel.url || "" }
  ];

  let groupsComboControll, tvGuideComboControll;
  onMount(async () => {
    groupsComboControll = document.querySelector("#groupsCombo");
    tvGuideComboControll = document.querySelector("#tvGuideCombo");
  });

  $: if (groupsComboControll) {
    groupsComboControll.displayMember = "name";
    groupsComboControll.dataSource = _.map($channelGroups, group => ({
      label: group,
      value: group
    }));
  }

  $: if (tvGuideComboControll) {
    tvGuideComboControll.displayMember = "name";
    tvGuideComboControll.filterable = true;
    tvGuideComboControll.filterMode = "containsIgnoreCase";
    tvGuideComboControll.dataSource = _.map($guides, guide => ({
      label: guide,
      value: guide
    }));
  }

  const channelsGroupsTracker = new ChannelsGroupsTracker();
  onDestroy(() => channelsGroupsTracker.onDestroy());

  function change(name, e) {
    channel[name] = e.detail.value;
    modifyChannel(channel);
  }
</script>

<div class="smart-element">
  <div class="smart-container">
    {#each fields as field}
      <smart-text-box value={field.value} on:change={e => change(field.name, e)} />
      <br />
    {/each}
    <smart-combo-box value={channel.group} id="groupsCombo" />
    <br />
    <smart-combo-box value={channel.guide} id="tvGuideCombo" />
    <br />
  </div>
</div>
