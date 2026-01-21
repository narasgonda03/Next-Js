// export default function AdditionPage() {
//   const a = 5;
//   const b = 3;
//   const sum = a + b;

//   return (
//     <div>
//       <h1>Addition Result</h1>
//       <p>The sum of {a} and {b} is {sum}.</p>
//     </div>
//   );
// }

// // This is a simple Next.js page component that calculates the sum of two numbers and displays the result.
"use client";
import { useState } from "react";

export default function Home() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
// This Next.js page component implements a simple counter that increments the count each time the button is clicked.