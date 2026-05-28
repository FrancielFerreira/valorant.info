export const API_URL = 'https://valorant-api.com/v1';
const LANGUAGE = 'pt-BR';

function createRequest(path) {
  return {
    url: `${API_URL}${path}`,
    options: {
      method: 'GET',
    },
  };
}

export function GET_AGENTS() {
  return createRequest(
    `/agents?language=${LANGUAGE}&isPlayableCharacter=true`,
  );
}

export function GET_MAPS() {
  return createRequest(`/maps?language=${LANGUAGE}`);
}

export function GET_GAME_MODES() {
  return createRequest(`/gamemodes?language=${LANGUAGE}`);
}

export function GET_WEAPONS() {
  return createRequest(`/weapons?language=${LANGUAGE}`);
}
