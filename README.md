# Prototipo de pedidos para restaurante

Esta es una aplicacion web sencilla para tomar pedidos desde celular.

## Como abrirla

1. Abre la carpeta `pedidos-restaurante`.
2. Da doble clic en `index.html`.
3. La aplicacion se abre en el navegador.

## Como probarla

1. Selecciona una mesa.
2. Agrega productos del menu.
3. Elige variantes cuando el producto las pida.
4. Revisa el resumen y el total.
5. Usa `Quitar` si agregaste algo por error.
6. Usa `Borrar cuenta` para empezar de nuevo.
7. Usa `Enviar a Cocina` para abrir WhatsApp con el mensaje listo.

## Configuracion

La seccion `Configuracion del restaurante` permite cambiar:

- Nombre del restaurante.
- WhatsApp de cocina.
- Numero de mesas.
- Si el total se incluye en WhatsApp.

La configuracion se guarda en el navegador con `localStorage`. Si no hay configuracion guardada, la app usa los valores de prueba.

El WhatsApp predeterminado es un numero ficticio. El dueno debe reemplazarlo desde la seccion `Configuracion del restaurante`.
