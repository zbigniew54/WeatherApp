// // require('dotenv').config()
// import 'dotenv/config'

import React from 'react'; 
import ReactDOM from 'react-dom/client';
import './css/style.css';

import App from './components/App'; 
 
const root = ReactDOM.createRoot(document.getElementById('root'))
  
console.log(process.env.NODE_ENV)
root.render(
    <React.StrictMode> 
        <App />
    </React.StrictMode>
) 