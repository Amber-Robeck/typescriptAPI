import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '@/utils/token';
import userModel from '@/resources/user/user.model';
import Token from '@/utils/interfaces/token.interface';
import HttpException from '@/utils/exceptions/http.exception';
import jwt  from 'jsonwebtoken';

async function authenticatedMiddleware(
    request: Request,
    response: Response,
    next: NextFunction
): Promise<Response | void > {
    const bearer = request.headers.authorization;

    if(!bearer || !bearer.startsWith('Bearer ')){
        // return response.status(401).json({error: 'Unauthorized'});
        return next(new HttpException(401, 'Unauthorized'));
    }

    const accessToken = bearer.split('Bearer: ')[1].trim();

    try {
        const payload: Token | jwt.JsonWebTokenError = await verifyToken(accessToken);
        
        if (payload instanceof jwt.JsonWebTokenError){
            return next(new HttpException(401, 'Unauthorized'));
        }

        const user = await userModel.findById(payload.id)
        .select('-password')
        .exec();

        if(!user){
            return next(new HttpException(401, 'Unauthorized'));
        }

        request.user = user;
        return next();
    } catch (error:any) {
        return next(new HttpException(401, 'Unauthorized'));
    }
};

export default authenticatedMiddleware;
