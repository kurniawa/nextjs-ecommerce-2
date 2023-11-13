import Image from 'next/image'
import Link from 'next/link'

// interface ProductCardProps {
//     name: string,
//     description: string,
//     imageURL: string,
//     price: number,
// }

// const ProductCard = ({name, description, imageURL, price}: ProductCardProps) => {
//     return ( <div>
//         <div>{name}</div>
//         <div>{description}</div>
//         <div>{price}</div>
//         {/* <Image src={imageURL} alt='' width={20} height={15}/> */}
//         <img src={imageURL} alt="" />
//     </div> );
// }

import {Product} from '@prisma/client';
import formatPrice from '../lib/format';

interface ProductCardProps {
    product: Product;
}

const ProductCard = ({product}: ProductCardProps) => {
    const isNew = Date.now() - new Date(product.createdAt).getTime() < 1000 * 60 * 60 * 24 * 7;

    return ( <Link href={`./product/${product.id}`} className='card w-full bg-white hover:shadow-xl transition-shadow'>
        <figure>
            <Image src={product.imageURL} alt={product.name} width={800} height={400} className='h-48 object-cover'/>
        </figure>
        <div className='card-body'>
            <h2 className='card-title'>
                {product.name}
                <div>{isNew && <div className='badge badge-secondary'>NEW</div>}</div>
            </h2>
            <p>{product.description}</p>
            <div><span className='badge'>{formatPrice(product.price)}</span></div>
            {/* <img src={product.imageURL} alt="" /> */}
        </div>
    </Link> );
}
 
export default ProductCard;