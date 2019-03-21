import { googleImages } from "../Config.json";
import HttpService from "./HttpService";

export default class ImageSearchService {
    private http = new HttpService();

    public async query(query: string): Promise<string[]> {
        // TODO: Add user ip on query
        const result = await this.http.get<any>(`${googleImages}?v=1.0&q=${encodeURIComponent(query)}`);
        return [];
    }
}
