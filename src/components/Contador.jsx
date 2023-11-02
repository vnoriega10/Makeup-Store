import { useState } from "react"

export function Contador(){
    const [contador, setContador] = useState(1)

    if(contador < 1){
        setContador(1)
    }

    return (
        <>
        <div className="flex text-center">
            <button className="border border-zinc-400 pb-1 text-sm justify-center w-5 h-5" onClick={() => setContador(contador => contador - 1)}>-</button>
            <span className="text-zinc-800 text-sm px-2 font-semibold mt-[1px] justify-center ">{contador}</span>
            <button className="border border-zinc-400 pb-1 text-sm justify-center w-5 h-5" onClick={() => setContador(contador => contador + 1)}>+</button>
        </div>
        </>
    )
}
