import {Router, Request, Response, NextFunction} from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/user/user.validation';
import UserService from '@/resources/user/user.service';
import authenticated from '@/middleware/authenticated.middleware';

class UserController implements Controller {
    public path = '/users';
    public router = Router();
    private UserService = new UserService();

    constructor() {
        this.initializeRoutes();
    };

    private initializeRoutes(): void {
        this.router.post(
            `${this.path}/register`,
            validationMiddleware(validate.register),
            this.register
        );
        this.router.post(
            `${this.path}/login`,
            validationMiddleware(validate.login),
            this.login
        );
        this.router.get(
            `${this.path}`,
            authenticated,
            this.getUser
        );
    };

    private register = async (
        request: Request,
        response: Response,
        next: NextFunction
    ): Promise< Response | void> => {
        try {
            const {name, email, password} = request.body;
            const token = await this.UserService.register(
                name,
                email,
                password,
                'user'
            );

            response.status(201).json({token});
        } catch (error:any) {
            next(new HttpException(400, error.message));
        }
    };

    private login = async (
        request: Request,
        response: Response,
        next: NextFunction
    ): Promise< Response | void> => {
        try {
            const {email, password} = request.body;
            const token = await this.UserService.login(email, password);
            response.status(201).json({token});
        } catch (error:any) {
            next(new HttpException(400, error.message));
        }
    };

    private getUser = (
        request: Request,
        response: Response,
        next: NextFunction
    ): Response | void => {
        if(!request.user){
            return next(new HttpException(404, 'Not logged in'));
        }

        response.status(200).json({user: request.user});
    };
}

export default UserController;