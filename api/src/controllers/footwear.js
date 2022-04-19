const { Op, Sequelize, where } = require("sequelize")
const { Product, Image, Stock } = require("../db.js")

module.exports = {
  getAllFootwear: async (req, res) => {
    const { footwear } = req.query
    try {
      const allFootwears = await Product.findAll({
        attributes: { exclude: "description" },
        include: [
          {
            model: Image,
          },
          {
            model: Stock,
            where: {
              amount: { [Op.gt]: 0 },
            },
          },
        ],
      })
      if (footwear) {
        const footwearsSearched = await Product.findAll({
          where: {
            [Op.or]: [
              { model: { [Op.iLike]: `%${footwear}%` } },
              Sequelize.where(
                Sequelize.cast(Sequelize.col("brand"), "varchar"),
                {
                  [Op.iLike]: `%${footwear}%`,
                }
              ),
            ],
          },
          include: [
            {
              model: Image,
            },
            {
              model: Stock,
              where: {
                amount: { [Op.gt]: 0 },
              },
            },
          ],
        })

        return res.send(footwearsSearched)
      }
      return res.send(allFootwears)
    } catch (error) {
      console.log(error)
      res.status(404).send({ msg: error.message })
    }
  },
}
