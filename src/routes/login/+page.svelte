<script>
    import Area from '$lib/components/Area.svelte';
    import { handleSubmitGet } from '$lib/util.js';

    export let form = {};

    let submitFunc = async e => { 
        var form = JSON.parse(await handleSubmitGet(e));
        document.cookie = `token=${form.data}`
        
        if (form.data)
            window.location.href='/';
    }

    
</script>

<Area handleSubmit=''>
    <p slot="header">
        Log in
    </p>

    <span slot='main'>
        <h2>Login with <a href='https://sanifae.insfa.net/'>Sanifae</a></h2>
        <form action='https://sanifae.insfa.net/api/login' on:submit|preventDefault={submitFunc} method='GET'>
            <p>
                Username: <input name='user'>
            </p>
            <p>
                Password: <input type='password' name='pass'>
            </p>
            <p>
                <input type='submit' value='Log in'>
            </p>
        </form>
    </span>
    <p slot="footer">
        {#if form?.success}
            <p>{form?.success}</p>
        {/if}
        By using the Sanifae service, you agree to the <a href='https://insfa.net/rules'>Terms of Service</a>.
    </p>
</Area>