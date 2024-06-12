const alimentosFrios = require( '../utils/productos_frio_alimentos.json')
const alimentos = require( '../utils/productosJoin.json')
const higiene = require( '../utils/productos_higiene.json')
const limpieza = require( '../utils/productos_limpieza_join.json')

const fs = require('fs/promises');
const path = require('path')


 const productos = [].concat(alimentos,alimentosFrios)

const getProductsFrom = (req,res) => {
    try {
        const { product } = req.query;
        console.log(product)
        switch(product){
            case "higiene":
                res.status(200).json(higiene)
                break;
            case "limpieza":
                res.status(200).json(limpieza)
                break;
            case "alimentos":
                res.status(200).json(productos)
                break;

            default:
                break
        }
    } catch (error) {
        res.status(400).json({error: error})

    }
}



const deleteJson = async (req,res) => {
    try {
        const { title, description , price , categoria, visibility} = req.body;
        console.log(categoria)
        let filePath = '';
        let data = null;

        switch(categoria){
            case "higiene":
                filePath = path.join(__dirname,'./productos_higiene.json');
                data = await fs.readFile(filePath,'utf-8');
                break;
            case "limpieza":
                filePath = path.join(__dirname,'.productos_limpieza_join.json');
                data = await fs.readFile(filePath,'utf-8');
                break;
            case "alimentos":
                if (categoria == "alimentos frios") {
                    filePath = path.join(__dirname,'../utils/productos_frio_alimentos.json');
                    data = await fs.readFile(filePath,'utf-8');
                } else {
                    filePath = path.join(__dirname,'../utils/productosJoin.json');
                    data = await fs.readFile(filePath,'utf-8');
                }
                break;
            default:
                break;
        }

        if(data){
            data = JSON.parse(data)
            const index = data.findIndex(product => (product.title == title) && (product.description == description));
            if (index !== -1) {
                data.splice(index,index)

                console.log(data[index])
                await fs.writeFile(filePath, JSON.stringify(data, null, 2),'utf-8',(err) => {
                    if (err) {
                      console.error('Error al escribir el archivo:', err);
                    } else {
                      console.log('Archivo JSON sobreescrito exitosamente.');
                    }
                  });
                res.status(200).json({exito: "exito"});
            } else {
                throw new Error('No se pudo encontrar el producto');
            }
        } else {
            throw new Error('Categoría inválida');
        }
        res.status(200).json({exito:"exito"})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const editJson = async (req, res) => {
    try {
        const { title, description, price, categoria } = req.body;
        console.log(categoria);
        let filePath = '';
        let data = null;

        switch (categoria) {
            case "higiene":
                filePath = path.join(__dirname,'./productos_higiene.json');
                data = await fs.readFile(filePath,'utf-8');
                break;
            case "limpieza":
                filePath = path.join(__dirname,'./productos_limpieza_join.json');
                data = await fs.readFile(filePath,'utf-8');
                break;
            case "alimentos":
                if (categoria == "alimentos frios") {
                    filePath = path.join(__dirname,'../utils/productos_frio_alimentos.json');
                    data = await fs.readFile(filePath,'utf-8');
                } else {
                    filePath = path.join(__dirname,'../utils/productosJoin.json');
                    data = await fs.readFile(filePath,'utf-8');
                }
                break;
            default:
                break;
        }

        if (data) {
            data = JSON.parse(data)
            const index = data.findIndex(product => (product.title == title) && (product.description == description));
            if (index !== -1) {
                data[index].title = title;
                data[index].description = description;
                data[index].price = price;

                await fs.writeFile(filePath, JSON.stringify(data, null, 2),'utf-8',(err) => {
                    if (err) {
                      console.error('Error al escribir el archivo:', err);
                    } else {
                      console.log('Archivo JSON sobreescrito exitosamente.');
                    }
                  });
                res.status(200).json({ exito: "exito" });
            } else {
                throw new Error('No se pudo encontrar el producto');
            }
        } else {
            throw new Error('Categoría inválida');
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    getProductsFrom: getProductsFrom,
    editJson: editJson,
    deleteJson: deleteJson
}