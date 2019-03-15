import Token from "./Token";
import {Provider} from "./Provider";
import ConfigurationApi from "./api/configuration/ConfigurationApi";
import ProviderConfiguration from "./api/configuration/ProviderConfiguration";
import {ProviderState} from "../reducers/platforms";

export function loadProviders(): ProviderState[] {
    const api = new ConfigurationApi();

    return api.load()
        .providers
        .map((providerConfiguration: ProviderConfiguration) => {
            return new ProviderState(Provider[providerConfiguration.name as keyof typeof Provider], false, providerConfiguration.token);
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