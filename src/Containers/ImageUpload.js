import React from 'react'
import Dropzone from 'react-dropzone'

const ImageUpload = () => {

  return (
    <div className="form-container">
      <h2>Upload a .jpg or .png cat image</h2>
      <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps(({ className: 'dropzone' }))}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
          </section>
        )}
      </Dropzone>
    </div>
  )
}

export default ImageUpload
