import style from "./Cart.module.sass";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { ItemData } from "../Main";
import { Item } from "../../components";
import axios from "axios";

export const Cart = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalAmount = cartItems.reduce((total, item) => total + item.price, 0);

  const handleOrder = async () => {
    const orderData = {
      items: cartItems.map((item) => item.title),
      totalAmount,
    };
    try {
      await axios.post("http://localhost:3000/orders", orderData);
      alert("Order placed successfully:");
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <div className={style.cartWrapper}>
      <h1 className={style.cartTitle}>Cart</h1>
      <div className={style.mainContent}>
        <div className={style.itemSelection}>
          {cartItems.map((item: ItemData) => {
            const props = {
              id: item.id,
              title: item.title,
              img: item.img,
              price: item.price,
              brand: item.brand,
            };
            return <Item {...props} />;
          })}
        </div>
        <div className={style.total}>
          <h1>Total: {totalAmount}$</h1>
          <button onClick={handleOrder}>Order</button>
        </div>
      </div>
    </div>
  );
};
