import ProviderState from "../../store/state/ProviderState"
import inject, {Injectable} from "../../../Injector"

export function loadConfiguration(): ProviderState[] {
    const configuration = inject(Injectable.CONFIGURATION)
    return configuration.loadProviders()
}