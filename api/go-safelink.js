export default function handler(req, res) {

  const url = "https://safelinkmu.com/xxxxx"

  res.writeHead(302, {
    Location: url
  })

  res.end()
}
