import * as React from "react";
import {IState} from "../reducers";
import * as Redux from "redux";
import {reloadAll} from "../actions/platformService";
import {connect} from "react-redux";
import {ProviderState} from "../reducers/platforms";

interface StateProps {
    providerStates: ProviderState[];
}

interface DispatchProps {
    onReload: (providerStates: ProviderState[]) => void;
}

type Props = StateProps & DispatchProps;

class ReloadButton extends React.Component<Props> {
    render() {
        return (
            <button className={"button info square rounded"}
                    onClick={() => this.props.onReload(this.props.providerStates)}>
                <i className={"fa fa-refresh"}/>
            </button>
        );
    }
}

function mapStateToProps(state: IState): StateProps {
    return {
        providerStates: state.platform.providers
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<any>): DispatchProps {
    return {
        onReload: (providerStates: ProviderState[]) => {
            reloadAll(providerStates)(dispatch);
        }
    };
}

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(ReloadButton);