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
import OrderCompleteComponent from "./components/MenuComponent/Checkout/OrderComplete.component";
import ShowItems from "./components/Items/ShowItems";
import ShowItem from "./components/Items/ShowItem";
import CreateItem from "./components/Items/CreateItem";
import EditItem from "./components/Items/EditItem";
import ShowOptions from "./components/Options/ShowOptions";
import ShowOption from "./components/Options/ShowOption";
import CreateOption from "./components/Options/CreateOption";
import EditOption from "./components/Options/EditOption";
import ShowSections from "./components/Sections/ShowSections";
import CreateSection from "./components/Sections/CreateSection";
import ShowSection from "./components/Sections/ShowSection";
import EditSection from "./components/Sections/EditSection";
import {Paths} from './paths'

ReactDOM.render(
    <Router>
        <div>
            <Route exact path='/' component={App}/>
            <Route path={Paths.menu} component={MenuComponent}/>
            <Route path={Paths.orderComplete} component={OrderCompleteComponent}/>

            <Route path={`${Paths.editMenu}/:id`} component={EditMenu}/>
            <Route path={Paths.createMenu} component={CreateMenu}/>
            <Route path={`${Paths.showMenu}/:id`} component={ShowMenu}/>
            <Route path={Paths.showAllMenus} component={ShowMenus}/>

            <Route path={`${Paths.editSection}/:id`} component={EditSection}/>
            <Route path={Paths.createSection} component={CreateSection}/>
            <Route path={`${Paths.showSection}/:id`} component={ShowSection}/>
            <Route path={Paths.showAllSections} component={ShowSections}/>

            <Route path={`${Paths.editItem}/:id`} component={EditItem}/>
            <Route path={Paths.createItem} component={CreateItem}/>
            <Route path={`${Paths.showItem}/:id`} component={ShowItem}/>
            <Route path={Paths.showAllItems} component={ShowItems}/>

            <Route path={`${Paths.editOption}/:id`} component={EditOption}/>
            <Route path={Paths.createOption} component={CreateOption}/>
            <Route path={`${Paths.showOption}/:id`} component={ShowOption}/>
            <Route path={Paths.showAllOptions} component={ShowOptions}/>

            <Route path={Paths.demo} component={Demo}/>
        </div>
    </Router>,
    document.getElementById('root')
);