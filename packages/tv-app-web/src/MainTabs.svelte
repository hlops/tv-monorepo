<script>
  import TvGuidesUpload from "./ui/tvGuides/TvGuidesUpload.svelte";
  import Channels from "./ui/channles/Channels.svelte";
  import TvGuides from "./ui/tvGuides/TvGuides.svelte";

  const tabs = ["actions", "channels", "guides"];
  let currentTab = tabs[1];

  function selectTab(tab) {
    currentTab = tab;
  }
</script>

<style>
  .tab-header {
    @apply inline-block border rounded py-1 px-4 cursor-pointer;
  }

  .active {
    @apply border-blue-500 bg-blue-500;
  }

  .active:hover {
    @apply bg-blue-700 text-white;
  }

  .inactive {
    @apply border-white;
  }

  .inactive:hover {
    @apply border-gray-200 text-blue-500 bg-gray-200;
  }
</style>

<div class="container mx-auto px-4 max-w-screen-lg">
  <ul class="flex justify-between">
    {#each tabs as tab}
      <li class="mr-3">
        <a
          class="tab-header"
          class:active={tab === currentTab}
          class:inactive={tab !== currentTab}
          on:click={() => selectTab(tab)}>
          {tab}
        </a>
      </li>
    {/each}
  </ul>
  <div>
    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      {#if currentTab === 'actions'}{/if}
      {#if currentTab === 'channels'}
        <Channels />
      {/if}
      {#if currentTab === 'guides'}
        <TvGuides />
      {/if}
      {#if currentTab === 'upload'}
        <TvGuidesUpload />
      {/if}
    </form>
  </div>
</div>
