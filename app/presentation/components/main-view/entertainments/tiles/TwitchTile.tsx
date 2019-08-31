import * as React from 'react'

import {connect} from "react-redux"
import {emptyFunction} from "../../../utils"
import Entertainment from "../../../../../domain/store/state/Entertainment"
import inject, {Injectable} from "../../../../../Injector"
import Author from "../../../../../domain/store/state/Author"
import Subject from "../../../../../domain/store/state/Subject"

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
    render(): JSX.Element {
        const e = this.props.entertainment

        return (
            <div data-role="tile" data-size="wide" className={styles.tile}
                 onClick={() => this.props.open(e)} data-effect="hover-slide-down">
                <div className="slide-front">
                    {this.buildTwitchLogo()}
                    {this.buildStreamName(e)}
                    {e.author && this.buildAuhtorName(e.author)}
                    {this.buildPreview(e)}
                </div>
                <div className="slide-back">
                    {this.buildTwitchLogo()}
                    {e.author && this.buildAuthorAvatar(e.author)}
                    {e.subject && this.buildGameIcon(e.subject)}
                    {e.subject && this.buildGameName(e.subject)}
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

    private buildAuhtorName(author: Author): JSX.Element {
        return <span className={"badge-top " + styles.username}>{author.name}</span>
    }

    private buildGameName(subject: Subject): JSX.Element {
        return <span className={"branding-bar " + styles.gamename}>{subject.name}</span>
    }

    private buildAuthorAvatar(author: Author): JSX.Element {
        return <div className={"badge-top " + styles.username + " " + styles.badgeavatar}>
            <img alt={author.name}
                 src={author.avatarUrl}
                 className={styles.avatar}/>
            <br/>
            <span>{author.name}</span>
        </div>
    }

    private buildGameIcon(subject: Subject): JSX.Element {
        return <img alt={subject.name} src={subject.iconUrl} className={styles.gameicon}/>
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