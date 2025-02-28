# FacilAuto Keybindings

Userscripts para la aplicación web de FacilAuto que añaden atajos de teclado para algunas pantallas:

- `facilauto-test-keys.js`: cubre la página de test
- `facilauto-block-keys.js`: cubre la página de selección de test (lista)

Los he creado para agilizar mi uso de la aplicación y los comparto por si le pueden resultar útiles a alguien más.

No es una solución completa para la accesibilidad de teclado, el resto de pantallas aún requieren el uso del ratón.

Si añades una página de lista de tests a marcadores (por ejemplo: [Examen por Ordenador B](https://alumno.examentrafico.com/#/test/block/test/exam/174/0)), puedes navegar fácilmente entre estas dos páginas.

## Cómo usar

Con cualquier gestor de userscripts (Greasemonkey, Violentmonkey, Tampermonkey, etc.)

Sigue el proceso de Crear un script nuevo y copia el código de estos scripts.

### Bookmarklet

Alternativamente puedes crear bookmarklets para cada uno de los scripts:

- Accede a [Bookmarklet Maker](https://caiorss.github.io/bookmarklet-maker/).
- Dale un nombre al bookmarklet en el campo 'Title', por ejemplo 'facilauto-test-keys'.
- Copia el código de `facilauto-test-keys.js` en el campo 'Code'.
- Pulsa el botón de 'Generate Bookmarklet'.
- Arrastra el bookmarklet generado a la barra de marcadores de tu navegador.
- Repite el proceso para `facilauto-block-keys.js`.

Cuando estés en la página de FacilAuto, pulsa los bookmarklets y se activarán los atajos.

La activación de los atajos persiste entre página y página siempre que no recargues la página (F5) ni la abandones.

## Asociaciones de teclas

### Página de test

- `A`: opción A
- `S`: opción B
- `D`: opción C
- `J`: Anterior
- `K`: Siguiente
- `L`: Finalizar test
- `Q`: Salir de los diálogos modales
  - diálogos modales: Ayuda, Lámina, Finalizar test, etc.
- `W`: Ayuda
- `E`: Lámina
- `R`: Audioexplicación
- `T`: Videoexplicación
- `Enter`: botón blanco en un diálogo modal
- `Retroceso`: botón rojo en un diálogo modal

### Página de selección de test

- `A`: activar navegación por teclado (**requisito** para el resto)
- `Enter`: acceder al test seleccionado
- `H`: navegar al primer test suspendido
- `J`: navegar al test siguiente
- `K`: navegar al test anterior
- `L`: navegar al primer test no realizado
- `Tab`: navegar al modo de test siguiente
- `Mayus+Tab`: navegar al modo de test anterior

## Desarrollo

[How to edit scripts with your favorite editor? - Violentmonkey](https://violentmonkey.github.io/posts/how-to-edit-scripts-with-your-favorite-editor/)

Servir el proyecto con `$ python -m http.server`

## Licencia

MIT © Víctor González Prieto
