import { useRouter } from 'next/router';

export default function CategoryPage() {
  const router = useRouter();
  const routedTopic = router.query.topic?.toString();

  return (
    <main>
      <h1>Category Page BOOOOOOO</h1>
      <h2>{routedTopic}</h2>
    </main>
  );
}
