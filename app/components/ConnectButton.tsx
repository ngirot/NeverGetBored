import * as React from 'react';
import * as Redux from 'redux';

import {connect} from "react-redux";
import {IState} from "../reducers";
import {connectToTwitch} from "../actions/platformService";

export interface OwnProps {
    serviceName: string;
    iconClass: string;
}

interface StateProps {
    token?: string;
    loading: boolean;
}

interface DispatchProps {
    onConnect: (token?: string) => void;
}

type Props = StateProps & DispatchProps & OwnProps;

class MyComponent extends React.Component<Props> {
    render() {
        return (
            <button onClick={() => this.props.onConnect(this.props.token)}
                    className={"rounded image-button " + (this.props.token ? 'success' : '')}>
                <span className={this.props.iconClass + " icon"}></span>
                <span className={"caption"}>
                    {this.props.serviceName}
                    &nbsp;
                    {this.icon(this.props.loading, this.props.token)}
                </span>

            </button>
        );
    }

    private icon(loading: boolean, token?: string) {
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
    return {
        token: state.platform.twitchToken,
        loading: state.platform.twitchLoading
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<any>, ownProps: OwnProps): DispatchProps {
    return {
        onConnect: (token?: string) => {
            if (!token) {
                connectToTwitch()(dispatch);
            }
        }
    };
}

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(MyComponent);