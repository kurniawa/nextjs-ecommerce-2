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
    return ( <Link href={`./product/${product.id}`} className='card w-full bg-white hover:shadow-xl transition-shadow'>
        <div className='card-body'>
            <h2 className='card-title'>{product.name}</h2>
            <p>{product.description}</p>
            <div>{formatPrice(product.price)}</div>
            {/* <Image src={imageURL} alt='' width={20} height={15}/> */}
            <img src={product.imageURL} alt="" />
        </div>
    </Link> );
}
 
export default ProductCard;