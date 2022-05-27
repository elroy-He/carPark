import React from 'react'
import { Grid } from 'semantic-ui-react'
import './Divider.css'

export default function Divider(props) {
    return (
        <Grid.Column
            className='LandingDivider'
            width={8}
            style={{ padding: 0, margin: 0 }}
        >
          <h1 className='logo'>Car-Park</h1>
        </Grid.Column>
    )
}