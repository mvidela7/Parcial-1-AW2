import { readFile } from 'fs/promises';
import procedimiento from '../utilidades/procedimiento.autos.mjs';

//Controlador para manejar las rutas relacionadas con los autos
async function obtenerAutos(req, res) {
    try {
        const datos = await readFile('./datos/autos.json');

        const autos = JSON.parse(datos);

        return res.status(200).json(autos);
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            mensaje: 'No se pudieron obtener los autos'
        });
    }
}

//Controlador para manejar la ruta de obtener un auto por su ID
async function obtenerAuto(req, res) {
    try {
        const { id } = req.params;

        const datos = await readFile('./datos/autos.json');

        const autos = JSON.parse(datos);
        
        //Convertimos los valores a números para comparar correctamente los ID
        const auto = autos.find((auto) => {
            return parseInt(id) === parseInt(auto.id);
        });

        // Verificamos si el auto fue encontrado
        // Si no existe, devolvemos el código 404
        if (!auto) {
            return res.status(404).json({
                mensaje: 'Auto no encontrado'
            });
        }

        return res.status(200).json(auto);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            mensaje: 'No se pudo obtener el auto'
        });
    }
}
//Controlador para manejar la ruta del procedimiento de valor del stock
async function valorStock(req, res, next) {
    try {
        const resultado = await procedimiento.calcularValorStock();
        //Guardamos el resultado del procedimiento en en la peticion
        req.resultadoProcedimiento = {
            procedimiento: 'Calcular valor del stock',
            resultado: resultado
        };
        //Esto hace que Express continue con el middleware 
        next();

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            mensaje: 'No se pudo realizar el procedimiento'
        });
    }
}

//Exportamos los controladores para que puedan ser utilizados en otros módulos
export default {
    obtenerAutos,
    obtenerAuto,
    valorStock
};

