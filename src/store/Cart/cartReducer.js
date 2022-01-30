export const initialState = {
  clientKey: null,
  totalItem: 0,
  items: [],
  subtotal: 0,
  tempItems: [],
};

const cartReducer = (state = initialState, action) => {
  if (action.type === 'SET_CLIENT_KEY') {
    return {
      ...state,
      clientKey: action.clientKey,
    };
  }
  if (action.type === 'TEMPORARY') {
    const existingCartItemIndex = state.tempItems.findIndex((item) => item.id === action.data.id);
    const existingCartItem = state.tempItems[existingCartItemIndex];
    let updatedItems;
    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        quantity: action.data.quantity,
      };
      updatedItems = [...state.tempItems];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.tempItems.concat(action.data);
    }
    return {
      ...state,
      tempItems: updatedItems,
    };
  }
  if (action.type === 'UPDATE') {
    return {
      ...state,
      totalItem: action.data.totalItems || 0,
      items: action.data.items || [],
      subtotal: action.data.subtotal || 0,
    };
  }
  if (action.type === 'RESET_TEMP') {
    return {
      ...state,
      tempItems: [],
    };
  }
  return state;
};

export default cartReducer;
