import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'semantic-ui-css/semantic.min.css';
import App from './App';
import './App.css';
import EditMenu from './components/Menus/EditMenu';
import CreateMenu from './components/Menus/CreateMenu';
import ShowMenu from './components/Menus/ShowMenu';
import ShowMenus from "./components/Menus/ShowMenus";
import Demo from "./components/Demo/Demo";
import MenuComponent from "./components/MenuComponent/Menu.component";
import ShowItems from "./components/Items/ShowItems";
import ShowItem from "./components/Items/ShowItem";
import CreateItem from "./components/Items/CreateItem";
import EditItem from "./components/Items/EditItem";
import ShowOptions from "./components/Options/ShowOptions";
import ShowOption from "./components/Options/ShowOption";
import CreateOption from "./components/Options/CreateOption";
import EditOption from "./components/Options/EditOption";

ReactDOM.render(
    <Router>
        <div>
            <Route exact path='/' component={App}/>
            <Route path='/menu' component={MenuComponent}/>
            <Route path='/admin/editMenu/:id' component={EditMenu}/>
            <Route path='/admin/createMenu' component={CreateMenu}/>
            <Route path='/admin/showMenu/:id' component={ShowMenu}/>
            <Route path='/admin/menus/' component={ShowMenus}/>
            <Route path='/admin/editItem/:id' component={EditItem}/>
            <Route path='/admin/createItem' component={CreateItem}/>
            <Route path='/admin/showItem/:id' component={ShowItem}/>
            <Route path='/admin/items/' component={ShowItems}/>
            <Route path='/admin/editOption/:id' component={EditOption}/>
            <Route path='/admin/createOption' component={CreateOption}/>
            <Route path='/admin/showOption/:id' component={ShowOption}/>
            <Route path='/admin/options/' component={ShowOptions}/>
            <Route path='/admin/demo/' component={Demo}/>
        </div>
    </Router>,
    document.getElementById('root')
);