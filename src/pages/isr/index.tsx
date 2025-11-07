import { GetStaticProps } from 'next';
import { wrapper } from '../../lib/store';
import { getTodos, getRunningQueriesThunk } from '../../lib/api';
import TodoList from '../../components/TodoList';
import TodoForm from '../../components/TodoForm';

const ISRPage = () => {
  const initialStart = 0; 
  return (
    <div>
      <h1>Incremental Static Regeneration (ISR)</h1>
      <p>
        Data will be pre-rendered and revalidate for every 10 seconds (with revalidate)
        After rendered in client, revalidation will be done by RTK Query (if change on data happened)
      </p>
      <TodoForm />
      <hr />
      {/* TodoList will use pre-fetched data */}
      <TodoList initialStart={initialStart} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = wrapper.getStaticProps(
  (store) => async ({ params }) => {
    const _start = 0;
    const _limit = 10;
    
    // Pre-render first data (start=0, limit=10) at build-time
    store.dispatch(getTodos.initiate({ _start, _limit }));

    // wait till all queries are done
    await store.dispatch(getRunningQueriesThunk());

    return {
      props: {
      },
      // Revalidate data for every 10 seconds
      revalidate: 10, 
    };
  }
);

export default ISRPage;