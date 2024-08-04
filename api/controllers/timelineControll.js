const db = require("../connection");

// show project profile ======================================
const ProjectTimeLine = async (req, res) => {
  try {
    const { projectId } = req.params; // Correctly destructure projectId from req.params

    // SQL query to retrieve project timeline with project name
    const sql = `
      SELECT ProjectTimeLine.*, ProjectProfile.ProjectName
      FROM ProjectTimeLine
      JOIN ProjectProfile ON ProjectTimeLine.ProjectId = ProjectProfile.id 
      WHERE ProjectTimeLine.ProjectID = ?`;

    // Execute the query with projectId parameter
    await db.query(sql, [projectId], (error, result) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: "Database query error" });
        return;
      }

      // Send the query result as JSON response
      res.status(200).json(result);
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// input data to projectTimeline =================================
const timelineCreate = async (req, res) => {
  const { SEQNumber, ProjectID, Development, Testing, CustomerReview, GoLive } =
    req.body;
  console.log(req.body);

  // Validate required fields
  // if (
  //   !SEQNumber ||
  //   !ProjectID ||
  //   !Development ||
  //   !Testing ||
  //   !CustomerReview ||
  //   !GoLive
  // ) {
  //   return res
  //     .status(400)
  //     .json({ message: "All fields are required", status: -1 });
  // }

  try {
    // Convert ISO 8601 strings to SQL datetime format
    const formattedDevelopment = new Date(Development)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    const formattedTesting = new Date(Testing)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    const formattedCustomerReview = new Date(CustomerReview)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    const formattedGoLive = new Date(GoLive)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    // Insert data into the database
    const sql = `
      INSERT INTO ProjectTimeLine (SEQNumber, ProjectID, Development, Testing, CustomerReview, GoLive)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
      sql,
      [
        SEQNumber,
        ProjectID,
        formattedDevelopment,
        formattedTesting,
        formattedCustomerReview,
        formattedGoLive,
      ],
      (err, result) => {
        if (err) {
          console.error("Database error:", err);
          return res.status(500).json({ message: "Database error" });
        }
        res
          .status(201)
          .json({ message: "Project added successfully", status: 1 });
      }
    );
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { ProjectTimeLine, timelineCreate };
