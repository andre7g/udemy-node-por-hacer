const fs = require('fs');

let listadoPorHacer = [];

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile('db/data.json', data, (e) => {
        if (e) {
            throw new Error('No se pudo grabar', e);
        }
    });
}

const cargarDB = () => {
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }
}

const crear = (descrpcion) => {
    cargarDB();

    let porHacer = {
        descrpcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);
    guardarDB();
    return porHacer;
}

const getListado = () => {
    cargarDB();
    return listadoPorHacer;
}
const actualizar = (des, completado = true) => {
    cargarDB();
    let i = listadoPorHacer.findIndex((tarea) => {
        return tarea.descrpcion === des;
    })

    if (i >= 0) {
        listadoPorHacer[i].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}
const eliminar = (des) => {
    cargarDB();

    let nuevoListado = listadoPorHacer.filter((tarea) => {
        return tarea.descrpcion !== des;
    });

    if (nuevoListado.length === listadoPorHacer) {
        return false;
    } else {
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    }
}
module.exports = {
    crear,
    getListado,
    actualizar,
    eliminar
}