'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/05_home/beforelogin'); // redirect ke halaman awal
  }, [router]);

  return null;
}
