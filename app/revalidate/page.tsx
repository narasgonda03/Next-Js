export default async function RevalidatePage() {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/posts/3",
    { next: { revalidate: 10 } }
  );
  const data = await res.json();

  return <h2>{data.title}</h2>;
}
// This Next.js page component fetches data from an external API with a revalidation time of 10 seconds, ensuring that the data is refreshed at most every 10 seconds.