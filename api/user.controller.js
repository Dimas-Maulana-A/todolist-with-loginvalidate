const models = require('./../models/index')
const users = models.user

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports ={
    controllerGetUser: async(req, res)=> {
        await users.findAll({
            attributes: {
                exclude: ["createdAt", "updatedAt"]
            }
        })
        .then(result=> {
            res.json({
                data: result
            })
        })
        .catch(err=> {
            console.log(err)
        })
    },
    controllerAddUser: async(req, res)=> {
        const {
            name, email, password
        } = req.body

        const salt = await bcrypt.genSalt()
        const hashed = await bcrypt.hash(password, salt)

        const data = {
            name: name,
            email: email,
            password: hashed
        }

        await users.create(data)
        .then(result=> {
            res.json({
                data: data
            })
        })
        .catch(err=> {
            console.log(err)
        })
    },
    controllerLogin: async(req, res)=> {
        const {email, password} = req.body
        await users.findOne({
            where: {
                email: email
            },
            attributes: {
                exclude: ["createdAt", "updatedAt"]
            }
        })
        .then(async result=> {
            const match = await bcrypt.compare(password, result.password)
            if(!match) res.json({message: "wrong password"})
            
            const emails = result.email
            const names = result.name

            const signs = jwt.sign({emails, names}, process.env.TOKEN)
            res.json({
                token: signs,
                datas: result
            })
        })
        .catch(err=> {
            res.json({
                message: "email not found"
            })
        })
    }
}