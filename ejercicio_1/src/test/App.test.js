import App from "../components/App";
import {render, screen} from "@testing-library/react"

describe("Tests componente App", ()=>{

    test("Buscar la palabra React ", ()=>{
        // preparacion
        render(<App/>)

        //actuacion
        const arrayReact = screen.getAllByText(/react/i) 

        //asercion
        expect(arrayReact.length).toBe(1)

    })

})