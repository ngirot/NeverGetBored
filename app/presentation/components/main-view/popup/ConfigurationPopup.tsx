import * as React from 'react'
import {ChangeEvent} from 'react'

import {connect} from "react-redux"
import {AppState} from "../../../../domain/store/reducers"
import * as Redux from "redux"
import inject, {Injectable} from "../../../../Injector"

const style = require('./ConfigurationPopup.scss')

interface StateProps {
    open: boolean
    youTubeApiKey: string
    darkMode: boolean
}

interface DispatchProps {
    onCloseConfiguration: () => void
    saveYouTubeApiKey: (apiKey: ChangeEvent<HTMLInputElement>) => void
    onChangeDarkMode: (darkMode: boolean) => void
}

type Props = StateProps & DispatchProps

class ConfigurationPopup extends React.Component<Props> {
    render(): JSX.Element {
        const isDarkMode = this.props.darkMode

        if (this.props.open) {
            return <div className={"dialog secondary " + style.dialog} data-close-button="true">
                <div className="dialog-title">Configuration</div>
                <div className="dialog-content">
                    <form className={style.form}>
                        <div className="row mb-2">
                            <label className="cell-sm-2">Dark mode</label>
                            <div className="cell-sm-10">
                                <input type="checkbox" data-role="switch"
                                       data-on="on" data-off="off" checked={isDarkMode}
                                       onChange={() => this.props.onChangeDarkMode(!isDarkMode)}/>
                            </div>
                        </div>
                        <div className="row mb-2">
                            <label className="cell-sm-2">YouTube API key</label>
                            <div className="cell-sm-10">
                                <input type="text" placeholder="ex: AIzaSyCeOwbJ8dvgZA3kssojXFCEcY8q5O4Oxjw" maxLength={128}
                                       data-role="input" onChange={this.props.saveYouTubeApiKey}
                                       value={this.props.youTubeApiKey}/>
                                <small className="text-muted">Used to grab additional data on youtube links (like video
                                    duration)</small>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="dialog-actions">
                    <button className="button success" onClick={this.props.onCloseConfiguration}>
                        <i className={"fas fa-check " + style.button}></i> Close
                    </button>
                </div>
            </div>
        } else {
            return <span></span>
        }
    }
}

function mapStateToProps(state: AppState): StateProps {
    return {
        open: state.configuration.configurationOpen,
        youTubeApiKey: state.configuration.youTubeApiKey || '',
        darkMode: state.configuration.darkMode
    }
}

function mapDispatchToProps(dispatch: Redux.Dispatch<any>): DispatchProps {
    const configurationService = inject(Injectable.APP_CONFIGURATION_SERVICE)

    return {
        onCloseConfiguration: () => {
            configurationService.toggleConfiguration(dispatch)
        },

        saveYouTubeApiKey: (event: ChangeEvent<HTMLInputElement>) => {
            configurationService.changeYouTubeApiKey(dispatch, event.target.value)
        },

        onChangeDarkMode: (darkMode: boolean) => {
            configurationService.change(dispatch, darkMode)
        }
    }
}

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(ConfigurationPopup)
