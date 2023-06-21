import { NextResponse } from 'next/server'
const submitTransaction = require('./path/to/gatewayApp.js');
 
export async function GET() {
  const res = {}
  
  const data = await res.json()
 
  return NextResponse.json({ data })
}