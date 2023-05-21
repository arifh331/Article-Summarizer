import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { store } from './services/store.js'

//Wrap your entire application with the Provider component from react-redux
import {Provider} from 'react-redux'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* THe provider wraps entire app, which contains the store, which contains the article api */}
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>,
)
