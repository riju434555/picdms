const db = require("../connection");

// show project profile ======================================
const ProjectProfile = async (req, res) => {
  try {
    const sql = "SELECT * FROM vwProjectProfile ";

    await db.query(sql, (error, result) => {
      res.status(200).json(result);
    });
    // await res.json(customers);
  } catch (err) {
    console.error(err);
    res.status(200).json({ error: "Internal Server Error" });
  }
};
// show vw project profile ======================================
const ProjectProfilevwByid = async (req, res) => {
  const { reqId } = req.params; // Assuming reqId is coming from the URL parameter

  try {
    const sql = "SELECT * FROM vwProjectProfile WHERE CustomerID = ?";
    const result = await db.query(sql, [reqId], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json(result);
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// show project profile ======================================
const ProjectProfileByid = async (req, res) => {
  const { reqId } = req.params; // Assuming reqId is coming from the URL parameter

  try {
    const sql = "SELECT * FROM ProjectProfile WHERE ID = ?";
    const result = await db.query(sql, [reqId], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json(result);
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// for ProjectType ================================================
const ProjectTypeController = async (req, res) => {
  try {
    const sql = "SELECT * FROM ProjectType";

    await db.query(sql, (error, result) => {
      res.status(200).json(result);
    });
    // await res.json(customers);
  } catch (err) {
    console.error(err);
    res.status(200).json({ error: "Internal Server Error" });
  }
};

// for ProjectType ================================================
const ProjectStatusController = async (req, res) => {
  try {
    const sql = "SELECT * FROM ProjectStatus";

    await db.query(sql, (error, result) => {
      res.status(200).json(result);
    });
    // await res.json(customers);
  } catch (err) {
    console.error(err);
    res.status(200).json({ error: "Internal Server Error" });
  }
};
// PiFrontEndTech ===============================================
const PiFrontEndTechController = async (req, res) => {
  try {
    const sql = "SELECT * FROM PiFrontEndTech";

    await db.query(sql, (error, result) => {
      res.status(200).json(result);
    });
    // await res.json(customers);
  } catch (err) {
    console.error(err);
    res.status(200).json({ error: "Internal Server Error" });
  }
};

// PiBackEndTech ============================================
const PiBackEndTechController = async (req, res) => {
  try {
    const sql = "SELECT * FROM PiBackEndTech";

    await db.query(sql, (error, result) => {
      res.status(200).json(result);
    });
    // await res.json(customers);
  } catch (err) {
    console.error(err);
    res.status(200).json({ error: "Internal Server Error" });
  }
};

// input data to projectProfile =================================
const projectCreateController = async (req, res) => {
  const {
    ProjectName,
    ProjectDetails,
    ProjectTypeID,
    ProjectSponsor,
    TechnologyStackDetails,
    FrontEndStackID,
    BackEndStackID,
    ServerName,
    DEVDBDetails,
    QADBDetails,
    PRODDBDetails,
    DEVURL,
    QAURL,
    PRODURL,
    ProjectStatusID,
    Developer1NameID,
    Developer2NameID,
    ProductManagerID,
    ProjectManagerID,
    TechnicalManagerID,
    TestManagerID,
    CustomerID,
  } = req.body;

  // Validate required fields
  const missingFields = [];

  if (!ProjectName) missingFields.push("ProjectName");
  if (!ProjectDetails) missingFields.push("ProjectDetails");
  if (!ProjectTypeID) missingFields.push("ProjectTypeID");
  if (!ProjectSponsor) missingFields.push("ProjectSponsor");
  if (!DEVDBDetails) missingFields.push("DEVDBDetails");
  if (!QADBDetails) missingFields.push("QADBDetails");
  if (!PRODDBDetails) missingFields.push("PRODDBDetails");

  if (!ProjectStatusID) missingFields.push("ProjectStatusID");
  if (!Developer1NameID) missingFields.push("Developer1NameID");
  if (!ProductManagerID) missingFields.push("ProductManagerID");
  if (!ProjectManagerID) missingFields.push("ProjectManagerID");
  if (!TechnicalManagerID) missingFields.push("TechnicalManagerID");
  if (!TestManagerID) missingFields.push("TestManagerID");
  if (!CustomerID) missingFields.push("CustomerID");

  // If any fields are missing, respond with an error
  // if (missingFields.length > 0) {
  //   return res.status(400).json({
  //     message: "Required fields are missing or invalid.",
  //     missingFields: missingFields,
  //     status: -1,
  //   });
  // }

  const sql = `
    INSERT INTO ProjectProfile (
        ProjectName,
ProjectDetails,
ProjectTypeID,
ProjectSponsor,
TechnologyStackDetails,
FrontEndStackID,
BackEndStackID,
ServerName,
DEVDBDetails,
QADBDetails,
PRODDBDetails,
DEVURL,
QAURL,
PRODURL,
ProjectStatusID,
Developer1NameID,
Developer2NameID,
ProductManagerID,
ProjectManagerID,
TechnicalManagerID,
TestManagerID,
CustomerID
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?,  ?, ?)
`;
  try {
    db.query(
      sql,
      [
        ProjectName,
        ProjectDetails,
        ProjectTypeID,
        ProjectSponsor,
        TechnologyStackDetails,
        FrontEndStackID,
        BackEndStackID,
        ServerName,
        DEVDBDetails,
        QADBDetails,
        PRODDBDetails,
        DEVURL,
        QAURL,
        PRODURL,
        ProjectStatusID,
        Developer1NameID,
        Developer2NameID,
        ProductManagerID,
        ProjectManagerID,
        TechnicalManagerID,
        TestManagerID,
        CustomerID,
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

// edit project =================================================
const projectEditController = async (req, res) => {
  const { id } = req.params;

  const {
    ProjectID, // Assuming ProjectID is used to identify the project to edit
    ProjectName,
    ProjectDetails,
    ProjectTypeID,
    ProjectSponsor,
    TechnologyStackDetails,
    FrontEndStackID,
    BackEndStackID,
    ServerName,
    DEVDBDetails,
    QADBDetails,
    PRODDBDetails,
    DEVURL,
    QAURL,
    PRODURL,
    ProjectStatusID,
    Developer1NameID,
    Developer2NameID,
    ProductManagerID,
    ProjectManagerID,
    TechnicalManagerID,
    TestManagerID,
    CustomerID,
  } = req.body;

  // Validate required fields for update
  const missingFields = [];
  if (!ProjectID) missingFields.push("ProjectID");
  if (!ProjectName) missingFields.push("ProjectName");
  if (!ProjectDetails) missingFields.push("ProjectDetails");
  if (!ProjectTypeID) missingFields.push("ProjectTypeID");
  if (!ProjectSponsor) missingFields.push("ProjectSponsor");
  if (!DEVDBDetails) missingFields.push("DEVDBDetails");
  if (!QADBDetails) missingFields.push("QADBDetails");
  if (!PRODDBDetails) missingFields.push("PRODDBDetails");
  if (!ProjectStatusID) missingFields.push("ProjectStatusID");
  if (!Developer1NameID) missingFields.push("Developer1NameID");
  if (!ProductManagerID) missingFields.push("ProductManagerID");
  if (!ProjectManagerID) missingFields.push("ProjectManagerID");
  if (!TechnicalManagerID) missingFields.push("TechnicalManagerID");
  if (!TestManagerID) missingFields.push("TestManagerID");
  if (!CustomerID) missingFields.push("CustomerID");

  // If any fields are missing, respond with an error
  // if (missingFields.length > 0) {
  //   return res.status(400).json({
  //     message: "Required fields are missing or invalid.",
  //     missingFields: missingFields,
  //     status: -1,
  //   });
  // }

  const sql = `
    UPDATE ProjectProfile SET
    ProjectName = ?,
    ProjectDetails = ?,
    ProjectTypeID = ?,
    ProjectSponsor = ?,
    TechnologyStackDetails = ?,
    FrontEndStackID = ?,
    BackEndStackID = ?,
    ServerName = ?,
    DEVDBDetails = ?,
    QADBDetails = ?,
    PRODDBDetails = ?,
    DEVURL = ?,
    QAURL = ?,
    PRODURL = ?,
    ProjectStatusID = ?,
    Developer1NameID = ?,
    Developer2NameID = ?,
    ProductManagerID = ?,
    ProjectManagerID = ?,
    TechnicalManagerID = ?,
    TestManagerID = ?,
    CustomerID = ?
    WHERE ID = ?
  `;

  try {
    db.query(
      sql,
      [
        ProjectName,
        ProjectDetails,
        ProjectTypeID,
        ProjectSponsor,
        TechnologyStackDetails,
        FrontEndStackID,
        BackEndStackID,
        ServerName,
        DEVDBDetails,
        QADBDetails,
        PRODDBDetails,
        DEVURL,
        QAURL,
        PRODURL,
        ProjectStatusID,
        Developer1NameID,
        Developer2NameID,
        ProductManagerID,
        ProjectManagerID,
        TechnicalManagerID,
        TestManagerID,
        CustomerID,
        id, // Include ProjectID for the WHERE clause
      ],
      (err, result) => {
        if (err) {
          console.error("Database error:", err);
          return res.status(500).json({ message: "Database error" });
        }
        res
          .status(200)
          .json({ message: "Project updated successfully", status: 1 });
      }
    );
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  ProjectProfile,
  projectCreateController,
  ProjectTypeController,
  ProjectStatusController,
  PiFrontEndTechController,
  PiBackEndTechController,
  ProjectProfileByid,
  ProjectProfilevwByid,
  projectEditController,
};
