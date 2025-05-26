/// <reference types="next" />
/// <reference types="next/types/global" />
/// <reference types="next/image-types/global" />

declare module 'next/font/google' {
  const Geist: any;
  const Geist_Mono: any;
  export { Geist, Geist_Mono };
}

declare module 'autoprefixer' {
  const autoprefixer: any;
  export default autoprefixer;
}

declare module 'next/navigation' {
  export function useRouter(): any;
  export function usePathname(): string;
  export function useSearchParams(): URLSearchParams;
}

declare module 'next/image' {
  const Image: any;
  export default Image;
}

declare module 'next/link' {
  const Link: any;
  export default Link;
}

declare module 'next/server' {
  export const NextResponse: any;
  export type NextRequest = any;
}
