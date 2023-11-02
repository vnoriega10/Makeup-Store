import { type APIMakeup } from "../types/api";
import { atom, map} from 'nanostores';

export const isCartOpen = atom(false);


export type CartItemDisplayInfo = Pick<APIMakeup, 'id' | 'name' | 'price' | 'image'>;

export const APIMakeups = map<Record<string, APIMakeup>>({});


export function addCartItem ({id, name, price, image}) {
  
    APIMakeups.setKey(id,{
            id, name, price, image,
            description: "",
            status: ""
        }
    );
    
}

