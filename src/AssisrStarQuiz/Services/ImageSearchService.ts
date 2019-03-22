import { bingImages, googleImages } from "../Config.json";
import { bingSubscriptionKey, googleImagesApiKey, googleImagesContext } from "../Credentials.json";
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
                link = await this.getLink(q);
            }
        } else {
            // If not cached, search
            link = await this.getLink(q);
        }

        return link;
    }
    public async getLink(q: string): Promise<string | undefined> {
        let link: string | undefined;

        // Randomly choose if should search on bing
        // Bing has better results, but has harsh request limit so I only choose it sometimes
        if (Math.random() > 0.7) {
            link = await this.searchOnBing(q);
        }

        if (!link) {
            link = await this.searchOnGoogle(q);

            // If google search failed, fallback to bing
            if (!link) {
                link = await this.searchOnBing(q);
            }
        }

        // If there's a result(it may not have =( ), cache it
        if (link) {
            this.cachedSearches.push({ q, link });
            localStorage.setItem("searches", JSON.stringify(this.cachedSearches));
        }

        return link;
    }

    private async searchOnGoogle(q: string): Promise<string | undefined> {
        let link: string | undefined;

        const search =
            `${googleImages}?cx=${googleImagesContext}&key=${googleImagesApiKey}&searchType=image&q=${encodeURIComponent(q)}&imgType=photo`;

        const result = await this.http.get<any>(search);
        if (result && result.items) {
            link = result.items[0].link;
        }

        return link;
    }

    private async searchOnBing(q: string): Promise<string | undefined> {
        let link: string | undefined;

        const search =
            `${bingImages}?q=${encodeURIComponent(q)}&count=1`;

        const result = await this.http.get<any>(search, {
            headers: {
                "Ocp-Apim-Subscription-Key": bingSubscriptionKey,
            },
        });

        if (result && result.value) {
            link = result.value[0].contentUrl;
        }

        return link;
    }
}
