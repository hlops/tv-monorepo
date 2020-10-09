<script>
  let files = [];

  function sendPlaylist() {
    const formData = new FormData();
    formData.append("file", files[0]);
    fetch("http://localhost:3000/playlist", {
      mode: "no-cors",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": undefined
      },
      body: formData
    })
      .then(result => {
        return result.json();
      })
      .catch(err => {
        console.error(err);
      });
  }

  function sendGuide() {
    const formData = new FormData();
    formData.append("file", files[0]);
    fetch("http://localhost:3000/tvGuide", {
      mode: "no-cors",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": undefined
      },
      body: formData
    })
      .then(result => {
        return result.json();
      })
      .catch(err => {
        console.error(err);
      });
  }
</script>

<div class="horizontal-flex-container">
  <form>
    <input type="file" bind:files />
    <button on:click={sendPlaylist}>Send playlist</button>
  </form>

  <form>
    <input type="file" bind:files />
    <button on:click={sendGuide}>Send guide</button>
  </form>

</div>
