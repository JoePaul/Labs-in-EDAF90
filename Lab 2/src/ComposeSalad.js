import React from "react";
import SaladCheckbox from "./SaladCheckbox";
import SaladOption from "./SaladOption";
import $ from "jquery";
import Salad from "./Salad";


class ComposeSalad extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {addedComponents: [],
                  addedFoundation: "",
                  addedDressing: ""}

    this.handleComponents = this.handleComponents.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFoundation = this.handleFoundation.bind(this);
    this.handleDressing = this.handleDressing.bind(this);
    this.set

  }

  
  handleSubmit(event) {
    event.preventDefault();
    const {addedComponents, addedFoundation, addedDressing} = this.state;

    let salad = new Salad();
    addedComponents.map(v => salad.addItem(v));
    salad.addItem(addedDressing);
    salad.addItem(addedFoundation)
    this.props.addOrder(salad);

    //Don't forget to add 'setState' to clear state of composed salad
    this.setState({addedComponents: [], addedFoundation: "", addedDressing:""});
    this.props.history.push("/view-order");
  }

  handleCancel(event) {
    this.setState({addedComponents: [], addedFoundation: "", addedDressing:""});
  }

  handleFoundation(event) {
    let {value} = event.target;
    this.setState({addedFoundation: value});
  }

  handleDressing(event) {
    let {value} = event.target;
    this.setState({addedDressing: value});
  }

  handleComponents(event) {
    let {value, checked} = event.target;
    let {addedComponents} = this.state;
    if (checked) {
      addedComponents.push(value);
      this.setState(({addedComponents}));
    } else {
      this.setState({addedComponents: addedComponents.filter(v => v !== value)});
    }
  }
  

  render() {
    const {inventory} = this.props;
    const {addedComponents} = this.state;
    // test for correct ussage, the parent must send this datastructure
    if (!inventory) {
      alert("inventory is undefined in ComposeSalad");
    }
    let foundations = Object.keys(inventory).filter(
      name => inventory[name].foundation
    );

    let proteins = Object.keys(inventory).filter(
      name => inventory[name].protein
    );

    let extras = Object.keys(inventory).filter(
      name => inventory[name].extra
    );

    let dressing = Object.keys(inventory).filter(
      name => inventory[name].dressing
    );
   
    
    
    return (

      <form onSubmit={this.handleSubmit}>
        <div className="container">
          <h4>Välj bas</h4>
          <select value={this.state.addedFoundation} onChange={this.handleFoundation} className="custom-select" required> 
            <option value="" disabled hidden>Välj en bas</option>
            {foundations.map(name => (
              <SaladOption key={name}
                name={name} 
                price={inventory[name].price}  
              />  
            ))}
            </select>
        
          <h4>Välj protein</h4>
            
            {proteins.map(name => (
              <SaladCheckbox 
              key={name}
              handleChange={this.handleComponents} 
              name={name} 
              price={inventory[name].price} 
              checked={addedComponents.find(v => v === name) || false}/>  
            ))} 

          <h4>Välj extras</h4>
              
            {extras.map(name => (
              <SaladCheckbox 
                key={name}
                handleChange={this.handleComponents} 
                name={name} 
                price={inventory[name].price} 
                checked={addedComponents.find(v => v === name) || false}/>
            ))}
        

          <h4>Välj dressing</h4>
          <select value={this.state.addedDressing} onChange={this.handleDressing} className="custom-select">
            <option value="" disabled hidden>Välj en dressing</option>
            {dressing.map(name => (
              <SaladOption 
                key={name}
                name={name} 
                price={inventory[name].price} 
              />  
            ))}
            </select>
            <div className="container">
            <button
                  type="button"
                  className="btn btn-secondary "
                  onClick={this.handleCancel}
                >
                  Avbryt sallad
                </button>
                <button
                type="submit"
                className="btn btn-success"
                
                > 
                  Lägg till i varukorg
                </button>
            </div>
           
        </div>
      </form>

    );
  }
}

export default ComposeSalad;
