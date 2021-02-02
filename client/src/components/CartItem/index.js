import React from 'react';
import store from '../../utils/store';
/* import { useStoreContext } from "../../utils/GlobalState"; */
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";

const CartItem = ({ item }) => {

  /* const [, dispatch] = useStoreContext(); */
  const state = store.getState();

  const removeFromCart = item => {
    store.dispatch({
      type: REMOVE_FROM_CART,
      _id: item._id
    });
    store.getState();
    idbPromise('cart', 'delete', { ...item });

  };

  const onChange = (e) => {
    const value = e.target.value;
    if (value === '0') {
      store.dispatch({
        type: REMOVE_FROM_CART,
        _id: item._id
      });
      store.getState();
      idbPromise('cart', 'delete', { ...item });

    } else {
      store.dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: item._id,
        purchaseQuantity: parseInt(value)
      });
      store.getState();
      idbPromise('cart', 'put', { ...item, purchaseQuantity: parseInt(value) });

    }
  }

  return (
    <div className="flex-row">
      <div>
        <img
          src={`/images/${item.image}`}
          alt=""
        />
      </div>
      <div>
        <div>{item.name}, ${item.price}</div>
        <div>
          <span>Qty:</span>
          <input
            type="number"
            placeholder="1"
            value={item.purchaseQuantity}
            onChange={onChange}
          />
          <span
            role="img"
            aria-label="trash"
            onClick={() => removeFromCart(item)}
          >
            🗑️
          </span>
        </div>
      </div>
    </div>
  );
}

export default CartItem;