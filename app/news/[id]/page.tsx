type News = {
  id: number;
  title: string;
  body: string;
};

async function getSingleNews(id: string) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
    { cache: "no-store" } 
  );

  return res.json();
}

export default async function NewsDetail({
  params,
}: {
  params: { id: string };
}) {
  const news: News = await getSingleNews(params.id);

  return (
    <div style={{ padding: 20 }}>
      <h1>{news.title}</h1>
      <p>{news.body}</p>
    </div>
  );
}
