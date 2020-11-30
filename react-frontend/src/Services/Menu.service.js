import {getMockMenu, getMockSection} from "../components/Demo/MockData";
class MenuService {

    sections;
    orderItems;
    total;

    constructor(props) {
        this.sections=  {};
        this.orderItems = {} ;
        this.total = 0;
    }


    getMenu =() => {
        // TODO:api call to get menu
        return Promise.resolve(getMockMenu(5));
    }

    getSection = (id) => {
        if (this.sections[id]){
            return  Promise.resolve( this.sections[id]);
        }
        //TODO: here we would make the api call to get the section and add it to the sections variable
        const section = getMockSection(id, 5);
        this.sections[id] = section;
        return Promise.resolve(section);
    }

    updateItem =(item) => {
        if(item){
            this.orderItems[item.id] = item;
        }
        this.setTotal();
    }

    getOrderItems =() => {
        return this.orderItems || {};
    }

    setTotal = () => {
        const keys = Object.keys(this.orderItems);
        let total = 0;
        keys.forEach(key => {
            if(this.orderItems[key].total){
                total = total + this.orderItems[key].total
            }
        });
        this.total = total;
    }
    getTotal = () => {
        const total  = this.total || 0;
        return total.toFixed(2);
    }

}
export default new MenuService()