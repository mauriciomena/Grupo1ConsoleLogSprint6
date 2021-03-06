// Modulos requeridos
const path = require('path');
const { body } = require('express-validator');

module.exports = [

    body('name').notEmpty().withMessage('Completá el nombre'),
    body('price').notEmpty().withMessage('Completá el precio'),
    body('description').notEmpty().withMessage('Completá la descripción'),
    body('stock').notEmpty().withMessage('Completá el stock').isNumeric({ min: 1}),
    body('stock_min').notEmpty().withMessage('Completá el Stock minimo').isNumeric({ min: 1}),
    body('stock_max').notEmpty().withMessage('Completá el Stock maximo').isNumeric(),
    body('avProducts').custom((value, { req }) => {
        // Obtengo el archivo
        let file = req.file; 

        // Defino que extensiones son válidas
        let acceptedExtensions = ['.jpg', '.png', '.gif'];
        
        if (!file) {
            throw new Error('Tienes que subir una imágen');
        } else {
            let fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error ('Las extensiones de imágenes permitidas son .jpg, .png y .gif')
            }
        }
        // Siempre en las validaciones custom retorno true
        return true;
    }),
    body('facts').notEmpty().withMessage('Completá la nutrición')
]