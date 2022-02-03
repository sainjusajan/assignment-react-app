import { useState } from 'react';
import crossIcon from './../../../assets/sprite_delete-icon.png'

const CartProduct = (props) => {

  const [isMouseOver, setIsMouseOver] = useState(false);
  

  const handleMouseOver = () => {
    setIsMouseOver(true);
  };

  const handleMouseOut = () => {
    setIsMouseOver(false);
  };

  
  const classes = ['shelf-item'];
  
  if (!!isMouseOver) {
    classes.push('shelf-item--mouseover');
  }
  
  return (
    <div className={classes.join(' ')}>
        <div
          style={{backgroundImage: `url(${crossIcon})`}}
          className="shelf-item__del"
          onMouseOver={() => handleMouseOver()}
          onMouseOut={() => handleMouseOut()}
          onClick={() => props.removeProduct(props.product)}
          />
    
        <div className="shelf-item__details">
          <p className="title">{props.product.name}</p>
          <p className="desc">
            {`${props.product.brand} | ${props.product.weight} Kg`} <br />
            Quantity: {props.product.quantity}
          </p>
        </div>
        <div className="shelf-item__price">
          <p>€ {props.product.price} </p>
          <div className='q-controls'>
            <button onClick={() => props.decrementCartItem(props.product)}>-</button>
            <button onClick={() => props.incrementCartItem(props.product)}>+</button>
          </div>
        </div>

      </div>
    );
  }

export default CartProduct;
