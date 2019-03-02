import * as React from "react";
import {IState} from "../reducers";
import * as Redux from "redux";
import {reloadAll} from "../actions/platformService";
import {connect} from "react-redux";

interface StateProps {
    token?: string;
    loading: boolean;
}

interface DispatchProps {
    onReload: (token?: string) => void;
}

type Props = StateProps & DispatchProps;

class ReloadButton extends React.Component<Props> {
    render() {
        return (
            <button className={"button info square rounded"} onClick={() => this.props.onReload(this.props.token)}>
                <i className={"fa fa-refresh"}/>
            </button>
        );
    }
}

function mapStateToProps(state: IState): StateProps {
    return {
        token: state.platform.twitchToken,
        loading: state.platform.twitchLoading
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<any>): DispatchProps {
    return {
        onReload: (token?: string) => {
            if (token) {
                reloadAll(token)(dispatch);
            }
        }
    };
}

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(ReloadButton);