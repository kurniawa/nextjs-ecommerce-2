import { getCart } from "../lib/cart";
import formatPrice from "../lib/format";
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
            {!cart?.CartItem.length && <p>Your cart is empty.</p>}
            <div className="flex flex-col items-end sm:items-center">
                <p className="mb-3 font-bold">
                    Total: {formatPrice(cart?.subtotal || 0)}
                </p>
                <button className="btn btn-primary sm:w-[200px]">Checkout</button>
            </div>
        </div>
     );
}
 
export default Cart;