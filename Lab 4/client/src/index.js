import React, { Component } from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./styles.css";
import ViewOrder from "./ViewOrder";
import { BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
import ComposeSalad from "./ComposeSalad";
import $ from 'jquery';



const baseURI = "http://localhost:8080/";


let reduceSaladObjectFromServerToKeyValueObject = (listOfSalads) => {
  console.log()
  return listOfSalads.reduce((accumulator, currentValue) => {
    accumulator[currentValue["key"]] = currentValue["value"];
    return accumulator;
  }, {});
}


let fetchComponents = async (type, ingridentList) => {
  return ingridentList.map(name => fetch(baseURI + type + "/" + name)
    .then(response => response.json())
    .then(result => ({key: name, value: result})))

}


class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      order: [],
      inventory: {}
    }
    this.addOrder = this.addOrder.bind(this);
    this.onRemove = this.onRemove.bind(this);
    this.updateSalad = this.updateSalad.bind(this);
    this.submitOrder = this.submitOrder.bind(this);
    
  }


  updateSalad(salad) {
    let index = this.state.order.findIndex(s => s.id === salad.id);
    let order = [...this.state.order];
    order[index] = salad;
    this.setState({order }, () => {
       window.localStorage.setItem("order", JSON.stringify(order));
       $("#changeSaladModal").modal("hide");
    });
  }


  componentDidMount() {
    const start = new Date().getTime()
    Promise.all([fetch(baseURI + "foundations"), fetch(baseURI + "proteins"), fetch(baseURI + "extras"),fetch(baseURI + "dressings")])
            .then(responses => Promise.all(responses.map(response => response.json())))
            .then(([foundations, proteins, extras, dressings]) => {
            return Promise.all([fetchComponents("foundations", foundations), 
                                fetchComponents("proteins", proteins),
                                fetchComponents("extras", extras),
                                fetchComponents("dressings", dressings)])
            })
            .then(responses => Promise.all(responses.flat()))
            .then(responses => reduceSaladObjectFromServerToKeyValueObject(responses))
            .then(inventory => {
              let orderFromStorage = JSON.parse((window.localStorage.getItem("order") || "[]"));
              this.setState({inventory, order: orderFromStorage}, () => console.log(this.state));
            }); 
  }

 

  onRemove(id) {
    let order = this.state.order.filter(sallad => sallad.id !== id);
    this.setState({order}, () => {
      window.localStorage.setItem("order", JSON.stringify(order));
      $("#removeSaladModal").modal("hide");
    });

  }

  addOrder(salad) {
    const {order} = this.state;
    order.push(salad);
    this.setState({order}, () => window.localStorage.setItem("order", JSON.stringify(order)));
  } 

  submitOrder() {
    const {order} = this.state;
    console.log("hej")
    fetch("http://localhost:8080/orders/", {
        method:"POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(order)
      }).then(response => {
      console.log(response.status)
      window.localStorage.setItem("order", []);
      window.scrollTo({top:0, behavior: 'smooth'});
      })
      .then(() => this.setState({order:[]}));
  }



  render() {
    const {inventory, order} = this.state;

    const composeSalladComp = (params) => <ComposeSalad {...params} inventory={inventory} addOrder={this.addOrder} />;
    const viewOrderComp = (params) => <ViewOrder {...params} order={order} onRemove={this.onRemove} inventory={inventory} updateSalad={this.updateSalad} submitOrder={this.submitOrder}/>;
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
          <Route exact path="/" render={composeSalladComp}/>
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
