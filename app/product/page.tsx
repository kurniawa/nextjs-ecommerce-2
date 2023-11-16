import ProductCard from "@/app/components/ProductCard";
import prisma from "@/app/lib/prisma";
import Image from 'next/image';
import Link from 'next/link';

const Product = async () => {
    const products = await prisma.product.findMany({
        orderBy: {id:'desc'}
    });
    // console.log(products);
    return ( <div>
        <h1>Product Page</h1>
        <Link href={'/product/add'}>
            <button className="btn btn-accent">add new product</button>
        </Link>
        <div className="hero rounded-xl bg-base-200">
            <div className="hero-content flex-col lg:flex-row">
                <Image src={products[1].imageURL} alt={products[1].name} width={800} height={400} className="w-full max-w-sm rounded-lg shadow-2xl" priority />
                <div className="">
                    <h1 className="text-5xl font-bold">{products[1].name}</h1>
                    <p className="py-6">{products[1].description}</p>
                    <Link href={`/product/${products[1].id}`} className="btn btn-primary">Check it out</Link>
                </div>
            </div>
        </div>
        <div className="my-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {/* {products.slice(1).map(product => (
            <ProductCard key={product.id} product={product}/>
        ))} */}
        {products.map((product, index) => {
            if (index!==1) {
                return (
                    <ProductCard key={product.id} product={product}/>
                )
            }
        })};
        </div>
    </div> );
}
 
export default Product;