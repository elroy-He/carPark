import React, { useState } from 'react';
import { Button, Form, Grid, Header, Image,  Segment } from 'semantic-ui-react';


export default function AddPostForm(props){
  const [selectedFile, setSelectedFile] = useState('')
  const [state, setState] = useState({
    description: '',
    address: ''
  })

  function handleFileInput(e){
    setSelectedFile(e.target.files[0])
  }


  function handleChange(e){
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  function handleSubmit(e){
    e.preventDefault()

    const formData = new FormData()
    formData.append('photo', selectedFile)
    formData.append('description', state.description)
    formData.append('address', state.address)

    props.handleAddPost(formData);

    // Have to submit the form now! We need a function!
  }
    return (
      <Grid textAlign='center' verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Segment>

            <Form  autoComplete="off" onSubmit={handleSubmit} style={{ 'box-shadow': '10px 5px 5px grey'}}>

              <Form.Input
                  className="form-control"
                  name="description"
                  value={state.description}
                  placeholder="Price & Experience"
                  onChange={handleChange}
                  required
              />
              <Form.Input
                  className="form-control"
                  name="address"
                  value={state.address}
                  placeholder="Where is this"
                  onChange={handleChange}
                  required
              />
              <Form.Input
                className="form-control"
                type="file"
                name="photo"
                placeholder="upload image"
                onChange={handleFileInput}
              />
              <Button
                type="submit"
                className="btn"
              >
                ADD Parking Lot
              </Button>
            </Form>
          </Segment>
      </Grid.Column>
    </Grid>
    )
}