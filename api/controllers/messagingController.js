const db = require("../connection");

// show project profile ======================================
// const messageControll = async (req, res) => {
//   try {
//     const { projectId } = req.params; // Destructure projectId from req.params

//     const sql =
//       "SELECT * FROM CustomerMessageMapping WHERE ProjectProfileID = ?";

//     await db.query(sql, [projectId], (error, result) => {
//       if (error) {
//         console.error(error);
//         return res
//           .status(500)
//           .json({ message: "Error in retrieving data", status: -1 });
//       }

//       return res.status(200).json(result);
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

const messageControll = async (req, res) => {
  try {
    const { projectId } = req.params;

    const sql =
      "SELECT * FROM vwCustomerMessageMapping WHERE ProjectProfileID = ?";

    db.query(sql, [projectId], (error, result) => {
      if (error) {
        console.error(error);
        return res
          .status(500)
          .json({ message: "Error in retrieving data", status: -1 });
      }

      return res.status(200).json(result);
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const messageCreateController = async (req, res) => {
  const {
    CustomerProfileID,
    ProjectProfileID,
    UserCredentialID,
    ChatMessage,
    ChatType,
    ChatDirection,
    CurrentStatus,
    NextFollowUpDateTime,
  } = req.body;

  // If any fields are missing, respond with an error

  if (
    !CustomerProfileID ||
    !ProjectProfileID ||
    !UserCredentialID ||
    !ChatMessage ||
    !ChatType
  ) {
    return res
      .status(200)
      .json({ message: "All fields are required1", status: -1 });
  }

  try {
    // Hash the password

    // Insert user into the database
    const sql = `
   INSERT INTO CustomerMessageMapping (
  CustomerProfileID,
  ProjectProfileID,
  UserCredentialID,
  ChatMessage,
  ChatType,
  ChatDirection,
  CurrentStatus,
  NextFollowUpDateTime
) VALUES (
 ?,?,?,?,?,?,?,?
);
`;

    db.query(
      sql,
      [
        CustomerProfileID,
        ProjectProfileID,
        UserCredentialID,
        ChatMessage,
        ChatType,
        ChatDirection,
        CurrentStatus,
        NextFollowUpDateTime,
      ],
      (err, result) => {
        if (err) {
          console.error("Database error:", err);
          return res.status(500).json({ message: "Database error" });
        }
        res
          .status(201)
          .json({ message: "project added successfully", status: 1 });
      }
    );
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = messageControll;

module.exports = {
  messageControll,
  messageCreateController,
};
