import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import ImagePickerInput from './components/ReusableComponents/ImagePickerInput/ImagePickerInput.component';

class App extends Component {

    componentDidMount() {
    }

    render() {
        return (
            <div className="container">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">
                            Menu
                        </h3>
                    </div>
                    <div className="panel-body">
                        <h4><Link to="/admin/menus/">
                            Menus
                        </Link></h4>
                        <h4><Link to="/admin/sections/">
                            Sections
                        </Link></h4>
                        <h4><Link to="/admin/items/">
                            Items
                        </Link></h4>
                        <h4><Link to="/admin/options/">
                            Options
                        </Link></h4>
                        <h4><Link to="/menu">
                            Full Menu
                        </Link></h4>
                        <h4><Link to="/admin/demo/">
                            Demo
                        </Link></h4>
                        <ImagePickerInput/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
