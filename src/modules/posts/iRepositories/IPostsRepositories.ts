import { IPost, ICreatePost } from "../dtos/posts";

interface IPostsRepositories {
  create(post: ICreatePost): Promise<IPost>;
}

export { IPostsRepositories };
