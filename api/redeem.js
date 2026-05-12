import { createClient } from '@supabase/supabase-js'

// ⚠️ TEMP ONLY (testing)
const supabase = createClient(
  "https://xcxciixqhmghitmyigbj.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhjeGNpaXhxaG1naGl0bXlpZ2JqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODU2MzQ2MCwiZXhwIjoyMDk0MTM5NDYwfQ.Tzg34ww9r2X2WrZ9wcYoajoQUjUfRkOxnsdARskfvJE"
)

export default async function handler(req, res) {

  const code = Math.random().toString(36).substring(2, 10).toUpperCase()

  await supabase.from("redeems").insert({
    code,
    used: false,
    created_at: Date.now()
  })

  res.setHeader("Content-Type", "text/html")

  res.end(`
    <html>
      <body style="font-family:sans-serif;text-align:center;padding:40px">

        <h2>🎟️ Redeem Code</h2>

        <h1>${code}</h1>

        <p>Copy lalu kirim ke bot:</p>

        <div style="padding:10px;background:#eee;display:inline-block">
          .redeem ${code}
        </div>

        <br><br>

        <button onclick="
          navigator.clipboard.writeText('.redeem ${code}');
          this.innerText='Copied!'
        ">
          Copy
        </button>

      </body>
    </html>
  `)
}
