import React from 'react'

const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal bg-neutral text-neutral-content items-center p-3 pt-6 fixed bottom-0 w-full">
  <aside className="grid-flow-col items-center">
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
      className="fill-current">
    </svg>
    <p className="text-sm">© {new Date().getFullYear()} - All rights reserved</p>
  </aside>

  <nav className="hidden sm:grid grid-flow-col gap-4 md:place-self-center md:justify-self-end">
    {/* your social icons here */}
  </nav>
</footer>

  )
}

export default Footer
