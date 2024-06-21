import { NextResponse } from 'next/server';

export async function GET(request) {
    console.log('Get Club Fetch Request Recieved')
  return NextResponse.json({ message: 'Heavy Club Created and Fetched' });
}

export async function POST(request) {
  console.log('Get Club Post Request Recieved')
  const res = await fetch('https://jsonplaceholder.typicode.com/todos/1')
  const data = await res.json()
  return NextResponse.json(data);
}
