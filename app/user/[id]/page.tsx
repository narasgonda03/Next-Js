export default function UserPage({ params }: { params: { id: string } }) {
  return <h2>User ID: {params.id}</h2>;
}

// This Next.js page component retrieves the user ID from the URL parameters and displays it.