export default function handler(req, res) {
  const commands = ["redeem", "limit", "xp", "bonus"]

  const code = Math.random().toString(36).substring(2, 10).toUpperCase()
  const command = commands[Math.floor(Math.random() * commands.length)]

  // kalau kamu mau kirim ke bot via redeem command
  const text = `.redeem ${code}`

  const waNumber = "6285864588583"
  const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`

  // OPTIONAL: kalau mau simpan ke log / DB nanti bisa di sini

  res.writeHead(302, {
    Location: waLink
  })
  res.end()
}
