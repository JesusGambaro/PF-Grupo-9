const { Review, User, Product } = require("../db.js")
const { sendError } = require("../helpers/error.js")
const { roundRating } = require("../helpers/rating.js")
const { verifyToken } = require("../helpers/verify.js")

module.exports = {
  postReview: async (req, res) => {
    const { description, rating, model, brand } = req.body
    try {
      const decodedToken = await verifyToken(req, res)
      const ownerReview = await User.findOne({ where: { id: decodedToken.id } })
      const review = await Review.create({
        description,
        rating,
      })
      const productReviewed = await Product.findAll({ where: { model, brand } })
      await ownerReview.addReview(review)
      await review.addProducts(productReviewed)
      const countRating = await Review.findAll({
        include: { model: Product, where: { brand, model } },
      })
      let total = 0
      countRating.forEach((review) => (total += review.rating))
      const productRating = roundRating(total / countRating.length)
      await Product.update(
        { rating: productRating, ratingAmount: countRating.length },
        { where: { model, brand } }
      )
      return res.send({ msg: "Thanks for your review" })
    } catch (error) {
      sendError(res, error)
    }
  },
}
