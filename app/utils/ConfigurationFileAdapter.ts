import ConfigurationApi from "./api/configuration/ConfigurationApi";
import ProviderConfiguration from "./api/configuration/ProviderConfiguration";
import Token from "../domain/store/state/Token";
import ProviderState from "../domain/store/state/ProviderState";
import {Provider} from "../domain/store/state/Provider";
import {Configuration} from "../domain/actions/external/Configuration";

export default class ConfigurationFileAdapter implements Configuration {

    private readonly api = new ConfigurationApi();

    public loadProviders = (): ProviderState[] => {
        return this.api.load()
            .providers
            .map((providerConfiguration: ProviderConfiguration) => {
                const newToken = new Token(providerConfiguration.token.currentToken,
                    providerConfiguration.token.refreshToken, providerConfiguration.token.expiration);
                return new ProviderState(Provider[providerConfiguration.name as keyof typeof Provider], false, true, newToken);
            });
    }

    public addToken = (provider: Provider, token: Token): void => {
        const providerName: string = Provider[provider];

        const conf = this.api.load();

        const newProviders = conf.providers.filter((providerConfiguration: ProviderConfiguration) => {
            return providerConfiguration.name !== providerName;
        });

        newProviders.push({
            name: providerName,
            token: token
        });

        const newConfiguration = {
            providers: newProviders
        };

        this.api.save(newConfiguration);
    }
}