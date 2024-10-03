import express from 'express'
const router=express.Router()
import { adminLogin ,getUserList,adminLogout, changeAdmin} from '../controllers/adminController.js'


router.route('/login').post(adminLogin)
router.route('/logout').post( adminLogout)
router.route('/usersList').get(getUserList)
router.route('/change-admin').post(changeAdmin)
export const AdminRoute=router