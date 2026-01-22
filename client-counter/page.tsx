"use client";
import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    
    </button>
  );
}
// This Next.js page component implements a simple counter that increments the count each time the button is clicked.