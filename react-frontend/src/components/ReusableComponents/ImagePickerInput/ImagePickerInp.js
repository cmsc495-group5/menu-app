import React from 'react'

export default function ImagePickerInp(props) {
  let out = {};
  
  const handleImage = f => {
    let reader = new FileReader();

    reader.onloadend = imageHandler;
    reader.readAsDataURL(f)

    out.size = f.size
    out.name = f.name
    out.type = f.type
    out.date = f.lastModifiedDate

    props.onChange(out)
  }

  const imageHandler = e => out.src = e.target.result;

  return (
    <div>
      <input 
        type="file" 
        onChange={(e) => handleImage(e.target.files[0])}
        name="imgFileUpload"
      />
    </div>
  )
}
