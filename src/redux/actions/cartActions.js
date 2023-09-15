export const addToCart = (item) => {
    return {
        type: "ADD_TO_CART",
        payload: item
    }
}

export const incrementQuantity = (item) => {
    return {
        type: "INCREMENT_QUANTITY",
        payload: item,
    }
}

export const decrementQuantity = (item) => {
    return {
        type: "DECREMENT_QUANTITY",
        payload: item,
    }
}

export const addToFavorites = (item) => {
    return {
        type: "ADD_TO_FAVORITES",
        payload: item
    }
}

export const removeToFavorites = (item) => {
    return {
        type: 'REMOVE_TO_FAVORITES',
        payload: item
    }
}