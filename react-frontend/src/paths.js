const menu = 'menu';
const admin = 'admin';

export const Paths = {
    menu: `/${menu}`,
    orderComplete: `/orderComplete`,
    admin: `/${admin}`,
    // Menu paths
    editMenu: `/${admin}/editMenu`,
    createMenu: `/${admin}/createMenu`,
    showMenu: `/${admin}/showMenu`,
    showAllMenus: `/${admin}/menus`,
    // Section paths
    editSection: `/${admin}/editSection`,
    createSection: `/${admin}/createSection`,
    showSection: `/${admin}/showSection`,
    showAllSections: `/${admin}/sections`,
    // Item paths
    editItem: `/${admin}/editItem`,
    createItem: `/${admin}/createItem`,
    showItem: `/${admin}/showItem`,
    showAllItems: `/${admin}/items`,
    // Option paths
    editOption: `/${admin}/editOption`,
    createOption: `/${admin}/createOption`,
    showOption: `/${admin}/showOption`,
    showAllOptions: `/${admin}/options`,
    // Demo this may be removed
    demo: `/${admin}/demo`,
    // Employee
    employee: "/employee/orders"
}

export const APIPaths = {
    options: '/options',
    items: '/items',
    sections: '/sections',
    menus: '/menus',
    activeMenu: '/menus/active',
    orders: "/orders",
    activeOrders: "/orders/active",
}

export function interpolateWithId (basePath, id){
    return `${basePath}/${id}`;
}
