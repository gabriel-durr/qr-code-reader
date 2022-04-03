const data = [
    {
        name: "Cafe",
        price: "R$ 10,00",
        code: "7896048301215",
        image: "https://i.imgur.com/YzrJJtg.jpg",
    },

    {
        name: "Nescau",
        price: "R$ 8,00",
        code: "7891000352175",
        image: "https://i.imgur.com/DfuxkLR.jpg",
    },
    {
        name: "AvonCare",
        price: "R$ 20,00",
        code: "7909189224081",
        image: "https://i.imgur.com/yGR8pUN.jpg",
    },

    {
        name: "Esmalte",
        price: "R$ 17,00",
        code: "7898196101075",
        image: "https://i.imgur.com/qjW5aKd.jpg",
    },
];

export interface IProduct {
    name: string;
    price: string;
    code: string;
    image: string;
}

export function findProductByCode(code: string) {
    return data.find((product) => product.code === code);
}
