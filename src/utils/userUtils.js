// userUtils.js

// Function to retrieve the logged-in user from session storage
export const getLoggedInUser = () => {
    const userString = sessionStorage.getItem("user");
    const user = JSON.parse(userString);
    return user;
  };
  