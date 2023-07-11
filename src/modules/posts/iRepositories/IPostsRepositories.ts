import { IPost, ICreatePost, IListAllPosts } from "../dtos/posts";

interface IPostsRepositories {
  create(post: ICreatePost): Promise<IPost>;
  listAll(page: number, limit: number): Promise<IListAllPosts[]>;
}

export { IPostsRepositories };
