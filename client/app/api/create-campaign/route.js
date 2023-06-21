import { NextResponse } from 'next/server'
 
export async function GET() {
  const res = {}
  
  const data = await res.json()
 
  return NextResponse.json({ data })
}