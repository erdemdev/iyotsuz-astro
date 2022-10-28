export async function gqlFetch(query: string, variables = {}) {
  const res = await fetch(import.meta.env.DIRECTUS_URL + '/graphql', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${import.meta.env.DIRECTUS_TOKEN}`,
    },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json();
  return json.data;
}
