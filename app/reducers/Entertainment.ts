import {Provider} from "./Provider";

export default class Entertainment {
    public readonly provider: Provider;
    public readonly id: string;
    public readonly title: string;
    public readonly user?: string;
    public readonly url?: string;
    public readonly previewUrl?: string;

    public constructor(provider: Provider, id: string, title: string, user?: string, url?: string, previewUrl?: string) {
        this.provider = provider;
        this.id = id;
        this.title = title;
        this.user = user;
        this.url = url;
        this.previewUrl = previewUrl;
    }
}