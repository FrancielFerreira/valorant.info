import React from 'react';

const responseCache = new Map();
const pendingRequests = new Map();

function createCacheKey(url, options = {}) {
  return JSON.stringify({
    url,
    method: options.method || 'GET',
  });
}

export function clearFetchCache() {
  responseCache.clear();
  pendingRequests.clear();
}

const useFetch = () => {
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const request = React.useCallback(async (url, options = {}) => {
    let response;
    let json;
    const cacheKey = createCacheKey(url, options);
    try {
      setError(null);
      setLoading(true);

      if (responseCache.has(cacheKey)) {
        json = responseCache.get(cacheKey);
        return { response: null, json, cached: true };
      }

      if (pendingRequests.has(cacheKey)) {
        json = await pendingRequests.get(cacheKey);
        return { response: null, json, cached: true };
      }

      const fetchPromise = fetch(url, options).then(async (fetchResponse) => {
        response = fetchResponse;
        const parsedJson = await fetchResponse.json();
        if (fetchResponse.ok === false) throw new Error(parsedJson.message);
        responseCache.set(cacheKey, parsedJson);
        return parsedJson;
      });

      pendingRequests.set(cacheKey, fetchPromise);
      json = await fetchPromise;
      pendingRequests.delete(cacheKey);
    } catch (err) {
      pendingRequests.delete(cacheKey);
      json = null;
      setError(err.message);
    } finally {
      setData(json);
      setLoading(false);
      return { response, json };
    }
  }, []);

  return {
    data,
    error,
    loading,
    request,
  };
};

export default useFetch;
