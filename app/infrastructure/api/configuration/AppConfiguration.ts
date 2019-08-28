import ProviderConfiguration from "./ProviderConfiguration"

export default class AppConfiguration {
    public readonly version: number
    public readonly providers: ProviderConfiguration[]

    constructor(version: number, provider: ProviderConfiguration[]) {
        this.version = version
        this.providers = provider
    }
}