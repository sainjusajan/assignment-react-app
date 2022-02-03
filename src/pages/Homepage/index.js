import { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import {
  selectCartItems,
  selectCartItemsCount,
  selectCartTotal,
} from "../../redux/Cart/cart.selectors";
import { getProductsListStart } from "../../redux/products/products.actions";
import { selectProductsList } from "../../redux/products/products.selectors";
import { createStructuredSelector } from "reselect";

import "./style.scss";

const Homepage = ({ products, onFetchProductsList }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    onFetchProductsList();
  }, [onFetchProductsList]);

  return (
    <>
      <section className="products">
        <div className="container">
          <div className="inner-container">
            <h3 className="title">Products</h3>
            {products.items && (
              <div className="products-wrapper">
                {products.items.map((item) => {
                  return (
                    <div key={item.id} className="product-item">
                      <div className="desc">
                        <h5 className="product-title">{item.name} </h5>
                        <span
                          className={
                            item.available
                              ? "tag available"
                              : "tag available--not"
                          }
                        >
                          {item.available ? "Available" : "Unavailable"}
                        </span>
                        <p className="mt10">
                          Brand: <span> {item.brand}</span>
                        </p>
                        <p>
                          Weight: <span> {item.weight} Kg</span>
                        </p>
                      </div>
                      <div className="price">
                        <p>€ {item.price}</p>

                        {item.available && (
                          <Link to={`/products/${item.id}`}>
                            <button
                              disabled={!item.available}
                              className="css-button-sliding-to-left--green"
                            >
                              View
                            </button>
                          </Link>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

Homepage.prototypes = {
  products: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  onFetchProductsList: PropTypes.func,
  cart: PropTypes.object,
  cartItemsTotal: PropTypes.number,
  cartItemsCount: PropTypes.number,
};

const mapStateToProps = createStructuredSelector({
  products: selectProductsList,
  cart: selectCartItems,
  cartItemsTotal: selectCartTotal,
  cartItemsCount: selectCartItemsCount,
});

const mapDispatchToProps = (dispatch) => ({
  onFetchProductsList: () => dispatch(getProductsListStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
