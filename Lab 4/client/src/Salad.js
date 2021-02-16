'use strict';
import { v4 as uuidv4 } from 'uuid';

let getUniqueID = () => {
    return () => uuidv4();
}

let id = getUniqueID();

class Salad {
    constructor() {
        this.id = id();
        this.foundation = {};
        this.protein = [];
        this.extra = [];
        this.dressing = {};

    };

    

    addItem(name, item, size = 1) {
        let itemObject = {...item, size};
        if (item){
            const {foundation, protein, extra, dressing} = this;
            if (itemObject.foundation) {
                foundation[name] = itemObject;
            } else if (itemObject.protein) {
                protein.push({[name]:itemObject});
            } else if (itemObject.extra) {
                extra.push({[name]:itemObject});
            } else if (itemObject.dressing) {
                dressing[name] = itemObject;
            }
        }
        
    
    };

    removeItem(name) {
        
        const {foundation, protein, extra, dressing} = this;
        if (foundation[name]) {
            delete foundation[name];
        } else if (Object.keys(protein).includes(name)) {
            this.protein = protein.filter(product => !product[name]);
        } else if (Object.keys(extra).includes(name)) {
            this.extra = extra.filter(product => !product[name]);
        } else if (dressing[name]) {
            delete dressing[name];
        }
    };

    static price(saladObject) {
        const {foundation, protein, extra, dressing} = saladObject;
        let cost =  protein.concat(foundation, dressing, extra)
                    .map(v => Object.keys(v).map(a => v[a].price * v[a].size)).flat()
                    .reduce((sum, price) => sum + price);
        return cost;
    };
    
}



export default Salad;