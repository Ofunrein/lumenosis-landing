'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function BlogRedirect() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace('/lead-magnet');
  }, [router]);
  
  return null;
}

