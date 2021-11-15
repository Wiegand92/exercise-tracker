import 'regenerator-runtime';

const exerciseAPI = {
  add: async (data, token) => {
    if (!!token) {
      const response = await fetch('/exercises/add', {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'x-access-token': token},
        body: JSON.stringify(data),
      });
      return response;
    }
  },
  delete: async (exercise, token) => {
    const response = await fetch(`/exercises/${exercise._id}`, {
      method: 'DELETE',
      headers: {'x-access-token': token},
    });
    return response;
  },
  update: async (exercise, data, token) => {
    const response = await fetch(`/exercises/update/${exercise._id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
      body: JSON.stringify(data),
    });
    return response;
  },
  get: async () => {
    const response = await fetch('/exercises');
    return response.json();
  },
  getById: async id => {
    const response = await fetch(`/exercises/${id}`);
    return response.json();
  },
};

export default exerciseAPI;
