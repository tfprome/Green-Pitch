import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import upload from './middleware/multermiddleware.js'
import path from 'path'
import router from './router/routes.js'
import client from 'prom-client'
import products from './models/productmodel.js'

dotenv.config();

const app=express()
app.use(express.json());
app.use(cors())

// Test routes: remove, or keep behind the flag, once you're done experimenting
if (process.env.ENABLE_TEST_ROUTES === 'true') {
  // Slow response: /test/slow?ms=3000
  app.get('/test/slow', async (req, res) => {
    const ms = Math.min(parseInt(req.query.ms) || 2000, 15000)
    await new Promise(r => setTimeout(r, ms))
    console.log(JSON.stringify({ level: 'warn', msg: 'slow endpoint', ms }))
    res.json({ ok: true, delayed_ms: ms })
  })

  // Server error: /test/error
  app.get('/test/error', (req, res) => {
    console.error(JSON.stringify({ level: 'error', msg: 'simulated failure on /test/error' }))
    res.status(500).json({ error: 'simulated failure' })
  })

  // Random behaviour: mostly OK, sometimes slow, sometimes failing
  app.get('/test/random', async (req, res) => {
    const roll = Math.random()
    if (roll < 0.2) {
      console.error(JSON.stringify({ level: 'error', msg: 'random failure' }))
      return res.status(500).json({ error: 'random failure' })
    }
    if (roll < 0.4) await new Promise(r => setTimeout(r, 1000 + Math.random() * 3000))
    res.json({ ok: true })
  })
}

const register = new client.Registry()
client.collectDefaultMetrics({ register })

const httpRequests = new client.Counter({
  name: 'http_requests_total',
  help: 'Total HTTP requests',
  labelNames: ['method', 'route', 'status_code'],
  registers: [register],
})

const httpDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'HTTP request duration in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.01, 0.05, 0.1, 0.3, 0.5, 1, 2, 5],
  registers: [register],
})

app.use((req, res, next) => {
  const end = httpDuration.startTimer()
  res.on('finish', () => {
    // use the route pattern, never the raw URL, so labels stay bounded
    const route = req.route ? (req.baseUrl || '') + req.route.path : 'unmatched'
    const labels = { method: req.method, route, status_code: res.statusCode }
    httpRequests.inc(labels)
    end(labels)
  })
  next()
})

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType)
  res.end(await register.metrics())
})


app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
app.use('/',router)




// app.post('/admin/addproduct',upload.single('brandimg') ,async(req,res)=>{
//     const {brandname,branddesc,brandprice,brandstar,brandID,categoryID}=req.body
//     const brandimg=req.file? `/uploads/${req.file.filename}`:''
//     try{
//         const product=await products.create({brandname,branddesc,brandprice,brandstar,brandID,categoryID,brandimg})
//         res.status(201).json(product)
//     }
//     catch(e){
//         res.status(500).json({'message':'product creation failed',error:e.message})
//         console.error('product creation failed',e)
//     }
// })

// app.post('/brand',upload.single('brandimg'),async(req,res)=>{
//        const {brandname}=req.body
//        const brandimg=req.file?`/uploads/${req.file.filename}`: '';
//        try{
//         const Brands=await brand.create({brandname,brandimg})
//         .then(console.log('brands'))
//        }
//        catch(e){
//            console.log('error',e)
//        }
// })

// app.get('/slider',async(req,res)=>{
//     let data=await Slider.find()
//     //console.log(data)
//     res.status(200).json(data)
// })


// app.get('/brand',async(req,res)=>{
//     const data=await brand.find();
//     res.status(200).json(data)
// })

// app.get('/team',async(req,res)=>{
//     const data=await teams.find();
//     res.status(200).json(data)
// })


mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));


const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

//mongodump --uri="mongodb://localhost:27017/test" --out=./backup
//mongorestore --uri="mongodb+srv://tfprome:tf123@cluster0.pjdthzl.mongodb.net/test" ./backup/test
