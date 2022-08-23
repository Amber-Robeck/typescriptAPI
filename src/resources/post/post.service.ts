import PostModel from '@/resources/post/post.model';
import Post from '@/resources/post/post.interface';
import { request } from 'http';

class PostService {
    private post = PostModel;

    public async create(title: string, body: string): Promise<Post> {
        try {
            const post = this.post.create({title, body});
            return post;
        } catch (error) {
            throw new Error('Unable to create Post')
        }
    }

    public async update(title: string, body: string): Promise<Post> {
        try {
            const update = this.post.findOneAndUpdate({_id: request.params.id},{title, body});
            return update;
        } catch (error) {
            throw new Error('Unable to update Post')
        }
    }
    
}

export default PostService;
