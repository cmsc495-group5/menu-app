export function formatItemOptions(optionsArray) {
    const formattedOptions = optionsArray.map(option => {
        const {name, internalDescription, description, price} = option;
        const trimName = name.length > 15 ? name.slice(0, 12) + '...' : name;
        const trimDesc = description.length > 15 ? description.slice(0, 12) + '...' : description;
        const trimIntDesc = internalDescription.length > 15 ? internalDescription.slice(0, 12) + '...' : internalDescription;
        return ({
            ...option,
            display: `${trimName} Desc: ${trimDesc} IntDesc: ${trimIntDesc} $${price ? price.toFixed(2) : 0.00}`
        })

    });
    return formattedOptions;
}