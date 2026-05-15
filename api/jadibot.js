const SUPABASE_URL = "https://xcxciixqhmghitmyigbj.supabase.co"
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhjeGNpaXhxaG1naGl0bXlpZ2JqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODU2MzQ2MCwiZXhwIjoyMDk0MTM5NDYwfQ.Tzg34ww9r2X2WrZ9wcYoajoQUjUfRkOxnsdARskfvJE"
const PASTEEE_KEY = "aBbqpxRGdgFOdguu85oE8o2VtTxVxLOcjxuDgd0Pd"

export default async function handler(req, res) {
  try {
    const code = Math.random().toString(36).substring(2, 10).toUpperCase()

    // Simpan ke Supabase
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

    // Isi paste
    const pasteContent = `╔══════════════════════════════╗
  Phoenix Multi Device — Token Aktivasi
╚══════════════════════════════╝

TOKEN KAMU:
${code}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CARA AKTIVASI:
1. Kirim command berikut ke 6285864588583

   .jadibot ${code} 628xxxxxxxxxx

   Ganti 628xxxxxxxxxx dengan nomor
   yang ingin dijadikan bot.

   Contoh:
   .jadibot ${code} 6285715294

2. Tunggu respon otomatis dari bot
3. Bot kamu langsung aktif 🚀

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Ingin token baru?
Kunjungi: https://token-chi-seven.vercel.app/jadibot.html

Phoenix Multi Device • Free Activation System`

    // Buat paste baru di paste.ee
    const pasteRes = await fetch("https://api.paste.ee/v1/pastes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token": PASTEEE_KEY
      },
      body: JSON.stringify({
        description: `Phoenix Token - ${code}`,
        sections: [
          {
            name: "activation",
            syntax: "text",
            contents: pasteContent
          }
        ]
      })
    })

    const pasteData = await pasteRes.json()

    if (!pasteData.link) {
      throw new Error("paste.ee gagal: " + JSON.stringify(pasteData))
    }

    // Redirect ke paste
    res.writeHead(302, { Location: pasteData.link })
    res.end()

  } catch (e) {
    console.error(e)
    res.status(500).send("error: " + e.message)
  }
}
