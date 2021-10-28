const exerciseAPI = {
  add: (data, token) => {
    fetch('/exercises/add', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    })
      .then(res => {
        if (res.status === 200) {
          window.location = '/';
        } else {
          return res.json();
        }
      })
      .then(error => {
        if (!!error) {
          alert(error);
        }
      });
  },
  delete: (exercise, token) => {
    fetch(`/exercises/${exercise._id}`, {
      method: 'DELETE',
      headers: {'x-access-token': localStorage.getItem('token')},
    })
      .then(res => {
        if (res.status === 200) {
          window.location = '/';
        } else {
          return res.json();
        }
      })
      .then(error => {
        if (!!error) {
          alert(error);
        }
      });
  },
  update: (exercise, data, token) => {
    fetch(`/exercises/update/${exercise._id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
      body: JSON.stringify(data),
    })
      .then(res => {
        if (res.status === 200) {
          window.location = '/';
        } else {
          return res.json();
        }
      })
      .then(error => {
        if (!!error) {
          alert(error);
        }
      });
  },
  get: setExercises => {
    fetch('/exercises')
      .then(response => response.json())
      .then(exercisesList => setExercises(exercisesList))
      .catch(err => console.error(`Error: ${err}`));
  },
};

export default exerciseAPI;
