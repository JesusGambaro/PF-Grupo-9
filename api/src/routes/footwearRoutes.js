const {Router} = require('express');
// Cambiar por el nombre del Modelo 
const { Product } = require('../db.js');

const router = Router();

// Ruta que retorna el modelo de calzado pasado por params.id
router.get('/:id', async (req, res) => {
     try{
          const {id} = req.params;
          // footwear es el calzado encontrado, findByPk retorna el coincidente con el id
          const footwear = await Product.findByPk(id);
          // Retorna el coincidente. Si no existe, retorna un array vacio
          res.json(footwear ? footwear : []);
     }catch(e){
          const error = new Error('No existe el calzado');
          res.status(403).json({msg: error.message});
     }
});

module.exports = router;