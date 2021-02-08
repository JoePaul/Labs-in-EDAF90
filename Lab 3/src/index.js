import React, { Component } from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./styles.css";
import inventory from "./inventory.ES6";

import ViewOrder from "./ViewOrder";
import { BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
import ComposeSalad from "./ComposeSalad";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      order: []
    }
    this.addOrder = this.addOrder.bind(this);
    this.onRemove = this.onRemove.bind(this);
  }

 

  onRemove(id) {
    if (window.confirm("Vill du verkligen ta bort den här salladen?")) {
      let order = this.state.order.filter(a => a.id !== id);
      this.setState({order}, () => console.log(this.state));
    }
  }

  addOrder(salad) {
    const {order} = this.state;
    order.push(salad);
    this.setState({order}, () => console.log(this.state.order));
  } 



  render() {

    const composeSalladComp = (params) => <ComposeSalad {...params} inventory={inventory} addOrder={this.addOrder}/>;
    const viewOrderComp = (params) => <ViewOrder {...params} order={this.state.order} onRemove={this.onRemove}/>;
    
    return (
      <Router>
      <div>
        <ul className="nav nav-tabs">
            <li className="nav-item ">
              <Link className="nav-link" to="compose-salad">
                Skapa sallad
              </Link>
                
            </li>
            <li className="nav-item" >
              <Link className="nav-link" to="view-order">
                Din order
              </Link>
                
            </li>
        </ul>
        <div className="jumbotron text-center">
          <h1 className="display-4">Salladshuset</h1>
          <p className="lead">
            Den bästa och grönaste digitala salladsbaren i Skåne
          </p>
          <hr className="my-4" />
          <p>Beställ online och få den levererad till dig var i världen du än befinner dig - online!</p>
        </div>
        <Switch>
        <Route path="/compose-salad" render={composeSalladComp}/>
        <Route path="/view-order" render={viewOrderComp}/>
        <Route>
          {<h4 className="text-center">404 Page not found</h4>}
        </Route>
        </Switch>
        
      </div>
      
  
      </Router>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
