'use client';

import React, { MouseEvent, useEffect, useState } from 'react';

interface Phrase {
  title: string;
  quote: string;
}

interface LoadingProps {
  // eslint-disable-next-line react/require-default-props
  text?: string;
  // eslint-disable-next-line react/require-default-props
  isServer?: boolean;
};

const phrases: Phrase[] = [
  { title: "Mycelium", quote: "Nature's underground internet" },
  { title: "Mushrooms", quote: "Earth's hidden treasures" },
  { title: "Bog", quote: "Where magic and mystery intertwine" },
  { title: "Bog Republic", quote: "Nature's resilient ecosystems" },
  { title: "Mycelium", quote: "The architects of the forest floor" },
  { title: "Mushrooms", quote: "Nature's fungal delicacies" },
  { title: "Bog", quote: "A sanctuary for unique plant life" },
  { title: "Bog Republic", quote: "Protecting biodiversity in wetlands" },
  { title: "Mycelium", quote: "Expanding the boundaries of our understanding" },
  { title: "Mushrooms", quote: "Nature's recyclers and decomposers" },
  { title: "Bog", quote: "An ancient landscape frozen in time" },
  { title: "Bog Republic", quote: "Guardians of pristine peatlands" },
  { title: "Mycelium", quote: "Unlocking the secrets of symbiotic relationships" },
  { title: "Mushrooms", quote: "A testament to nature's artistry" },
  { title: "Bog", quote: "A mosaic of colors and textures" },
  { title: "Bog Republic", quote: "Nature's resilient strongholds" },
  { title: "Mycelium", quote: "Building bridges between trees" },
  { title: "Mushrooms", quote: "From forest floor to gourmet plate" },
  { title: "Bog", quote: "An eerie and enchanting realm" },
  { title: "Bog Republic", quote: "Nature's water purification systems" },
];

function getRandomPhrase() {
  const randomIndex = Math.floor(Math.random() * phrases.length);
  return phrases[randomIndex];
}

export default function Loading({ text = '', isServer = false }: LoadingProps) {
  const [phrase, setPhrase] = useState<Phrase>(isServer ? phrases[0] : getRandomPhrase());
  const [tooLong, setTooLong] = useState(false);

  useEffect(() => {
    let requestId: number | null = null;
    let startTime = performance.now();

    const updatePhrase = () => {
      const currentTime = performance.now();
      const elapsed = currentTime - startTime;

      if (elapsed >= 3000) {
        setPhrase(getRandomPhrase());
        startTime = currentTime;
      }

      requestId = requestAnimationFrame(updatePhrase);
    };

    requestId = requestAnimationFrame(updatePhrase);

    return () => {
      if (requestId) {
        cancelAnimationFrame(requestId);
      }
    };
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setTooLong(true);
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  const handleClearCache = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    localStorage.clear();
  };

  const tooLongMessage = (
    <h5 className='w-4/5 text-lg text-center mt-6'>
      This is taking a while...have you checked your internet connection? Try clearing your cache if this persists.
    </h5>
  );

  return (
    <div className='w-full h-screen flex flex-col justify-center items-center -mt-28 text-2xl'>
      <h1 className='font-bold mb-4'>{text}</h1>
      <h2 className='font-semibold'>{phrase.title}</h2>
      <h5 className='w-4/5 text-xl text-center'>{phrase.quote}</h5>

      {tooLong && (
        <div className='flex flex-col justify-center items-center mt-20'>
          {tooLongMessage}
          <button
            type='button'
            onClick={handleClearCache}
            className='btn btn-outline w-4/5 mt-4'
          >
            Clear Cache
          </button>
        </div>
      )}
    </div>
  );
}
