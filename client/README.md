# React + Vite

Este documento tiene como finalidad definir los paquetes y cambios realizados en el cliente web

1. Se ha implementado react
2. Se han instalado los paquetes react, react-router-dom, axios sweetalert2, admin-lte, lordicon, lottie-web
3. Se ha implementado lordicon (https://lordicon.com/)
4. Se ha implementado remix icons ([Remix Icon - Open source icon library](https://remixicon.com/))
5. se ha implementado libreria fbemitter (https://www.youtube.com/watch?v=E1QbP1MWpMc&t=930s)
6. Se ha implementado react-quill para crear plantillas para escritura de texto en pantalla ([react-quill - npm (npmjs.com)](https://www.npmjs.com/package/react-quill))

¿como se usa fbemitter?

para usarlo,

1. Se debe crear la instancia del emitter para solo invocarla una vez (helpers/EventEmitter.js)
2. Creamos el componente hijo, importamos el event emitter y definimos el nombre del metodo que padre debe reconocer para recibir los datos y tambien los datos a enviar (views/profile/components/FormProfile.jsx , el disparador debe contener esto EventEmitter.emit("onSave", data);)
3. El componente padre, debe usar un useEffect para observar los eventos y debe tener esta logica

useEffect(() => {

//onSave es el nombre del emitter definido en la vista, data los valores que viajan de hijo a padre

const onSave = (data) => {

//Logica aquí

console.log(data);

    };

//Observador del listener, le permite al componente saber que está esperando, y que debe hacer apenas se dispare el evento, en este caso, espera "onSave" y se dirije a la funcion onSave dentro del hook

const listener = EventEmitter.addListener("onSave", onSave);

return () => {

//Destructor del evento, así se borra todo al destruir el componente

listener.remove();

    };

  }, []);
