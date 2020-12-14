/**
 * file Name: utils.js
 * date: 12/13/2020
 * author: Group 5
 * purpose: Shared utilities
 */


// string length for reformatting strings
const stringLength = 20;

/**
 * Rearranges the order of elements in an array
 * @param array {Object[]} - array to rearrange
 * @param originalPosition {int} - index
 * @param newPosition {int} - index
 * @returns {Object[]} - rearranged array
 */
export function changeOrder(array, originalPosition, newPosition) {
    const newArray = [...array]
    if (newPosition >= 0 && newPosition < array.length) {
        const object = {...array[originalPosition]};
        newArray[originalPosition] = newArray[newPosition];
        newArray[newPosition] = object;
    }
    return newArray;
}

/**
 * Shifts an element of an array by one position
 * @param option {Object} - element to be shifted
 * @param change {int} - position change (1 or -1)
 * @param array {Object[]} - array to be changed
 * @returns {Object[]} - reordered array
 */
export function reorder(option, change, array) {
    let options = [...array] || [];
    const positionOfOption = options.findIndex(opt => opt.id === option.id);
    if (positionOfOption !== -1) {
        options = changeOrder(options, positionOfOption, positionOfOption + change);
    }
    return options
}

/**
 * Formats options to include a display property including
 * a name and price as a string for dropdowns
 * @param optionsArray {Object} - array of options
 * @returns {{display: string}[]} - array of objects with a display property
 */
export function formatOptions(optionsArray) {
    const formattedOptions = (optionsArray || []).map(option => ({
        ...option,
        display: `${option.name} $${option.price ? option.price.toFixed(2) : 0.00}`
    }));
    return formattedOptions;
}

/**
 * Adds a display property to sections for use in a dropdown
 * @param optionsArray {Object[]} - options
 * @returns {{display: string}[]} - array of objects with the display property
 */
export function formatSection(optionsArray) {
    const formattedSections = (optionsArray || []).map(option => {
        const {title} = option;
        const trimTitle = title.length > stringLength ? title.slice(0, stringLength - 3) + '...' : title;
        return {
            ...option,
            display: `${trimTitle}`
        }
    });
    return formattedSections;
}

/**
 *
 * Adds a display property to Options for use in a dropdown
 * @param optionsArray {Object[]} - options
 * @returns {{display: string}[]} - array of objects with the display property
 */
export function formatItemOptions(optionsArray) {
    const formattedItemsOptions = (optionsArray || []).map(option => {
        const {name, price} = option;
        const trimName = name.length > stringLength ? name.slice(0, stringLength - 3) + '...' : name;

        return ({
            ...option,
            display: `${trimName} $${formatPrice(price)}`
        })

    });
    return formattedItemsOptions;
}

/**
 * Formats price for display
 * @param price {string|number} - price
 * @returns {string|number} - formatted price
 */
export function formatPrice(price) {
    if (isNaN(price)) {
        return 0.00;
    }
    return `$${price ? parseFloat(price).toFixed(2) : 0.00}`
}

/**
 * Gets query param from url
 * @param variable {string} - param to get
 * @returns {string|boolean} - param value
 */
export function getQueryVariable(variable) {
    const query = window.location.search.substring(1);
    const vars = query.split("&");
    for (let i = 0; i < vars.length; i++) {
        const pair = vars[i].split("=");
        if (pair[0] === variable) {
            return pair[1];
        }
    }
    return false;
}
