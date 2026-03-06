
import { fetchData } from './fetch.js';

// Tokenin haku
function getToken() {
  return (
    localStorage.getItem('token') ||
    localStorage.getItem('authToken') ||
    localStorage.getItem('user_token')
  );
}

// GET entry
const getEntries = async () => {
  const url = 'http://localhost:3000/api/entries';

  let headers = {};
  let token = getToken();
  if (token) {
    headers = { Authorization: `Bearer ${token}` };
  }

  const response = await fetchData(url, { headers });

  if (response.error) throw new Error(response.error);
  return response;
};

// POST entry
const createEntry = async (entryData) => {
  const url = 'http://localhost:3000/api/entries';

  let token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };

  const response = await fetchData(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(entryData)
  });

  if (response.error) throw new Error(response.error);
  return response;
};


// DELETE entry
const deleteEntry = async (id) => {
  const url = `http://localhost:3000/api/entries/${id}`;

  const token = getToken();
  const headers = {
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };

  const response = await fetchData(url, {
    method: 'DELETE',
    headers
  });

  if (response.error) throw new Error(response.error);
  return response; // tai pelkkä true, jos API palauttaa 204 No Content
};

export { getEntries, createEntry, deleteEntry };




