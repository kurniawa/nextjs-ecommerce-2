import ProductCard from "../components/ProductCard";
import prisma from "../lib/prisma";

const Product = async () => {
    const products = await prisma.product.findMany({
        orderBy: {id:'desc'}
    });
    console.log(products);
    return ( <div>
        <h1>Product Page</h1>
        {products.map(product => (
            <ProductCard key={product.id} product={product}/>
        ))}
        <div></div>
    </div> );
}
 
export default Product;