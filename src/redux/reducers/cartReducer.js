const initialState = {
    cartItems: [],  //to perform operations with items in the cart.
    totalPrice: 0,  //to determine the total amount in the cart.
    favorites: [],  //to store favorites.
}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            const existingItemIndex = state.cartItems.findIndex(item => item.id === action.payload.id);

            //eğer cartItems de aynı eleman varsa olacak işlemler
            if (existingItemIndex !== -1) {
                const updatedCartItems = [...state.cartItems];
                const updatedItem = { ...updatedCartItems[existingItemIndex] };
                updatedItem.quantity++;
                updatedItem.quantityPrice += parseInt(action.payload.price);
                updatedCartItems[existingItemIndex] = updatedItem;

                return {
                    ...state,
                    cartItems: updatedCartItems,
                    totalPrice: state.totalPrice + parseInt(action.payload.price),
                };
            } else {
                //eğer yoksa quantity ve quantityPrince diye yeni veriler ekleniyor.
                return {
                    ...state,
                    cartItems: [...state.cartItems, { ...action.payload, quantity: 1, quantityPrice: parseInt(action.payload.price) }],
                    totalPrice: state.totalPrice + parseInt(action.payload.price),
                };
            }

        case 'INCREMENT_QUANTITY':
            return {
                ...state,
                cartItems: state.cartItems.map(item => {
                    if (item.id === action.payload.id) {
                        return {
                            ...item,
                            quantity: item.quantity + 1,
                            quantityPrice: parseInt(item.quantityPrice) + parseInt(action.payload.price),
                            //miktar 1 artırıp, toplamdan da o itemin prince'si kadar artır.
                        }
                    }
                    return item;
                }),
                totalPrice: state.totalPrice + parseInt(action.payload.price),
            };

        case 'DECREMENT_QUANTITY':
            return {
                ...state,
                cartItems: state.cartItems.map(item => {
                    if (item.id === action.payload.id) {
                        if (item.quantity === 1) {
                            return null;
                        }
                        return {
                            ...item,
                            quantity: item.quantity - 1,
                            quantityPrice: parseInt(item.quantityPrice) - parseInt(action.payload.price)
                            //miktar 1 azaltıp, toplamdan da o itemin prince si kadar azalt
                        }
                    }
                    return item;
                }).filter(Boolean),  //eğer quantity===0 olursa o elemanı eksiltme
                totalPrice: state.totalPrice - parseInt(action.payload.price),
            }

        case 'ADD_TO_FAVORITES':
            return {
                ...state,
                favorites: [...state.favorites, action.payload]  //klasik yeni favori ekleme
            }
        case 'REMOVE_TO_FAVORITES':
            return {
                ...state,
                favorites: state.favorites.filter(item => item.id !== action.payload.id)   //favorilerin içinde varsa ona göre silme
            }
        default:
            return state;
    }
}

export default cartReducer;