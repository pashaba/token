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
<title>Token Bot WhatsApp</title>

<style>
body{
  margin:0;
  font-family: system-ui, Arial;
  background: #f4f6fb;
  display:flex;
  align-items:center;
  justify-content:center;
  height:100vh;
  color:#111;
}

.card{
  background:#ffffff;
  padding:28px;
  border-radius:18px;
  width:92%;
  max-width:420px;
  text-align:center;
  box-shadow:0 12px 35px rgba(0,0,0,.08);
  border:1px solid #eef0f5;
}

h1{
  font-size:18px;
  margin-bottom:10px;
  font-weight:700;
}

.desc{
  font-size:13px;
  color:#555;
  line-height:1.5;
  margin-bottom:18px;
}

.code{
  font-size:28px;
  font-weight:800;
  letter-spacing:3px;
  color:#16a34a;
  background:#f0fdf4;
  padding:12px;
  border-radius:12px;
  margin:15px 0;
  border:1px dashed #86efac;
}

.btn{
  width:100%;
  padding:12px;
  border:none;
  border-radius:12px;
  font-size:15px;
  cursor:pointer;
  margin-top:10px;
  transition:.2s;
}

.copy{
  background:#111827;
  color:white;
}

.copy:hover{
  background:#1f2937;
}

.copy:active{
  transform:scale(.97);
}

.info{
  font-size:12px;
  color:#6b7280;
  margin-top:12px;
  line-height:1.4;
}

.number{
  font-weight:700;
  color:#111;
}
</style>
</head>

<body>

<div class="card">

  <h1>Ingin menjadi bot di WhatsApp?</h1>

  <div class="desc">
    Tenang, kami menyediakan jasa bot gratis.  
    Silakan ambil token di bawah ini dan kirim ke nomor kartu berikut untuk aktivasi.
  </div>

  <div class="code">${code}</div>

  <button class="btn copy" onclick="
    navigator.clipboard.writeText('.jadibot ${code} 6285846588583');
    this.innerText='✔ Tersalin!';
    setTimeout(()=>this.innerText='Copy Command',2000)
  ">
    Copy Command
  </button>

  <div class="info">
    Kirim ke bot dengan format:<br>
    <b>.jadibot ${code} 6285846588583</b><br><br>

    Kartu nomor: <span class="number">62858-6458-8583</span>
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
