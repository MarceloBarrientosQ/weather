# Pasos

1. Eliminacion de archivos innecesarios y limpieza de codigo.
- components
- archivos en assets
- limpieza en el app


2. Colocar las dependencias necesarias en el package.json y eliminar las que no se usan, en el package.json y en el vite.config.js
`Comprobar la version del json server json-server --version, si no es la actual: npm uninstall -g json-server, y para instalar la actual npm install -g json-server@0.17.4 `


3. Crear el archivo server, con la configuracion de json-server y los archivos db.json y routes.json


4. Crear el archivo .env.development y .env.production con las variables de entorno necesarias para la aplicacion.


5. En el src, crear las carpetas y archivos necesarios para la aplicacion, como:
- locales
- router
- i18n
- pinia
- styles
- shared

6. En el archivo shared crear los componentes necesarios para la aplicacion, como:
- Infrastructure. En el base endpoint, solo cambia el nombre de la variable de entorno, y en el api service, se hace la llamada a la api con axios y se maneja el error.
- Presentation
