import React, { useEffect, useState } from 'react';
import ListTodo from './ListTodo';
import { Container, Grid } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import TodoForm from './TodoForm';
import { db } from '../firebase';
import { set, ref, onValue, update } from 'firebase/database';
import { todoTypes } from '../Todo.types';

const Todo = () => {
  let [storedTodo, setStoredTodo] = useState<todoTypes['todo'][]>([]);

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [status, setStatus] = useState<string>('Todo');
  const [id, setId] = useState<string>('');

  const [titleErr, setTitleerr] = useState(true);
  const [descriptionErr, setDescriptionErr] = useState(true);
  const [isUpdate, setIsUpdate] = useState(false);

  const getData = (): void => {
    onValue(ref(db), (snapshot) => {
      if (snapshot.exists()) {
        const response = snapshot.val();
        const data = response.todo;
        let todos: todoTypes['todo'][] = [];
        for (const key in data) {
          todos.push({
            id: key,
            titleVal: data[key].titleVal,
            descriptionVal: data[key].descriptionVal,
            statusVal: data[key].statusVal,
            date: data[key].date,
          });
        }
        setStoredTodo(todos);
      } else {
        setStoredTodo([]);
      }
    });
  };

  function formatDate(date: Date): string {
    function padTo2Digits(num: number): string {
      return num.toString().padStart(2, '0');
    }
    return [
      padTo2Digits(date.getDate()),
      padTo2Digits(date.getMonth() + 1),
      date.getFullYear().toString().substr(-2),
    ].join('/');
  }

  const onTitleChange: todoTypes['onTitleChange'] = (event) => {
    setTitle(event.target.value);
    if (title.length < 3) {
      setTitleerr(true);
    } else {
      setTitleerr(false);
    }
  };

  const onDescriptionChange: todoTypes['onDescriptionChange'] = (event) => {
    setDescription(event.target.value);
    if (description.length < 3) {
      setDescriptionErr(true);
    } else {
      setDescriptionErr(false);
    }
  };

  const onStatusChange: todoTypes['onStatusChange'] = (event) => {
    setStatus(event.target.value);
  };

  const onEditChange = (objRow: todoTypes['todo']): void => {
    setIsUpdate(true);
    setTitle(objRow!.titleVal);
    setDescription(objRow!.descriptionVal);
    setStatus(objRow!.statusVal);
    setId(objRow!.id);
  };

  const onUpdateHandler = (): void => {
    update(ref(db, `todo/${id}`), {
      titleVal: title,
      descriptionVal: description,
      statusVal: status,
      date: formatDate(new Date()),
    });
    setIsUpdate(false);
    setTitle('');
    setDescription('');
    setStatus('Todo');
  };

  const onSubmitHandler = (): void => {
    const uuid = uuidv4();
    set(ref(db, `todo/${uuid}`), {
      id: uuid,
      titleVal: title,
      descriptionVal: description,
      statusVal: status,
      date: formatDate(new Date()),
    });
    setTitle('');
    setDescription('');
    setStatus('Todo');
  };

  const onCancelHandler = (): void => {
    setIsUpdate(false);
    setTitle('');
    setDescription('');
    setStatus('Todo');
  };

  useEffect(() => {
    getData();
    setTitleerr(false);
    setDescriptionErr(false);
  }, []);

  const todoFormProps = {
    isUpdate,
    title,
    onTitleChange,
    titleErr,
    description,
    onDescriptionChange,
    descriptionErr,
    onStatusChange,
    status,
    onSubmitHandler,
    onUpdateHandler,
    onCancelHandler,
  };

  const listTodoProps = {
    storedTodo,
    onEditChange,
  };

  return (
    <Container maxWidth='lg'>
      <Grid container spacing={3} marginTop={5}>
        <TodoForm {...todoFormProps} />
        <ListTodo {...listTodoProps} />
      </Grid>
    </Container>
  );
};

export default Todo;
