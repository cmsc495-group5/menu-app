import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class App extends Component {

  constructor(props) {
    super(props);
  }

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
                <span className="glyphicon glyphicon-plus-sign" aria-hidden="true"></span> Menus
              </Link></h4>
            </div>
          </div>
        </div>
    );
  }
}

export default App;
