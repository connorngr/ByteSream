// src/app/components/common/Navbar.tsx
"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/app/contexts/AuthContext";
import Logo from "../navbar/Logo";
import CategoryDropdown from "../navbar/CategoryDropdown";
import SearchBar from "../navbar/SearchBar";
import AuthButtons from "../navbar/AuthButtons";
import UserMenu from "../navbar/UserMenu";
import Header from "./Header";
import { FiMenu, FiX, FiSearch } from "react-icons/fi";
import Link from "next/link";
import SavedArticlesPopup from '../articles/SaveArticlesPopup';

const Navbar = () => {
  const authContext = useAuth();
  const isLoggedIn = !!authContext?.user;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Handle window resize to check if we're on mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
        setIsSearchOpen(false);
      }
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Close search when opening menu
    if (!isMenuOpen) setIsSearchOpen(false);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    // Close menu when opening search
    if (!isSearchOpen) setIsMenuOpen(false);
  };

  return (
    <div className="sticky top-0 z-50">
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4 border-b border-gray-100">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Logo />

              {/* Categories - Only visible on desktop */}
              <div className="hidden md:block">
                <CategoryDropdown />
              </div>
            </div>

            {/* Search Bar - Only visible on desktop */}
            <div className="hidden md:block flex-1 max-w-md mx-8">
              <SearchBar />
            </div>

            {/* Desktop Auth Buttons or Profile */}
            <div className="hidden md:flex items-center">
              {isLoggedIn ? (
                <>
                  {authContext.user?.role !== 'ADMIN' && <SavedArticlesPopup />}
                  <UserMenu user={authContext.user} logout={authContext.logout} />
                  <p className="text-black px-5">Welcome, <span className="font-bold">{authContext.user?.email}</span></p>
                </>) : (
                <AuthButtons />
              )}
              {isLoggedIn && authContext.user?.role === 'ADMIN' && (
                <Link
                  href="/admin/articles"
                  className="block bg-primary rounded-2xl px-4 py-2 text-sm text-white hover:bg-gray-900"
                >
                  Admin Dashboard
                </Link>
              )}
            </div>

            {/* Mobile Controls */}
            <div className="flex items-center md:hidden">
              {/* Search Toggle Button */}
              <button
                onClick={toggleSearch}
                className="p-2 text-gray-600 hover:text-gray-900"
                aria-label="Toggle search"
              >
                <FiSearch size={24} />
              </button>

              {/* Menu Toggle Button */}
              <button
                onClick={toggleMenu}
                className="p-2 ml-2 text-gray-600 hover:text-gray-900"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Search - Only visible when toggled */}
          {isSearchOpen && isMobile && (
            <div className="py-3 px-2 border-t border-gray-100 md:hidden">
              <SearchBar />
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Menu - Only visible when toggled */}
      {isMenuOpen && isMobile && (
        <div className="bg-white border-b border-gray-200 py-4 px-4 md:hidden animate-fade-in-down">
          <div className="mb-4">
            <CategoryDropdown />
          </div>
          <div className="flex justify-center">
            {isLoggedIn ? (
              <div className="w-full">
                <UserMenu user={authContext.user} logout={authContext.logout} />
              </div>
            ) : (
              <AuthButtons isMobile={true} menuOpen={setIsMenuOpen} />
            )}
          </div>
        </div>
      )}

      <Header />
    </div>
  );
};

export default Navbar;