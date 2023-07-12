import { ListAllPostsController } from "@modules/posts/useCases/listAllPosts/listAllPostsController";
import { CreatePostController } from "@modules/posts/useCases/createPost/createPostController";
import { Router } from "express";

import { authentication } from "src/middlewares/authentication";
import { DeletePostController } from "@modules/posts/useCases/deletePost/deletePostController";
import { UpdatePostController } from "@modules/posts/useCases/updatePost/updatePostController";

const postRoutes = Router();

postRoutes.get("/", new ListAllPostsController().handle);

postRoutes.use(authentication);

postRoutes.post("/", new CreatePostController().handle);
postRoutes.put("/:id", new UpdatePostController().handle);
postRoutes.delete("/:id", new DeletePostController().handle);

export { postRoutes };
