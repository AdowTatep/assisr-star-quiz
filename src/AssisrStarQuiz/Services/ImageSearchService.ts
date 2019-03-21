import { googleImages } from "../Config.json";
import { googleImagesApiKey, googleImagesContext } from "../Credentials.json";
import HttpService from "./HttpService";

export default class ImageSearchService {
    private http = new HttpService();

    private cachedSearches: any[];

    constructor() {
        // I store the searches on the local storage since google has a pretty strict query limit
        const localSearches = localStorage.getItem("searches");
        if (localSearches) {
            this.cachedSearches = (new Array(JSON.parse(localSearches)))[0];
        } else {
            this.cachedSearches = new Array();
        }
    }

    public async query(q: string): Promise<string | undefined> {
        let link: any | undefined;

        // Check if this search is cached
        if (this.cachedSearches && this.cachedSearches.length > 0) {
            const result = this.cachedSearches.find((x: any) => x.q === q);
            if (result) {
                link = result.link;
            } else {
                // If not cached, search
                link = await this.getLink(q, link);
            }
        } else {
            // If not cached, search
            link = await this.getLink(q, link);
        }

        return link ? link : undefined;
    }

    private async getLink(q: string, link: any) {
        const search =
            `${googleImages}?cx=${googleImagesContext}&key=${googleImagesApiKey}&searchType=image&q=${encodeURIComponent(q)}&imgType=photo`;

        const result = await this.http.get<any>(search);
        if (result && result.items) {
            link = result.items[Math.floor(Math.random() * 3) + 1].link;
            // If there's a result, cache it
            this.cachedSearches.push({ q, link });
            localStorage.setItem("searches", JSON.stringify(this.cachedSearches));
        }
        return link;
    }
}
