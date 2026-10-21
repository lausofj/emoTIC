# Tareas

## 1. Preparación de Recursos Gráficos

- [ ] 1.1 Extraer la figura de la niña con fondo transparente y generar `assets/illustrations/avatar-display-nina.png`
- [ ] 1.2 Componer y generar `assets/illustrations/nina-home.png` con la niña sobre el marco de esquinas redondeadas y degradado suave coral/melocotón (120 × 120 px)

## 2. Actualización de Código

- [ ] 2.1 Actualizar el botón `#btn-avatar-nina` en `index.html` para enlazar a `assets/illustrations/nina-home.png`
- [ ] 2.2 Actualizar el manejador de selección de avatar en `js/app.js` para asignar `assets/illustrations/avatar-display-nina.png`
- [ ] 2.3 Actualizar `service-worker.js` agregando los nuevos archivos PNG y aumentando la versión de caché a `emotic-v17`

## 3. Verificación

- [ ] 3.1 Verificar que la pantalla de inicio renderice nítidamente la tarjeta de la niña en el selector de avatar
- [ ] 3.2 Probar la interacción de selección para confirmar que el cuaderno actualiza el avatar de la niña sin distorsión
