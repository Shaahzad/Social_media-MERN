import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { AuthContextProvider } from './context/authcontext'

ReactDOM.createRoot(document.getElementById('root')).render(
    <AuthContextProvider>
        <App />
    </AuthContextProvider>
)
