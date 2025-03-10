# FacilAuto Keybindings

Userscript para la aplicación web de FacilAuto que añade navegación por teclado para algunas pantallas:

- la página de test
- la página de selección de test (lista)

Lo he creado para agilizar mi uso de la aplicación y los comparto por si le pueden resultar útiles a alguien más.

No es una solución completa para la accesibilidad de teclado, el resto de pantallas aún requieren el uso del ratón.

Si añades una página de selección de test a marcadores (por ejemplo: [Examen por Ordenador B](https://alumno.examentrafico.com/#/test/block/test/exam/174/0)), puedes navegar fácilmente entre estas dos páginas.

## Cómo usar

### Como userscript

Con cualquier gestor de userscripts (Greasemonkey, Violentmonkey, Tampermonkey, etc.)

Puedes instalarlo [desde Greasy Fork.](https://greasyfork.org/en/scripts/529408-facilauto-keys)

### Como bookmarklet

Alternativamente puedes crear un bookmarklet para el script:

- Accede a [Bookmarklet Maker](https://caiorss.github.io/bookmarklet-maker/).
- Dale un nombre al bookmarklet en el campo 'Title', por ejemplo 'facilauto-keys'.
- Copia el código de `facilauto-keys.js` en el campo 'Code'.
- Pulsa el botón de 'Generate Bookmarklet'.
- Arrastra el bookmarklet generado a la barra de marcadores de tu navegador.

Cuando estés en la página de FacilAuto, pulsa el bookmarklet y se activarán las teclas.

La activación de las teclas persiste entre pantalla y pantalla siempre que no recargues la página (F5) ni la abandones.

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
