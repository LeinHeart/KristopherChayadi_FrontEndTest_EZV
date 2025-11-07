// components/TodoList.tsx
import React from 'react';
import { useGetTodosQuery } from '../lib/api';
import { Todo } from '../lib/types';
import { todoListStyles } from '../lib/styles'; 

interface TodoListProps {
  initialStart: number;
}

const PAGE_SIZE = 10;

const TodoList: React.FC<TodoListProps> = ({ initialStart }) => {
  const [start, setStart] = React.useState(initialStart);

  const { data: todos, error, isLoading, isFetching } = useGetTodosQuery({
    _start: start,
    _limit: PAGE_SIZE,
  });

  const currentPage = start / PAGE_SIZE + 1;

  if (isLoading) return <p>Loading initial todo data...</p>;
  if (error) return <p style={{ color: 'red' }}>Error loading todos.</p>;

  const handleNext = () => setStart(prev => prev + PAGE_SIZE);
  const handlePrev = () => setStart(prev => Math.max(0, prev - PAGE_SIZE));

  return (
    <div>
      <h2 style={{ marginBottom: '15px' }}>
        Todo List (Page {currentPage}) 
        {isFetching && <span style={todoListStyles.fetchingIndicator}>(Fetching...)</span>}
      </h2>

      {/* TodoList Table */}
      <table style={todoListStyles.table}>
        <thead>
          <tr style={todoListStyles.headerRow}>
            <th style={todoListStyles.tableHeader}>ID</th>
            <th style={todoListStyles.tableHeader}>Nama Todo</th>
            <th style={todoListStyles.tableHeader}>Status</th>
          </tr>
        </thead>
        <tbody>
          {todos?.map((todo: Todo) => (
            <tr key={todo.id} style={todoListStyles.tableRow}>
              <td style={todoListStyles.tableCell}>{todo.id}</td>
              <td style={todoListStyles.tableCell}>{todo.title}</td>
              <td style={{ ...todoListStyles.tableCell, ...todoListStyles.statusCell }}>
                <span 
                  style={{
                    ...todoListStyles.statusBadge, 
                    // Set color based on status
                    backgroundColor: todo.completed ? '#4CAF50' : '#FF9800' 
                  }}
                >
                  {todo.completed ? 'Completed ✅' : 'Pending ⏳'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Implement Pagination */}
      <div style={todoListStyles.paginationContainer}>
        <button 
          onClick={handlePrev} 
          disabled={start === 0 || isFetching}
          style={todoListStyles.paginationButton}
        >
          &larr; Previous
        </button>
        <button 
          onClick={handleNext} 
          disabled={(todos?.length || 0) < PAGE_SIZE || isFetching}
          style={todoListStyles.paginationButton}
        >
          Next &rarr;
        </button>
      </div>
    </div>
  );
};

export default TodoList;