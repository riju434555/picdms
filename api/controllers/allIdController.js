const db = require("../connection");

// get all product manager (4) =====================================
const allProfile = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const sql = "SELECT * FROM UserCredential WHERE UserRoleID = ?";
    await db.query(sql, [id], (error, result) => {
      res.json(result);
    });
    // await res.json(customers);
  } catch (err) {
    console.error(err);
    res.status(200).json({ error: "Internal Server Error" });
  }
};



module.exports = { allProfile };
