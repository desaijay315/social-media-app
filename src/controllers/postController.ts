import { Request, Response } from 'express';
import { Repository } from 'typeorm';
import { Post } from '../database/entities/Post';

export const getPosts = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const postRepository = getRepository(Post);
  try {
    const query = postRepository.createQueryBuilder('post')
      .leftJoin('post.author', 'author')
      .leftJoin('author.followers', 'followers', 'followers.id = :userId', { userId })
      .leftJoinAndSelect('post.likes', 'likes')
      .leftJoinAndSelect('post.comments', 'comments')
      .orderBy('post.createdAt', 'DESC')
      .select(['post.id', 'post.title', 'post.content', 'post.createdAt', 'author.id', 'author.username', 'author.avatarUrl', 'followers.id'])
    const posts = await query.getMany();
    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}
