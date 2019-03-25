import ConfigurationApi from "./api/configuration/ConfigurationApi";
import ProviderConfiguration from "./api/configuration/ProviderConfiguration";
import Token from "../domain/store/state/Token";
import ProviderState from "../domain/store/state/ProviderState";
import {Provider} from "../domain/store/state/Provider";

export function loadProviders(): ProviderState[] {
    const api = new ConfigurationApi();

    return api.load()
        .providers
        .map((providerConfiguration: ProviderConfiguration) => {
            const newToken = new Token(providerConfiguration.token.currentToken,
                providerConfiguration.token.refreshToken, providerConfiguration.token.expiration);
            return new ProviderState(Provider[providerConfiguration.name as keyof typeof Provider], false, true, newToken);
        });
}

export function addToken(provider: Provider, token: Token) {
    const providerName: string = Provider[provider];
    const api = new ConfigurationApi();

    const conf = api.load();

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

    api.save(newConfiguration);
}