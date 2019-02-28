import * as React from 'react';
import * as Redux from 'redux';

import {connect} from "react-redux";
import {IState} from "../reducers";
import {connectToTwitch} from "../actions/platformService";

export interface OwnProps {
    serviceName: string;
}

interface StateProps {
    token?: string;
}

interface DispatchProps {
    onConnect: () => void;
}

type Props = StateProps & DispatchProps & OwnProps;

class MyComponent extends React.Component<Props> {
    render() {
        return (
            <button onClick={this.props.onConnect}>{this.props.serviceName}: {this.props.token}</button>
        );
    }
}

function mapStateToProps(state: IState, ownProps: OwnProps): StateProps {
    return {token: state.platform.twitchToken};
}

function mapDispatchToProps(dispatch: Redux.Dispatch<any>, ownProps: OwnProps): DispatchProps {
    return {
        onConnect: () => {
            connectToTwitch()(dispatch);
        }
    };
}

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(MyComponent);