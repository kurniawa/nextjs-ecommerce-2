'use client'
import { CiShoppingCart } from "react-icons/ci";
import { IconContext } from "react-icons";
import styles from './styles.module.css'
import prisma from "@/app/lib/prisma";
import { useState, useTransition } from "react";
import { incrementProductQuatity } from "./action";

interface AddToCartButtonProps {
    productId: string,
    incrementProductQuantity: (productId:string) => Promise<void>
}

const AddToCartButton = ({productId}:AddToCartButtonProps) => {
    const [isPending, startTransition] = useTransition();
    const [success, setSuccess] = useState(false);

    const handleAddToCart = () => {
        setSuccess(false);
        startTransition(async () => {
            await incrementProductQuatity(productId);
            setSuccess(true);
        });
    }
    return ( 
        <div className="flex items-center gap-2">
            <button className="btn btn-primary" onClick={handleAddToCart}>
                add to cart
                <IconContext.Provider value={{ size: '1.5em', className: styles.stroke_custom }}>
                <div>
                    <CiShoppingCart />
                </div>
                </IconContext.Provider>
            </button>
            {isPending && <span className="loading loading-spinner loading-md"></span>}
            {!isPending && success && <span className="text-success">Added to Cart!</span>}
        </div>
     );
}
 
export default AddToCartButton;