import 'regenerator-runtime';

const exerciseAPI = {
  add: async (data, token, history) => {
    if (!!token) {
      await fetch('/exercises/add', {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'x-access-token': token},
        body: JSON.stringify(data),
      })
        .then(res => {
          if (res.status === 200) {
            history.push('/');
          } else {
            return res.json();
          }
        })
        .catch(error => {
          if (!!error) {
            alert(error);
          }
        });
    } else {
      alert('You are not logged in!');
    }
  },
  delete: async (exercise, token, history) => {
    await fetch(`/exercises/${exercise._id}`, {
      method: 'DELETE',
      headers: {'x-access-token': token},
    })
      .then(res => {
        if (res.status === 200) {
          history.push('/');
        } else {
          return res.json();
        }
      })
      .catch(error => {
        if (!!error) {
          alert(error);
        }
      });
  },
  update: async (exercise, data, token, history) => {
    await fetch(`/exercises/update/${exercise._id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
      body: JSON.stringify(data),
    })
      .then(res => {
        if (res.status === 200) {
          history.push('/');
        } else {
          return res.json();
        }
      })
      .catch(error => {
        alert(error);
      });
  },
  get: async setExercises => {
    await fetch('/exercises')
      .then(response => response.json())
      .then(exercisesList => setExercises(exercisesList))
      .catch(err => console.error(`Error: ${err}`));
  },
  getById: async (setExercise, id) => {
    await fetch(`/exercises/${id}`)
      .then(response => response.json())
      .then(data => setExercise({...data}))
      .catch(err => console.error(err));
  },
};

export default exerciseAPI;
