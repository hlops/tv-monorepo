<script>
  export { channels, selected };

  import { onMount } from "svelte";
  import * as _ from "lodash-es";

  let channels = {},
    selected,
    channelControl;

  onMount(async () => {
    channelControl = document.querySelector("#channelsList");
    channelControl.valueMember = "id";
    channelControl.displayMember = "title";
    channelControl.groupMember = "group";
    channelControl.grouped = true;
    channelControl.filterable = true;
  });

  $: if (channelControl && !_.isEmpty(channels)) {
    channelControl.dataSource = _.map(_.values(channels), channel => ({
      id: channel.id,
      title: channel.title,
      group: channel.group
    }));
  }

  function change(e) {
    if (e && e.detail) {
      if (e.detail.selected) {
        selected = channels[e.detail.value];
      } else {
        selected = undefined;
      }
    }
  }
</script>

<style>
  smart-list-box {
    height: 100%;
  }
</style>

<smart-list-box id="channelsList" placeholder="loading..." on:change={change} />
