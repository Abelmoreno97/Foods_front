import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import{BrowserRouter} from "react-router-dom"
import { Provider } from 'react-redux';
import store from './redux/store';
import axios from 'axios';

// axios.defaults.baseURL = 'http://localhost:3001'
axios.defaults.baseURL = 'https://foods-back-prod.up.railway.app'


ReactDOM.render(<Provider store={store}><BrowserRouter><App/></BrowserRouter></Provider>,document.getElementById('root'));
