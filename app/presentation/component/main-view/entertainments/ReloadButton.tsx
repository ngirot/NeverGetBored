import * as React from "react"
import * as Redux from "redux"
import {connect} from "react-redux"
import {reloadAll} from "../../../../domain/actions/entertainment/load"
import {AppState} from "../../../../domain/store/reducers"
import ProviderState from "../../../../domain/store/state/ProviderState"

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
    return {
        onReload: (providerStates: ProviderState[]) => {
            reloadAll(providerStates)(dispatch)
        }
    }
}

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(ReloadButton)