import React from 'react'
import Dropzone from 'react-dropzone'

class ImageUpload extends React.Component {

  state = {
    files: []
  }

  dropHandler = files => {
    this.setState({ files }, () => {

      const file = files[0]
      const xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      const fd = new FormData();

      xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
          console.log(this.responseText);
        }
      });
      

      // Initiate a multipart/form-data upload
      xhr.open("POST", "https://api.thecatapi.com/v1/images/upload");
      // xhr.setRequestHeader("content-type", "application/javascript");
      xhr.setRequestHeader("x-api-key", "047eb9c2-34db-4886-af65-6895473b2a38");

      fd.append('file', file);
      // fd.append('sub_id', "1");
      
      xhr.send(fd);

      // const reader = new FileReader()

      // reader.onabort = () => console.log('file reading was aborted')
      // reader.onerror = () => console.log('file reading has failed')
      // reader.onload = () => {
      // // Do whatever you want with the file contents
      //   const binaryStr = reader.result
      //   debugger
      //   console.log(binaryStr)
      //   console.log(URL.createObjectURL(this.state.files[0]))
      // }
      // reader.readAsArrayBuffer(files[0])
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
    // marginBottom: 8,
    // marginRight: 8,
    // width: 100,
    // height: 100,
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

  render() {
    return (
      <div className="form-container">
        <h2>Upload a .jpg or .png cat image</h2>
        <Dropzone onDrop={acceptedFiles => this.dropHandler(acceptedFiles)}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps(({ className: 'dropzone' }))}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
              </div>
              {this.state.files.length === 0 ? null
                :
                <>
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
