OBJETIVOS

Los objetivos de este software de gestión son los siguientes:

* Facilitar y optimizar los procesos internos de la empresa, mejorando la eficiencia operativa y reduciendo los tiempos y costos asociados a las tareas administrativas y de gestión.
* Proporcionar una visión integral y en tiempo real de la empresa, permitiendo una toma de decisiones más informada y estratégica en todos los niveles de la organización.
* Mejorar el control y seguimiento de las actividades y recursos de la empresa, garantizando una asignación eficiente de recursos y un seguimiento efectivo de proyectos y metas.
* Centralizar la información y fomentar la colaboración entre los departamentos y empleados, promoviendo una comunicación fluida y un acceso rápido y seguro a la información relevante.
* Brindar una solución adaptable y escalable, capaz de crecer y adaptarse a medida que la empresa evolucione y se expanda, teniendo en cuenta el incremento de registros y la necesidad de gestionar mayores volúmenes de información.

Disclaimer: para las pruebas del proyecto, solo es necesario usar docker.
ejecutar dentro de la raíz del proyect docker-compose up y el sistema automaticamente instala las dependencias y ejecuta las rutinas para su funcionamiento.
credenciales predeterminadas: usuario: root password: root123

OBS. si desea registrar un nuevo usuario, considere hacerlo desde la ip de django: 127.0.0.1:8000 en vista de que, las validaciones solo funcionan en ese puerto, una vez validada la cuenta, puede utilizar la ip 127.0.0.1:5173

Cambios:

Ver. 0.1.0.0

1. Se ha configurado a django con la base de datos, soporte de api de rest_framework y soporte para variables de entorno en archivo .env dentro de la configuracion del servidor.
   Hasta el momento, no se encuentra habilitada ninguna opcion para manipulacion de registro e inicio de seisón
2. Se ha configurado vuejs con los paquetes para el desarrollo de la interfaz. Se ha añadido axios, bootstrap y sus respectivos iconos, sweetalert2 y html2pdf para el manejo de las funciones futuras.

Ver. 0.2.0.0

1. Se ha creado modelo, serializador y rutas para el perfil de usuario. Ahora, el perfil de usuario se representa con estos datos:
   * email
   * username
   * first_name
   * last_name
   * phone
   * city
   * address
   * uid (representa número de documento de usuario)
2. Se han creado las vistas en vuejs, ahora se puede administrar el perfil de usuario y se han añadido animaciones de carga.
3. Se han añadido los estaticos de vuejs en django, ahora el backend en el puerto 8000 Puede mostrar la representacion de las vistas

Ver. 0.3.0.0

1. Se ha creado la representación y apis de Empresa:
   * Se ha creado el modelo de empresa con sus respectivas dependencias débiles (Sedes, Depedencias, sede por dependencia):
     * Tabla Empresa incluye:
       * NIT
       * nombre
       * direccion
       * telefono
       * correo
       * descripcion [opcional]
       * url [opcional]
     * Tabla Sedes incluye:
       * nombre
       * direccion
       * telefono
       * correo
       * descripcion [opcional]
       * empresa_id
     * Tabla dependencias incluye
       * nombre
       * descripcion
     * Tabla Sede por Dependencias
       * sede_id
       * dependencia_id

OBS: Se está construyendo las dependencias y se deben asociar sedes a dependencias.
