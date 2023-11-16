import { getCart } from "../lib/cart";
import CartEntry from "./CartEntry";
import { setProductQuantity } from "./action";

export const metadata = {
    title: "Your Cart - Flowmazon"
}

const Cart = async () => {
    const cart = await getCart();
    // console.log(cart);
    return ( 
        <div>
            <h1 className="text-3xl font bold mb-6">Shopping Cart</h1>
            {cart?.CartItem.map((cart_item) => {
                return (
                    <CartEntry setProductQuantity={setProductQuantity} cartItem={cart_item} key={cart_item.id}></CartEntry>
                )
            })}
        </div>
     );
}
 
export default Cart;