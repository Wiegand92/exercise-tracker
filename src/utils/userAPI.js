import 'regenerator-runtime';

const userAPI = {
  add: async user => {
    await fetch('/users/add', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(user),
    });
  },

  login: async user => {
    const data = await fetch('/users/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(user),
    });
    return data.json();
  },
};

export default userAPI;
