import Image from 'next/image';
import Link from 'next/link'
import logo from '@/app/assets/logo.png'
import { redirect } from 'next/navigation';
import { getCart } from '../lib/cart';
import ShoppingCartButton from './ShoppingCartButton';

const searchProduct = async (formData: FormData) => {
    'use server'

    const searchQuery = formData.get('searchQuery')?.toString();

    if (searchQuery) {
        redirect('/search?query=' + searchQuery);
    }
}

const Navbar = async () => {
    const cart = await getCart();
    return ( 
        <nav className="bg-base-100">
            <div className="navbar max-w-7xl m-auto flex-col sm:flex-row gap-2">
                <div className="flex-1">
                    <Link href={'/'} className='btn btn-ghost'>
                        <Image src={logo} alt='Flowmazon Logo' width={40} height={40}>
                        </Image>
                        <span className='text-xl'>Flowmazon</span>
                    </Link>
                </div>
                <div className='flex-none gap-2'>
                    <form action={searchProduct}>
                        <div className='form-control'>
                            <input type="text" name='searchQuery' placeholder='Search' className='input input-bordered w-full min-w-[200px]' />
                        </div>
                    </form>
                    <ShoppingCartButton cart={cart}/>
                    <Link href={'/product'} className='btn btn-secondary'>Products</Link>

                </div>
            </div>
        </nav>
     );
}
 
export default Navbar;