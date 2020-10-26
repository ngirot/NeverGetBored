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
}

interface DispatchProps {
    onCloseConfiguration: () => void
    saveYouTubeApiKey: (apiKey: ChangeEvent<HTMLInputElement>) => void
}

type Props = StateProps & DispatchProps

class ConfigurationPopup extends React.Component<Props> {
    render(): JSX.Element {
        if (this.props.open) {
            return <div className={"dialog secondary " + style.dialog} data-close-button="true">
                <div className="dialog-title">Configuration</div>
                <div className="dialog-content">
                    <form>
                        <div className="form-group">
                            <label>YouTube API key</label>
                            <input type="text" placeholder="ex: AIzaSyCeOwbJ8dvgZA3kssojXFCEcY8q5O4Oxjw" maxLength={128}
                                   data-role="input" onChange={this.props.saveYouTubeApiKey}
                                   value={this.props.youTubeApiKey}/>
                            <small className="text-muted">Used to grab additional data on youtube links (like video
                                duration)</small>
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
        youTubeApiKey: state.configuration.youTubeApiKey || ''
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
        }
    }
}

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(ConfigurationPopup)
