from datetime import date, timedelta
from models import Libro, Usuario
from service import Biblioteca


biblioteca = Biblioteca()

libro1 = Libro("1984", "George Orwell", 3)
libro2 = Libro("Dune", "Frank Herbert", 2)

usuario1 = Usuario("Ana", "ana@email.com")
usuario2 = Usuario("Luis", "luis@email.com")

biblioteca.agregar_libro(libro1)
biblioteca.agregar_libro(libro2)

biblioteca.agregar_usuario(usuario1)
biblioteca.agregar_usuario(usuario2)

prestamo = biblioteca.registrar_prestamo(
    "1984",
    "ana@email.com",
    date.today(),
    date.today() + timedelta(days=7)
)

print(prestamo)
print("Préstamos activos:")
for p in biblioteca.prestamos_activos():
    print("-", p)
