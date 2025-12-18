import { Metadata } from 'next';
import Image from 'next/image';
import BlogCard from '@/components/ui/BlogCard';
import { getBlogPosts } from '@/lib/contentstack';

export const metadata: Metadata = {
  title: 'Journal',
  description: 'Stories, tips, and insights from behind the lens. Explore our blog for wedding photography inspiration and planning advice.',
};

// Enable ISR - revalidate every hour
export const revalidate = 3600;

export default async function JournalPage() {
  // Fetch blog posts from Contentstack
  const posts = await getBlogPosts();

  const featuredPost = posts[0];
  const otherPosts = posts.slice(1);

  return (
    <>
      {/* Page Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=1920&q=80"
            alt="Journal hero"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-charcoal-900/50" />
        </div>
        <div className="relative z-10 text-center">
          <h1 className="font-serif text-display text-cream-100 mb-4">
            Journal
          </h1>
          <p className="font-script text-3xl text-sepia-300">
            Stories & Insights
          </p>
        </div>
      </section>

      {/* Blog Content */}
      <section className="section bg-cream-100">
        <div className="container-wide">
          {posts.length > 0 ? (
            <>
              {/* Featured Post */}
              {featuredPost && (
                <div className="mb-20">
                  <p className="text-caption uppercase tracking-[0.2em] text-sepia-600 mb-8">
                    Latest Story
                  </p>
                  <BlogCard post={featuredPost} index={0} variant="featured" />
                </div>
              )}

              {/* Divider */}
              {otherPosts.length > 0 && (
                <>
                  <div className="w-full h-px bg-charcoal-200 mb-16" />

                  {/* All Posts Grid */}
                  <div>
                    <p className="text-caption uppercase tracking-[0.2em] text-sepia-600 mb-10">
                      All Stories
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                      {otherPosts.map((post, index) => (
                        <BlogCard key={post.uid} post={post} index={index} />
                      ))}
                    </div>
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <p className="text-charcoal-600 mb-4">Journal posts coming soon...</p>
              <p className="text-charcoal-500 text-sm">
                Check back later for stories, tips, and insights from behind the lens.
              </p>
            </div>
          )}

          {/* Pagination placeholder */}
          {posts.length > 0 && (
            <div className="mt-16 flex justify-center">
              <nav className="flex items-center space-x-4">
                <button
                  disabled
                  className="px-4 py-2 text-caption uppercase tracking-widest text-charcoal-400 cursor-not-allowed"
                >
                  Previous
                </button>
                <span className="text-charcoal-600">1 of 1</span>
                <button
                  disabled
                  className="px-4 py-2 text-caption uppercase tracking-widest text-charcoal-400 cursor-not-allowed"
                >
                  Next
                </button>
              </nav>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="section-sm bg-charcoal-900 text-cream-100">
        <div className="container-narrow text-center">
          <h2 className="font-serif text-heading-lg mb-4">
            Stay Connected
          </h2>
          <p className="text-cream-300 mb-8 max-w-md mx-auto">
            Subscribe to receive the latest stories, photography tips, and exclusive content.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 bg-charcoal-800 border border-charcoal-700 text-cream-100 placeholder-cream-500 focus:outline-none focus:border-sepia-500 transition-colors"
            />
            <button
              type="submit"
              className="px-8 py-4 bg-sepia-600 text-cream-100 text-caption uppercase tracking-widest hover:bg-sepia-700 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
