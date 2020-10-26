import ProviderState from "../../store/state/ProviderState"

export default class LoadedConfiguration {

    public readonly providers: ProviderState[]

    public readonly darkMode: boolean

    public readonly youTubeApiKey: string | null

    constructor(darkMode: boolean, providers: ProviderState[], youTubeApiKey: string | null) {
        this.darkMode = darkMode
        this.providers = providers
        this.youTubeApiKey = youTubeApiKey
    }
}