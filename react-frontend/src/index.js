/**
 * file Name: index.js
 * date: 12/13/2020
 * author: Group 5
 * purpose: Contains the routes for the application, this is the root component
 */

import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'semantic-ui-css/semantic.min.css';
import App from './App';
import './App.css';
import EditMenuComponent from './components/Menus/EditMenu.component';
import CreateMenuComponent from './components/Menus/CreateMenu.component';
import ShowMenuComponent from './components/Menus/ShowMenu.component';
import ShowMenusComponent from "./components/Menus/ShowMenus.component";
import DemoComponent from "./components/Demo/Demo.component";
import MenuComponent from "./components/MenuComponent/Menu.component";
import OrderCompleteComponent from "./components/MenuComponent/Checkout/OrderComplete.component";
import ShowItemsComponent from "./components/Items/ShowItems.component";
import ShowItemComponent from "./components/Items/ShowItem.component";
import CreateItemComponent from "./components/Items/CreateItem.component";
import EditItemComponent from "./components/Items/EditItem.component";
import ShowOptionsComponent from "./components/Options/ShowOptions.component";
import ShowOptionComponent from "./components/Options/ShowOption.component";
import CreateOptionComponent from "./components/Options/CreateOption.component";
import EditOptionComponent from "./components/Options/EditOption.component";
import ShowSectionsComponent from "./components/Sections/ShowSections.component";
import CreateSectionComponent from "./components/Sections/CreateSection.component";
import ShowSectionComponent from "./components/Sections/ShowSection.component";
import EditSectionComponent from "./components/Sections/EditSection.component";
import {Paths} from './paths'
import ShowImagesComponent from "./components/Images/ShowImages.component";
import ShowImageComponent from "./components/Images/ShowImage.component";
import CreateImageComponent from "./components/Images/CreateImage.component";
import EditImageComponent from "./components/Images/EditImage.component";
import QrCodeComponent from "./components/QrCode/QrCode.component";
import AdminMenuComponent from "./components/AdminMenu/AdminMenu.component";
import EmployeeComponent from "./components/Employee/Employee.component";

ReactDOM.render(
    <Router>
        <div>
            <Route exact path='/' component={App}/>
            <Route path={Paths.menu} component={MenuComponent}/>
            <Route path={Paths.orderComplete} component={OrderCompleteComponent}/>

            <Route path={Paths.admin} component={AdminMenuComponent}/>

            <Route path={`${Paths.editMenu}/:id`} component={EditMenuComponent}/>
            <Route path={Paths.createMenu} component={CreateMenuComponent}/>
            <Route path={`${Paths.showMenu}/:id`} component={ShowMenuComponent}/>
            <Route path={Paths.showAllMenus} component={ShowMenusComponent}/>

            <Route path={`${Paths.editSection}/:id`} component={EditSectionComponent}/>
            <Route path={Paths.createSection} component={CreateSectionComponent}/>
            <Route path={`${Paths.showSection}/:id`} component={ShowSectionComponent}/>
            <Route path={Paths.showAllSections} component={ShowSectionsComponent}/>

            <Route path={`${Paths.editItem}/:id`} component={EditItemComponent}/>
            <Route path={Paths.createItem} component={CreateItemComponent}/>
            <Route path={`${Paths.showItem}/:id`} component={ShowItemComponent}/>
            <Route path={Paths.showAllItems} component={ShowItemsComponent}/>

            <Route path={`${Paths.editOption}/:id`} component={EditOptionComponent}/>
            <Route path={Paths.createOption} component={CreateOptionComponent}/>
            <Route path={`${Paths.showOption}/:id`} component={ShowOptionComponent}/>
            <Route path={Paths.showAllOptions} component={ShowOptionsComponent}/>

            <Route path={`${Paths.editImage}/:id`} component={EditImageComponent}/>
            <Route path={Paths.createImage} component={CreateImageComponent}/>
            <Route path={`${Paths.showImage}/:id`} component={ShowImageComponent}/>
            <Route path={Paths.showAllImages} component={ShowImagesComponent}/>

            <Route path={Paths.employee} component={EmployeeComponent}/>

            <Route path={Paths.qrCode} component={QrCodeComponent}/>

            <Route path={Paths.demo} component={DemoComponent}/>
        </div>
    </Router>,
    document.getElementById('root')
);
