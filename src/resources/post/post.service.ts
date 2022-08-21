import PostModel from '@/resources/post/post.model';
import Post from '@/resources/post/post.interface';

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
    
}

export default PostService;
