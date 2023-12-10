export const API_URL = 'https://valorant-api.com/v1';

export function GET_AGENTS() {
  return {
    url: API_URL + '/agents?language=pt-BR&isPlayableCharacter=true',
    options: {
      method: 'GET',
      cache: 'no-store',
    },
  };
}
