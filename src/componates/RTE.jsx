import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'

function RTE({name,control,lable,defultvalue=""}) {
    

  return (

    <div className='w-full'>
      {lable && <lable className="inline-block mb-1 pl-1">{lable}</lable>}

      <Controller 
      name={ name || "content"}
      control={control}
      render={({field:{onChange}})=>(
        
        <Editor
        initialValue= {defultvalue} 
        init = {{
  
            height: 500,
            menubar:true,
            plugins: [
              "image",
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "carmap",
              "prewiew",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "code",
              "help",
              "wordcount",
              "anchor",


            ],
            toolbar:
            "undo redo | blocks | image | bold italic forecolor | alignlift aligncenter bold italic forecolor| alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help ",
            content_style: "body { font-family:Helvetica,arial,sans-serif; font-size:14px }",
          
        }}
        onEditorChange={onChange}
        />
      )}
      />

    </div>
  )
}

export default RTE