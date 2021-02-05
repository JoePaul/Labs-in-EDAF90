import React, { Component } from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./styles.css";
import inventory from "./inventory.ES6";
import ComposeSaladModal from "./ComposeSaladModal";
import ViewOrder from "./ViewOrder";
import Salad from "./Salad";

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
    
    return (
      <div>
        <div className="jumbotron text-center">
          <h1 className="display-4">Salladshuset</h1>
          <p className="lead">
            Den bästa och grönaste digitala salladsbaren i Skåne
          </p>
          <hr className="my-4" />
          <p>Beställ online och få den levererad till dig var i världen du än befinner dig - online!</p>
        </div>

        <ComposeSaladModal inventory={inventory} addOrder={this.addOrder}/>
        <ViewOrder order={this.state.order} onRemove={this.onRemove}/>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
