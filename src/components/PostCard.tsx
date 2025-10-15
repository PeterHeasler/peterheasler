import Link from 'next/link';

type PostCardProps = {
  slug: string;
  title: string;
  // Optional: Add a brief excerpt or date to make the card look more like a "Post"
  date?: string; 
};

export default function PostCard({ slug, title, date }: PostCardProps) {
  return (
    <Link href={`/posts/${slug}`} className="block group">
      <div className="
        p-6 
        rounded-xl 
        border 
        shadow-lg 
        transition-all duration-300 ease-in-out 
        
        /* Light Mode Styling (Default) */
        bg-white 
        border-gray-200 
        hover:border-indigo-400 
        hover:shadow-xl
        
        /* Dark Mode Styling (Optimized) */
        dark:bg-gray-800 
        dark:border-gray-700 
        dark:shadow-none 
        dark:hover:border-indigo-500 
        dark:hover:bg-gray-700
      ">
        <h5 className="
          mb-1 
          text-xl font-semibold 
          tracking-tight 
          
          /* Text Hover Effect (Group Class allows Link to control h5) */
          text-gray-900 dark:text-gray-100 
          group-hover:text-indigo-600 dark:group-hover:text-indigo-400
          transition duration-300
        ">
          {title}
        </h5>
        
        {/* Optional: Added date/meta for a 'post' feel */}
        {date && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Published on {date}
          </p>
        )}

      </div>
    </Link>
  );
}