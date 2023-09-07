* [X] Empresa - No se pueden añadir sedes a dependencias, no se listan las sedes que se añadirán
* [X] Empresa - No se lista menú de sedes
* [X] Empresa - No se pueden añadir sedes ya agregadas
* [ ] Empresa - No se deben añadir dependencias a sedes si ya existen
* [ ] Personas - Debe indicarse la sede seleccionada al crear un funcionario
* [ ] Personas - No se renderizan registros por orden de agregado
* [ ] Personas - Botones actualizar y eliminar no deben verse en vista de actualizacion
* [ ] Referencias - Buscador de referencias
* [ ] elementos: IP y mac opcionales
* [ ] Certificados: Al buscar nueva persona, no se actualizan datos
* [ ] General - Console.log en producción
* [ ] General - Mensaje de inicio de sesion debe mostrarse aunque no hayan datos de empresa
* [ ] General - No se cierra la sesión al vencerse los tokens

OBS. Verificar si dockerfile puede cohexistir con procfile en railway.
Configuracion Procfile
web: gunicorn core.wsgi --log-file -

configuracion de base de datos para railway (.env file)
#Database config
DB_USER='postgres'
DB_PASSWORD='VyUDbrjr0QwmHYvGQLSl'
DB_NAME='railway'
DB_HOST='containers-us-west-102.railway.app'
DB_PORT='6276'
