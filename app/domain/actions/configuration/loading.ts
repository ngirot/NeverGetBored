import inject, {Injectable} from "../../../Injector"
import LoadedConfiguration from "./LoadedConfiguration"

export function loadConfiguration(): LoadedConfiguration {
    const configuration = inject(Injectable.CONFIGURATION)

    const providers = configuration.loadProviders()
    const darkMode = configuration.loadDarkMode()
    const youTubeApiKey = configuration.loadYoutubeApiKey()

    return new LoadedConfiguration(darkMode, providers, youTubeApiKey)
}