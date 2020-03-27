import Options from "./Options"

const needle = require('needle')

export default class HttpApi {
    private readonly baseUrl: string
    private readonly options?: Options

    constructor(baseUrl: string, options?: Options) {
        this.baseUrl = baseUrl
        this.options = options
    }

    public get<T>(path: string, options?: Options): Promise<T> {
        const localOptions = options ? options : this.options

        return new Promise<T>((resolve, reject) => {
            needle('get', this.baseUrl + path, localOptions)
                .then((response: any) => {
                    if (this.isValidResponse(response)) {
                        resolve(response.body as T)
                    } else {
                        reject('Erreur ' + response.statusCode + ": " + response.statusMessage)
                    }
                })
                .catch(reject)
        })
    }

    public post<T, V>(path: string, payload: T, options?: Options): Promise<V> {
        const localOptions = options ? options : this.options

        return new Promise<V>((resolve, reject) => {
            needle('post', this.baseUrl + path, payload, localOptions)
                .then((response: any) => {
                    if (this.isValidResponse(response)) {
                        resolve(response.body as V)
                    } else {
                        reject('Erreur ' + response.statusCode + ": " + response.statusMessage)
                    }
                })
                .catch(reject)
        })

    }

    private isValidResponse(response: any): boolean {
        return response.statusCode >= 200 && response.statusCode < 300
    }
}