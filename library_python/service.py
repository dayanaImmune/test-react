from models import Libro, Usuario, Prestamo


class Biblioteca:
    def __init__(self):
        self.libros = []
        self.usuarios = []
        self.prestamos = []

    def agregar_libro(self, libro):
        if not isinstance(libro, Libro):
            raise TypeError("Debes agregar un objeto Libro")
        self.libros.append(libro)

    def agregar_usuario(self, usuario):
        if not isinstance(usuario, Usuario):
            raise TypeError("Debes agregar un objeto Usuario")
        self.usuarios.append(usuario)

    def buscar_libro(self, titulo):
        for libro in self.libros:
            if libro.titulo == titulo:
                return libro
        return None

    def buscar_usuario(self, email):
        for usuario in self.usuarios:
            if usuario.email == email:
                return usuario
        return None

    def registrar_prestamo(self, titulo, email_usuario, fecha_prestamo, fecha_devolucion):
        libro = self.buscar_libro(titulo)
        if libro is None:
            raise ValueError("Libro no encontrado")

        usuario = self.buscar_usuario(email_usuario)
        if usuario is None:
            raise ValueError("Usuario no encontrado")

        libro.prestar()
        prestamo = Prestamo(libro, usuario, fecha_prestamo, fecha_devolucion)
        self.prestamos.append(prestamo)
        return prestamo

    def devolver_libro(self, titulo, email_usuario):
        for prestamo in self.prestamos:
            if (
                prestamo.libro.titulo == titulo
                and prestamo.usuario.email == email_usuario
                and prestamo.esta_activo()
            ):
                prestamo.marcar_devuelto()
                prestamo.libro.devolver()
                return prestamo

        raise ValueError("No existe un préstamo activo para ese libro y usuario")

    def prestamos_activos(self):
        return [prestamo for prestamo in self.prestamos if prestamo.esta_activo()]

    def prestamos_vencidos(self, fecha_actual):
        return [
            prestamo
            for prestamo in self.prestamos
            if prestamo.esta_vencido(fecha_actual)
        ]
