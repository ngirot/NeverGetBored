import ConfigurationApi from "./api/configuration/ConfigurationApi"
import ProviderConfiguration from "./api/configuration/ProviderConfiguration"
import Token from "../domain/store/state/Token"
import ProviderState from "../domain/store/state/ProviderState"
import {Provider} from "../domain/store/state/Provider"
import {Configuration} from "../domain/external/port/Configuration"
import AppConfiguration from "./api/configuration/AppConfiguration"

export default class ConfigurationFileAdapter implements Configuration {

    private readonly api: ConfigurationApi

    constructor() {
        this.api = new ConfigurationApi()
    }

    public loadProviders = (): ProviderState[] => {
        return this.api.load()
            .providers
            .filter(configuration => this.extractProvider(configuration.name))
            .map((providerConfiguration: ProviderConfiguration) => {
                const newToken = new Token(providerConfiguration.token.currentToken,
                    providerConfiguration.token.refreshToken, providerConfiguration.token.expiration)
                return new ProviderState(this.extractProvider(providerConfiguration.name), true, newToken)
            })
    }

    public addToken = (provider: Provider, token: Token): void => {
        const providerName: string = Provider[provider]

        const conf = this.api.load()

        const newProviders = conf.providers.filter((providerConfiguration: ProviderConfiguration) => {
            return providerConfiguration.name !== providerName
        })

        newProviders.push({
            name: providerName,
            token: token
        })

        const newConfiguration = new AppConfiguration(conf.version, conf.darkMode, newProviders, conf.youTubeApiKey)

        this.api.save(newConfiguration)
    }

    public loadDarkMode = (): boolean => {
        return this.api.load().darkMode
    }

    loadYoutubeApiKey(): string | null {
        return this.api.load().youTubeApiKey
    }

    private extractProvider(name: string): Provider {
        return Provider[name as keyof typeof Provider]
    }

    changeDarkMode(darkMode: boolean): void {
        const oldConf = this.api.load()
        const newConf = new AppConfiguration(oldConf.version, darkMode, oldConf.providers, oldConf.youTubeApiKey)

        this.api.save(newConf)
    }

    changeYouTubeApiKey(youTubeApiKey: string): void {
        const oldConf = this.api.load()
        const newConf = new AppConfiguration(oldConf.version, oldConf.darkMode, oldConf.providers, youTubeApiKey)

        this.api.save(newConf)
    }

}