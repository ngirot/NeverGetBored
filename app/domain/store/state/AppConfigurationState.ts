export default class AppConfigurationState {
    darkMode: boolean
    configurationOpen: boolean
    youTubeApiKey: string | null

    constructor(darkMode: boolean, configurationOpen: boolean, youTubeApiKey: string | null) {
        this.darkMode = darkMode
        this.configurationOpen = configurationOpen
        this.youTubeApiKey = youTubeApiKey
    }
}