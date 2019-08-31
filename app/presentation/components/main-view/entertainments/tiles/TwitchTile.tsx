import * as React from 'react'

import {connect} from "react-redux"
import {emptyFunction} from "../../../utils"
import Entertainment from "../../../../../domain/store/state/Entertainment"
import inject, {Injectable} from "../../../../../Injector"

const styles = require('./TwitchTile.scss')

interface OwnsProps {
    entertainment: Entertainment
}

interface StateProps {
}

interface DispatchProps {
    open: (entertainment: Entertainment) => void
}

type Props = OwnsProps & DispatchProps

class TwitchTile extends React.Component<Props> {
    render() {
        const e = this.props.entertainment

        const authorName = this.buildAuhtorName(e)
        const authorAvatar = this.buildAuthorAvatar(e)
        const gameIcon = this.buildGameIcon(e)
        const gameName = this.buildGameName(e)
        const twitchLogo = this.buildTwitchLogo()
        const preview = this.buildPreview(e)
        const streamName = this.buildStreamName(e)

        return (
            <div data-role="tile" data-size="wide" className={styles.tile}
                 onClick={() => this.props.open(e)} data-effect="hover-slide-down">
                <div className="slide-front">
                    {twitchLogo}
                    {streamName}
                    {authorName}
                    {preview}
                </div>
                <div className="slide-back">
                    {twitchLogo}
                    {authorAvatar}
                    {gameIcon}
                    {gameName}
                </div>
            </div>
        )
    }

    private buildStreamName(e: Entertainment): JSX.Element {
        return <span className={"branding-bar " + styles.streamname}>{e.title}</span>
    }

    private buildPreview(e: Entertainment): JSX.Element {
        return <img alt={e.title} src={e.previewUrl} className={styles.thumbnail}/>
    }

    private buildTwitchLogo(): JSX.Element {
        return <img className={"tile-logo"} src={'presentation/resources/logos/twitch.svg'} alt={"Twitch logo"}/>
    }

    private buildAuhtorName(e: Entertainment): JSX.Element | null {
        if (!e.author) {
            return null
        }
        return <span className={"badge-top " + styles.username}>{e.author.name}</span>
    }

    private buildGameName(e: Entertainment): JSX.Element | null {
        if (!e.subject) {
            return null
        }
        return <span className={"branding-bar " + styles.gamename}>{e.subject.name}</span>
    }

    private buildAuthorAvatar(e: Entertainment): JSX.Element | null {
        if (!e.author) {
            return null
        }
        return <div className={"badge-top " + styles.username + " " + styles.badgeavatar}>
            <img alt={e.author.name}
                 src={e.author.avatarUrl}
                 className={styles.avatar}/>
            <br/>
            <span>{e.author.name}</span>
        </div>
    }

    private buildGameIcon(e: Entertainment): JSX.Element | null {
        if (!e.subject) {
            return null
        }
        return <img alt={e.subject.name} src={e.subject.iconUrl} className={styles.gameicon}/>
    }
}

function mapDispatchToProps(): DispatchProps {
    const browser = inject(Injectable.BROWSER)
    return {
        open: (entertainment: Entertainment) => {
            browser.openEntertainmentUrl(entertainment)
        }
    }
}

export default connect<StateProps, DispatchProps>(emptyFunction, mapDispatchToProps)(TwitchTile)