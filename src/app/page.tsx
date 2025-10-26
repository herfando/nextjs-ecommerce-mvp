import { redirect } from 'next/navigation';

export default function RootPage() {
  redirect('/05_home');
  return null; 
}