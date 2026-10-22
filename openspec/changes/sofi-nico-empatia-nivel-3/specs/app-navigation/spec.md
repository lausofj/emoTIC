# Delta de Especificación: Navegación de la Aplicación

## MODIFIED Requirements

### Requirement: Desactivación de Progressive Web App y Service Worker
La aplicación SHALL operar como una aplicación web tradicional sin infraestructura PWA ni Service Worker. Los archivos residuales `manifest.webmanifest` y `service-worker.js` SHALL ser eliminados del repositorio, y el sistema SHALL desregistrar programáticamente cualquier Service Worker previamente activo en el navegador del cliente para evitar problemas de almacenamiento en caché persistente.

#### Scenario: Desregistro e inactividad de Service Worker
- **WHEN** un usuario carga o recarga la plataforma emoTIC
- **THEN** el navegador no registra ningún Service Worker, desregistra los existentes si los hubiera y la aplicación no depende de caché de Service Worker
