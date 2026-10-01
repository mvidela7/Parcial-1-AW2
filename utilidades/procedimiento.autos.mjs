//Importamos la función readFile del módulo fs/promises para leer archivos de manera asíncrona
import { readFile } from 'fs/promises';

async function calcularValorStock() {
    const datos = await readFile('./datos/autos.json', 'utf-8');

    const autos = JSON.parse(datos);
    //Variable para almacenar el valor total del stock
    let valorTotalStock = 0;
    
    //Recorremos el array de autos y calculamos el valor total del stock
    autos.forEach((auto) => {
        //Multiplicamos el precio del auto por la cantidad en stock y lo sumamos al valor total
        valorTotalStock += auto.precio * auto.stock;
    });

    return {
        //Devolvemos un objeto con la cantidad de autos procesados y el valor total del stock
        autosProcesados: autos.length,
        valorTotalStock: valorTotalStock
    };
}
//Exportamos la función calcularValorStock para que pueda ser utilizada en otros módulos
export default {
    calcularValorStock
};