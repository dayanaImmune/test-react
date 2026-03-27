import { useState } from "react"


function Counter() {

    const [count, setCount] = useState(0)

    const handleSuma = () => {
        setCount(count + 1);
    }
    const handleResta = () => {
        setCount(count - 1);
    }
    return (
        <div>
            <h2>Incrementar el contador</h2>
            <button onClick={handleSuma}>Incrementar</button>
            <button onClick={handleResta}>Decrementar</button>
            <p>
                Contador: {count}
            </p>
        </div>
    )
}

export default Counter