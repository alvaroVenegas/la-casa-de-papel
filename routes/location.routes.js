// Archivo character.routes.js dentro de la carpeta routes
const express = require('express');

const Location = require('../models/Location');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const locations = await Location.find().populate('characters');
        return res.status(200).json(locations)
    } catch (error) {
        return next(error)
    }
});

router.post('/create', async (req, res, next) => {
    try {
        const newLocation = new Location({
            name: req.body.name,
            loot: req.body.loot,
            characters: []
        });
        const createdLocation = await newLocation.save();
        return res.status(201).json(createdLocation);
    } catch (error) {
        next(error);
    }
});

router.put('/add-character', async (req, res, next) => {
    try {
        const { locationId } = req.body;
        const { characterId } = req.body;
        const updatedLocation = await Location.findByIdAndUpdate(
            locationId,
            { $push: { characters: characterId } },
            { new: true }
        );
        return res.status(200).json(updatedLocation);
    } catch (error) {
        return next(error);
    }
});

/* 
router.delete('/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        // No será necesaria asignar el resultado a una variable ya que vamos a eliminarlo
        await Character.findByIdAndDelete(id);
        return res.status(200).json('Character deleted!');
    } catch (error) {
        return next(error);
    }
});

router.put('/edit/:id', async (req, res, next) => {
    try {
        const { id } = req.params //Recuperamos el id de la url
        const characterModify = new Character(req.body) //instanciamos un nuevo Character con la información del body
        characterModify._id = id //añadimos la propiedad _id al personaje creado
        const characterUpdated = await Character.findByIdAndUpdate(id , characterModify)
        return res.status(200).json(characterUpdated)//Este personaje que devolvemos es el anterior a su modificación
    } catch (error) {
        return next(error)
    }
}); */

module.exports = router;

