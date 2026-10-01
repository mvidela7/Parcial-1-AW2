import express from 'express';
import rutasAutos from './rutas/rutas.autos.mjs';

const app = express();

const PUERTO = 3000;

//Aca conectamos nuestro Router al servidor
app.use(rutasAutos);

app.listen(PUERTO, () => {
    console.log(`Servidor escuchando en http://localhost:${PUERTO}`);
});
