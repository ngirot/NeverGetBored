import * as React from 'react'
import {render} from 'react-dom'
import {AppContainer} from 'react-hot-loader'
import './app.global.scss'
import Root from "./presentation/component/Root"

const {configureStore, history} = require('./domain/store/configureStore')
const store = configureStore()

render(
    <AppContainer>
        <Root store={store} history={history}/>
    </AppContainer>,
    document.getElementById('root')
)

if ((module as any).hot) {
    (module as any).hot.accept('./components/Root', () => {
        const NextRoot = require('./presentation/component/Root').default
        render(
            <AppContainer>
                <NextRoot store={store} history={history}/>
            </AppContainer>,
            document.getElementById('root')
        )
    })
}
