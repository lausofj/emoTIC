# Spec Delta: app-navigation

## ADDED Requirements

### Requirement: Acceso docente mediante formulario de credenciales
El botón de acceso al modo «Docente» en el encabezado superior SHALL activar exclusivamente un modal de inicio de sesión seguro con campos para nombre de usuario y contraseña, eliminando cualquier verificación o reto basado en sumas u operaciones matemáticas.

#### Scenario: Apertura de modal de autenticación docente
- **WHEN** un usuario hace clic en el botón «Docente» del encabezado
- **THEN** la interfaz presenta el modal de autenticación solicitando usuario y contraseña sin requerir operaciones aritméticas

#### Scenario: Cierre de sesión y protección de navegación
- **WHEN** un docente autenticado activa la opción de cerrar sesión dentro del panel docente
- **THEN** la aplicación invalida y elimina el token de sesión local y redirige a la pantalla de bienvenida restringiendo el acceso inmediato
