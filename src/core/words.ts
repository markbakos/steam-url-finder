const BASE_URL = "https://random-word-api.herokuapp.com/word";

export async function fetchRandom(n: number) {
    const url = new URL(BASE_URL);
    url.searchParams.set("number", String(n))

    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`Random word API failed: ${res.status} ${res.statusText}`)
    }

    return await res.json();
}

