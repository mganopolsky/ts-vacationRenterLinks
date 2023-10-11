import { JSDOM } from 'jsdom';

export class FetchURL {
    url: URL;

    constructor(url: string) {
        let trimmedURL = url;
        if (url.endsWith('/')) {
            trimmedURL = url.slice(0, -1);
        }
        this.url = new URL(trimmedURL);
    }

    processLink(link: string) : URL{
        if (link.startsWith("http")){
            return new URL(link);
        }
        let baseURL = this.url.toString();
        if (baseURL.endsWith('/')){
            baseURL = baseURL.slice(0, -1);
        }
        return new URL(baseURL.concat(link));
    }

    async getURLResult(): Promise<string[]> {
        const brokenLinks: string[] = [];
        const result = await fetch(this.url)
            .then(async response => {
                const resultText = await response.text() as string;
                const htmlDoc = new JSDOM(resultText);
                const linksArray = Array.from(htmlDoc.window.document.querySelectorAll('a'));
    
                console.log(`Searching through ${linksArray.length} links:`);
    
                // Use map function to iterate over all links and fetch
                await Promise.all(linksArray.map(async (link: HTMLAnchorElement) => {
                    const editedLink = this.processLink(link.href);                    
                    try {
                        await fetch(editedLink);
                    } catch (e) {
                        brokenLinks.push(link.href)
                    }
                }));
            });
    
        return brokenLinks;
    }
}
