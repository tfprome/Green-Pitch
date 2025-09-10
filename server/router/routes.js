import express from'express'
const router=express.Router();


import * as homecontroller from '../controllers/homecontrollers.js'
//import * as listbybrandcontroller from '../controllers/listbybrandcontroller.js'
//import * as listbycategorycontroller from '../controllers/listbycategorycontroller.js'
import * as productcontrollers from '../controllers/productcontrollers.js'
import * as usercontrollers from '../controllers/usercontrollers.js'
import * as cartcontrollers from '../controllers/cartcontrollers.js'
import { authmiddleware } from '../middleware/authmiddleware.js';
import * as wishcontrollers from  '../controllers/wishcontrollers.js'
import * as invoicecontrollers from '../controllers/invoicecontrollers.js';
//import createinvoiceservice from './../controllers/invoicecontrollers.js';


router.get('/slider',homecontroller.Slidercontroller)
router.get('/brand',homecontroller.Brandshowcontroller)
router.get('/category',homecontroller.Categoryshowcontroller)
router.get('/teamname',homecontroller.teamname)
router.get('/brandname',homecontroller.brandname)
router.get('/categoryname',homecontroller.categoryname)

router.post('/signup',usercontrollers.signupservice)
router.post('/login',usercontrollers.loginservice)

router.get('/getproducts',productcontrollers.getproducts)
router.get('/productdetails/:id',productcontrollers.detailsService)
router.get('/listbycategory/:id',productcontrollers.listbycategoryservice)
router.get('/listbybrand/:id',productcontrollers.listbybrandservice)
router.get('/productlistbykeyword/:value',productcontrollers.productlistbykeyword)

router.post('/addcart',authmiddleware,cartcontrollers.addcartservice)
router.get('/readcart',authmiddleware,cartcontrollers.readcartsevice)
router.delete('/removecart/:id',authmiddleware,cartcontrollers.removecartservice)


router.post('/addwish/:id',authmiddleware,wishcontrollers.addwishservice)
router.get('/readwish',authmiddleware,wishcontrollers.readwishservice)
router.delete('/removewish/:id',authmiddleware,wishcontrollers.removewishservice)

router.post('/createinvoice/:id',authmiddleware,invoicecontrollers.createinvoiceservice)
router.get('/invoice/:id',authmiddleware,invoicecontrollers.getInvoiceDetails)
router.post("/payment/initiate/:id", authmiddleware, invoicecontrollers.initiatePayment);
router.get("/payment-success/:id", invoicecontrollers.paymentSuccess);
router.get("/payment-fail/:id", invoicecontrollers.paymentFail);


export default router;