import { render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FilterBar from "../components/FilterBar"
import { expect } from "vitest";


describe("FilterBar tests", ()=>{

    test("Escribir en el input de buscar", async()=>{
        const setSearch = vi.fn()
        const usuario = userEvent.setup()
        render(
        <FilterBar
        search=""
        setSearch={setSearch}
        filterType="Todos"
        setFilterType={()=>{}}
        onlyUrgent={false}
        setOnlyUrgent={()=>{}}
      />)
      await usuario.type(screen.getByPlaceholderText("Buscar por nombre"),"Luna")
      expect(setSearch).toHaveBeenCalled()
    })

     test("Filtrar con el checkbox solo los urgentes", async()=>{
        const setOnlyUrgent = vi.fn()
        const usuario = userEvent.setup()
        render(
        <FilterBar
        search=""
        setSearch={()=>{}}
        filterType="Todos"
        setFilterType={()=>{}}
        onlyUrgent={false}
        setOnlyUrgent={setOnlyUrgent}
      />)
      await usuario.click(screen.getByLabelText("Mostrar solo urgentes"))
      expect(setOnlyUrgent).toHaveBeenCalledWith(true)
      expect(setOnlyUrgent).toHaveBeenCalledTimes(1)
      //expect(screen.getByLabelText("Mostrar solo urgentes")).toBeChecked()
    })
})