const fetcher = async (url) => {
  const res = await fetch(url);
  console.log('fetcher');

  return res.json();
};

export default fetcher;
