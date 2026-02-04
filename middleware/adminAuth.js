import jwt from 'jsonwebtoken'

const adminAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader) return res.json({ success: false, message: "Not Authorized" })

    const token = authHeader.split(" ")[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    if (decoded.email !== process.env.ADMIN_EMAIL) {
      return res.json({ success: false, message: "Not Authorized" })
    }

    next()
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: "Not Authorized" })
  }
}

export default adminAuth
  