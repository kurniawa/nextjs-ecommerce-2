// 'use server'

import FormButtonSubmit from "@/app/components/FormButtonSubmit";
import prisma from "@/app/lib/prisma";
import { redirect } from "next/navigation";


export const metadata = {
    title: 'Add Product - Flowmazon'
}

const AddProduct = () => {
    const handleAddProduct = async (form_data: FormData) => {
        'use server'
        // console.log(form_data);
        const name = form_data.get('name')?.toString();
        const description = form_data.get('description')?.toString();
        const imageURL = form_data.get('imageURL')?.toString();
        const price = Number(form_data.get('price') || 0);

        // throw new Error('Bazinga');

        if (!name || !description || !imageURL || !price) {
            throw new Error("Missing required fields!");
            
        }

        await prisma.product.create({data: {name, description, imageURL, price}});

        redirect("/");
    }
    return ( <div>
        <h1 className="text-lg mb-3 font-bold">Add Product</h1>
        <form action={handleAddProduct}>
            <input type="text" required name="name" id="name" placeholder="Name" className="mb-3 w-full input-bordered input"/>
            <textarea required name="description" id="description" cols={30} rows={10} placeholder="description" className="textarea textarea-bordered mb-3 w-full"></textarea>
            <input type="url" required name="imageURL" id="imageURL" placeholder="Image URL" className="mb-3 w-full input-bordered input"/>
            <input type="number" required name="price" id="price" placeholder="Price" className="mb-3 w-full input-bordered input"/>
            <FormButtonSubmit className="btn btn-primary">add product</FormButtonSubmit>
        </form>
        <div></div>
    </div> );
}
 
export default AddProduct;