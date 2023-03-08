const models = require("../../models/index");
const users = models.user;

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  controllerGetUser: async (req, res) => {
    await users
      .findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"]
        }
      })
      .then(result => {
        res.json({
          data: result
        });
      })
      .catch(err => {
        console.log(err);
      });
  },
  controllerAddUser: async (req, res) => {
    const { name, email, password } = req.body;

    const salt = await bcrypt.genSalt();
    const hashed = await bcrypt.hash(password, salt);

    const data = {
      name: name,
      email: email,
      password: hashed
    };

    await users
      .create(data)
      .then(result => {
        res.json({
          data: data
        });
      })
      .catch(err => {
        console.log(err);
      });
  },
  controllerLogin: async (req, res) => {
    try {
      const user = await users.findOne({
        where: {
          email: req.body.email
        }
      });
      const match = await bcrypt.compare(req.body.password, user.password);
      if (!match) return res.status(400).json({ message: "Wrong Password" });

      const emails = user.email;
      const names = user.name;

      const signs = jwt.sign({ emails, names }, process.env.TOKEN);

      users
        .update(
          {
            token: signs
          },
          {
            where: {
              id: user.id
            }
          }
        )
        .then(async results => {
          const datas = await users.findOne({
            where: {
              id: user.id
            },
            attributes: {
              exclude: ["password", "createdAt", "updatedAt"]
            }
          });

          res
            .cookie("cookie_token", signs)
            .json({
              token: signs,
              data: datas
            })
        })
        .catch(err => {
          console.log(err);
        });
    } catch (error) {
      res.status(404).json({
        message: "Email not found"
      });
    }
  },

  controllerGetToken: async(req, res)=> {
    try {
        const getTokens = req.cookies.cookie_token
        if(!getTokens) return res.status(401)
        const user = await users.findOne({
            where: {
                token: getTokens
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'password']
            }
        })
        if(!user) return res.sendStatus(403);
        res.json({
            token: user
        })
    } catch (error) {
        console.log(error)
    }
  }
};
