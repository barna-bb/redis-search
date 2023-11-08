import { useState } from 'react';

export default function SearchForm() {
  const [hits, setHits] = useState([]);

  const search = async (event) => {
    const q = event.target.value;

    if (q.length > 2) {
      const params = new URLSearchParams({ q });

      await fetch('/api/createIndex');

      const res = await fetch('/api/search?' + params);

      const result = await res.json();
      setHits(result['exercise']);
    }
  };

  return (
    <div>
      <input onChange={search} type="text" />

      <ul>
        {hits.map((hit) => (
            <li key={hit.entityId}>
              {hit.name} {hit.category} {hit.bodyPart}
            </li>
          ))}
      </ul>
    </div>
  );
}
