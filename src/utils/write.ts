import { appendFile } from "node:fs/promises";
import { resolve } from "node:path";

let queue = Promise.resolve();

export function writeLine(input: string, filename = "results.txt") {
    const path = resolve(process.cwd(), filename)
    queue = queue.then(() => appendFile(path, input + "\n", {encoding: "utf-8"}));
    return queue;
}