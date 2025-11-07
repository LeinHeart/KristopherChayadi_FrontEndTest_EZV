// lib/api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { Todo, GetTodosArgs } from './types';
import { Action } from '@reduxjs/toolkit/react';


// **Helper Function to check HYDRATE Action**
function isHydrateAction(action: Action): action is Action<typeof HYDRATE> & { payload: any } {
  return action.type === HYDRATE;
}

// tag type for cache
export const api = createApi({
  reducerPath: 'todoApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
  tagTypes: ['Todos'],

  // Implement rehydration for SSR/ISR
  extractRehydrationInfo(action, { reducerPath }): any {
    if (isHydrateAction(action)) {
      // get RTK Query from HYDRATE Payload
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    // Endpoint 1: show todo list with pagination
    getTodos: builder.query<Todo[], GetTodosArgs>({
      query: ({ _start, _limit }) => `todos?_start=${_start}&_limit=${_limit}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Todos' as const, id })),
              { type: 'Todos', id: 'LIST' },
            ]
          : [{ type: 'Todos', id: 'LIST' }],
    }),
    
    // Endpoint 2: add todo (POST)
    addTodo: builder.mutation<Todo, { title: string }>({
      query: (body) => ({
        url: 'todos',
        method: 'POST',
        body: {
          ...body,
          userId: 1, 
          completed: false,
        },
      }),
      // invalidate cache 'LIST' after success add todo, to refresh list
      invalidatesTags: [{ type: 'Todos', id: 'LIST' }],
    }),
  }),
});

export const { useGetTodosQuery, useAddTodoMutation, util: { getRunningQueriesThunk } } = api;

export const { getTodos } = api.endpoints;