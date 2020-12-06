import axios from "axios";
import {APIPaths} from "../paths";

class MenuService {

    sections;
    orderItems;
    total;

    constructor(props) {
        const {menu, demo} = props || {};
        let sections = {};
        if(menu && menu.sections){
            menu.sections.forEach(section => {
                sections[section.id] = section;
            })
        }
        this.sections= sections;
        this.orderItems = {} ;
        this.total = 0;
        this.menu = menu || null;
        this.demo = demo
    }

    getMenu =() => {
        if(this.menu) {
            return Promise.resolve(this.menu);
        }
        return axios.get(APIPaths.activeMenu)
            .then(res => {
                this.menu = res.data;
                let sections = {};
                if(res.data && res.data.sections){
                    res.data.sections.forEach(section => {
                        sections[section.id] = section;
                    })
                }
                this.sections= sections;
                return this.menu;
            });
    }

    getSection = (id) => {
        if (this.sections[id]){
            return  Promise.resolve( this.sections[id]);
        }
    }

    updateItem =(item) => {
        if (item) {
            this.orderItems[item.id] = item;
        }
        this.setTotal();
    }

    getOrderItems = () => {
        return this.orderItems || {};
    }

    getOrderItemsAsArray = () => {
        return Object.values(this.getOrderItems()) || [];
    }

    setTotal = () => {
        const keys = Object.keys(this.orderItems);
        let total = 0;
        keys.forEach(key => {
            if (this.orderItems[key].total) {
                total = total + this.orderItems[key].total
            }
        });
        this.total = total;
    }
    getTotal = () => {
        const total = this.total || 0;
        return total.toFixed(2);
    }
    getIsDemo = () => {
        return this.demo
    }

}
export default MenuService;
