'use server'

import { revalidatePath } from "next/cache"
import prisma from "../lib/prisma"
import NotFoundPage from "../not-found"

export const setProductQuantity = async (cartItemId:string, quantity:number) => {
    const cartItem = await prisma.cartItem.findUnique({
        where: {id:cartItemId}
    })

    if (!cartItem) {
        NotFoundPage()
    }

    const itemInCart = await prisma.cart.findUnique({
        where: {id:cartItem?.cartId}
    })

    if (!itemInCart) {
        NotFoundPage();
    }

    if (quantity === 0) {
        await prisma.cartItem.delete({
            where:{id:cartItemId}
        });
    } else {
        await prisma.cartItem.update({
            where:{id:cartItemId},
            data: {quantity}
        })
    }

    revalidatePath('/cart')
}