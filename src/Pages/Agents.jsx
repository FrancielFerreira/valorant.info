import React from 'react';
import useFetch from '../Hooks/useFetch';
import { GET_AGENTS } from '../api/api';
import Loading from '../Components/Helper/Loading';
import Error from '../Components/Helper/Error';
import Card from '../Components/Card';
import ListControls from '../Components/ListControls';
import {
  DATE_SORT_OPTIONS,
  createAgentRoleOptions,
  filterByAgentRole,
  filterByText,
  getValidDateValue,
  sortItems,
} from '../utils/listFilters';

const Agents = () => {
  const { data, loading, error, request } = useFetch();
  const [search, setSearch] = React.useState('');
  const [sort, setSort] = React.useState('az');
  const [role, setRole] = React.useState('all');

  React.useEffect(() => {
    async function fetchAgents() {
      const { url, options } = GET_AGENTS();
      await request(url, options);
    }
    fetchAgents();
  }, [request]);

  if (error) return <Error error={error} />;
  if (loading) return <Loading />;
  if (data) {
    const roleOptions = createAgentRoleOptions(data.data);
    const agents = sortItems(
      filterByAgentRole(
        filterByText(data.data, search, ['displayName', 'description']),
        role,
      ),
      sort,
      (agent) => getValidDateValue(agent.releaseDate),
    );

    return (
      <section className="space-y-6">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#ffb3ba]">
            Personagens jogaveis
          </p>
          <h1 className="mt-2 font-display text-5xl uppercase text-white">
            Agentes
          </h1>
        </div>
        <ListControls
          search={search}
          onSearchChange={setSearch}
          sort={sort}
          onSortChange={setSort}
          sortOptions={DATE_SORT_OPTIONS}
          filters={[
            {
              name: 'role',
              label: 'Funcao',
              value: role,
              onChange: setRole,
              options: roleOptions,
            },
          ]}
          placeholder="Buscar agente"
        />
        <p className="text-sm font-semibold text-slate-400">
          {agents.length} agente(s) encontrados
        </p>
        <ul className="grid list-none gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {agents.map((agent) => (
            <Card
              key={agent.uuid}
              data={agent}
              image={agent.bustPortrait || agent.fullPortrait}
              eyebrow={agent.role?.displayName || 'Agente'}
              title={agent.displayName}
              description={agent.description}
              meta={`${agent.abilities?.length || 0} habilidades`}
              to={`/agentes/${agent.uuid}`}
            />
          ))}
        </ul>
      </section>
    );
  }
  else return null;
};

export default Agents;
