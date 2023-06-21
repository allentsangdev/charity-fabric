import { NextResponse } from 'next/server'
const { main } = require('.././charity-gateway/enrollUser.js');

export async function GET() {
  const res = await main()
  
  const data = await res.json()
 
  return NextResponse.json({ data })
}