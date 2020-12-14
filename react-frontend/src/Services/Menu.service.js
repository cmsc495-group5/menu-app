/**
 * file Name: Menu.service.js
 * date: 12/13/2020
 * author: Group 5
 * purpose: Service for maintaining Menu state
 */

import axios from "axios";
import {APIPaths} from "../paths";

class MenuService {

    sections;
    orderItems;
    total;

    constructor(props) {
        const {menu, demo} = props || {};
        let sections = {};
        if (menu && menu.sections) {
            menu.sections.forEach(section => {
                sections[section.id] = section;
            })
        }
        this.sections = sections;
        this.orderItems = {};
        this.total = 0;
        this.menu = menu || null;
        this.demo = demo
    }

    /**
     * gets the currently active menu from the API or local value
     * @returns {Promise<*>|Promise<unknown>}
     */
    getMenu = () => {
        if (this.menu) {
            return Promise.resolve(this.menu);
        }
        return axios.get(APIPaths.activeMenu)
            .then(res => {
                this.menu = res.data;
                let sections = {};
                if (res.data && res.data.sections) {
                    res.data.sections.forEach(section => {
                        sections[section.id] = section;
                    })
                }
                this.sections = sections;
                return this.menu;
            });
    }

    /**
     * Gets the section from local a value.
     * @param id {string} - id of the section
     * @returns {Promise<unknown>}
     */
    getSection = (id) => {
        if (this.sections[id]) {
            return Promise.resolve(this.sections[id]);
        }
    }

    /**
     * Updates an item with changes from the menu
     * @param item {Object} - item to update
     */
    updateItem = (item) => {
        if (item) {
            this.orderItems[item.id] = item;
        }
        this.setTotal();
    }

    /**
     * Gets the current order items
     * @returns {Object}
     */
    getOrderItems = () => {
        return this.orderItems || {};
    }

    /**
     * Gets order items as an array
     * @returns {Object[]}
     */
    getOrderItemsAsArray = () => {
        return Object.values(this.getOrderItems()) || [];
    }

    /**
     * Places the order setting the status to pending
     * @param tableNumber {string} - table
     * @returns {Promise<boolean | void>}
     */
    placeOrder = (tableNumber) => {
        const orderItems = this.getOrderItemsAsArray().map(item => {
            return {
                total: item.total,
                prepNotes: item.prepNotes,
                count: item.count,
                itemId: item.id,
                itemName: item.name,
                price: item.price,
                options: (item.selectedOptions && item.selectedOptions.length) ? item.selectedOptions.map(item => item.name) : []

            }
        })
        return axios.post(APIPaths.orders, {
            status: 'pending',
            table: tableNumber,
            orderItems: orderItems,
            total: this.getTotal(),
        })
            .then(res => {
                return true;
            }).catch(e => console.log(e));
    }

    /**
     * Sets the total for the current order
     */
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
    /**
     * returns the current total
     * @returns {string}
     */
    getTotal = () => {
        const total = this.total || 0;
        return total.toFixed(2);
    }
    /**
     * Returns if the service is in demo mode
     * @returns {boolean} - is Demo
     */
    getIsDemo = () => {
        return this.demo
    }
}

export default MenuService;
