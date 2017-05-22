import {User} from '../model/User';
import {userDAO} from '../database/UserDAO';
import {USER_STATUS} from '../common/Constants';
class UserController{

    getUsers(){
        return userDAO.findAll();
    }

    getUser(username:string){
        return userDAO.find(username);
    }

    syncManagedUsers(users:Array<User>){
        let existUsers = userDAO.query(USER_STATUS.ENABLED);
        existUsers.forEach( (existUser) => {
            let needRemove = true;
            users.forEach( (user) => {
                if(user.username === existUser.username){
                    needRemove = false;
                    return false;
                }
            });
            userDAO.delete(existUser.username);

        });
        users.forEach( (user) => {
            user = new User(user.username,user.password,user.displayName);
            var existUser = userDAO.find(user.username);
            if(existUser){
                userDAO.update(user);
            }else{
                userDAO.add(user);
            }
        });
    }
}

export const userController:UserController = new UserController();