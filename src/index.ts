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
        }
    }
}

main();
