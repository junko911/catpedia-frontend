import React from 'react'
import Dropzone from 'react-dropzone'
import { Alert } from 'reactstrap'

class ImageUpload extends React.Component {

  state = {
    files: [],
    uploaded: false
  }

  dropHandler = files => {
    this.setState({ files }, () => {

      const file = files[0]
      const xhr = new XMLHttpRequest()
      const fd = new FormData()

      xhr.addEventListener("readystatechange", () => {
        if (this.readyState === this.DONE) {
          this.setState({uploaded: true})
        }
      })

      // Initiate a multipart/form-data upload
      xhr.open("POST", "http://localhost:3000/cats");
      fd.append('file', file);      
      xhr.send(fd)
    })
  }

  thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
  };

  thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    margin: 'auto',
    padding: 4,
    boxSizing: 'border-box'
  }

  thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
  }

  img = {
    display: 'block',
    width: 'auto',
    maxWidth: '100%',
    height: 'auto'
  }

  thumbs = () => {
    return (
      <div style={this.thumb} key={this.state.files[0].name}>
        <div style={this.thumbInner}>
          <img
            alt=""
            src={URL.createObjectURL(this.state.files[0])}
            style={this.img}
          />
        </div>
      </div>
    )
  }

  uploadedAlert = () => {
    return(
      <Alert color="success">
        The image is uploaded successfully!
      </Alert>
    )
  }

  render() {
    return (
      <div className="form-container">
        <h2>Upload a .jpg or .png cat image</h2>
        <Dropzone onDrop={acceptedFiles => this.dropHandler(acceptedFiles)}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps(({ className: 'dropzone' }))}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop a file here, or click to select a file</p>
              </div>
              {this.state.files.length === 0 ? null
                :
                <>
                {this.state.uploaded ? this.uploadedAlert() : null}
                <h4>Preview</h4>
                <aside style={this.thumbsContainer}>
                  {this.thumbs()}
                </aside>
                </>
              }
            </section>
          )}
        </Dropzone>
      </div>
    )
  }
}

export default ImageUpload
