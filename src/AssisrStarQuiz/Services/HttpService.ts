export default class HttpService {
    public async get<T>(url: string): Promise<T | undefined> {
        const response = await fetch(url);
        if (response && response.ok) {
            return await response.json();
        } else {
            return undefined;
        }
    }
}
