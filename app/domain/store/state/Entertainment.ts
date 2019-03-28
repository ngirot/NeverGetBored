import {Provider} from "./Provider";
import {EntertainmentType} from "./EntertainmentType";

export default class Entertainment {
    public readonly provider: Provider;
    public readonly type: EntertainmentType;
    public readonly id: string;
    public readonly title: string;
    public readonly user?: string;
    public readonly url?: string;
    public readonly previewUrl?: string;

    public constructor(provider: Provider, type: EntertainmentType, id: string, title: string, user?: string, url?: string, previewUrl?: string) {
        this.provider = provider;
        this.type = type;
        this.id = id;
        this.title = title;
        this.user = user;
        this.url = url;
        this.previewUrl = previewUrl;
    }
}