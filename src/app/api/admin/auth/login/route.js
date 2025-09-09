import Admin from '@/models/admin'
import connectDB from '@/lib/DBconnection'
import jwt from 'jsonwebtoken'

export async function POST(req) {
  try {
    await connectDB()
    const { email, password } = await req.json()

    const admin = await Admin.findOne({ email })

    if (admin && (await admin.matchPassword(password))) {
      const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
      })

      return new Response(
        JSON.stringify({
          name: admin.name,
          token,
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    } else {
      return new Response(JSON.stringify({ message: 'Invalid email or password' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      })
    }
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}