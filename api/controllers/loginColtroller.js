const db = require("../connection");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// 1st login =================================================
const loginControler = async (req, res) => {
  const { UserId, Password } = req.body; // Destructure UserId and Password from request body

  // Check if UserId and Password are provided
  if (!UserId || !Password) {
    res
      .status(200)
      .json({ msz: "userName and password are requited", status: -1 });
  } else {
    const query = "SELECT * FROM AdminUser WHERE UserId = ?";

    db.query(query, [UserId], async (err, result) => {
      if (err) {
        return res.status(200).json({ msz: "database errror", status: -1 });
      }

      if (result.length === 0) {
        return res.status(200).json({ status: -1, msz: "Invalid Credentials" });
      }
      const user = result[0];
      if (user.Password == Password) {
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
        res.json({ msz: "login successfully", token, status: 1 });
      } else {
        return res.status(200).json({ status: -1, msz: "Invalid Credentials" });
      }
    });
  }
};

// 2nd registration ============================================

const userRole = async (req, res) => {
  try {
    const sql = "SELECT  * FROM  UserRole";
    await db.query(sql, (error, result) => {
      res.json(result);
    });
    // await res.json(customers);
  } catch (err) {
    console.error(err);
    res.status(200).json({ error: "Internal Server Error" });
  }
};
//====================
const registerController = async (req, res) => {
  const {
    UserID,
    Password,
    FirstName,
    LastName,
    UserRoleID,
    MobileNumber,
    MobileNumberCCode,
    EmailAddress,
  } = req.body;

  // Validate required fields
  if (
    !UserID ||
    !Password ||
    !FirstName ||
    !LastName ||
    !UserRoleID ||
    !MobileNumber ||
    !MobileNumberCCode ||
    !EmailAddress
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Hash the password
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(Password, salt);
    console.log(Password);

    // Insert user into the database
    const sql = `
      INSERT INTO UserCredential (
        UserID,
        Password,
        FirstName,
        LastName,
        UserRoleID,
        MobileNumber,
        MobileNumberCCode,
        EmailAddress
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
      sql,
      [
        UserID,
        Password,
        FirstName,
        LastName,
        UserRoleID,
        MobileNumber,
        MobileNumberCCode,
        EmailAddress,
      ],
      (err, result) => {
        if (err) {
          console.error("Database error:", err);
          return res.status(500).json({ message: "Database error" });
        }
        res.status(201).json({ message: "User registered successfully" });
      }
    );
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
// 2nd login =================================================
const login2ndControler = async (req, res) => {
  const { EmailAddress, Password } = req.body;

  if (!EmailAddress || !Password) {
    res
      .status(200)
      .json({ msz: "EmailAddress and password are requited", status: -1 });
  } else {
    const query = "SELECT * FROM UserCredential WHERE EmailAddress = ?";

    try {
      db.query(query, [EmailAddress], async (err, result) => {
        if (err) {
          console.log(err);
          return res.status(200).json({ msz: "database1 errror", status: -1 });
        }

        if (result.length === 0) {
          return res
            .status(200)
            .json({ status: -1, msz: "Invalid Credentials" });
        }
        const user = result[0];

        // const passwordMatch = await bcrypt.compare(Password, user.Password);
        // const hashedPassword = await bcrypt.hash(Password, 10);

        if (Password == user.Password) {
          const token = jwt.sign({ Id: user.ID }, process.env.JWT_SECRET, {
            expiresIn: "8h",
          });
          res.json({ msz: "login successfully", user, token, status: 1 });
        } else {
          return res
            .status(200)
            .json({ status: -1, msz: "Invalid Credentials" });
        }
      });
    } catch (err) {
      res.steatus(500).json({ message: "database error", status: -1 });
    }
  }
};
module.exports = {
  loginControler,
  userRole,
  registerController,
  login2ndControler,
};
