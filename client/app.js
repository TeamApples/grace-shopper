import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
import {ToastProvider, useToasts} from 'react-toast-notifications'

const App = () => {
  return (
    <div>
      <ToastProvider>
        <Navbar />
        <Routes />
      </ToastProvider>
    </div>
  )
}

export default App
