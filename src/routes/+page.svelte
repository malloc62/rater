<script>
    import Area from '$lib/components/Area.svelte';
    import FileUpload from '$lib/components/FileUpload.svelte';
    import Button from '$lib/components/Button.svelte';

    /** @type {import('./$types').PageData} */
    export let data;

    let editable = {};
</script>

<style> 
    img {
        max-width: 200px;
        max-height: 500px;
        margin: 5px;
        display: block;
    }

    .wrapper {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-auto-flow: row;
    }
</style>

<Area>
    <div slot='header'>
        OC Rating Stand
    </div>
    <div slot='main' >
        <p>Put your OC and wait for it to be rated! SVGs (vector), PNGs (bitmap), and other image formats can be uploaded.</p>
        <FileUpload />
    </div>
    <div slot='footer'>
        Project of <a href='https://insfa.net/'>INSFA</a>
    </div>
</Area>

<Area>
    <div slot='header'>
        Rated OCs
    </div>
    <div slot='main' class='wrapper'>
        {#each data.oc as ocData}
            <div>
                <img src='/img/{ocData.id}'>
                <p>
                    <span contenteditable='{data.data}' bind:this={editable[ocData.id]}>
                        {ocData.rating == '-1' ? 'Unrated' : ocData.rating}
                    </span> / 10
                </p>
                    <Button clickFunc={async () => await fetch(`/api/rateOc?rating=${encodeURIComponent(editable[ocData.id].textContent)}&id=${encodeURIComponent(ocData.id)}`)}>
                        Update
                    </Button>
            </div>
        {/each}
    </div>
    <div slot='footer'>
        
    </div>
</Area>