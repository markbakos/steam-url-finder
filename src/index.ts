import { fetchRandom } from "./core/words";
import { checkUrl } from "./core/checkUrl";
import {createStore} from "./core/store";

async function main() {

    const store = await createStore("results.txt");

    while (true) {
        const words = await fetchRandom(250);
        for (let i = 0; i < words.length; i++) {
            const status = await checkUrl({raw: words[i]});
            if (status === "available") {
                await store.addIfNew(words[i]);
                console.log(words[i]);
            }
            if (status === "rate_limited") {
                console.log("Rate limited, waiting 20 seconds...");
                await new Promise(res => setTimeout(res, 20000));
            }
        }
    }
}

main();
