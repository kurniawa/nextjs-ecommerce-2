import prisma from '@/app/lib/prisma';
import {notFound} from 'next/navigation';
import Image from 'next/image'
import {Product} from '@prisma/client';
import PriceTag from '@/app/components/PriceTag';
import { Metadata } from 'next';
import { cache } from 'react';
import AddToCartButton from './AddToCartButton';
import { incrementProductQuatity } from './action';

interface ProductDetailProps {
    params: {id: string}
}

// const generateMetaData:Promise<Metadata> = () => {}

const getProduct = cache(async (id:string) => {
    const product = await prisma.product.findUnique({
        where: {id}
    });
    // console.log(product);
    if (!product) {
        notFound()
    }

    return product;
});

export async function generateMetaData({params: {id}}:ProductDetailProps):Promise<Metadata> {
    const product = await getProduct(id);
    
    return {
        title: product.name + " - Flowmazon",
        description: product.description,
        openGraph: {
            images: [{url: product.imageURL}]
        }
    }
}

const ProductDetail:React.FC<ProductDetailProps> = async ({params: {id}}) => {
    // console.log(id);
    // const product = await prisma.product.findUnique({
    //     where: {id}
    // });
    // // console.log(product);
    // if (!product) {
    //     notFound()
    // }
    const product = await getProduct(id);
    return ( 
        <div className='flex flex-col lg:flex-row gap-5 lg:items-center'>
            <Image 
                src={product.imageURL} 
                alt={product.name} 
                width={500} 
                height={500}
                className='rounded-lg'
                priority // artinya image ini tidak akan tertutup oleh element lain
            />
            <div>
                <h1 className='text-5xl font-bold'>{product.name}</h1>
                <PriceTag price={product.price} className='mt-4 badge-accent font-bold' />
                <p className='py-6'>{product.description}</p>
                <AddToCartButton productId={product.id} incrementProductQuantity={incrementProductQuatity}></AddToCartButton>
            </div>
        </div> 
    );
}
 
export default ProductDetail;