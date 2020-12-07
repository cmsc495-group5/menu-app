const stringLength  =20;

export function changeOrder(array, originalPosition, newPosition){
    const newArray = [...array]
    if(newPosition >= 0 && newPosition < array.length){
        const object = {...array[originalPosition]};
        newArray[originalPosition] = newArray[newPosition];
        newArray[newPosition]= object;
    }
    return newArray;
}

export function reorder (option, change, array){
    let options = [...array] || [];
    const positionOfOption = options.findIndex(opt => opt.id === option.id);
    if(positionOfOption !== -1){
        options = changeOrder(options, positionOfOption, positionOfOption+change);
    }
    return options
}

export function  formatOptions(optionsArray) {
    const formattedOptions = optionsArray.map(option => ({
        ...option,
        display: `${option.name} $${option.price ? option.price.toFixed(2) : 0.00}`
    }));
    return formattedOptions;
}

export function  formatSection(optionsArray) {
    const formattedSections = optionsArray.map(option => {
        const {title} = option;
        const trimTitle = title.length > stringLength ? title.slice(0, stringLength -3) + '...' : title;
        return {
            ...option,
            display: `${trimTitle}`
        }
    });
    return formattedSections;
}

export function formatItemOptions(optionsArray) {
    const formattedItemsOptions = optionsArray.map(option => {
        const {name, price} = option;
        const trimName = name.length > stringLength ? name.slice(0, stringLength -3) + '...' : name;

        return ({
            ...option,
            display: `${trimName} $${price ? price.toFixed(2) : 0.00}`
        })

    });
    return formattedItemsOptions;
}
