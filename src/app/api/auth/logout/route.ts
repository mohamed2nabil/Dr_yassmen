import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  cookieStore.delete('admin_session');
  
  // Redirect to login page
  const loginUrl = new URL('/admin/login', request.url);
  return NextResponse.redirect(loginUrl);
}
