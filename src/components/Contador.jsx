
import { useState } from "react"

export function Contador(){
    const [contador, setContador] = useState(0)

    return (
        <>
        <span className="text-black">{contador}</span>
            <button className="border px-4 py-2 text-xl" onClick={() => setContador(contador => contador + 1)}>+</button>
            <button className="border px-4 py-2 text-xl" onClick={() => setContador(contador => contador - 1)}>-</button>
        
        </>
    )
}