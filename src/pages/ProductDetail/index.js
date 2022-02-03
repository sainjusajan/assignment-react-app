import { connect } from "react-redux";
import { getProductsListStart } from "../../redux/products/products.actions";
import PropTypes from 'prop-types'
import "./style.scss";
import { selectProductsList } from "../../redux/products/products.selectors";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import OptionSelector from "../../components/OptionSelector";
import { addItem } from "../../redux/Cart/cart.actions";

const ProductDetailPage = ({
  products,
  onFetchProductsList,
  onAddItemToCart,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    onFetchProductsList();
  }, [onFetchProductsList]);

  const [successMessage, setSuccessMessage] = useState("");
  const [failMessage, setFailMessage] = useState("");

  const handleOptionsSelected = (event, product) => {
    if (product) {
      const options = { ...event };
      delete options.quantity;
      const item = { ...product, options, quantity: event.quantity };
      onAddItemToCart(item);
      showSuccessMessage();
    }
  };


  const showSuccessMessage = () => {
    setSuccessMessage("Added product to the cart");
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };
  const showFailMessage = () => {
    setFailMessage("Select your preference");
    setTimeout(() => {
      setFailMessage("");
    }, 3000);
  };

  const renderProductDetail = (product) => {
    return (
      <>
        <section className="product-detail">
          <div className="container">
            <div className="inner-container">
              <h3 className="title">Product Detail</h3>
              <div className="wrapper">
                <div className="product-item">
                  <div className="flex">
                    <div className="desc">
                      <h5 className="product-title">{product.name} </h5>
                      <span
                        className={
                          product.available
                            ? "tag available"
                            : "tag available--not"
                        }
                      >
                        {product.available ? "Available" : "Unavailable"}
                      </span>
                      <p className="mt10">
                        Brand: <span> {product.brand}</span>
                      </p>
                      <p>
                        Weight: <span> {product.weight} Kg</span>
                      </p>
                    </div>
                    <div className="price">
                      <p>€ {product.price}</p>
                    </div>
                  </div>
                  {product.available && (
                    <div className="product-item--controls">
                      <h4>Controls</h4>

                      <OptionSelector
                        options={product.options}
                        optionsSelected={(e) =>
                          handleOptionsSelected(e, product)
                        }
                        failedToAddCart= {() => showFailMessage()}
                      ></OptionSelector>

                      {successMessage !== "" && (
                        <p className="alert">{successMessage}</p>
                      )}

                      {failMessage !== "" && (
                        <p className="alert-danger">{failMessage}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  };

  const render404 = () => {
    return (
      <>
        <h3>Product not found</h3>
      </>
    );
  };

  let { slug } = useParams();
  if (slug) {
    const product = products.items.find((item) => item.id.toString() === slug);
    if (product) {
      return renderProductDetail(product);
    } else {
      return render404();
    }
  }
};

ProductDetailPage.propTypes = {
  products: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  onFetchProductsList: PropTypes.func,
  onAddItemToCart: PropTypes.func,
}


const mapStateToProps = (state) => {
  return {
    products: selectProductsList(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  onFetchProductsList: () => dispatch(getProductsListStart()),
  onAddItemToCart: (item) => dispatch(addItem(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailPage);
