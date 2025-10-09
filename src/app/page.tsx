import { redirect } from 'next/navigation';

export default function RootPage() {
  redirect('/buyer/before_login');
  return null; 
}