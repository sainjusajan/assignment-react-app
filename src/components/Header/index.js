import { Link } from "react-router-dom";
import NavCart from "../NavCart";

import {
  selectCartItems,
  selectCartItemsCount,
  selectCartTotal,
} from "../../redux/Cart/cart.selectors";

import { createStructuredSelector } from "reselect";

import "./style.scss";
import { connect } from "react-redux";

const Header = ({cart, cartItemsTotal, cartItemsCount}) => {
  return (
    <>
      <header>
        <nav>
          <ul className="nav">
            <li>
              <Link to={"/"}>
                <span className="">Home</span>
              </Link>
            </li>
            <li>
              <Link to={"/checkout"}>
                {/* <span className="">Checkout</span> */}
                <NavCart count={cartItemsCount}/>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  cart: selectCartItems,
  cartItemsTotal: selectCartTotal,
  cartItemsCount: selectCartItemsCount,
});


export default connect(mapStateToProps)(Header);
