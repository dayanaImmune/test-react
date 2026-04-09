from datetime import date


class Libro:
    def __init__(self, titulo, autor, copias):
        if not titulo or not autor:
            raise ValueError("El título y el autor son obligatorios")
        if copias < 0:
            raise ValueError("Las copias no pueden ser negativas")

        self.titulo = titulo
        self.autor = autor
        self.copias = copias

    def disponible(self):
        return self.copias > 0

    def prestar(self):
        if not self.disponible():
            raise ValueError("No hay copias disponibles")
        self.copias -= 1

    def devolver(self):
        self.copias += 1

    def __str__(self):
        return f"{self.titulo} - {self.autor} ({self.copias} copias)"


class Usuario:
    def __init__(self, nombre, email):
        if not nombre or not email:
            raise ValueError("El nombre y el email son obligatorios")

        self.nombre = nombre
        self.email = email

    def __str__(self):
        return f"{self.nombre} <{self.email}>"


class Prestamo:
    def __init__(self, libro, usuario, fecha_prestamo, fecha_devolucion, devuelto=False):
        if fecha_devolucion < fecha_prestamo:
            raise ValueError("La fecha de devolución no puede ser anterior al préstamo")

        self.libro = libro
        self.usuario = usuario
        self.fecha_prestamo = fecha_prestamo
        self.fecha_devolucion = fecha_devolucion
        self.devuelto = devuelto

    def marcar_devuelto(self):
        self.devuelto = True

    def esta_activo(self):
        return not self.devuelto

    def esta_vencido(self, fecha_actual=None):
        if fecha_actual is None:
            fecha_actual = date.today()
        return self.esta_activo() and fecha_actual > self.fecha_devolucion

    def __str__(self):
        estado = "Devuelto" if self.devuelto else "Pendiente"
        return (
            f"Préstamo: {self.libro.titulo} para {self.usuario.nombre} "
            f"({self.fecha_prestamo} -> {self.fecha_devolucion}) [{estado}]"
        )
