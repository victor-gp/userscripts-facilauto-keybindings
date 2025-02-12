# FacilAuto Web - Accesibilidad de teclado

Un bookmarklet para la página de tests de FacilAuto que añade atajos de teclado para algunas acciones comunes.

Lo he creado para agilizar mi uso de la aplicación y lo comparto por si le puede resultar útil a alguien más.

No es una solución completa. Algunas acciones aún requieren el ratón, como por ejemplo moverse por la lista de exámenes.

## Cómo usar

Arrastra el siguiente enlace a tu barra de marcadores:

<a href="javascript:(function()%7B%2F%2F%20Configuration%20object%3A%20Map%20keys%20to%20CSS%20selectors%0Aconst%20keyMap%20%3D%20%7B%0A%20%20%20%20'A'%3A%20'img%5Bsrc%3D%22%2Fstatic%2Fimg%2Ftest%2FA.jpg%22%5D'%2C%0A%20%20%20%20'S'%3A%20'img%5Bsrc%3D%22%2Fstatic%2Fimg%2Ftest%2FB.jpg%22%5D'%2C%0A%20%20%20%20'D'%3A%20'img%5Bsrc%3D%22%2Fstatic%2Fimg%2Ftest%2FC.jpg%22%5D'%2C%0A%20%20%20%20'J'%3A%20'img%5Bsrc%3D%22%2Fstatic%2Fimg%2Ftest%2Fback.png%22%5D'%2C%0A%20%20%20%20'K'%3A%20'img%5Bsrc%3D%22%2Fstatic%2Fimg%2Ftest%2Fnext.png%22%5D'%2C%0A%20%20%20%20'Q'%3A%20'button.help-button-1'%2C%20%2F%2F%20Ayuda%0A%20%20%20%20'W'%3A%20'button.btn-success'%2C%20%2F%2F%20Lamina%0A%20%20%20%20'E'%3A%20'div.sweet-content'%2C%20%2F%2F%20to%20exit%20Ayuda%20-%20nah%20doesn't%20work%0A%20%20%20%20'R'%3A%20'button.btn-danger'%2C%20%2F%2F%20Audioexplicacion%0A%20%20%20%20'T'%3A%20'button.btn-info'%2C%20%2F%2F%20Videoexplicacion%0A%7D%3B%0A%0A%2F%2F%20Function%20to%20simulate%20a%20click%20on%20an%20element%0Afunction%20simulateClick(element)%20%7B%0A%20%20%20%20if%20(element)%20%7B%0A%20%20%20%20%20%20%20%20element.click()%3B%0A%20%20%20%20%7D%0A%7D%0A%0A%2F%2F%20Add%20a%20keydown%20event%20listener%20to%20the%20document%0Adocument.addEventListener('keydown'%2C%20function(event)%20%7B%0A%20%20%20%20const%20key%20%3D%20event.key.toUpperCase()%3B%0A%20%20%20%20if%20(keyMap%5Bkey%5D)%20%7B%0A%20%20%20%20%20%20%20%20const%20element%20%3D%20document.querySelector(keyMap%5Bkey%5D)%3B%0A%20%20%20%20%20%20%20%20simulateClick(element)%3B%0A%20%20%20%20%7D%0A%7D)%3B%0A%0Aalert('Keyboard%20accessibility%20enabled!%20Press%20configured%20keys%20to%20simulate%20clicks.')%3B%7D)()%3B">facilauto-keys</a>

Cuando estés en la página de exámen de FacilAuto, pulsa el bookmarklet y se activarán los atajos.

La activación del bookmarklet persiste entre test y test siempre que no recargues la página (F5).

## Asociaciones de teclas

- `A`: opción A
- `S`: opción B
- `D`: opción C
- `J`: Anterior
- `K`: Siguiente
- `Q`: Ayuda
- `W`: Lámina
- `E`: Salir de Ayuda (no funciona)
- `R`: Audioexplicación
- `T`: Videoexplicación

## Cómo hacer cambios

- Modifica el código en `facilauto-keys.js`.
- Accede a [Bookmarklet Maker](https://caiorss.github.io/bookmarklet-maker/).
- Copia el código en el campo 'Code'.
- Dale un nombre al bookmarklet en el campo 'Title', por ejemplo 'facilauto-keys'.
- Pulsa el botón de 'Generate Bookmarklet'.
- Arrastra el bookmarklet generado a la barra de marcadores de tu navegador.

## Licencia

MIT © Víctor González Prieto
