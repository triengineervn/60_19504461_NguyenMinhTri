// actions.js
export const loginUser = (user) => ({
  type: "LOGIN_USER",
  payload: user,
});

export const moneyIn = (data) => ({
  type: "MONEY_IN",
  payload: data,
})

export const moneyOut = (data) => ({
  type: "MONEY_OUT",
  payload: data,
})