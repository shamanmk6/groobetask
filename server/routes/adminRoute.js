import express from 'express'
const router=express.Router()
import { adminLogin ,getUserList,adminLogout} from '../controllers/adminController.js'


router.route('/login').post(adminLogin)
router.route('/logout').adminLogout
router.route('/usersList').get(getUserList)
export const AdminRoute=router