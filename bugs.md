* [ ] Empresa - No se pueden añadir sedes a dependencias, no se listan las sedes que se añadirán
* [ ] Empresa - No se lista menú de sedes
* [ ] Referencias - Buscador de referencias
* [ ] elementos: IP y mac opcionales

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
