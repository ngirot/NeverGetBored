import Options from "./Options";

const needle = require('needle');

export default class HttpApi {
    private readonly baseUrl: string;
    private readonly options?: Options;

    constructor(baseUrl: string, options?: Options) {
        this.baseUrl = baseUrl;
        this.options = options;
    }

    public get<T>(path: string, options?: Options): Promise<T> {
        const localOptions = options ? options : this.options;

        return needle('get', this.baseUrl + path, localOptions)
            .then((response: any) => {
                return response.body as T;
            });
    }

    public post<T, V>(path: string, payload: T, options?: Options): Promise<V> {
        const localOptions = options ? options : this.options;

        return needle('post', this.baseUrl + path, payload, localOptions)
            .then((response: any) => {
                return response.body as V;
            });
    }
}