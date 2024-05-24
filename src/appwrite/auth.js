import conf from "../conf/conf"
import { Client,Account,ID } from "appwrite";

    export class AuthService {
    
    client = new Client();
    account;

    constructor () {

        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwritProjectId);

        this.account = new Account(this.client);

    }

    async creatAccount({email,password,name}){
        try {
           userAccount = await this.account.create((ID.unique),email,password,name);
           if (userAccount) {
            // if user created account then we want to login user , so that`s whay we call login mathed
            return this.login({email,password});

           } else {
            return userAccount;
           }
            } 
        catch (error) {
            throw error;
        }

    }

    
    async login ({email,password}){
        
        try {
         return await this.account.createEmailSession(email,password);
         
        } catch (error) {
         throw error;
        }
    }
  

    async getCurrentUser () {

        try {

          return await this.account.get();

        } catch (error) {

            console.log('Appwrite serve::getCurrentUser::error', error);


            
        }
        return null;
    }


    async logOut (){

        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite servise :: LogOut :: errot ",error);
        }
    }
    
 }


const authService = new AuthService();
    

export default authService;