const {Router} = require('express');
// Cambiar por el nombre del Modelo 
const { ModeloShoes } = require('../db.js');

const router = Router();

// Ruta que retorna el modelo de calzado pasado por params.id
router.get('/:id', async (req, res) => {
     try{
          const {id} = req.params;
          const shoe = await ModeloShoes.findByPk(id);

          res.json(shoe ? shoe : []);
     }catch(e){
          res.send(e);
     }
});
