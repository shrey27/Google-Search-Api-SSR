import React from 'react'
import { hydrate } from 'react-dom'
import { Provider } from 'react-redux'
import createStoreFromState from './redux/store'
import App from './components/App'

const store = createStoreFromState(window.__STATE__)
delete window.__STATE__;

hydrate(<Provider store={store} ><App /></Provider>, document.querySelector('#root'))
