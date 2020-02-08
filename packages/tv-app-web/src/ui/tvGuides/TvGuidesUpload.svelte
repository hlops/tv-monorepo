<script>
  import "@smarthtmlelements/smart-elements/source/modules/smart.button.js";

  let files = [];

  function sendData() {
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
    <input type="file" bind:files onchange={sendData} />
    <smart-button onclick={sendData}>Send</smart-button>
  </form>

</div>
