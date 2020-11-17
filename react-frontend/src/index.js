import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import './App.css';
import EditMenu from './components/EditMenu';
import CreateMenu from './components/CreateMenu';
import ShowMenu from './components/ShowMenu';
import ShowMenus from "./components/ShowMenus";

ReactDOM.render(
    <Router>
        <div>
            <Route exact path='/' component={App} />
            <Route path='/admin/editMenu/:id' component={EditMenu} />
            <Route path='/admin/createMenu' component={CreateMenu} />
            <Route path='/admin/showMenu/:id' component={ShowMenu} />
            <Route path='/admin/menus/' component={ShowMenus} />
        </div>
    </Router>,
    document.getElementById('root')
);