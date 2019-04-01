import * as React from 'react'
import * as Redux from 'redux'

import {connect} from "react-redux"
import {connectToProvider} from "../../../domain/actions/platform/connect"
import Token from "../../../domain/store/state/Token"
import {AppState} from "../../../domain/store/reducers"
import {Provider} from "../../../domain/store/state/Provider"

const styles = require('./ConnectButton.scss')

export interface OwnProps {
    serviceName: string
    iconPath: string
    type: Provider
}

interface StateProps {
    connected: boolean
    error: boolean
    loading: boolean
    token?: Token
}

interface DispatchProps {
    onConnect: (token?: Token) => void
}

type Props = StateProps & DispatchProps & OwnProps

class ConnectButton extends React.Component<Props> {
    render() {
        return (
            <button onClick={() => this.props.onConnect(this.props.token)}
                    className={"rounded image-button " + this.style()}>
                <img alt={'logo of ' + this.props.serviceName} src={this.props.iconPath}
                     className={styles.providericon}/>
                <span className={"caption"}>
                    {this.props.serviceName}
                    &nbsp;
                    {this.icon()}
                </span>
            </button>
        )
    }

    private style(): string {
        if (this.props.connected) {
            return "success"
        }

        if (this.props.error) {
            return "alert"
        }

        return styles.notconnected
    }

    private icon() {
        if (this.props.loading) {
            return <i className={"fa fa-spinner fa-spin"}/>
        }

        if (this.props.connected) {
            return <i className={"fa fa-check"}/>
        } else {
            return <i className={"fa fa-times"}/>
        }
    }
}

function mapStateToProps(state: AppState, ownProps: OwnProps): StateProps {
    const providerState = state.platform.providers.find(p => p.provider === ownProps.type)

    if (providerState) {
        return {
            connected: providerState.token !== undefined,
            error: providerState.error,
            token: providerState.token,
            loading: providerState.loading
        }
    } else {
        return {
            connected: false,
            error: false,
            token: undefined,
            loading: false
        }
    }
}

function mapDispatchToProps(dispatch: Redux.Dispatch<any>, ownProps: OwnProps): DispatchProps {
    return {
        onConnect: (token?: Token) => {
            if (!token) {
                connectToProvider(ownProps.type)(dispatch)
            }
        }
    }
}

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(ConnectButton)