import * as React from "react"
import * as Redux from "redux"
import {connect} from "react-redux"
import {AppState} from "../../../../../domain/store/reducers"
import ProviderState from "../../../../../domain/store/state/ProviderState"
import inject, {Injectable} from "../../../../../Injector"

interface StateProps {
    providerStates: ProviderState[]
    reload: boolean
    youtubeApiKey: string | null
}

interface DispatchProps {
    onReload: (providerStates: ProviderState[], reloading: boolean, youtubeApiKey: string | null) => void
}

type Props = StateProps & DispatchProps

class ReloadButton extends React.Component<Props> {
    render(): JSX.Element {
        return (
            <button className={"button info rounded"}
                    onClick={() => this.props.onReload(this.props.providerStates, this.props.reload, this.props.youtubeApiKey)}>
                {this.icon()}
            </button>
        )
    }

    private icon(): JSX.Element {
        if (this.props.reload) {
            return <i className={"fa fa-sync-alt fa-spin"}/>
        } else {
            return <i className={"fa fa-sync-alt"}/>
        }
    }
}

function mapStateToProps(state: AppState): StateProps {
    return {
        providerStates: state.platform.providers,
        reload: state.platform.reloading,
        youtubeApiKey: state.configuration.youTubeApiKey
    }
}

function mapDispatchToProps(dispatch: Redux.Dispatch<any>): DispatchProps {
    const entertainmentService = inject(Injectable.ENTERTAINMENT_SERVICE)
    return {
        onReload: (providerStates: ProviderState[], reloading: boolean, youtubeApiKey) => {
            if (!reloading) {
                entertainmentService.reload(dispatch, providerStates, youtubeApiKey)
            }
        }
    }
}

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(ReloadButton)