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
<title>Phoenix Bot Activation</title>

<style>
body{
  margin:0;
  font-family:system-ui, Arial;
  background: linear-gradient(135deg,#f8fafc,#eef2ff);
  display:flex;
  align-items:center;
  justify-content:center;
  min-height:100vh;
  color:#0f172a;
  padding:20px;
}

/* BACKGROUND GLOW */
.bg{
  position:fixed;
  inset:0;
  overflow:hidden;
  z-index:0;
}

.glow{
  position:absolute;
  width:500px;
  height:500px;
  background:radial-gradient(circle,#60a5fa,#a78bfa);
  filter:blur(120px);
  opacity:.25;
  animation:float 10s infinite ease-in-out;
}

.glow:nth-child(2){
  bottom:-150px;
  right:-150px;
}

.glow:nth-child(3){
  top:-120px;
  left:-120px;
  background:radial-gradient(circle,#34d399,#60a5fa);
}

@keyframes float{
  0%,100%{transform:translate(0,0);}
  50%{transform:translate(30px,-30px);}
}

/* CARD */
.card{
  position:relative;
  z-index:2;
  width:100%;
  max-width:520px;
  background:rgba(255,255,255,.75);
  backdrop-filter:blur(12px);
  border:1px solid rgba(255,255,255,.4);
  border-radius:20px;
  padding:28px;
  box-shadow:0 20px 60px rgba(0,0,0,.08);
}

.badge{
  display:inline-block;
  padding:6px 12px;
  background:#dbeafe;
  color:#2563eb;
  font-size:12px;
  border-radius:999px;
  margin-bottom:12px;
}

h1{
  font-size:20px;
  margin-bottom:8px;
}

.desc{
  font-size:13px;
  color:#475569;
  line-height:1.6;
  margin-bottom:18px;
}

/* TOKEN */
.code{
  font-size:26px;
  font-weight:800;
  letter-spacing:4px;
  text-align:center;
  padding:14px;
  background:#f1f5f9;
  border:1px dashed #94a3b8;
  border-radius:14px;
  color:#16a34a;
  margin-bottom:18px;
}

/* STEPS */
.steps{
  background:#ffffff;
  border:1px solid #e2e8f0;
  border-radius:14px;
  padding:14px;
  font-size:13px;
  color:#334155;
  margin-bottom:18px;
}

.steps b{
  color:#0f172a;
}

.number{
  font-weight:800;
  color:#2563eb;
}

/* BUTTON */
.btn{
  width:100%;
  padding:14px;
  border:none;
  border-radius:12px;
  font-weight:700;
  cursor:pointer;
  transition:.2s;
}

.btn-copy{
  background:linear-gradient(135deg,#3b82f6,#6366f1);
  color:white;
}

.btn-copy:hover{
  transform:translateY(-2px);
}

/* small text */
.small{
  font-size:11px;
  color:#64748b;
  text-align:center;
  margin-top:10px;
}
</style>
</head>

<body>

<div class="bg">
  <div class="glow"></div>
  <div class="glow"></div>
  <div class="glow"></div>
</div>

<div class="card">

  <div class="badge">🚀 Phoenix Multi Device Activation</div>

  <h1>Aktivasi Bot WhatsApp Gratis</h1>

  <div class="desc">
    Gunakan token di bawah untuk mengaktifkan akses bot Phoenix Multi Device secara gratis.
  </div>

  <div class="code">${code}</div>

  <button class="btn btn-copy" onclick="
    navigator.clipboard.writeText('.jadibot ${code} 628xxxxxx');
    this.innerText='✔ Command Tersalin!';
    setTimeout(()=>this.innerText='📋 Copy Command',2000)
  ">
    📋 Copy Command
  </button>

  <div class="steps">
    <b>📌 Cara Aktivasi:</b><br><br>

    1. Copy command di atas<br>
    2. Kirim ke nomor bot berikut:<br>
    👉 <span class="number">6285864588583</span><br><br>

    3. Tunggu respon otomatis dari bot<br>
    4. Bot kamu akan langsung aktif 🚀
  </div>

  <div class="small">
    Phoenix Multi Device • Free Activation System
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
