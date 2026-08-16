import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';




export function proxy(request: NextRequest) {
 
  const token = request.cookies.get('access_token')?.value;
  
  const url = request.nextUrl.pathname;
console.log(token);

  // ۱. اگر کاربر لاگین نکرده است و می‌خواهد وارد پنل‌ها شود -> هدایت به لاگین
  if (!token) {
    if (url.startsWith('/administrative-affairs') ) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  if (token) {
    
  if (token && url === '/') {
    return NextResponse.redirect(new URL('/auth-check', request.url));
  }
  }

  return NextResponse.next();
}


export const config = {
  matcher: ['/administrative-affairs/:path', '/', '/auth-check'],
};
