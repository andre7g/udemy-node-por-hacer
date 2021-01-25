//const argv = require('yargs').argv;
const argv = require('./config/yargs').argv;
const porHacer = require('./por-hacer/por-hacer');
const color = require('colors');
//console.log(argv);

let comando = argv._[0];

switch (comando) {
    case 'crear':
        let tarea = porHacer.crear(argv.descripcion);
        console.log(tarea);
        break;
    case 'listar':

        let listado = porHacer.getListado();

        for (let tarea of listado) {
            console.log('-------------Tarea por hacer-----------');
            console.log(`Tarea: ${tarea.descrpcion}`.green);
            console.log(`Estado: ${tarea.completado}`.green);
            console.log('----------------------------------------');
        }
        break;
    case 'actualizar':
        let actualizado = porHacer.actualizar(argv.descripcion, argv.completado);
        console.log(actualizado);
        break;

    case 'eliminar':
        let eliminar = porHacer.eliminar(argv.descripcion);
        console.log(eliminar);
        break;
    default:
        console.log('Comando no reconocido.');
}