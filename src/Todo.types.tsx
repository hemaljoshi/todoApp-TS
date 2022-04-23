import { SelectChangeEvent } from '@mui/material';
import { ReactNode } from 'react';

export type todoTypes = {
  children?: React.ReactNode;
  isUpdate?: boolean;
  title?: string;
  titleErr?: boolean;
  description?: string;
  descriptionErr?: boolean;
  status?: string;
  date?: object;
  todo?: {
    id: string;
    titleVal: string;
    descriptionVal: string;
    statusVal: string;
    date: string;
  };
  onStatusChange?: (event: SelectChangeEvent<string>, child: ReactNode) => void;
  onDescriptionChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onTitleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export type TodoFormProps = {
  isUpdate: boolean;
  title: string;
  description: string;
  status: string;
  titleErr: boolean;
  descriptionErr: boolean;
  onTitleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDescriptionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onStatusChange: (event: SelectChangeEvent<string>, child: ReactNode) => void;
  onSubmitHandler: () => void;
  onUpdateHandler: () => void;
  onCancelHandler: () => void;
};

export type ListTodoProps = {
  storedTodo: todoTypes['todo'][];
  onEditChange: (objRow: todoTypes['todo']) => void;
};
