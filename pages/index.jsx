import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  // redirect to invoices page to simulate login
  // plan is for the / route to be a login page
  useEffect(() => {
    router.push('/invoices');
  }, [router]);

  return <main>{/* TODO do some login stuff here */}</main>;
}
