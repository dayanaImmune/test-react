import { render, screen, within} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AnimalFact from "../components/AnimalFact";
import {expect, vi} from "vitest"

describe("COmponente AnimalFact ", ()=>{

    test("Muestra los datos cuando la api respondio correctamente" , async()=>{

        vi.spyOn(global,"fetch").mockResolvedValue({
            ok:true,
            json: async ()=>({
                fact:"dato curioso de los gatos",length:200
            })
        })
        render (<AnimalFact/>)
        expect(screen.getByText("Cargando dato...")).toBeInTheDocument()

        expect( await screen.findByText("dato curioso de los gatos")).toBeInTheDocument()
        expect(screen.queryByText("Cargando dato...")).not.toBeInTheDocument()
    })
    test("Muestra un error si la api falla" , async()=>{

        vi.spyOn(global,"fetch").mockResolvedValue({
            ok:false,
            json: async ()=>({})
        })
        render (<AnimalFact/>)
        expect(screen.getByText("Cargando dato...")).toBeInTheDocument()
        expect( await screen.findByText("Error al cargar el dato animal")).toBeInTheDocument()
        
    })
    test("Al fallar no aparecen los datos" , async()=>{

        vi.spyOn(global,"fetch").mockRejectedValue(new Error("No se pudo cargar el dato animal"))
        render (<AnimalFact/>)
        expect(await screen.findByRole("alert")).toHaveTextContent("Error al cargar el dato animal")

        expect(screen.queryByTestId("animal-fact")).not.toBeInTheDocument()
    })
})