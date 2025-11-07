import { GetServerSideProps } from 'next';
import { wrapper } from '../../lib/store';
import { getTodos, getRunningQueriesThunk } from '../../lib/api';
import TodoList from '../../components/TodoList';
import TodoForm from '../../components/TodoForm';

const SSRPage = () => {
  const initialStart = 0; 
  return (
    <div>
      <h1>Server-Side Rendering (SSR)</h1>
      <p>Data fetch from server **every request**.</p>
      <TodoForm />
      <hr />
      {/* TodoList will use pre-fetched data */}
      <TodoList initialStart={initialStart} />
    </div>
  );
};

// Next.js function for SSR
export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  (store) => async ({ req, res, ...etc }) => {
    const _start = 0;
    const _limit = 10;
    
    // Pre-fetch first data (start=0, limit=10) from server
    store.dispatch(getTodos.initiate({ _start, _limit }));

    // wait till all queries are done
    await store.dispatch(getRunningQueriesThunk());

    // Data will be rehydrate to cleint, so TodoList not loading
    return {
      props: {

      },
    };
  }
);

export default SSRPage;