import type { NextPage } from 'next';
import { useRouter } from 'next/router';

const CategoryPage: NextPage = () => {
  const router = useRouter();
  const routedTopic = router.query.topic?.toString();

  return (
    <main>
      <h1>Category Page BOOOOOOO</h1>
      <h2>{routedTopic}</h2>
    </main>
  );
};

export default CategoryPage;
