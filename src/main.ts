import {Application, Router} from 'https://deno.land/x/oak/mod.ts'

import serveStatic from './middleware/serve-static.ts'

import viewIndex from './views/index/main.ts'
import viewHeader from './views/header/main.ts'
import viewMessageBox from './views/message-box/main.ts'
import viewMessagesList from './views/message-list/main.ts'

import getMessagesV1 from './endpoints/get-messages/v1/main.ts'
import postMessageV1 from './endpoints/post-message/v1/main.ts'

import getFavoritesV1 from './endpoints/get-favorites/v1/main.ts';
import getFavoritesByIdV1 from './endpoints/get-favorites-by-id/v1/main.ts';
import postFavoritesV1 from './endpoints/post-favorites/v1/main.ts';
// import deleteFavoritesByIdV1 from './endpoints/get-favorites-by-id/v1/main.ts'

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
router.get('/views/message-list', viewMessagesList)

// DATA ENDPOINTS
router.get('/api/v1/messages', getMessagesV1)
// router.get('/api/v1/messages/:id', getMessageById)
router.post('/api/v1/messages', postMessageV1)
// router.delete('/api/v1/messages/:id', deleteMessageById)
// router.get('/api/v1/users/:id', getUserById)
router.get('/api/v1/favorites', getFavoritesV1);
router.get('/api/v1/favorites/:userId', getFavoritesByIdV1);
router.post('/api/v1/favorites', postFavoritesV1);
// router.delete('/api/v1/favorites/:messageId', deleteFavoritesByUserIdV1);

const app = new Application();
const port = 3000;

app.state = {user: {id: '1', name: 'TheAmazingPT'}};

app.use(router.routes())
app.use(serveStatic('assets'))

await app.listen(
  {port},
  () => console.info(`Server is listening on port ${port}`)
)
