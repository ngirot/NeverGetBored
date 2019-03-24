import ProviderState from "./ProviderState";
import Entertainment from "./Entertainment";
import PlatformState from "./PlatformState";
import {IAction} from "../domain/actions/helpers";
import {actionLoadedConfiguration} from "../domain/actions/configuration/loading";
import {actionLoadedEntertainments, actionLoadingEntertainments} from "../domain/actions/entertainment/load";
import {actionRemovedEntertainment} from "../domain/actions/entertainment/remove";
import {actionConnectToProvider, actionConnectionToProviderFailed} from "../domain/actions/platform/connect";

export default function platformsReducer(state: PlatformState = new PlatformState([], []), action: IAction) {
    if (actionConnectToProvider.test(action)) {
        const listWithoutProvider = state.providers.filter(p => p.provider !== action.payload.provider);
        listWithoutProvider.push(new ProviderState(action.payload.provider, false, false, action.payload.token));

        return new PlatformState(state.entertainments, listWithoutProvider);
    }

    if (actionConnectionToProviderFailed.test(action)) {
        const listWithoutProvider = state.providers.filter(p => p.provider !== action.payload);
        listWithoutProvider.push(new ProviderState(action.payload, false, true));

        return new PlatformState(state.entertainments, listWithoutProvider);
    }

    if (actionLoadedEntertainments.test(action)) {
        const newList = state.providers.map(p => {
            if (p.provider === action.payload.provider) {
                return new ProviderState(p.provider, false, false, p.token);
            } else {
                return p;
            }
        });
        const newEntertainments = state.entertainments.filter(e => e.provider !== action.payload.provider);
        newEntertainments.push(...action.payload.entertainments);
        return new PlatformState(newEntertainments, newList);
    }

    if (actionRemovedEntertainment.test(action)) {
        const remove = action.payload;
        const newList = state.entertainments.filter((e: Entertainment) => !(e.id === remove.id && e.provider === remove.provider));
        return new PlatformState(newList, state.providers);
    }

    if (actionLoadingEntertainments.test(action)) {
        const newList = state.providers.map(p => {
            if (p.provider === action.payload) {
                return new ProviderState(p.provider, true, p.error, p.token);
            } else {
                return p;
            }
        });
        return new PlatformState(state.entertainments, newList);
    }

    if (actionLoadedConfiguration.test(action)) {
        return new PlatformState(state.entertainments, action.payload);
    }

    return state;
}