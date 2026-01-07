import { appendFile } from "node:fs/promises";
import { resolve } from "node:path";

let queue = Promise.resolve();

export function writeFile(input: string, filename = "results.txt") {
    const clean = input.trim();
    if (!clean) return

    const path = resolve(process.cwd(), filename)
    queue = queue.then(() => appendFile(path, clean + "\n", {encoding: "utf-8"}));
    return queue;
}