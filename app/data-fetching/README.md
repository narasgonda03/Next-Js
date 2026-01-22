# Client-Side Data Fetching Patterns

This folder demonstrates three different approaches to client-side data fetching in Next.js:

## 📁 Folder Structure

```
data-fetching/
├── page.tsx                    # Overview & comparison page
├── use-effect/
│   └── page.tsx               # useEffect implementation
├── swr/
│   └── page.tsx               # SWR (useSWR) implementation
└── components/
    ├── useEffectFetcher.ts    # Custom hook for useEffect
    └── useSWRFetcher.ts       # Wrapper for SWR
```

## 🔗 Routes

- `/data-fetching` - Main overview page with comparison table
- `/data-fetching/use-effect` - useEffect example with live demo
- `/data-fetching/swr` - SWR example with live demo

---

## 🪝 useEffect Approach

### When to Use:

- Learning React basics
- Simple fetching scenarios
- No external dependencies needed
- Small projects

### Code Structure:

```typescript
'use client';
import { useState, useEffect } from 'react';

export default function Component() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/data');
        setData(await res.json());
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;
  return <div>{/* render */}</div>;
}
```

### Pros & Cons:

✅ No dependencies  
✅ Full control  
✅ Standard React  
❌ Verbose code  
❌ No caching  
❌ Manual state management

---

## ⚡ SWR (useSWR)

### When to Use:

- Production applications
- Need caching & revalidation
- Complex data fetching
- Multiple components fetching same data

### Code Structure:

```typescript
'use client';
import useSWR from 'swr';

const fetcher = url => fetch(url).then(r => r.json());

export default function Component() {
  const { data, error, isLoading, mutate } = useSWR(
    '/api/data',
    fetcher
  );

  if (error) return <p>Failed</p>;
  if (isLoading) return <p>Loading...</p>;
  return <div>{/* render */}</div>;
}
```

### Pros & Cons:

✅ Automatic caching  
✅ Built-in states  
✅ Revalidation on focus  
✅ Request deduplication  
✅ Less boilerplate  
❌ Extra dependency  
❌ Learning curve

---

## 📊 Comparison Table

| Feature            | useEffect | SWR          |
| ------------------ | --------- | ------------ |
| **Caching**        | ❌        | ✅ Automatic |
| **Loading State**  | Manual    | ✅ Built-in  |
| **Error Handling** | Manual    | ✅ Built-in  |
| **Revalidation**   | Manual    | ✅ Automatic |
| **Dependencies**   | 0         | 1 (swr)      |
| **Bundle Size**    | Small     | ~4KB         |
| **Performance**    | Standard  | Optimized    |
| **Deduplication**  | ❌        | ✅           |
| **Focus Refetch**  | ❌        | ✅           |

---

## 🚀 Best Practices

### For useEffect:

```typescript
// ✅ Good: Dependency array specified
useEffect(() => {
  fetchData(userId);
}, [userId]); // Refetch when userId changes

// ❌ Bad: No dependency array
useEffect(() => {
  fetchData();
});

// ✅ Good: Cleanup function
useEffect(() => {
  let cancelled = false;
  const fetchData = async () => {
    const res = await fetch(url);
    if (!cancelled) setData(await res.json());
  };
  fetchData();
  return () => {
    cancelled = true;
  };
}, [url]);
```

### For SWR:

```typescript
// ✅ Good: Proper fetcher function
const fetcher = (url) => fetch(url).then((r) => r.json());

// ✅ Good: Config options
const { data } = useSWR("/api/data", fetcher, {
  revalidateOnFocus: true,
  dedupingInterval: 2000,
  errorRetryCount: 3,
});

// ✅ Good: Manual revalidation
const { mutate } = useSWR("/api/data", fetcher);
mutate(); // Revalidate when needed
```

---

## 📦 Installation

SWR is already installed. If needed:

```bash
npm install swr
```

---

## 🔄 Other Approaches (Not Covered Here)

- **React Query (TanStack Query)** - More powerful, similar to SWR
- **Axios** - HTTP client (use with useEffect or SWR)
- **Server Components** - Next.js 13+ approach (no useEffect needed)
- **Suspense** - React's experimental approach

---

## 💡 Tips

1. **Use SWR in production** - Better caching and UX
2. **Cleanup effects** - Prevent memory leaks with useEffect
3. **Handle loading states** - Always show loading UI
4. **Error boundaries** - Wrap components for better error handling
5. **Cache strategy** - Decide revalidation timing for your app

---

## 🔗 Resources

- [SWR Documentation](https://swr.vercel.app)
- [React useEffect Docs](https://react.dev/reference/react/useEffect)
- [Next.js Data Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching)
