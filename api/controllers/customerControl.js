const db = require("../connection");

// get all customer =====================================
const customerProfile = async (req, res) => {
  try {
    const sql = "SELECT * FROM CustomerProfile";
    await db.query(sql, (error, result) => {
      res.json(result);
    });
    // await res.json(customers);
  } catch (err) {
    console.error(err);
    res.status(200).json({ error: "Internal Server Error" });
  }
};

// create new customer ======================================
const registerCustomerController = async (req, res) => {
  const {
    FirstName,
    LastName,
    CompanyName,
    CompanyAddress,
    PhoneNumber,
    WhatsAppNumber,
    Email,
    Picture,
    UserCredentialID,
    CountryID,
    StateRegionCountyID,
    CityID,
    Location,
    ZipPinEIRCode,
    ShopName,
    OwnerName,
    BillingName,
    ManagerName,
    ManagerContactNumber,
    Website,
    CommentRemarks,
    BusinessAreaDomain,
    ApproxTurnoverInLakh,
    Logo,
  } = req.body;

  // Validate required fields
  if (
    !FirstName ||
    !LastName ||
    !CompanyName ||
    !CompanyAddress ||
    !UserCredentialID ||
    !ZipPinEIRCode
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Hash the password
    // const hashedPassword = await bcrypt.hash(Password, 10);

    // Insert user into the database
    const sql = `
    INSERT INTO CustomerProfile (
      FirstName,
      LastName,
      CompanyName,
      CompanyAddress,
      PhoneNumber,
      WhatsAppNumber,
      Email,
      Picture,
      UserCredentialID,
      CountryID,
      StateRegionCountyID,
      CityID,
      Location,
      ZipPinEIRCode,
      ShopName,
      OwnerName,
      BillingName,
      ManagerName,
      ManagerContactNumber,
      Website,
      CommentRemarks,
      BusinessAreaDomain,
      ApproxTurnoverInLakh, Logo
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    db.query(
      sql,
      [
        FirstName,
        LastName,
        CompanyName,
        CompanyAddress,
        PhoneNumber,
        WhatsAppNumber,
        Email,
        Picture,
        UserCredentialID,
        CountryID,
        StateRegionCountyID,
        CityID,
        Location,
        ZipPinEIRCode,
        ShopName,
        OwnerName,
        BillingName,
        ManagerName,
        ManagerContactNumber,
        Website,
        CommentRemarks,
        BusinessAreaDomain,
        ApproxTurnoverInLakh,
        Logo,
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

// edit customer ==============================================
const editCustomerController = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const {
    FirstName,
    LastName,
    CompanyName,
    CompanyAddress,
    PhoneNumber,
    WhatsAppNumber,
    Email,
    Picture,
    UserCredentialID,
    CountryID,
    StateRegionCountyID,
    CityID,
    Location,
    ZipPinEIRCode,
    ShopName,
    OwnerName,
    BillingName,
    ManagerName,
    ManagerContactNumber,
    Website,
    CommentRemarks,
    BusinessAreaDomain,
    ApproxTurnoverInLakh,
    Logo,
  } = req.body;

  // Validate required fields for editing
  if (!id) {
    return res
      .status(400)
      .json({ message: "UserCredentialID is required for editing" });
  }

  try {
    // Update customer profile in the database
    const sql = `
      UPDATE CustomerProfile
      SET FirstName=?, LastName=?, CompanyName=?, CompanyAddress=?, 
          PhoneNumber=?, WhatsAppNumber=?, Email=?, Picture=?, 
          CountryID=?, StateRegionCountyID=?, CityID=?, Location=?, 
          ZipPinEIRCode=?, ShopName=?, OwnerName=?, BillingName=?, 
          ManagerName=?, ManagerContactNumber=?, Website=?, 
          CommentRemarks=?, BusinessAreaDomain=?, ApproxTurnoverInLakh=?, Logo=?
      WHERE ID= ?
    `;

    db.query(
      sql,
      [
        FirstName,
        LastName,
        CompanyName,
        CompanyAddress,
        PhoneNumber,
        WhatsAppNumber,
        Email,
        Picture,
        CountryID,
        StateRegionCountyID,
        CityID,
        Location,
        ZipPinEIRCode,
        ShopName,
        OwnerName,
        BillingName,
        ManagerName,
        ManagerContactNumber,
        Website,
        CommentRemarks,
        BusinessAreaDomain,
        ApproxTurnoverInLakh,
        Logo,
        id,
      ],
      (err, result) => {
        if (err) {
          console.error("Database error:", err);
          return res.status(500).json({ message: "Database error" });
        }
        res
          .status(200)
          .json({ message: "Customer updated successfully", status: 1 });
      }
    );
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  customerProfile,
  registerCustomerController,
  editCustomerController,
};
