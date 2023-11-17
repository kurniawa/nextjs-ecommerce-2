'use server'
import { cookies } from "next/dist/client/components/headers";
import prisma from "./prisma";
import {Prisma} from "@prisma/client"

export type CartWithProduct = Prisma.CartGetPayload<{
    include: {CartItem: {include:{product:true}}}
}>

export type CartItemWithProduct = Prisma.CartItemGetPayload<{
    include: {product:true}
}>

export type ShoppingCart = CartWithProduct & {
    size: number,
    subtotal: number,
}

export const getCart = async ():Promise<ShoppingCart | null> => {
    const localCartId = cookies().get('localCartId')?.value;
    let cart = localCartId ?
    await prisma.cart.findUnique({
        where: {id: localCartId},
        include: {CartItem: {include:{product:true}}}
    })
    :
    null

    if (!cart) {
        cart = await prisma.cart.findFirst({
            include: {CartItem: {include:{product:true}}}
        });
    }

    if (!cart) {
        return null;
    }

    return {
        ...cart, // artinya cart ditambah include nya apa aja
        size: cart.CartItem.reduce((accumulator, item) => accumulator + item.quantity, 0),
        subtotal: cart.CartItem.reduce((accumulator, item) => 
            accumulator + item.quantity * item.product.price, 0
        )
    }
}
 
// export default getCart;

export const createCart = async():Promise<ShoppingCart> => {
    const newCart = await prisma.cart.create({
        data: {}
    });

    cookies().set("localCartId", newCart.id)

    return {
        ...newCart,
        CartItem: [],
        size: 0,
        subtotal: 0
    }
}