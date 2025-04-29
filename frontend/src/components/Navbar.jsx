import React, { useState } from 'react';
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from '@clerk/clerk-react';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="navbar bg-base-100 shadow-sm px-4">
      {/* Left - Brand */}
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">WhatsApp</a>
      </div>

      {/* Mobile toggle button */}
      <div className="lg:hidden">
        <button
          className="btn btn-ghost btn-circle"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Right - Menu (hidden on mobile, visible on large screens) */}
      <div className="hidden lg:flex gap-3 items-center">
        <SignedOut>
          <SignInButton mode="modal">
            <button className="btn btn-outline btn-accent btn-sm rounded-full px-4">
              Sign In
            </button>
          </SignInButton>
          <SignUpButton mode="modal">
            <button className="btn btn-accent btn-sm rounded-full px-4 text-white">
              Sign Up
            </button>
          </SignUpButton>
        </SignedOut>

        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>

      {/* Mobile dropdown menu (only visible when menuOpen is true) */}
      {menuOpen && (
        <div className="absolute top-16 right-4 bg-base-100 shadow-lg rounded-box w-48 p-4 flex flex-col gap-2 lg:hidden z-50">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="btn btn-outline btn-accent btn-sm rounded-full w-full">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="btn btn-accent btn-sm rounded-full w-full text-white">
                Sign Up
              </button>
            </SignUpButton>
          </SignedOut>

          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      )}
    </div>
  );
}

export default Navbar;
