<script>
    export let data = '';
</script>

<style>
  

    #logo {

        width: calc(100vw - 20px);

        background: var(--dark-1);

        padding: 5px;

        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;

        position: sticky;
        top: 0;
    }

    #logo a {
        padding: 10px;
        color: var(--light-1);
        font-weight: bold;
    }

    #logo img {
        height: 30px;
        width: auto;

        display: block;
    }
</style>

<div id='logo'>
    <a href='/'>
        <img src='/icon_sanifae.svg' alt='Sanifae Logo'>
    </a>
    {#if data.username && data.username != 'false'}
        <a href='/user/{data.username}'>
            {data.username}
        </a>
        <a href='/logout'>
            Log out
        </a>
        <a href='/new_post'>
            Create
        </a>
    {:else}
        <a href='/account'>
            Log in / Register
        </a>
    {/if}
</div>