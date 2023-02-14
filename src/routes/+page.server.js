import { user } from '$lib/util.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch, params, url, cookies, request }) {

    const res = await fetch(`https://sanifae.insfa.net/api/token`,{
        'method': 'GET', 'headers': {
            'cookie': request.headers.get('cookie')
        }
    });

    const userJson = await res.json();

    const oc = await fetch(`/api/oc?user=${encodeURIComponent(user)}`,{
        'method': 'GET'
    }).then(x => x.json());

    return { data: userJson.data == user, oc, token: request.headers.get('cookie') };
}