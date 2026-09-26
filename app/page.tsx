import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ padding: '50px', fontFamily: 'sans-serif' }}>
      <h1>Qrid.me Dashboard</h1>
      <p>Welcome to the Proof of Concept.</p>
      <Link href="/tip-jar" style={{ color: 'blue', textDecoration: 'underline' }}>
        Go to the Tip Jar PoC →
      </Link>
    </div>
  );
}