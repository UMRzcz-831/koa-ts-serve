import Router from 'koa-router'
import DeviceController from '../controller/DeviceController'
import IndexController from '../controller/IndexController'
import LoginController from '../controller/LoginController'
import PreferenceController from '../controller/PreferenceController'
import UserController from '../controller/UserController'
import AuthMiddleware from '../middlewares/Auth'
const router = new Router({ prefix: '/serve' })

router.post('/user/login', LoginController.index)
router.post('/user/regist', UserController.createUser)

router.use(AuthMiddleware)
router.get('/getUser', IndexController.getUserById)
router.get('/getUser/list', UserController.getPaginatedUserList)

// 创建偏好
// router.post('/preference/create', PreferenceController.CreatePreference)
// 获取偏好
router.get('/preference/query', PreferenceController.GetPreferenceByUserId)
// 更新偏好
router.put('/preference/update', PreferenceController.UpdatePreferenceByUserId)

// 绑定设备
router.post('/device/bindDevice', DeviceController.BindDevice)
// 获取设备列表
router.get('/device/list', DeviceController.QueryDeviceByUserId)
// 获取设备详情
router.get('/device/:deviceId', DeviceController.QueryDeviceByDeviceId)
// 解绑
router.delete('/device/unbind/:deviceId', DeviceController.UnbindDevice)
// 更新
router.put('/device/update/:deviceId', DeviceController.UpdateDevice)



export default router
