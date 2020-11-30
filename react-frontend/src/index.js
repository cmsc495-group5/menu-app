import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'semantic-ui-css/semantic.min.css';
import App from './App';
import './App.css';
import EditMenu from './components/EditMenu';
import CreateMenu from './components/CreateMenu';
import ShowMenu from './components/ShowMenu';
import ShowMenus from "./components/ShowMenus";
import Demo from "./components/Demo/Demo";
import MenuComponent from "./components/MenuComponent/Menu.component";

ReactDOM.render(
    <Router>
        <div>
            <Route exact path='/' component={App}/>
            <Route path='/menu' component={MenuComponent}/>
            <Route path='/admin/editMenu/:id' component={EditMenu}/>
            <Route path='/admin/createMenu' component={CreateMenu}/>
            <Route path='/admin/showMenu/:id' component={ShowMenu}/>
            <Route path='/admin/menus/' component={ShowMenus}/>
            <Route path='/demo/' component={Demo}/>
        </div>
    </Router>,
    document.getElementById('root')
);