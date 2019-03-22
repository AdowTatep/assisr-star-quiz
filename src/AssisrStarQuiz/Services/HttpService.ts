export default class HttpService {
    public async get<T>(url: string, options?: any): Promise<T | undefined> {
        const response = await fetch(url, options);
        if (response && response.ok) {
            return await response.json();
        } else {
            return undefined;
        }
    }
}
