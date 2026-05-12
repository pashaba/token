export default function handler(req, res) {

  const code = Math.random().toString(36).substring(2, 10).toUpperCase()

  res.status(200).json({
    message: "copy kode ini lalu redeem di bot",
    code: code
  })
}
