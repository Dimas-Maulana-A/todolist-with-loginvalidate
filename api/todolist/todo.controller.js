const models = require('./../../models/index')
const todo = models.todolist

module.exports = {
    controllerGetTodo: async(req, res)=> {
        await todo.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
            include: [
                {
                    model: models.user,
                    as: 'users',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    }
                }
            ]
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

    controllerGetTodoById: async(req, res)=> {
        await todo.findOne({
            where: {
                id: req.params.id
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
            include: [
                {
                    model: models.user,
                    as: 'users',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    }
                }
            ]
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

    controllerGetTodoByUser: async(req, res) => {
        await todo.findAll({
            where: {
                user: req.params.user
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
            include: [
                {
                    model: models.user,
                    as: 'users',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    }
                }
            ]
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

    controllerAddTodo: async(req, res)=> {
        const {
            project, description, user
        } = req.body

        const data = {
            project: project,
            description: description,
            status: false,
            user: user
        }

        await todo.create(data)
        .then(result=> {
            res.json({
                data: data
            })
        })
        .catch(err=> {
            console.log(err)
        })
    },

    controllerUpdateTodo: async(req, res)=> {
        const {
            project, description
        } = req.body

        const data = {
            project: project,
            description: description
        }

        await todo.update(data, {
            where: {id: req.params.id}
        })
        .then(result=> {
            res.json({
                data: data
            })
        })
        .catch(err=> {
            console.log(err)
        })
    },

    controllerUpdateStatus: async(req, res)=> {
        await todo.findOne({
            where: {
                id: req.params.id
            }
        })
        .then(async result=> {
            const data = {
                status: !result.status
            }
            await todo.update(data, {
                where: {id: req.params.id}
            })
            .then(results=> {
                res.json({
                    data: data
                })
            })
            .catch(err=> {
                console.log(err)
            })
        })
        .catch(err=> {
            console.log(err)
        })
    },

    controllerDeleteTodo: async(req, res)=> {
        await todo.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(result=> {
            res.json({
                message: 'data was deleted'
            })
        })
        .catch(err=> {
            console.log(err)
        })
    }
}