import PostCard from '@/components/PostCard';
import ProjectCard from '@/components/ProjectCard';
// 1. Import the new utility functions
import { getAllPosts, getAllProjects, Post } from '@/lib/data'; 


// 2. Make the page component an async Server Component
export default async function Home() {
  
  // 3. Call the data fetching functions (these run on the server)
  const posts: Post[] = getAllPosts();
  const projects: Post[] = getAllProjects();

  return (
    <div className="space-y-12">
      
      <section id="posts">
        <h2 className="text-3xl font-bold mb-6">Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.slug} slug={post.slug} title={post.title} />
          ))}
        </div>
      </section>

      <section id="projects">
        <h2 className="text-3xl font-bold mb-6">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.slug} slug={project.slug} title={project.title} />
          ))}
        </div>
      </section>
    </div>
  );
}