// src/app/components/Newsletter.tsx
export default function Newsletter() {
    return (
      <section className="bg-neutral-50 py-12">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-bold text-2xl md:text-3xl mb-4">Stay updated with our newsletter</h2>
            <p className="text-neutral-600 mb-6">
              Get the latest articles and insights delivered to your inbox weekly.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
              <button
                type="submit"
                className="bg-primary-600 text-white px-6 py-2 rounded-md hover:bg-primary-700 transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    );
  }