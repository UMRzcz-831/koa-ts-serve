import Router from 'koa-router'
import IndexController from '../controller/IndexController'
import LoginController from '../controller/LoginController'
import PreferenceController from '../controller/PreferenceController'
import UserController from '../controller/UserController'
import AuthMiddleware from '../middlewares/Auth'
const router = new Router({ prefix: '/serve' })

router.post('/user/login', LoginController.index)
router.post('/user/regist', UserController.createUser)
router.post('/preference/create', PreferenceController.CreatePreference)
router.get('/preference/query/:id', PreferenceController.GetPreferenceByUserId)
router.put('/preference/update/:id', PreferenceController.UpdatePreferenceByUserId)
router.use(AuthMiddleware)
router.get('/getUser', IndexController.getUserById)
router.get('/getUser/list', UserController.getPaginatedUserList)

export default router
