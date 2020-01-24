<script>
    import '@smarthtmlelements/smart-elements/source/styles/smart.default.css';
    import '@smarthtmlelements/smart-elements/source/modules/smart.button.js';
    import "@smarthtmlelements/smart-elements/source/modules/smart.tabs.js";

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
            console.error(err);
        });
    }
</script>

<div>
    <smart-button>Normal</smart-button>
    aaa!!!!
    <smart-tabs class='material'>
        <smart-tab-item label="Tab 1" selected={true}>
            // Content goes here.
        </smart-tab-item>
        <smart-tab-item label="Tab 2">
            // Content goes here.
        </smart-tab-item>
        <smart-tab-item label="Tab 3">
            // Content goes here.
        </smart-tab-item>
    </smart-tabs>
</div>
