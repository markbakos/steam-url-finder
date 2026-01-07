import { fetchRandom } from "./core/words";
import { checkUrl } from "./core/checkUrl";
import { writeFile } from "./utils/write";

async function main() {
    while (true) {
        const words = await fetchRandom(250);
        for (let i = 0; i < words.length; i++) {
            const status = await checkUrl({raw: words[i]});
            if (status === "available") {
                writeFile(words[i]);
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
