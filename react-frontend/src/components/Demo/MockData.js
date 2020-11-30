// hardcoded image will cause linting errors
// noinspection SpellCheckingInspection
const image = 'data:image/jpeg;base64,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';

export function getMockItem(int) {
    const random = (Math.floor(Math.random() * 100)) / 10;
    const item = {
        id: 'stringId' + int,
        name: 'Potato Skins' + int,
        description: 'This is the description of potato skins that is customizable ' + int,
        internalDescription: 'This is a description that will not be used ' + int,
        price: 12.34 + random,
        ordinal: int,
        options: [],
    }
    if (random * 10 % 2 === 1) {
        item.image = image;
    }
    return item;
}

export function getMockOption(int) {
    return {
        id: int,
        name: 'Bacon' + int,
        description: 'description' + int,
        internalDescription: 'test' + int,
        price: 0.50 + int,
    }
}

export function getMockSection(index, itemCount) {
    const items = []
    const random = Math.floor(Math.random() * 100000) // for pseudo unique ids
    for (let i = 0; i < itemCount; i++) {
        const options = [];
        for (let j = 0; j < i; j++) {
            options.push(getMockOption(j));
        }

        items.push({...getMockItem(i + random), options: options});
    }

    const section = {
        id: 'stringId' + index,
        title: 'Mock section ' + index,
        description: `description Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ac ante lectus. Cras ex sapien, malesuada et lectus et, imperdiet faucibus mi. Nam sodales rutrum augue in ullamcorper. `,
        internalDescription: 'Internal description for section ' + index,
        updated: "Mon Nov 16 21:09:29 EST 2020", // may change with implementation
        items,
        ordinal: index,
    }
    if (random % 2 === 1) {
        section.image = image;
    }
    return section;
}

export function getMockMenu(sectionCount) {

    const sections = []

    for (let i = 0; i < sectionCount; i++) {
        sections.push(getMockSection(i, 5));
    }

    return {
        id: 'menuId',
        restaurantIds: [],
        title: "Welcome to Here",
        image,
        sections
    }
}
