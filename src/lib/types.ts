export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

// Pagination purpose:
export interface GetTodosArgs {
  _start: number;
  _limit: number;
}