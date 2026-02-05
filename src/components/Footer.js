import React from 'react';

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-neutral-200 dark:border-neutral-800 bg-transparent">
      <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between">
        <div>
          <div className="font-bold">Village World Homestay</div>
          <div className="text-sm">© {new Date().getFullYear()} Village World Homestay. All rights reserved.</div>
        </div>
        <div className="flex gap-4 mt-4 md:mt-0">
          <a aria-label="instagram" href="https://instagram.com/villageworldhomestay" className="text-sm">Instagram</a>
          <a aria-label="facebook" href="https://facebook.com/villageworldhomestay" className="text-sm">Facebook</a>
          <a aria-label="email" href="mailto:info@villageworldhomestay.com" className="text-sm">Email</a>
        </div>
      </div>
    </footer>
  );
}
