import express from 'express';
import { upload } from '../configs/multer.js';
import authSeller from '../middleware/authSeller.js';
import { addProduct, changeStock, productById, productList, removeProduct } from '../controllers/productController.js';


const productRouter = express.Router()

productRouter.post('/add', upload.array(["images"]), authSeller, addProduct)

productRouter.get('/list', productList)

productRouter.get('/is', productById)
productRouter.post('/stock', authSeller, changeStock)
productRouter.post('/remove', authSeller, removeProduct)

export default productRouter;
