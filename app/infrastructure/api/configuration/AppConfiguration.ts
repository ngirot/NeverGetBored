import ProviderConfiguration from "./ProviderConfiguration"

export default class AppConfiguration {
    public readonly version: number
    public readonly providers: ProviderConfiguration[]
    public readonly darkMode: boolean
    public readonly youTubeApiKey: string | null

    constructor(version: number, darkMode: boolean, provider: ProviderConfiguration[], youTubeApiKey: string | null) {
        this.version = version
        this.darkMode = darkMode
        this.providers = provider
        this.youTubeApiKey = youTubeApiKey
    }
}