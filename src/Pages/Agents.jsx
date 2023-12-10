import React from 'react';
const Agents = () => {
  const [agents, setAgents] = React.useState('');

  React.useEffect(() => {
    async function fetchAgents() {
      const data = await fetch(
        'https://valorant-api.com/v1/agents?language=pt-BR&isPlayableCharacter=true',
      );
      const res = await data;
      const json = await res.json();
      setAgents(json.data);
    }
    fetchAgents();
  }, []);
  return (
    <>
      <h1 className="text-amber-400">Agentes</h1>
      <ul className="flex flex-wrap gap-5 list-none">
        {agents &&
          agents.map((agent) => (
            <li key={agent.uuid} className="shadow-lg rounded-md">
              <div>
                <img src={agent.displayIcon} alt={agent.description} />
              </div>
              <h2 className="p-5">{agent.displayName}</h2>
            </li>
          ))}
      </ul>
    </>
  );
};

export default Agents;
