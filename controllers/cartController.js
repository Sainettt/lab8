const Product = require('../models/Product')
const Cart = require('../models/Cart')

const { STATUS_CODE } = require('../constants/statusCode')

exports.addProductToCart = async (req, res) => {
  try {
    const { name } = req.body
    if (!name) return res.status(STATUS_CODE.NOT_FOUND).send('Product name is required.')

    const product = await Product.findByName(name)
    if (!product) return res.status(STATUS_CODE.NOT_FOUND).send('Product not found.')

    const result = await Cart.add(product)
    if (!result) return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).send('Could not add to cart.')

    return res.sendStatus(STATUS_CODE.OK)
  } catch (error) {
    console.error(error)
    return res.sendStatus(STATUS_CODE.INTERNAL_SERVER_ERROR)
  }
}

exports.getProductsCount = async () => {
  return await Cart.getProductsQuantity()
}
