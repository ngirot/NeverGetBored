import * as React from 'react'
import * as Redux from 'react-redux'
import {History} from 'history'

import {Provider} from 'react-redux'
import {ConnectedRouter} from 'react-router-redux'
import {Route, Switch} from "react-router"
import HomePage from "./HomePage"

interface IRootType {
    store: Redux.Store<any>
    history: History
}

export default function Root({store, history}: IRootType): JSX.Element {
    return (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <div>
                    <Switch>
                        <Route path="/" component={HomePage}/>
                    </Switch>
                </div>
            </ConnectedRouter>
        </Provider>
    )
}
