import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

type PostCardProps = {
  route: string;
  slug: string;
  title: string;
  // Optional: Add a brief excerpt or date to make the card look more like a "Post"
  date?: string; 
};

export default function PostCard({ route, slug, title, date }: PostCardProps) {
  
  // The 'slug' prop is now used by the Next.js <Link> component
  const hrefDestination = `${route}/${slug}`; 

  return (
    // 1. The <Link> component is now the element that handles the click/navigation.
    // Use the 'group' class here for unified hover effects across the card.
    <Link href={hrefDestination} className="block group text-current no-underline"> 
      
      {/* 2. The shadcn/ui Card replaces the outer <div> and provides structure */}
      <Card className="
        h-full 
        transition-all duration-300 ease-in-out 
        hover:border-primary/50 
        dark:hover:bg-gray-700
      ">
        
        <CardHeader className="pb-2">
          {/* 3. The title goes into the CardTitle element */}
          <CardTitle className="
            text-xl font-semibold 
            group-hover:text-primary 
            transition duration-300
          ">
            {title}
          </CardTitle>
        </CardHeader>
        
        {/* Optional: Use CardContent for meta info */}
        {date && (
          <CardContent>
             <p className="text-sm text-muted-foreground">
                Published on {date}
             </p>
          </CardContent>
        )}
        
      </Card>
    </Link>
  );
}