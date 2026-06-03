import { useState, useEffect, useRef } from 'react';

export function useApi(url, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const abortRef = useRef(null);

  useEffect(() => {
    if (!url) return;
    abortRef.current?.abort();
    abortRef.current = new AbortController();
    setLoading(true);
    fetch(url, { signal: abortRef.current.signal })
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(e => { if (e.name !== 'AbortError') { setError(e); setLoading(false); } });
    return () => abortRef.current?.abort();
  }, deps);

  return { data, loading, error };
}
