import React from 'react';
import useFetch from '../Hooks/useFetch';
import { GET_AGENTS } from '../api/api';
import Loading from '../Components/Helper/Loading';
import Error from '../Components/Helper/Error';
import Card from '../Components/Card';

const Agents = () => {
  const { data, loading, error, request } = useFetch();

  React.useEffect(() => {
    async function fetchAgents() {
      const { url, options } = GET_AGENTS();
      await request(url, options);
    }
    fetchAgents();
  }, [request]);

  if (error) return <Error error={error} />;
  if (loading) return <Loading />;
  if (data)
    return (
      <>
        <h1 className="text-red-500 text-3xl font-bold">Agentes</h1>
        <ul className="grid gap-4 grid-cols-4 list-none">
          {data &&
            data.data.map((agent) => <Card key={agent.uuid} data={agent} />)}
        </ul>
      </>
    );
  else return null;
};

export default Agents;
