import React from "react";
import { Provider } from "react-redux";
import "@testing-library/jest-dom";

import { mount } from "enzyme";
import configureStore from "redux-mock-store";
import "./../setupTest";
import * as actions from "./redux/products/products.actions";
import reducer from "./redux/products/products.reducer";
import ProductsActionTypes from "./redux/products/products.types";
import FloatCart from "./components/FloatCart";
import ProductDetailPage from "./pages/ProductDetail";
import CheckoutPage from "./pages/Checkout";

describe("ACTIONS", () => {
  it("should create an action with correct type", () => {
    const expectedAction = {
      type: "App/Products/GET_PRODUCTS_LIST_START",
    };
    expect(actions.getProductsListStart()).toEqual(expectedAction);
  });
});

describe("REDUCER", () => {
  it("should return the initial state", () => {
    expect(
      reducer(undefined, {
        items: false,
        isItemsLoading: false,
        itemsErrorMessage: "",
      })
    ).toEqual({
      items: false,
      isItemsLoading: false,
      itemsErrorMessage: "",
    });
  });
  it('should handle "GET_PRODUCTS_LIST_START" action', () => {
    expect(
      reducer({}, { type: ProductsActionTypes.GET_PRODUCTS_LIST_START })
    ).toHaveProperty("isItemsLoading");
  });
});

describe("RENDER", () => {
  let mockStore;
  let wrapper;
  let store;
  beforeEach(() => {
    mockStore = configureStore();
    store = mockStore({
      cart: {
        cartItems: [
          {
            id: 1,
            name: "Philips hue bulb",
            brand: "Philips",
            price: "500",
            available: true,
            weight: 0.2,
            options: {
              color: "white",
              power: 6.5,
            },
            quantity: 2,
          },
        ],
        isAdded: false,
        isRemoved: false,
      },
    });

    wrapper = mount(
      <Provider store={store}>
        <FloatCart />
      </Provider>
    );
  });

  it("should increment product on checkout page", () => {
    const button = wrapper.findWhere((node) => {
      return node.type() === "button" && node.text() === "+";
    });
    expect(button).toHaveLength(1);
    button.simulate("click");
    const delay = (time) => new Promise((resolve) => setTimeout(resolve, time));
    delay(5000).then(() => {
      expect(wrapper.find(".bag__quantity").text()).toEqual("3");
    });
  });
  it("should decrement product on checkout page", () => {
    const button = wrapper.findWhere((node) => {
      return node.type() === "button" && node.text() === "-";
    });
    expect(button).toHaveLength(1);
    button.simulate("click");
    const delay = (time) => new Promise((resolve) => setTimeout(resolve, time));
    delay(5000).then(() => {
      expect(wrapper.find(".bag__quantity").text()).toEqual("1");
    });
  });

  it("should render correctly checkout page", () => {
    const mockStore = configureStore();
    const store = mockStore({
      cart: {
        cartItems: [],
        isAdded: false,
        isRemoved: false,
      },
    });
    const wrapper = mount(
      <Provider store={store}>
        <CheckoutPage />
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
