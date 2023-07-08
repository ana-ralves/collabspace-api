import { CreatePostController } from "@modules/users/useCases/createPost/createPostController";
import { Router } from "express";

import { authentication } from "src/middlewares/authentication";

const postRoutes = Router();

postRoutes.use(authentication);

postRoutes.post("/", new CreatePostController().handle);

export { postRoutes };
