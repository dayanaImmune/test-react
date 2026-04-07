import { render, screen, within} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App"

describe("test APP, integración", ()=>{
    test("Renderiza los pacientes iniciales", ()=>{
        render(<App/>)
        expect(screen.getByText(/luna/i)).toBeInTheDocument()
        expect(screen.getByTestId("total-pets")).toHaveTextContent("Pacientes registrados: 2")
    })

     test("Añadir una nueva mascota", async ()=>{
        render(<App/>)
        const usuario =  userEvent.setup()
        await usuario.type(screen.getByPlaceholderText("Nombre de la mascota"), "fifi")
        await usuario.type(screen.getByPlaceholderText("Nombre del dueño"), "Anabel")
        await usuario.selectOptions(screen.getByLabelText(/Tipo de animal/i), "Conejo")
        await usuario.click(screen.getByRole("button",{name: /Guardar paciente/i} ))

        expect(screen.getByText(/fifi/i)).toBeInTheDocument()
        expect(screen.getByTestId("total-pets")).toHaveTextContent("Pacientes registrados: 3")
    })

    test("filtrar ignorando mayusculas y minusculas", async()=>{
        render(<App/>)
        const usuario =  userEvent.setup()
        await usuario.type(screen.getByPlaceholderText("Buscar por nombre"), "LUna")
        expect(screen.getByText(/luna/i)).toBeInTheDocument()
        expect(screen.queryByText(/toby/i)).not.toBeInTheDocument() // buscar algo que no está en la pantalla
    })
     test("filtrar por tipo", async()=>{
        render(<App/>)
        const usuario =  userEvent.setup()
        await usuario.selectOptions(screen.getByLabelText("Filtrar por tipo"), "Conejo")
        //expect(screen.getByText(/toby/i)).toBeInTheDocument()
        expect(screen.queryByText(/luna/i)).not.toBeInTheDocument() // buscar algo que no está en la pantalla
    })
    test("Eliminar una mascota", async()=>{
        render(<App/>)
        const usuario =  userEvent.setup()
        const tobyCard =  screen.getByText(/toby/i).closest("[data-testid='pet-card']")
        await usuario.click(within(tobyCard).getByRole("button",{name: /eliminar/i} ))
        expect(screen.queryByText(/toby/i)).not.toBeInTheDocument()
        expect(screen.getByTestId("total-pets")).toHaveTextContent("Pacientes registrados: 1")
        
    })
})