import React from 'react'
import ReactDOM from 'react-dom'
// import 'bootstrap'
import 'normalize.css/normalize.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/styles.scss'
import AppRouter from './routers/AppRouter'

ReactDOM.render(<AppRouter />, document.getElementById('app'))
