"use client";
import { useState, useTransition } from 'react';

export default function Home() {
  const [ isPending, startTransition ] = useTransition();
  const [count, setCount] = useState(0);
  const handleClick = () => {
    if(isPending) return;
    startTransition(async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const posts = await response.json();
      startTransition(()=> {
          setCount(posts.length);
      })
    });
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <button type="button" onClick={handleClick}>
          Click Me
        </button>
        <h1>

          { isPending ? 'Loading...' : count }  
        </h1>
        <h2>
          {  `Real Count: ${ count }` }
        </h2>
      </main>
    </div>
  );
}
