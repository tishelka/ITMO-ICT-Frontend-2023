import style from "./Cart.module.sass";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { ItemData } from "../Main";
import { Item } from "../../components";

export const Cart = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  return (
    <div className={style.cartWrapper}>
      <h1>Cart</h1>
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
    </div>
  );
};
