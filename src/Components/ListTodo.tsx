import React from 'react';
import { Paper, Typography, Box, Grid } from '@mui/material';
import Table from './Table';
import { ListTodoProps } from '../Todo.types';

export default function ListTOdo(props: ListTodoProps) {
  const { storedTodo, onEditChange } = props;

  return (
    <Grid item xs={8}>
      <Box>
        <Paper
          sx={{
            padding: 2,
          }}
          elevation={2}
        >
          <Box sx={{ display: 'grid', justifyContent: 'left', padding: 1 }}>
            <Typography
              variant='h5'
              component='h5'
              color='primary'
              sx={{
                borderBottom: 2,
              }}
            >
              ToDo's
            </Typography>
          </Box>
          <Box sx={{ height: 293, width: '100%', marginTop: 1 }}>
            <Table storedTodo={storedTodo} onEditChange={onEditChange}></Table>
          </Box>
        </Paper>
      </Box>
    </Grid>
  );
}
