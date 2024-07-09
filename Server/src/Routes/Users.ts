import express from 'express'
import { handleLogin, handleRegister } from '../Controllers/Users'
const router = express.Router()


router.post('/register', handleRegister)
router.post('/login', handleLogin)


export default router