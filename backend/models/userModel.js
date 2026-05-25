// In-memory data (like your students array)

let users = [];

const getUsers = () => users;

const getUserById = (id) => {
  return users.find(u => u.id === id);
};

const addUser = (user) => {
  users.push(user);
  return user;
};

const updateUser = (id, data) => {
  const user = users.find(u => u.id === id);
  if (!user) return null;

  user.title = data.title || user.title;
  user.description = data.description || user.description;
  user.password = data.password || user.password;
  user.file = data.file || user.file;

  return user;
};

const deleteUser = (id) => {
  const index = users.findIndex(u => u.id === id);
  if (index === -1) return false;

  users.splice(index, 1);
  return true;
};

module.exports = {
  getUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser
};