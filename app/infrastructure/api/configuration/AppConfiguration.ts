import ProviderConfiguration from "./ProviderConfiguration"

export default class AppConfiguration {
    public readonly version: number
    public readonly providers: ProviderConfiguration[]
    public readonly darkMode: boolean

    constructor(version: number, darkMode: boolean, provider: ProviderConfiguration[]) {
        this.version = version
        this.darkMode = darkMode
        this.providers = provider
    }
}