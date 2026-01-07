import {readFile} from "node:fs/promises";
import {writeLine} from "../utils/write";

async function loadExisting(filename: string): Promise<Set<string>> {
    try {
        const text = await readFile(filename, "utf8");
        const set = new Set<string>();
        const lines = text.split("\n");
        for (let i = 0; i < lines.length; i++) {
            set.add(lines[i].trim());
        }
        return set;
    }
    catch {
        return new Set<string>();
    }
}

export async function createStore(outFile = "results.txt") {
    const found = await loadExisting(outFile);

    return {
        has(id: string) {
            return found.has(id.trim());
        },

        async addIfNew(id: string) {
            const v = id.trim();
            if (!v) return false;
            if (found.has(v)) return false;

            found.add(v);
            await writeLine(v, outFile);
            return true;
        },

        count() {
            return found.size;
        }
    }
}