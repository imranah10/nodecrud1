import express from 'express'
import { Create, deleteOne, getAll, singleOne, update } from '../controllers/User.Controllers.js'
const router=express.Router()
router.post('/create',Create)
router.get('/getall',getAll)
router.get('/getone/:id',singleOne)
router.put('/update/:id',update)
router.delete('/delete/:id',deleteOne)
export default router