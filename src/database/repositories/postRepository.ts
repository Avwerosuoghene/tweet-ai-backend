import Post from '../models/post';

export const findPostsByUserId = async (userId: number) => {
  return await Post.findAll({ where: { userId } });
};

export const findPostById = async (id: number) => {
  return await Post.findByPk(id);
};

export const createPost = async (postData: {
  title: string;
  body: string;
  userId: number;
}) => {
  return await Post.create(postData);
};