import PostCard from '@/components/PostCard';
import { getAllPosts, getAllProjects, Post } from '@/lib/data';

export default async function Home() {
  const posts: Post[] = getAllPosts();
  const projects: Post[] = getAllProjects();

  return (
    <div className="container mx-auto">
      <div className="space-y-12">
        <section id="posts">
          <h2 className="text-3xl font-bold mb-6">Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard route='/posts' key={post.slug} slug={post.slug} title={post.title} date={post.date} />
            ))}
          </div>
        </section>

        <section id="projects">
          <h2 className="text-3xl font-bold mb-6">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <PostCard route='/projects' key={project.slug} slug={project.slug} title={project.title} date={project.date} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}