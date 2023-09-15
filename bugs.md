* [X] Empresa - No se pueden añadir sedes a dependencias, no se listan las sedes que se añadirán
* [X] Empresa - No se lista menú de sedes
* [X] Empresa - No se pueden añadir sedes ya agregadas
* [X] Empresa - No se deben añadir dependencias a sedes si ya existen
* [X] Personas - Debe indicarse la sede seleccionada al crear un funcionario
* [X] Personas - No se renderizan registros por orden de agregado
* [X] Personas - Botones actualizar y eliminar no deben verse en vista de actualizacion de funcionario
* [X] Referencias - Buscador de referencias
* [X] Categorías - Mostrar datos de la Categoria cuando se vaya a editar
* [X] Marcas - Mostrar datos de la Marca cuando se vaya a editar
* [X] elementos: IP y mac opcionales
* [X] elementos: Mensajes de seleccion no deben mostrarse sino se ha seleccionado nada
* [X] Certificados: Al buscar nueva persona, no se actualizan datos
* [X] General - Console.log en producción
* [X] General - Mensaje de inicio de sesion debe mostrarse aunque no hayan datos de empresa
* [X] General - No se cierra la sesión al vencerse los tokens
* [X] General - Testear comportamiento con cuentas nuevas y perfiles diferentes a administrador

Bugs corregidos completamente, conteo total - 26 correciones.
------- Correciones nuevas -----

* [X] No se gestionan correctamente los roles desde el panel de administracion de django
* [X] No se envian correos electronicos para operacion con cuentas de usuario
* [X] Corrección de elementos en interfaz Empresa (botones, animaciónes, etc)
* [ ] Corrección de elementos en interfaz Sedes (botones, animaciónes, etc)
* [ ] Corrección de elementos en interfaz Dependencias (botones, animaciónes, etc)
* [ ] Corrección de elementos en interfaz Gestion de sedes por dependencias (botones, animaciónes, etc)
* [ ] Corrección de elementos en interfaz Inventario (botones, animaciónes, etc)
* [ ] Corrección de elementos en interfaz Marcas (botones, animaciónes, etc)
* [ ] Corrección de elementos en interfaz Categorias (botones, animaciónes, etc)
* [ ] Corrección de elementos en interfaz Referencias (botones, animaciónes, etc)
* [ ] Corrección de elementos en interfaz Elementos (botones, animaciónes, etc)
* [ ] Corrección de elementos en interfaz Asignaciones (botones, animaciónes, etc)
* [ ] Corrección de elementos en interfaz Traspazos (botones, animaciónes, etc)
* [ ] Corrección de elementos en interfaz Mantenimientos (botones, animaciónes, etc)
* [ ] Corrección de elementos en interfaz Bajas (botones, animaciónes, etc)
* [ ] Corrección de elementos en interfaz Certificaciones (botones, animaciónes, etc)

URL para pruebas en producción:

https://stocket-production.up.railway.app/

OBS. Verificar si dockerfile puede cohexistir con procfile en railway. [NO, debe eliminarse al deploy
Configuracion Procfile
web: gunicorn core.wsgi --log-file -

configuracion de base de datos para railway (.env file)
#Database config
DB_USER='postgres'
DB_PASSWORD='VyUDbrjr0QwmHYvGQLSl'
DB_NAME='railway'
DB_HOST='containers-us-west-102.railway.app'
DB_PORT='6276'
