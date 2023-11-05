export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export interface TodoApi {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
