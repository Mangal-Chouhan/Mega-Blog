import React , {useCallback, useEffect}from 'react';
import { useForm } from 'react-hook-form';
import {Button,Input,Select,RTE} from '../index'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux' ;
import appwriteservise from '../../appwrite/AppwriteConfig';


function Post_Form({post}) {

const {register,handleSubmit,watch,setValue,control,getValues
} = useForm(
  {
  defaultValues:{
    title: post?.title||"",
    slug: post?.slug || "",
    content: post?.content||"",
    status: post?.status||"",
  }
})




const navigate =useNavigate()
const userdata =useSelector(state => state.user.userdata)


const submit = async (data)=>{
  if (post) {
    file = data.image[0] ? appwriteservise.uploadFile (data.image[0]) :null
    
    if(file){
      appwriteservise.deleteFile(post.featuredImage)

    }
    }


    const dbPost = await appwriteservise.updatePost(
      post.$id,{
        ...data,
        featuredImage: file? file.$id :undefined })

        if(dbPost){
          navigate(`/post/${dbPost.$id}`)
        }
        
        else  {
          const file = await appwriteservise.uploadFile(data.image[0]);
    
          if (file){
            const fileId = file.$id // file id stor in variable
            data.featuredImage = fileId // update featured image in data 
            const dbPOST= await appwriteservise.creatPost({
              ...data,
              userId:userdata.$id,
            })
            
            if (dbPOST){
              navigate(`/post/${dbPOST.$id}`)
            }
          }
      } 
    

    

}

const slugTransForm = useCallback((value) => {

  if( value && typeof value === 'string')
    return value
    .trim()
    .toLowerCase()
    .raplase(/^[a-zA-Z\d\s ]+/g,'-')
    .replace(/\s/g, '-')

    return ""

},[])


useEffect(()=>{
  const subscription = watch((value,{name})=>{
    if(name === 'title'){
      setValue('slug',slugTransForm(value.title,{shouldValidate: true}))
    }
  })

  return () => {

    subscription.unsubscribe()
  }
},[watch,slugTransForm,setValue])







return (
  <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
          <Input
              label="Title :"
              placeholder="Title"
              className="mb-4"
              {...register("title", { required: true })}
          />
          
          <Input
              label="Slug :"
              placeholder="Slug"
              className="mb-4"
              {...register("slug", { required: true })}
              onInput={(e) => {
                  setValue("slug", slugTransForm(e.currentTarget.value), { shouldValidate: true });
              }}
          />

          <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
      </div>
      <div className="w-1/3 px-2">
          
          <Input
              label="Featured Image :"
              type="file"
              className="mb-4"
              accept="image/png, image/jpg, image/jpeg, image/gif"
              {...register("image", { required: !post })}
          />
          {post && (
              <div className="w-full mb-4">
                  <img
                      src={appwriteservise.getFilePreview(post.featuredImage)}
                      alt={post.title}
                      className="rounded-lg"
                  />
              </div>
          )}

          <Select
              options={["active", "inactive"]}
              label="Status"
              className="mb-4"
              {...register("status", { required: true })}
          />

          <Button 
          
          type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
              {post ? "Update" : "Submit"}
          </Button>
      </div>
  </form>
);
}