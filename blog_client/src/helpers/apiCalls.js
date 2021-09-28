import axios from "axios";
const serverUrl = 'http://localhost:5000';

export const createPost = async (data) => {
  try {
    const res = await axios.post(`${serverUrl}/posts`, data);
    return res;

  } catch (error) {
    return error;
  }
};


// export const getRecords = async () => {
//   try {
//     const data = await (await fetch(`${serverUrl}/records`)).json();
//     return data;
//   } catch (error) {
//     return error;
//   }
// };

// export const SignInUser = async (data) => {
//   try {
//     const res = await (
//       await fetch(`${serverUrl}/users/login`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(data),
//       })
//     ).json();
//     return res;
//   } catch (error) {
//     return error;
//   }
// };

// export const SignUpUser = async (data) => {
//   try {
//     const res = await (
//       await fetch(`${serverUrl}/users`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(data),
//       })
//     ).json();
//     return res;
//   } catch (error) {
//     return error;
//   }
// };

// export const updateUser = async (data) => {
//   try {
//     const res = await (
//       await fetch(`${serverUrl}/users/${data._id}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ cart: data.cart }),
//       })
//     ).json();
//     return res;
//   } catch (error) {
//     return error;
//   }
// };

