import UserModel from '@/resources/user/user.model';
import token from '@/utils/token';

class UserService {
    private user = UserModel;

    public async register(
        name: string,
        email: string,
        password: string,
        role: string
    ): Promise<string | Error> {
        try{
            const user = await this.user.create({name, email, password,role});
            const accessToken = token.createToken(user);
            return accessToken;
        }catch(error){
            throw new Error('Unable to add user!')
        }
    }

    public async login(
        email: string,
        password: string
    ): Promise<string | Error> {
        try{
            const user = await this.user.findOne({email});

            if(!user){
                throw new Error('Unable to find a user with that information')
            }

            if(await user.isValidPassword(password)){
                return token.createToken(user)
            } else{
                throw new Error('Unable to verify user');
            }
        } catch (error){
            throw new Error('Something went wrong with logging in');
        }
    }
}

export default UserService;