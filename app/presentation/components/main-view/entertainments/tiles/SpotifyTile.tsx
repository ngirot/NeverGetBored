import * as React from 'react'
import {connect} from "react-redux"
import Entertainment from "../../../../../domain/store/state/Entertainment"
import inject, {Injectable} from "../../../../../Injector"
import {Browser} from "../../../../../domain/external/port/Browser"
import Author from "../../../../../domain/store/state/Author"
import {emptyFunction} from "../../../utils"

const styles = require('./SpotifyTile.scss')

export interface OwnsProps {
    entertainment: Entertainment
}

interface StateProps {
}

interface DispatchProps {
    open: (browser: Browser, entertainment: Entertainment) => void
}

type Props = StateProps & OwnsProps & DispatchProps

class FeedlyTile extends React.Component<Props> {

    private browser: Browser = inject(Injectable.BROWSER)

    render(): JSX.Element {
        const e = this.props.entertainment

        if (e.previewUrl) {
            return (
                <div data-role="tile" data-size="wide"
                     onClick={() => this.props.open(this.browser, e)}
                     className={"d-flex flex-justify-center flex-align-center " + styles.tile}>
                    {this.buildPreview(e)}
                    {e.author && this.buildAuthor(e.author)}
                    <p className={styles.feedname}>{e.title}</p>
                    {this.buildLogo()}
                </div>
            )
        } else {
            return (
                <div data-role="tile" data-size="wide"
                     className={"d-flex flex-justify-center flex-align-center " + styles.tile}>
                    {this.buildLogo()}
                    <p>{e.title}</p>
                    {e.author && this.buildAuthor(e.author)}
                </div>
            )
        }
    }

    private buildPreview(e: Entertainment): JSX.Element {
        return <img alt={e.title} src={e.previewUrl} className={styles.thumbnail}/>
    }

    private buildAuthor(author: Author): JSX.Element {
        return <span className={"badge-top " + styles.sourcename}>{author.name}</span>
    }

    private buildLogo(): JSX.Element {
        return <img className={"tile-logo"} src={'presentation/resources/logos/spotify.svg'} alt={"Spotify logo"}/>
    }
}

function mapDispatchToProps(): DispatchProps {
    return {
        open: (browser: Browser, entertainment: Entertainment) => {
            browser.openEntertainmentUrl(entertainment)
        }
    }
}

export default connect<StateProps, DispatchProps>(emptyFunction, mapDispatchToProps)(FeedlyTile)