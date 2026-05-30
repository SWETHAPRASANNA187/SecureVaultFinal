import dotenv from "dotenv";
dotenv.config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();

app.use(cors());
app.use(express.json());

const SECRET = process.env.JWT_SECRET;

// =====================
// MONGODB CONNECTION
// =====================
async function connectDB() {
  try {
    console.log("URI:");
console.log(process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected ✅");
  } catch (err) {
    console.error("MongoDB Error ❌", err);
    process.exit(1);
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
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Vault = mongoose.model("Vault", {
  username: String,
  title: String,
  description: String,
  password: String,
  fileName: String,
  fileType: String,
  fileData: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Contact = mongoose.model("Contact", {
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// =====================
// AUTH MIDDLEWARE
// =====================
function auth(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      message: "No token ❌",
    });
  }

  try {
    const decoded = jwt.verify(token, SECRET);

    req.user = decoded.username;

    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid token ❌",
    });
  }
}

function adminAuth(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      message: "No token ❌",
    });
  }

  try {
    const decoded = jwt.verify(token, SECRET);

    if (decoded.role !== "admin") {
      return res.status(403).json({
        message: "Admin only ❌",
      });
    }

    req.user = decoded.username;

    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid token ❌",
    });
  }
}

// =====================
// REGISTER
// =====================
app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "All fields required ❌",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters ❌",
      });
    }

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists ❌",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      password: hashedPassword,
    });

    await user.save();

    res.json({
      message: "Registered successfully ✅",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Register error ❌",
    });
  }
});

// =====================
// LOGIN
// =====================
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // ADMIN LOGIN
    if (username === "admin" && password === "admin123") {
      const token = jwt.sign(
        {
          username: "admin",
          role: "admin",
        },
        SECRET,
        {
          expiresIn: "1d",
        }
      );

      return res.json({
        message: "Admin Login ✅",
        token,
        role: "admin",
      });
    }

    // USER LOGIN
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials ❌",
      });
    }

    const match = await bcrypt.compare(
      password,
      user.password
    );

    if (!match) {
      return res.status(401).json({
        message: "Invalid credentials ❌",
      });
    }

    const token = jwt.sign(
      {
        username,
        role: "user",
      },
      SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.json({
      message: "Login successful ✅",
      token,
      role: "user",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Login failed ❌",
    });
  }
});

// =====================
// ADD VAULT ITEM
// =====================
app.post(
  "/vault",
  auth,
  upload.single("file"),
  async (req, res) => {
    try {
      const { title, description, password } = req.body;

      if (!req.file) {
        return res.status(400).json({
          message: "File required ❌",
        });
      }

      const item = new Vault({
        username: req.user,
        title,
        description,
        password,
        fileName: req.file.originalname,
        fileType: req.file.mimetype,
        fileData: req.file.buffer.toString("base64"),
      });

      await item.save();

      res.json(item);
    } catch (err) {
      console.error(err);

      res.status(500).json({
        message: "Upload failed ❌",
      });
    }
  }
);

// =====================
// GET VAULT ITEMS
// =====================
app.get("/vault", auth, async (req, res) => {
  try {
    const items = await Vault.find({
      username: req.user,
    }).sort({
      createdAt: -1,
    });

    res.json(items);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Fetch failed ❌",
    });
  }
});

// =====================
// UPDATE VAULT ITEM
// =====================
app.put("/vault/:id", auth, async (req, res) => {
  try {
    const updated = await Vault.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Update failed ❌",
    });
  }
});

// =====================
// DELETE VAULT ITEM
// =====================
app.delete("/vault/:id", auth, async (req, res) => {
  try {
    await Vault.findByIdAndDelete(req.params.id);

    res.json({
      message: "Deleted ✅",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Delete failed ❌",
    });
  }
});

// =====================
// CONTACT FORM
// =====================
app.post("/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const contact = new Contact({
      name,
      email,
      message,
    });

    await contact.save();

    res.json({
      message: "Message stored ✅",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Contact failed ❌",
    });
  }
});

// =====================
// GET CONTACTS
// =====================
app.get("/contact", adminAuth, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({
      createdAt: -1,
    });

    res.json(contacts);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Fetch failed ❌",
    });
  }
});

// =====================
// DELETE CONTACT
// =====================
app.delete("/contact/:id", adminAuth, async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);

    res.json({
      message: "Deleted ✅",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Delete failed ❌",
    });
  }
});

// =====================
// SERVER
// =====================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(
    `Server running on http://localhost:${PORT}`
  );
});
