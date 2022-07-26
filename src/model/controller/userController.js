const userModel = require("../userModel");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const validator = require("./src/validator/validation");

const createUser = async function (req, res) {
  try {
    const body = req.body;

    // valiadte boody

    if (!validator.isValidBody(body)) {
      return res
        .status(400)
        .send({ status: false, msg: "User body should not be empty" });
    }

    // Validate query (it must not be present)
    const query = req.query;
    if (validator.isValidBody(query)) {
      return res.status(400).send({ status: false, msg: "Invalid parameters" });
    }

    // Validate params (it must not be present)
    const params = req.params;
    if (validator.isValidBody(params)) {
      return res.status(400).send({ status: false, msg: "Invalid parameters" });
    }

    const {fname, lname,email, password } = body;

    

    // validate fname

    if (!validator.isValid(fname)) {
      return res
        .status(400)
        .send({ status: false, msg: "fname must be present" });
    }

    // validate lname

    if (!validator.isValid(lname)) {
        return res
          .status(400)
          .send({ status: false, msg: "lname must be present" });
      }

    // validate email
    if (!validator.isValid(email)) {
      return res
        .status(400)
        .send({ status: false, msg: "email must be present" });
    }

    // valid email syntax

    if (!validator.isValidEmail(email)) {
      return res
        .status(400)
        .send({ status: false, msg: "email must be proper format" });
    }

    // validate password

    if (!validator.isValid(password)) {
      return res
        .status(400)
        .send({ status: false, msg: "password must be required" });
    }

    // duplicate entries

    const isEmaleAlreadyused = await userModel.findOne({ email });

    if (isEmaleAlreadyused) {
      return res
        .status(400)
        .send({ status: false, msg: "email is already registerd" });
    } else {
      // encrypted password

      const encryptedPassword = await bcrypt.hash(password, 10);

      const userData = { fname, lname, email, password: encryptedPassword };

      const saveData = await userModel.create(userData);
      return res
        .status(201)
        .send({
          status: true,
          msg: "data created successfully",
          data: userData,
        });
    }
  } catch (err) {
    res.status(500).send({ status: false, mas: err.message });
  }
};

// user login logic

const login = async function (req, res) {
  try {
    const body = req.body;
    //Validate body
    if (!validator.isValidBody(body)) {
      return res
        .status(400)
        .send({ status: false, msg: "User body should not be empty" });
    }

    // Validate query (it must not be present)
    const query = req.query;
    if (validator.isValidBody(query)) {
      return res.status(400).send({ status: false, msg: "Invalid parameters" });
    }

    // Validate params (it must not be present)
    const params = req.params;
    if (validator.isValidBody(params)) {
      return res.status(400).send({ status: false, msg: "Invalid parameters" });
    }

    const { email, password } = body;

    // Validate email
    if (!validator.isValid(email)) {
      return res
        .status(400)
        .send({ status: false, message: "email must be present" });
    }

    // Validation of email id
    if (!validator.isValidEmail(email)) {
      return res
        .status(400)
        .send({ status: false, message: "Invalid email id" });
    }

    // Validate password
    if (!validator.isValid(password)) {
      return res
        .status(400)
        .send({ status: false, message: "password must be present" });
    }

    if (email && password) {
      let user = await userModel.findOne({ email });

      if (!user) {
        return res
          .status(404)
          .send({
            status: false,
            msg: "email is already exixt create new user",
          });
      }

      let pass = await bcrypt.compare(password, user.password);
      if (pass) {
        const Token = jwt.sign(
          {
            userId: user._id,
            exp: Math.floor(Date.noow() / 1000) + 60 * 60,
          },
          "rahul1234"
        );

        res.header("x-api-key", Token);
        return res
          .status(200)
          .send({
            status: true,
            message: "User login successfull",
            data: { userId: user._id, token: Token },
          });
      }else {
        return res.status(400).send({status: false, message:"Invalid password"})
    }
    }
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};

module.exports.createUser = createUser;
module.exports.login = login;
