
export const BASE_URL = 'https://auth.nomoreparties.co';

const checkResponse = (res) => {
  if (res.ok) {    
    return res.json();
  }
  // если ошибка, отклоняем промис
  return Promise.reject(`Ошибка: ${res.status}`);
  //return res.json()
  //    .then((data) => {        
  //      throw new Error(data.message);
  //    });
};

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {      
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      password,
      email})
  })
  .then(checkResponse)
  //.then((response) => {
  //  try {
  //    if (response.ok){
  //      return response.json();
  //    }
  //  } catch(e){
  //    return (e)
  //  }
  //})
  //.then((res) => {
  //  return res;
  //})
  //.catch((err) => console.log(err));
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {      
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password})
      
  })
  .then(checkResponse)
  //.then((response => response.json()))
  //.then((data) => {
  //  if (data.jwt){
  //    localStorage.setItem('jwt', data.jwt);
  //    return data;
  //  } else {
  //    return;
  //  }
  //})
  //.catch(err => console.log(err))
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {      
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(checkResponse)
  //.then(res => res.json())
  //.then(data => data)
}