const express = require("express");
const cors = require("cors");
const multer = require("multer");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());

const SECRET = "securevault_secret";

// =====================
// DB CONNECT
// =====================
// =====================
// DB CONNECT
// =====================
async function connectDB() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/securevault");
    console.log("MongoDB Connected ✅");
  } catch (err) {
    console.log("DB Error ❌", err);
  }
}

connectDB();

// =====================
// MULTER
// =====================
const storage = multer.memoryStorage();
const upload = multer({ storage });

// =====================
// MODELS
// =====================
const User = mongoose.model("User", {
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const Vault = mongoose.model("Vault", {
  username: String,
  title: String,
  description: String,
  password: String,
  fileName: String,
  fileType: String,
  fileData: String,
  createdAt: { type: Date, default: Date.now }
});

const Contact = mongoose.model("Contact", {
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// =====================
// AUTH MIDDLEWARE
// =====================
function auth(req, res, next) {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ message: "No token ❌" });

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded.username;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token ❌" });
  }
}
function adminAuth(req, res, next) {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ message: "No token ❌" });

  try {
    const decoded = jwt.verify(token, SECRET);

    if (!decoded.isAdmin) {
      return res.status(403).json({ message: "Admin only ❌" });
    }

    req.user = decoded.username;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token ❌" });
  }
}

// =====================
// REGISTER
// =====================
app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      return res.status(400).json({ message: "All fields required ❌" });

    if (password.length < 6)
      return res.status(400).json({ message: "Password min 6 chars ❌" });

    const exists = await User.findOne({ username });
    if (exists)
      return res.status(400).json({ message: "User already exists ❌" });

    const hashed = await bcrypt.hash(password, 10);

    await new User({ username, password: hashed }).save();

    res.json({ message: "Registered successfully ✅" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Register error ❌" });
  }
});

// =====================
// LOGIN
// =====================
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // ✅ ADMIN LOGIN (no DB needed)
  if (username === "admin" && password === "admin123") {
    const token = jwt.sign(
      { username: "admin", role: "admin" },
      SECRET
    );

    return res.json({
      message: "Admin login ✅",
      token,
      role: "admin",
    });
  }

  // 👤 NORMAL USER
  const user = await User.findOne({ username });
  if (!user) return res.status(401).json({ message: "Invalid ❌" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: "Invalid ❌" });

  const token = jwt.sign(
    { username, role: "user" },
    SECRET
  );

  res.json({
    message: "Login success ✅",
    token,
    role: "user", // ⭐ REQUIRED
  });
});
// =====================
// ADD ITEM
// =====================
app.post("/vault", auth, upload.single("file"), async (req, res) => {
  try {
    const { title, description, password } = req.body;

    if (!req.file)
      return res.status(400).json({ message: "File required ❌" });

    const newItem = new Vault({
      username: req.user,
      title,
      description,
      password,
      fileName: req.file.originalname,
      fileType: req.file.mimetype,
      fileData: req.file.buffer.toString("base64"),
    });

    await newItem.save();
    res.json(newItem);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Upload failed ❌" });
  }
});

// =====================
// GET VAULT
// =====================
app.get("/vault", auth, async (req, res) => {
  try {
    const items = await Vault.find({ username: req.user })
      .sort({ createdAt: -1 });

    res.json(items);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Fetch error ❌" });
  }
});

// =====================
// UPDATE
// =====================
app.put("/vault/:id", auth, async (req, res) => {
  try {
    const id = req.params.id;

    if (!id || id === "undefined")
      return res.status(400).json({ message: "Invalid ID ❌" });

    const updated = await Vault.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    res.json(updated);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Update failed ❌" });
  }
});

// =====================
// DELETE
// =====================
app.delete("/vault/:id", auth, async (req, res) => {
  try {
    const id = req.params.id;

    if (!id || id === "undefined")
      return res.status(400).json({ message: "Invalid ID ❌" });

    await Vault.findByIdAndDelete(id);

    res.json({ message: "Deleted ✅" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Delete failed ❌" });
  }
});

// =====================
// CONTACT
// =====================
app.post("/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message)
      return res.status(400).json({ message: "All fields required ❌" });

    const newMsg = new Contact({ name, email, message });
    await newMsg.save();

    res.json({ message: "Message stored ✅" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Contact failed ❌" });
  }
});

// =====================
// VIEW CONTACTS
// =====================
app.get("/contact", async (req, res) => {
  try {
    const msgs = await Contact.find().sort({ createdAt: -1 });
    res.json(msgs);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Fetch contacts failed ❌" });
  }
});
// DELETE CONTACT
app.delete("/contact/:id", async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ message: "Invalid ID ❌" });
    }

    await Contact.findByIdAndDelete(id);

    res.json({ message: "Deleted ✅" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Delete failed ❌" });
  }
});
// =====================
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});