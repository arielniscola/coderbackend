const express = require('express');

const app = express();

const PORT = 8080;

const productoController = require('./controllers/producto.controller');

const server = app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto: ${PORT}`);
});
server.on("error", error => console.log(`Error en servidor ${error}`));


app.get('/productos', productoController.getAllProductos);

app.get('/productoRandom', productoController.getProductoAleatorio);

