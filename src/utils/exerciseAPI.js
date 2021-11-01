const exerciseAPI = {
  add: (data, token, history) => {
    if (!!token) {
      console.log(data);
      fetch('/exercises/add', {
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
        .then(error => {
          if (!!error) {
            alert(error);
          }
        });
    } else {
      alert('You are not logged in!');
    }
  },
  delete: (exercise, token, history) => {
    fetch(`/exercises/${exercise._id}`, {
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
      .then(error => {
        if (!!error) {
          alert(error);
        }
      });
  },
  update: (exercise, data, token, history) => {
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
          history.push('/');
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
  getById: (setExercise, id) => {
    fetch(`/exercises/${id}`)
      .then(response => response.json())
      .then(data => setExercise({...data}))
      .catch(err => console.error(err));
  },
};

export default exerciseAPI;
