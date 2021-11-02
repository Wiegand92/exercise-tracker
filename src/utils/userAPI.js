const userAPI = {
  add: (user, setUsername, setPassword) => {
    fetch('/users/add', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(user),
    })
      .then(() => {
        setUsername('');
        setPassword('');
        alert('User Created!');
      })
      .catch(err => alert(`Error: ${err}`));
  },

  login: (user, history) => {
    fetch('/users/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(user),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.user) {
          localStorage.setItem('token', data.auth);
          history.push('/');
        }
      })
      .catch(err => console.error(err));
  },
};

export default userAPI;
