export const fetcher = async (url, token) => {
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      token,
    },
  });

  return res.json();
};
