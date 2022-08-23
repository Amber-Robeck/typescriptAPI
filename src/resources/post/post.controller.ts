import {Router, Request, Response, NextFunction} from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/post/post.validation';
import PostService from '@/resources/post/post.service';

class PostController implements Controller {
    public path = '/posts';
    public router = Router();
    private PostService = new PostService();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post(
            `${this.path}`,
            validationMiddleware(validate.create),
            this.create
        )
        this.router.put(
            `${this.path}/:id`,
            this.update
        )
    }

    private create = async (
        request: Request,
        response: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const {title, body} = request.body;
            const post = await this.PostService.create(title, body);
            response.status(201).json({post});
        }
        catch (error: any) {
            next(new HttpException(400, error.message));
        }

    }

    private update = async (
        request: Request,
        response: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            // const {body.title, body.body, params} = request;
            const update = await this.PostService.update(request.body.title, request.body.body, request.params);
            response.status(201).json({update});
        }
        catch (error: any) {
            next(new HttpException(400, error.message));
        }

    }

}

export default PostController;
