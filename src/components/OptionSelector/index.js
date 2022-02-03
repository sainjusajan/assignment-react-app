import { useEffect, useState } from "react";

const OptionSelector = (props) => {
  const [initOption, setInitOption] = useState({});
  const [selectedOption, setSelectedOption] = useState({});
  const [quantity, setQuantity] = useState(0);
  const keys = Object.keys(initOption).filter((key) => key !== "quantity");

  const handleInitialSelect = (key, value) => {
    let firstSelection = {
      [key]: value[0],
    };
    const newOption = props.options.find((x) => x[key].includes(value[0]));

    setInitOption({
      ...newOption,
    });
    setSelectedOption({
      ...firstSelection,
    });
    setQuantity(0);
  };

  const handleSecondarySelect = (key, value) => {
    let secondarySelection = {
      [key]: value,
    };
    setSelectedOption((pv) => ({ ...pv, ...secondarySelection }));
  };

  const handleAddToCart = () => {
    if (
      Object.keys(initOption).length ===
        Object.keys(selectedOption).length + 1 &&
      quantity > 0
    ) {
      const option = { ...selectedOption, quantity };
      props.optionsSelected(option);
    } else {
      props.failedToAddCart();
    }
  };

  const incrementItem = () => {
    setQuantity((pv) => {
      if (pv < initOption.quantity) {
        return pv + 1;
      } else {
        return pv;
      }
    });
  };
  const decrementItem = () => {
    setQuantity((pv) => {
      if (pv > 0) {
        return pv - 1;
      } else {
        return pv;
      }
    });
  };

  useEffect(() => {
    setInitOption({ ...props.options[0] });
  }, []);

  return (
    <div>
      <p>Select {keys[0]}</p>
      {props.options.map((opt, index) => {
        return (
          <button
            className="mr10 select-btn"
            onClick={() => handleInitialSelect(keys[0], opt[keys[0]])}
            key={`main-selector-${index}`}
          >
            {opt[keys[0]]}
          </button>
        );
      })}

      {Object.keys(initOption).map((key, index) => {
        if (index > 0 && index < keys.length) {
          return (
            <div key={`main-wala-div-${index}`}>
              <p>Select {key}</p>

              {initOption[keys[index]].map((val, idx) => {
                return (
                  <button
                    key={`second-selector-${idx}`}
                    className="mr10 select-btn"
                    onClick={() =>
                      handleSecondarySelect(
                        keys[index],
                        initOption[keys[index]][idx]
                      )
                    }
                  >
                    {val}
                  </button>
                );
              })}
            </div>
          );
        }
      })}
      <div className="quantity">
        <p>Quantity</p>
        <div>
          <button onClick={() => decrementItem()}>- </button>
          <input readOnly className="inputne" value={quantity} />
          <button onClick={() => incrementItem()}>+</button>
        </div>
      </div>

      <p className="mt25">Your Choice</p>
      {Object.keys(selectedOption).map((key, index) => {
        return (
          <p
            key={`my-choinces-${index}`}
          >{`${key} : ${selectedOption[key]}`}</p>
        );
      })}
      {quantity > 0 ? <p>Quantity: {quantity}</p> : null}

      <div className="add-to--cart">
        <button
          onClick={handleAddToCart}
          className="css-button-sliding-to-left--green"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default OptionSelector;
