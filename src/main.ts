import { Application, Router } from "oak";

import serveStatic from "./middleware/serve-static.ts";

import viewIndex from "./views/index/main.ts";
import viewHeader from "./views/header/main.ts";
import viewMessageBox from "./views/message-box/main.ts";
import viewMessagesList from "./views/message-list/main.ts";

import getMessagesV1 from "./endpoints/get-messages/v1/main.ts";
import postMessageV1 from "./endpoints/post-message/v1/main.ts";

import getFavoritesV1 from "./endpoints/get-favorites/v1/main.ts";
import postFavoritesV1 from "./endpoints/post-favorites/v1/main.ts";
import deleteFavoritesByIdV1 from "./endpoints/delete-favorites-by-id/v1/main.ts";

import getLikesV1 from "./endpoints/get-likes/v1/main.ts";
import getUsersByLikesV1 from "./endpoints/get-users-by-likes/v1/main.ts";
import postLikesV1 from "./endpoints/post-likes/v1/main.ts";
import deleteLikesByIdV1 from "./endpoints/delete-likes-by-id/v1/main.ts";

const router = new Router();

// PAGES
router.get("/", viewIndex);
// router.get('/users/:name', viewUserProfile)
// router.get('/messages/:id', viewMessageDetails)

// VIEWS
router.get("/views/header", viewHeader);
// router.get('/views/user-edit/:name', viewUserEdit)
// router.patch('/views/user-edit/:name', viewUserEdit)
// router.get('/views/user-preview/:name', viewUserPreview)
router.get("/views/message-box", viewMessageBox);
// router.post('/views/message-box', viewMessageBox)
router.get("/views/message-list", viewMessagesList);

// DATA ENDPOINTS
router.get("/api/v1/messages", getMessagesV1);
// router.get('/api/v1/messages/:id', getMessageById)
router.post("/api/v1/messages", postMessageV1);
// router.delete('/api/v1/messages/:id', deleteMessageById)
// router.get('/api/v1/users/:id', getUserById)

// Favorites are private and can't be seen without authentication!
router.get("/api/v1/favorites", getFavoritesV1);
router.post("/api/v1/favorites", postFavoritesV1);
router.delete("/api/v1/favorites", deleteFavoritesByIdV1);

router.get("/api/v1/likes", getLikesV1);
router.get("/api/v1/likes/:messageId", getUsersByLikesV1);
router.post("/api/v1/likes", postLikesV1);
router.delete("/api/v1/likes", deleteLikesByIdV1);

const app = new Application();
const port = 3000;

app.state = { userId: "48783b01-5d77-4363-af4a-ee2282cfe6c3" };

app.use(router.routes());
app.use(serveStatic("assets"));

await app.listen(
  { port },
  () => console.info(`Server is listening on port ${port}`),
);
