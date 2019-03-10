import * as React from 'react';
import * as Redux from 'redux';

import {connect} from "react-redux";
import {IState} from "../reducers";
import {connectToProvider} from "../actions/platformService";
import {Provider} from "../utils/Provider";
import Token from "../utils/Token";

export interface OwnProps {
    serviceName: string;
    iconClass: string;
    type: Provider;
}

interface StateProps {
    token?: Token;
    loading: boolean;
}

interface DispatchProps {
    onConnect: (token?: Token) => void;
}

type Props = StateProps & DispatchProps & OwnProps;

class ConnectButton extends React.Component<Props> {
    render() {
        return (
            <button onClick={() => this.props.onConnect(this.props.token)}
                    className={"rounded image-button " + (this.props.token ? 'success' : '')}>
                <span className={this.props.iconClass + " icon"}/>
                <span className={"caption"}>
                    {this.props.serviceName}
                    &nbsp;
                    {this.icon(this.props.loading, this.props.token)}
                </span>
            </button>
        );
    }

    private icon(loading: boolean, token?: Token) {
        if (loading) {
            return <i className={"fa fa-spinner fa-spin"}/>;
        }

        if (token) {
            return <i className={"fa fa-check"}/>;
        } else {
            return <i className={"fa fa-times"}/>;
        }
    }
}

function mapStateToProps(state: IState, ownProps: OwnProps): StateProps {
    const providerState = state.platform.providers.find(p => p.provider === ownProps.type);

    if (providerState) {
        return {
            token: providerState.token,
            loading: providerState.loading
        };
    } else {
        return {
            token: undefined,
            loading: false
        };
    }
}

function mapDispatchToProps(dispatch: Redux.Dispatch<any>, ownProps: OwnProps): DispatchProps {
    return {
        onConnect: (token?: Token) => {
            if (!token) {
                connectToProvider(ownProps.type)(dispatch);
            }
        }
    };
}

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(ConnectButton);