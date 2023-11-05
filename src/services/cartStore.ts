import { type APIMakeup } from "../types/api";
import { atom, map} from 'nanostores';

export const isCartOpen = atom(false);


export type CartItemDisplayInfo = Pick<APIMakeup, 'id' | 'name' | 'price' | 'image' >;

export const APIMakeups = map<Record<string, APIMakeup>>({});


export function addCartItem ({id, name, price, image, quantity = 1}) {
  
    const item = {
        id,
        name,
        price,
        image,
        description: "",
        status: "",
        quantity
    };
    
    // Guarda el producto en el almacenamiento local
    const storedCartItems = localStorage.getItem('cartItems');
    let cartItems = storedCartItems ? JSON.parse(storedCartItems) : {};
    cartItems[id] = item;
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    
    APIMakeups.setKey(id, item);
    
}

