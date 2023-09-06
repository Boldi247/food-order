import React from "react";

const cartContext = React.createContext({
    items: [],
    totalAmount: 0,
    addItem: (item) => { },
    removeItem: (id) => { },
    addOneItem: (item) => { },
    clearCart: () => { }
});

export default cartContext;