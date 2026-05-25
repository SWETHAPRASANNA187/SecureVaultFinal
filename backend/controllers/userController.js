const model = require("../models/userModel");

// GET all
exports.getAllUsers = (req, res) => {
  res.json(model.getUsers());
};

// GET by ID
exports.getUser = (req, res) => {
  const id = parseInt(req.params.id);
  const user = model.getUserById(id);

  if (!user) {
    return res.status(404).json({ message: "Not found" });
  }

  res.json(user);
};

// POST
exports.createUser = (req, res) => {
  const { title, description, password, file } = req.body;

  if (!title || !description || !password) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const newUser = {
    id: Date.now(),
    title,
    description,
    password,
    file
  };

  model.addUser(newUser);

  res.status(201).json(newUser);
};

// PUT
exports.updateUser = (req, res) => {
  const id = parseInt(req.params.id);

  const updated = model.updateUser(id, req.body);

  if (!updated) {
    return res.status(404).json({ message: "Not found" });
  }

  res.json(updated);
};

// DELETE
exports.deleteUser = (req, res) => {
  const id = parseInt(req.params.id);

  const success = model.deleteUser(id);

  if (!success) {
    return res.status(404).json({ message: "Not found" });
  }

  res.json({ message: "Deleted" });
};