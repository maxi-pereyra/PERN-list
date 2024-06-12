const {Products} =  require('../db')

const getAllProducts = async (req,res) => {
    try {
        const products = await Products.findAll()
        
        const response = products.map(product => {
            return {
                id: product.id,
                title: product.title,
                description: product.description,
                price: product.price,
                categories: product.categories,
                visibility: product.visibility
            }
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const getProducts =async (req,res) => {
    try {
        const { id } = req.params;
        const result = await Products.findByPk(id);
        if (!result)
          return res.status(404).json({ message: "Task not found" });
    
        res.json(result);
      } catch (error) {
        res.status(400).json({error: error.message})

      }
}

const createProducts = async (req,res) => {
    try {
        const {title , description, price, categories} =  req.body;
          console.log(title,categories)
        const newProducts = await Products.create({
            title,
            description,
            price,
            categories
        })
        const response = {
            id: newProducts.id,
            title:newProducts.title,
            description: newProducts.description,
            price: newProducts.price,
            categories: newProducts.categories
        }
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const deleteProducts = async (req,res) => {
    try {
        const { id } = req.params;
        const result = await Products.destroy({where: {id: id}});
        if (!result)
          return res.status(404).json({ message: "Task not found" });
        return res.sendStatus(204);
      } catch (error) {
        res.status(400).json({error: error.message})

      }
}

const upDateProducts = async (req,res) => {
    try {
        const { id } = req.params;
        const { title, description, price, categories, visibility} = req.body;
        const result = await Products.update(
          {title:title,
            description: description,
            price: price,
            categories: categories,
            visibility: visibility
          },
          {
            where:{id:id}
          }
        )
        if (!result)
          return res.status(404).json({ message: "Task not found" });
    
        return res.json(result);
      } catch (error) {
        res.status(400).json({error: error.message})

      }
}

module.exports = {
    getAllProducts: getAllProducts,
    getProducts: getProducts,
    createProducts: createProducts,
    deleteProducts: deleteProducts,
    upDateProducts: upDateProducts
}