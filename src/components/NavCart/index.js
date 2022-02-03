

import img from './../../assets/Background.png'

const NavCart = (props) => {
  return (
    <>
      <div className='cart-icon--holder'>
        <img src={img} alt='Cart'/>
        <span>{props.count}</span>
      </div>
    </>
  )
}


export default NavCart