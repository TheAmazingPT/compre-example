import {Application, Router} from 'https://deno.land/x/oak/mod.ts'

import serveStatic from './middleware/serve-static.ts'

import viewIndex from './views/index/main.ts'
import viewHeader from './views/header/main.ts'
import viewMessageBox from './views/message-box/main.ts'

const router = new Router();

// PAGES
router.get('/', viewIndex)
// router.get('/users/:name', viewUserProfile)
// router.get('/messages/:id', viewMessageDetails)

// VIEWS
router.get('/views/header', viewHeader)
// router.get('/views/user-edit/:name', viewUserEdit)
// router.patch('/views/user-edit/:name', viewUserEdit)
// router.get('/views/user-preview/:name', viewUserPreview)
router.get('/views/message-box', viewMessageBox)
// router.post('/views/message-box', viewMessageBox)

// DATA ENDPOINTS
// router.get('/api/v1/messages', getMessages)
// router.get('/api/v1/messages/:id', getMessageById)
// router.post('/api/v1/messages', postMessage)
// router.delete('/api/v1/messages/:id', deleteMessageById)
// router.get('/api/v1/users/:id', getUserById)

const app = new Application();
const port = 3000;

app.use(router.routes())
app.use(serveStatic('assets'))

await app.listen(
  {port},
  () => console.info(`Server is listening on port ${port}`)
)
