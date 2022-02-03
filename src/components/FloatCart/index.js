import cartIcon from '../../assets/Background.png'
import { connect } from "react-redux";
import {
  selectCartItems,
  selectCartItemsCount,
  selectCartTotal,
} from "../../redux/Cart/cart.selectors";

import { createStructuredSelector } from "reselect";
import CartProduct from "./CartProduct";

import "./style.scss";
import { addItem, clearItemFromCart, removeItem } from "../../redux/Cart/cart.actions";

const FloatCart = ({
  cart,
  cartItemsCount,
  cartItemsTotal,
  onRemoveItemFromCart,
  onIncrementCartItem,
  onDecrementCartItem
}) => {

  const removeProduct = (product) => {
    onRemoveItemFromCart(product)
  };
  const decrementCartItem = (product) => {
    onDecrementCartItem(product)
  };
  const incrementCartItem = (product) => {
    const itm = {...product, quantity: 1};
    onIncrementCartItem(itm);
  };

  const proceedToCheckout = () => {
    alert('Going to checkout!!')
  };

  let classes = ["float-cart"];

  return (
    <div className={classes.join(" ")}>
  

      <div className="float-cart__content">
        <div className="float-cart__header">
          <span className="bag" style={{backgroundImage: `url(${cartIcon})`}}>
            <span className="bag__quantity">{cartItemsCount}</span>
          </span>
          <span className="header-title">Bag</span>
        </div>

        <div className="float-cart__shelf-container">
          {cart.map((p) => {
            return (
              <CartProduct
                product={p}
                removeProduct={removeProduct}
                decrementCartItem={decrementCartItem}
                incrementCartItem={incrementCartItem}
                key={p.id}
              />
            );
          })}
          {!cart.length && (
            <p className="shelf-empty">
              Add some products in the bag <br />
            </p>
          )}
        </div>

        <div className="float-cart__footer">
          <div className="sub">TOTAL</div>
          <div className="sub-price">
            <p className="sub-price__val">€ {cartItemsTotal}</p>
          </div>
          <div onClick={() => proceedToCheckout()} className="buy-btn">
            Checkout
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  cart: selectCartItems,
  cartItemsTotal: selectCartTotal,
  cartItemsCount: selectCartItemsCount,
});

const mapDispatchToProps = (dispatch) => ({
  onRemoveItemFromCart: (product) => dispatch(clearItemFromCart(product)),
  onDecrementCartItem: (product) => dispatch(removeItem(product)),
  onIncrementCartItem: (product) => dispatch(addItem(product))
});

export default connect(mapStateToProps, mapDispatchToProps)(FloatCart);
