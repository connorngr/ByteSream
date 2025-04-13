// src/app/components/Newsletter.tsx
"use client"
import React from 'react';

export default function Newsletter() {
    return (
        <section className="bg-neutral-50 py-12">
            <div className="container mx-auto px-6 md:px-12">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="font-bold text-2xl md:text-3xl mb-4">Stay updated with our newsletter</h2>
                    <p className="text-neutral-600 mb-6">
                        Get the latest articles and insights delivered to your inbox weekly.
                    </p>
                    <form className="flex flex-col gap-3 max-w-md mx-auto">
                        <div className="flex flex-col sm:flex-row gap-3 w-full">
                            <div className="relative flex-grow">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <input
                                    type="email"
                                    placeholder="Your email address"
                                    className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="px-6 py-2 rounded-md transition duration-300 ease-in-out bg-primary-500 text-white hover:bg-primary-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                                Subscribe
                            </button>
                    </form>
                </div>
            </div>
        </section>
    );
}