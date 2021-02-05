'use strict';
import inventory from "./inventory.ES6";;


const foundations = Object.keys(inventory).filter(item => inventory[item]["foundation"]);
const proteins = Object.keys(inventory).filter(item => inventory[item]["protein"]);
const extras = Object.keys(inventory).filter(item => inventory[item]["extra"]);
const dressing = Object.keys(inventory).filter(item => inventory[item]["dressing"]);
let getUniqueID = () => {
    let id = 1;
    return () => id++;
}

let id = getUniqueID();

//Ändra så att sallad inte behöver ha koll på inv
class Salad {


    constructor() {
        this.id = id();
        this.foundation = {};
        this.protein = [];
        this.extra = [];
        this.dressing = {};

    };

    

    addItem = (item, size = 1) => {
        let itemObject = {...inventory[item], size};
         
        const {foundation, protein, extra, dressing} = this;
        if (itemObject.foundation && foundation) {
            foundation[item] = itemObject;
        } else if (itemObject.protein) {
            protein.push({[item]:itemObject});
        } else if (itemObject.extra) {
            extra.push({[item]:itemObject});
        } else if (itemObject.dressing) {
            dressing[item] = itemObject;
        }
        
    
    };

    removeItem = (item) => {
        
        const {foundation, protein, extra, dressing} = this;
        if (foundation[item]) {
            delete foundation[item];
        } else if (proteins.includes(item)) {
            this.protein = protein.filter(product => !product[item]);
        } else if (extras.includes(item)) {
            this.extra = extra.filter(product => !product[item]);
        } else if (dressing[item]) {
            delete dressing[item];
        }
    };

    price = () => {
        const {foundation, protein, extra, dressing} = this;
        let cost =  protein.concat(foundation, dressing, extra)
                    .map(v => Object.keys(v).map(a => v[a].price * v[a].size)).flat()
                    .reduce((sum, price) => sum + price);
        return cost;
    };

    print() {
        const {foundation, protein, extra, dressing} = this;
        return `${this.id}; 
        ${Object.keys(foundation)};    
        ${protein.map(v => Object.keys(v))};    
        ${extra.map(v => Object.keys(v))};   
        ${Object.keys(dressing)}`; 
    }
    
}



export default Salad;