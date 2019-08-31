import * as React from 'react'
import {connect} from "react-redux"
import * as Redux from "redux"
import Entertainment from "../../../../../domain/store/state/Entertainment"
import Token from "../../../../../domain/store/state/Token"
import {AppState} from "../../../../../domain/store/reducers"
import {Provider} from "../../../../../domain/store/state/Provider"
import inject, {Injectable} from "../../../../../Injector"
import {Browser} from "../../../../../domain/external/port/Browser"
import {Feedly} from "../../../../../domain/external/port/Feedly"
import Author from "../../../../../domain/store/state/Author"

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

    render(): JSX.Element {
        const e = this.props.entertainment
        const token = this.props.token

        if (e.previewUrl) {
            return (
                <div data-role="tile" data-size="wide" data-effect="hover-slide-down"
                     onClick={() => this.props.open(this.browser, this.feedly, e, token)}
                     className={"d-flex flex-justify-center flex-align-center " + styles.tile}>
                    <div className="slide-front">
                        {this.buildLogo()}
                        {e.author && this.buildAuthor(e.author)}
                        {this.buildBottomTitle(e)}
                        {this.buildPreview(e)}
                    </div>
                    <div className="slide-back d-flex flex-justify-center flex-align-center">
                        {this.buildLogo()}
                        {e.author && this.buildAuthor(e.author)}
                        {this.buildCentralTitle(e)}
                    </div>
                </div>
            )
        } else {
            return (
                <div data-role="tile" data-size="wide"
                     className={"d-flex flex-justify-center flex-align-center " + styles.tile}>
                    {this.buildLogo()}
                    {this.buildCentralTitle(e)}
                    {e.author && this.buildAuthor(e.author)}
                </div>
            )
        }
    }

    private buildPreview(e: Entertainment): JSX.Element {
        return <img alt={e.title} src={e.previewUrl} className={styles.thumbnail}/>
    }

    private buildBottomTitle(e: Entertainment): JSX.Element {
        return <span className={"branding-bar " + styles.feedname}>{e.title}</span>
    }

    private buildCentralTitle(e: Entertainment): JSX.Element {
        return <p>{e.title}</p>
    }

    private buildAuthor(author: Author): JSX.Element {
        return <span className={"badge-top " + styles.sourcename}>{author.name}</span>
    }

    private buildLogo(): JSX.Element {
        return <img className={"tile-logo"} src={'presentation/resources/logos/feedly.svg'} alt={"Feedly logo"}/>
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
    const entertainmentService = inject(Injectable.ENTERTAINMENT_SERVICE)
    return {
        open: (browser: Browser, feedly: Feedly, entertainment: Entertainment, token?: Token) => {
            browser.openEntertainmentUrl(entertainment)
            if (token) {
                feedly.markAsRead(entertainment, token)
                    .then((deleted: boolean) => {
                        if (deleted) {
                            entertainmentService.remove(dispatch, entertainment)
                        }
                    })

            }
        }
    }
}

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(FeedlyTile)