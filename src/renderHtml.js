import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import createStoreFromState from './redux/store'
import App from './components/App'

module.exports = function render(initialState) {
  const store = createStoreFromState(initialState)
  let content = renderToString(
    <Provider store={store} >
       <App />
    </Provider>
  );
  const preloadedState = store.getState()
  return {content, preloadedState};
}
