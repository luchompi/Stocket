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
* [ ] General - No se cierra la sesión al vencerse los tokens
* [ ] General - Testear comportamiento con cuentas nuevas y perfiles diferentes a administrador

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
