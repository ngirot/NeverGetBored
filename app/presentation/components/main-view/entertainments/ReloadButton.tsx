import * as React from "react"
import * as Redux from "redux"
import {connect} from "react-redux"
import {AppState} from "../../../../domain/store/reducers"
import ProviderState from "../../../../domain/store/state/ProviderState"
import inject, {Injectable} from "../../../../Injector"

interface StateProps {
    providerStates: ProviderState[]
}

interface DispatchProps {
    onReload: (providerStates: ProviderState[]) => void
}

type Props = StateProps & DispatchProps

class ReloadButton extends React.Component<Props> {
    render() {
        return (
            <button className={"button info square rounded"}
                    onClick={() => this.props.onReload(this.props.providerStates)}>
                <i className={"fa fa-refresh"}/>
            </button>
        )
    }
}

function mapStateToProps(state: AppState): StateProps {
    return {
        providerStates: state.platform.providers
    }
}

function mapDispatchToProps(dispatch: Redux.Dispatch<any>): DispatchProps {
    const entertainmentService = inject(Injectable.ENTERTAINMENT_SERVICE)
    return {
        onReload: (providerStates: ProviderState[]) => {
            entertainmentService.reload(dispatch, providerStates)
        }
    }
}

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(ReloadButton)