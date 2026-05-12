const SUPABASE_URL = "https://xcxciixqhmghitmyigbj.supabase.co"
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhjeGNpaXhxaG1naGl0bXlpZ2JqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODU2MzQ2MCwiZXhwIjoyMDk0MTM5NDYwfQ.Tzg34ww9r2X2WrZ9wcYoajoQUjUfRkOxnsdARskfvJE"

export default async function handler(req, res) {
  try {

    const code = Math.random().toString(36).substring(2, 10).toUpperCase()

    await fetch(`${SUPABASE_URL}/rest/v1/redeems`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": SUPABASE_KEY,
        "Authorization": `Bearer ${SUPABASE_KEY}`,
        "Prefer": "return=representation"
      },
      body: JSON.stringify({
        code,
        used: false,
        created_at: Date.now()
      })
    })

    res.setHeader("Content-Type", "text/html")

    res.end(`
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>Redeem Code</title>

<style>
body{
  margin:0;
  font-family:Arial;
  background:linear-gradient(135deg,#0f172a,#1e293b);
  color:white;
  display:flex;
  align-items:center;
  justify-content:center;
  height:100vh;
}

.card{
  background:#111827;
  padding:25px;
  border-radius:16px;
  width:90%;
  max-width:380px;
  text-align:center;
  box-shadow:0 10px 30px rgba(0,0,0,.5);
}

h2{margin:0 0 10px 0}

.code{
  font-size:26px;
  font-weight:bold;
  color:#4ade80;
  margin:15px 0;
  letter-spacing:2px;
}

.btn{
  width:100%;
  padding:12px;
  border:none;
  border-radius:10px;
  font-size:16px;
  cursor:pointer;
  margin-top:10px;
}

.copy{
  background:#4ade80;
  color:black;
  font-weight:bold;
}

.copy:active{
  transform:scale(.97);
}

.hint{
  font-size:12px;
  color:#9ca3af;
  margin-top:10px;
}
</style>
</head>

<body>

<div class="card">

  <h2>🎟️ Redeem Code</h2>

  <div class="code" id="code">${code}</div>

  <button class="btn copy" onclick="
    navigator.clipboard.writeText('.redeem ${code}');
    this.innerText='Copied!';
    setTimeout(()=>this.innerText='Copy Command',2000)
  ">
    Copy Command
  </button>

  <div class="hint">
    Kirim ke bot: <br>
    <b>.redeem ${code}</b>
  </div>

</div>

</body>
</html>
    `)

  } catch (e) {
    console.log(e)
    res.status(500).send("error")
  }
}
