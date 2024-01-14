import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white p-4 bottom-0 w-full flex flex-col items-center justify-center">
      <h1 className='text-gray-900 text-md'>Made with ❤️ by
        <span className="text-blue-600">
          <Link href="https://www.linkedin.com/in/dren-sokoli-0003a81a1/" target="_blank" aria-label='Dren Sokoli LinkedIn Profile'> Dren Sokoli</Link>
        </span>
      </h1>
      <p className="text-gray-900 mr-2  text-md ">
        &copy; {new Date().getFullYear()}{' '}
        <span className="text-blue-600">
          <Link href="https://github.com/drensokoli/clicknotes" target="_blank" aria-label='ClickNotes GitHub Repo'>ClickNotes</Link>
        </span>
      </p>
    </footer>
  );
};

export default Footer;