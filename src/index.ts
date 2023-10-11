import { FetchURL } from "./fetchURL";

async function main(url: string) {
    try {
        const urlEVal = new FetchURL(url);
        console.log(`evaluating URL ${urlEVal.url.toString()}`);
        const response: string[] = await urlEVal.getURLResult();
        console.log(`Result: found ${response.length} broken links:`)
        response.forEach(link => {
            console.log(`brokenLink: ${link}`);
        });
    } catch (e) {
        console.error(`error: ${e}`);
    }
}

console.log("starting...")
// the paramter count differs when you use the debug feature in vscode (4) vs using node (3)
// node dist/index.js http://www.vacationrenter.com has only 3 params
const url = process.argv[process.argv.length-1];
main(url)
    .catch(err => {
        console.error(err);
        process.exit(1);
    });