import React from 'react'
import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';
import { Avatar,Grid } from '@mui/material';
import {Typography} from '@mui/material';
const CardComponent = (employee) => {
  return (
    <Card sx={{ minWidth: 275 }}>
    <CardContent>
    <Grid container spacing={2} alignItems="center"  >
          <Grid item>
            <Avatar>H</Avatar>
          </Grid>
          <Grid item>
            <Typography variant="h6" component="div">
              employee name
            </Typography>
            <Typography color="textSecondary">developer</Typography>
          </Grid>
        </Grid>
     
    </CardContent>
  
  </Card>

  )
}

export default CardComponent;