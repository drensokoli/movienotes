import { Html, Head, Main, NextScript } from 'next/document'
import { Analytics } from '@vercel/analytics/react';
import { useEffect } from 'react';

export default function Document({ }: any) {
  return (
    <Html lang="en">
      <title>ClickNotes</title>
      <meta name="ClickNotes" content="Keeping track of your favourite movies, made easier" />
      <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.5/flowbite.min.js" defer></script>

      <Head />
      <body>
        <Main />
        <NextScript />
        <Analytics />
      </body>
    </Html>
  )
}
