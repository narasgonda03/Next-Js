import Link from "next/link";

type News = {
  id: number;
  title: string;
  body: string;
};

async function getNews() {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=5",
    {
      next: { revalidate: 5 }, //
    }
  );

  return res.json();
}

export default async function NewsPage() {
  const news: News[] = await getNews();

  return (
    <div style={{ padding: 20 }}>
      <h1>📰 Latest News</h1>

      {news.map((item) => (
        <div key={item.id} style={{ marginBottom: 20 }}>
          <h3>{item.title}</h3>
          <p>{item.body.slice(0, 80)}...</p>

          <Link href={`/news/${item.id}`}>
            Read More →
          </Link>
        </div>
      ))}
    </div>
  );
}
