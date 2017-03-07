/**
 * Producto.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    nombreProducto: {
      type: 'string',
      required: true
    },
    foto: {
      type: 'string',
      defaultsTo: "blank.jpg"
    },
    precio: {
      type: 'float',
      required: true
    },
    idCategoria: {
      model: "Categoria"
    },
    carritos: {
      collection: "Carrito",
      via: "productos"
    }
  }
};

