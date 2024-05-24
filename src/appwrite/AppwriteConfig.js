import conf from "../conf/conf";
import { Client,ID,Databases,Storage,Query } from "appwrite";


export class Service{


    clinet = new Client (); 
    databases;
    bucket;
    

    constructor(){

        this.clinet
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwritProjectId);
            this.databases = new Databases (this.clinet);
            this.bucket = new Storage (this.bucket);

    }

     async creatPost ({title,slug,content,featuredImage,status,userId}) {
    
     try {
        return await this.databases.createDocument(
            conf.appwriteUrlDatabaseId,
            conf.appwriteUrlCollectionId,
            slug,
            {
                title,
                content,
                featuredImage,
                status,
                userId,
            }
        )

     } catch (error) {

        console.log("Appwrite serive :: createPost :: error ",error )
        
     }
    }



    async updatePost (slug,{title,content,featuredImage,status}){
               
        try {
            
            return await this.databases.updateDocument(
                conf.appwriteUrlDatabaseId,
                conf.appwriteUrlCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
            
        } catch (error) {
            console.log("APPwrite serive :: updatePost :: error ",error);
        }

    }


    async deletePost (slug){

       try {
             await this.databases.deleteDocument(conf.appwriteUrlDatabaseId,conf.appwriteUrlCollectionId,
                slug)
                return true ;
        
       } catch (error) {
        console.log("Appwrite serves :: deletePost :: error ". error );
        return false
       }   
    }


    async getPost(){
        try {

            return await this.databases.getDocument(conf.appwriteUrlDatabaseId,conf.appwriteUrlCollectionId,
                slug)

            
            
        } catch (error) {
            console.log("Appwrite serves :: get Post :: error",error);
        }
    }


    async getPosts (queries = [Query.equal("status","active")]){

        try {
            return await this.databases.listDocuments(
                conf.appwriteUrlDatabaseId,
                conf.appwriteUrlCollectionId,
                queries
            )
        } catch (error) {
            console.log("Appwrite serves :: getPost :: error",error);
        }
    }


    // file upload service 


    async uploadFile (file){
        try {
            return await this.bucket.createFile(
                conf.appwriteUrlBucketId,
                ID.unique(),
                file,
            )
        } catch (error) {
            console.log("Appwrite serves :: uploadeFile :: error ", error);
            
        }
    }

    async deleteFile (fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteUrlBucketId,
                fileId,

            )
            return true
        } catch (error) {
            
        }
    }

    async getFilePreview (fileId) {
        return this.bucket.getFilePreview(conf.appwriteUrlBucketId,
            fileId
            )
    }




    }


const appwriteServise = new Service ()


export default appwriteServise;