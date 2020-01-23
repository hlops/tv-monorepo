<script>
  import { WiredTab } from "wired-elements";
  import { WiredInput } from "wired-elements";
  import { WiredButton } from "wired-elements";

  export let name;
  const channels = fetch("http://localhost:3000/playlist")
    .then(response => response.json())
    .then(json => json.channels);

  let files = [];
  function sendData() {
    const formData = new FormData();
    formData.append("file", files[0]);
    fetch("http://localhost:3000/playlist", {
      mode: 'no-cors',
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": undefined
      },
      body: formData
    }).then(result => {
        return result.json();
    }).catch(err => {
        console.error("err_backend" + err);
    });
  }
</script>

<div>
  <wired-tabs selected="tabChannels">
    <wired-tab name="tabChannels" label="Channels">
      {#await channels then values}
        {#each values as channel}
          <li>{channel.title}</li>
        {/each}
      {/await}
    </wired-tab>
    <wired-tab name="tabGuide">aaaa</wired-tab>
  </wired-tabs>

  <form>
    <input type="file" bind:files/>
    <wired-button elevation="2" onclick={sendData}>Send</wired-button>
  </form>
</div>
