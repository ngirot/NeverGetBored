import * as React from 'react'
import {connect} from "react-redux"
import * as Redux from "redux"
import {removeContent} from "../../../../../domain/actions/entertainment/remove"
import Entertainment from "../../../../../domain/store/state/Entertainment"
import Token from "../../../../../domain/store/state/Token"
import {AppState} from "../../../../../domain/store/reducers"
import {Provider} from "../../../../../domain/store/state/Provider"
import inject, {Injectable} from "../../../../../Injector"
import {Browser} from "../../../../../domain/external/Browser"
import {Feedly} from "../../../../../domain/external/Feedly"

const styles = require('./FeedlyTile.scss')

export interface OwnsProps {
    entertainment: Entertainment
}

interface StateProps {
    token?: Token
}

interface DispatchProps {
    open: (browser: Browser, feedly: Feedly, entertainment: Entertainment, token?: Token) => void
}

type Props = StateProps & OwnsProps & DispatchProps

class FeedlyTile extends React.Component<Props> {

    private browser: Browser = inject(Injectable.BROWSER)
    private feedly: Feedly = inject(Injectable.FEEDLY)

    render() {
        const e = this.props.entertainment
        const token = this.props.token
        const logo = <img className={"tile-logo"} src={'presentation/resources/logos/feedly.svg'} alt={"Feedly logo"}/>

        if (e.previewUrl) {
            return (
                <div data-role="tile" data-size="wide" onClick={() => this.props.open(this.browser, this.feedly, e, token)}
                     className={"d-flex flex-justify-center flex-align-center " + styles.tile}>
                    {logo}
                    <span className={"branding-bar " + styles.feedname}>{e.title}</span>
                    <span className={"badge-top " + styles.sourcename}>{e.user}</span>
                    <img alt={e.title} src={e.previewUrl} className={styles.thumbnail}/>
                </div>
            )
        } else {
            return (
                <div data-role="tile" data-size="wide"
                     className={"d-flex flex-justify-center flex-align-center " + styles.tile}>
                    {logo}
                    <p>{e.title}</p>
                </div>
            )
        }
    }
}

function mapStateToProps(state: AppState): StateProps {
    const providerState = state.platform.providers.find(p => p.provider === Provider.FEEDLY)
    if (providerState) {
        return {
            token: providerState.token,
        }
    } else {
        return {
            token: undefined,
        }
    }
}

function mapDispatchToProps(dispatch: Redux.Dispatch<any>): DispatchProps {
    return {
        open: (browser: Browser, feedly: Feedly, entertainment: Entertainment, token?: Token) => {
            browser.openEntertainmentUrl(entertainment)
            if (token) {
                feedly.markAsRead(entertainment, token)
                    .then((deleted: boolean) => {
                        if (deleted) {
                            removeContent(entertainment)(dispatch)
                        }
                    })

            }
        }
    }
}

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(FeedlyTile)