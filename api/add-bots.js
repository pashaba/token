const SUPABASE_URL = "https://xcxciixqhmghitmyigbj.supabase.co"
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhjeGNpaXhxaG1naGl0bXlpZ2JqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODU2MzQ2MCwiZXhwIjoyMDk0MTM5NDYwfQ.Tzg34ww9r2X2WrZ9wcYoajoQUjUfRkOxnsdARskfvJE"

export default async function handler(req, res) {

  const { phone, name, user_id } = req.body

  const check = await fetch(
    `${SUPABASE_URL}/rest/v1/bots?user_id=eq.${user_id}`,
    {
      headers:{
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`
      }
    }
  )

  const bots = await check.json()

  if(bots.length >= 5){
    return res.status(400).json({error:"Max 5 bot"})
  }

  await fetch(`${SUPABASE_URL}/rest/v1/bots`,{
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      apikey: SUPABASE_KEY,
      Authorization:`Bearer ${SUPABASE_KEY}`
    },
    body:JSON.stringify({
      phone,
      name,
      user_id,
      status:"pending",
      created_at:Date.now()
    })
  })

  res.json({ok:true})
}
