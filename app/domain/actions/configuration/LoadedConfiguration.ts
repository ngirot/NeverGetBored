import ProviderState from "../../store/state/ProviderState"

export default class LoadedConfiguration {

    public readonly providers: ProviderState[]

    public readonly darkMode: boolean

    constructor(darkMode: boolean, providers: ProviderState[]) {
        this.darkMode = darkMode
        this.providers = providers
    }
}