const { Selang, History } = require("../models");
const moment = require('moment-timezone');
const cron = require('node-cron');
const { sendEmail } = require("../helpers/nodemailer");
const { Op } = require('sequelize');

const nowWIB = moment().format('YYYY-MM-DD');
moment.tz.setDefault('Asia/Jakarta');

class SelangController {
    static async getAllData(req, res) {
        try {
            const { search } = req.query

            if (search === undefined) {
                const response = await Selang.findAll({
                    order: [
                        ['createdAt', 'DESC']
                    ]
                });
                if (response.length === 0) {
                    return res.status(404).json({ message: "Data not found" });
                }
                return res.status(200).json(response);
            }

            const response = await Selang.findAll({
                where: {
                    [Op.or]: [
                        { unit: { [Op.iLike]: `%${search}%` } },
                        { component: { [Op.iLike]: `%${search}%` } },
                        { pn: { [Op.iLike]: `%${search}%` } },
                        { remark: { [Op.iLike]: `%${search}%` } },
                        { pic : {[Op.iLike]: `%${search}%` } }
                    ]
                },
                order: [
                    ['createdAt', 'DESC']
                ]
            });

            return res.status(200).json(response);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }


    static async getAssetById(req, res) {
        try {

            const { id } = req.params
            const response = await Selang.findOne({ where: { id } })
            if (!response) return res.status(404).json({ message: "Data not found" })
            res.status(200).json(response)
        } catch (error) {
            console.log(error)
        }
    }

    static async getMyData(req, res) {
        try {
            const { search } = req.query;

            if (search === undefined) {
                const response = await Selang.findAll({
                    where: {
                        userId: req.user.id
                    },
                    order: [
                        ['createdAt', 'DESC']
                    ]
                });
                if (response.length === 0) {
                    return res.status(404).json({ message: "Data not found" });
                }
                return res.status(200).json(response);
            }

            const response = await Selang.findAll({
                where: {
                    userId: req.user.id,
                    [Op.or]: [
                        { unit: { [Op.iLike]: `%${search}%` } },
                        { component: { [Op.iLike]: `%${search}%` } },
                        { pn: { [Op.iLike]: `%${search}%` } },
                        { remark: { [Op.iLike]: `%${search}%` } },
                        { pic : {[Op.iLike]: `%${search}%` } }
                    ]
                },
                order: [
                    ['createdAt', 'DESC']
                ]
            });

            return res.status(200).json(response);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    static async createData(req, res) {
        try {
            const { unit, component, pn, hmPenggantian, tanggalPenggantian, quantity, lifetime, target, remark, pic, notes } = req.body

            let response = await Selang.create({ unit, component, pn, hmPenggantian, tanggalPenggantian, quantity, lifetime, target, remark, userId: req.user.id, pic, notes })

            res.status(201).json(response)
        } catch (error) {
            console.log(error)
            if (error.name === "SequelizeValidationError") {
                return res.status(400).json({ message: error.errors[0].message })
            }
            if (error.name === "SequelizeUniqueConstraintError") {
                return res.status(400).json({ message: error.errors[0].message })
            }
            res.status(500).json({ message: "Internal server error" })
        }
    }

    static async deleteData(req, res) {
        try {
            const { id } = req.params
            const response = await Selang.findOne({ where: { id } })

            if (!response) return res.status(404).json({ message: "Data not found" })

            if (req.user.role === 'admin') {
                await response.destroy({ where: { id } })
                res.status(200).json({ message: "Data deleted successfully" })
                return
            }

            if (response.userId !== req.user.id) return res.status(403).json({ message: "Cannot delete other user's asset" })

            await response.destroy({ where: { id } })
            res.status(200).json({ message: "Data deleted successfully" })
        } catch (error) {
            console.log(error)
        }
    }

    static async updateData(req, res) {
        try {
            const { id } = req.params
            if (!id) return res.status(400).json({ message: "Asset ID is required" })
            const { unit, component, pn, tanggalPenggantian, hmPenggantian, quantity, lifetime, target, remark, pic, notes } = req.body
            const response = await Selang.findOne({ where: { id } })

            if (req.user.role === 'admin') {
                await response.update({ unit, component, pn, tanggalPenggantian, hmPenggantian, quantity, lifetime, target, remark, pic, notes, userId: req.user.id }, { where: { id } })
                res.status(200).json({ message: "Data updated successfully" })
                return
            }

            if (response.userId !== req.user.id) return res.status(403).json({ message: "Cannot update other user's asset" })

            await response.update({ unit, component, pn, quantity, lifetime, target, remark, userId: req.user.id }, { where: { id } })
            res.status(200).json({ message: "Data updated successfully" })
        } catch (error) {
            console.log(error)
            if (error.name === "SequelizeValidationError") {
                return res.status(400).json({ message: error.errors[0].message })
            }
            if (error.name === "SequelizeUniqueConstraintError") {
                return res.status(400).json({ message: error.errors[0].message })
            }
            res.status(500).json({ message: "Internal server error" })
        }
    }

    static async updateStatus(req, res) {
        try {
            // const { id } = req.params


            // const response = await Selang.findOne({ where: { id } })
            // await response.update({ status: false }, { where: { id } })

            // res.status(200).json({ message: "Asset status updated successfully" })
        } catch (error) {
            console.log(error)
        }
    }

    static async getAllHistory(req, res) {
        try {
            const { search } = req.query;

            if (search === undefined) {
                const response = await History.findAll({
                    order: [
                        ['createdAt', 'DESC']
                    ]
                });
                if (response.length === 0) {
                    return res.status(404).json({ message: "Data not found" });
                }
                return res.status(200).json(response);
            }

            const response = await History.findAll({
                where: {
                    [Op.or]: [
                        { unit: { [Op.iLike]: `%${search}%` } },
                        { component: { [Op.iLike]: `%${search}%` } },
                        { pn: { [Op.iLike]: `%${search}%` } },
                        { remark: { [Op.iLike]: `%${search}%` } },
                        { pic : {[Op.iLike]: `%${search}%` } }
                    ]
                },
                order: [
                    ['createdAt', 'DESC']
                ]
            });

            return res.status(200).json(response);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    static async updateHm(req, res) {
        try {
            const { lifetime, unit } = req.body;
            const response = await Selang.findAll({
                where: {
                    unit: unit
                }
            });

            const emails = ['syamsur.rijal@kppmining.com', 'reza.sukendi@kppmining.com', 'willy.fitriana@kppmining.com', 'herisusanto1@kppmining.com', 'nur.sholeh@kppmining.com', 'seeisfleur@gmail.com']
 
            if (response.length === 0) {
                return res.status(404).json({ message: "No records found for the specified unit" });
            }

            for (const selang of response) {
                if (lifetime < selang.hmPenggantian) return res.status(400).json({ message: "Lifetime cannot be less than HM Penggantian" });
                const sumLifetime = lifetime - selang.hmPenggantian
                const totalLifetime = selang.lifetime + sumLifetime

                await selang.update({ lifetime: totalLifetime });
                // jika berhasil update maka : 
                if (selang.target - selang.lifetime <= 250 || selang.target - selang.lifetime <= 500) {
                    sendEmail(emails, selang);
                }
            }

            res.status(200).json({ message: "Input HM successfully" });
        } catch (error) {
            console.log(error);
            console.error("Error updating HM:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    static async createHistory(req, res) {
        try {
            const { unit, component, pn, hmPenggantian, quantity, lifetime, target, remark, pic, notes } = req.body

            let response = await History.create({ unit, component, pn, hmPenggantian, tanggalPenggantian: nowWIB, quantity, lifetime, target, remark, userId: req.user.id, pic, notes })

            res.status(201).json(response)
        } catch (error) {
            console.log(error)
            if (error.name === "SequelizeValidationError") {
                return res.status(400).json({ message: error.errors[0].message })
            }
            if (error.name === "SequelizeUniqueConstraintError") {
                return res.status(400).json({ message: error.errors[0].message })
            }
            res.status(500).json({ message: "Internal server error" })
        }
    }

    static async getHistory(req, res) {
        try {
            const response = await History.findAll()
            res.status(200).json(response)
        } catch (error) {
            console.log(error)
        }
    }

    static async deleteHistory(req, res) {
        try {
            const { id } = req.params
            const response = await History.findOne({ where: { id } })

            if (!response) return res.status(404).json({ message: "Data not found" })

            if (req.user.role === 'admin') {
                await response.destroy({ where: { id } })
                res.status(200).json({ message: "Data deleted successfully" })
                return
            }

            if (response.userId !== req.user.id) return res.status(403).json({ message: "Cannot delete other user's asset" })

            await response.destroy({ where: { id } })
            res.status(200).json({ message: "Data deleted successfully" })
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = SelangController