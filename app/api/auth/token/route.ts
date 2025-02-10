import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

async function GET() {
  const cookieStore = await cookies();
  const hankoJwt = cookieStore.get('hanko')?.value;

  if (!hankoJwt) {
    return NextResponse.json({ error: 'No JWT found' }, { status: 401 });
  }

  return NextResponse.json({ token: hankoJwt });
}

export default GET;