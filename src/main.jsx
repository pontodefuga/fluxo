import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const BlogPost = ({ date, content }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const stripHtml = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  };

  return (
    <Card className="mb-6 bg-white/5 hover:bg-white/10 transition-colors">
      <CardContent className="pt-6">
        <div className="text-sm text-gray-400 mb-2">
          {formatDate(date)}
        </div>
        <div className="prose prose-gray dark:prose-invert">
          {stripHtml(content)}
        </div>
      </CardContent>
    </Card>
  );
};

const Blog = () => {
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    const loadAllPosts = async () => {
      try {
        // First, fetch the list of files from the posts directory
        const response = await fetch('/posts/index.json');
        const fileList = await response.json();

        // Fetch content from each file
        const allPosts = await Promise.all(
          fileList.files.map(async (filename) => {
            const fileResponse = await fetch(`/posts/${filename}`);
            const fileData = await fileResponse.json();
            return fileData[0]; // Since each file contains an array with one entry
          })
        );

        // Sort all posts by date
        const sortedPosts = allPosts.sort((a, b) =>
          new Date(b.date) - new Date(a.date)
        );

        setPosts(sortedPosts);
      } catch (error) {
        console.error('Error loading posts:', error);
      }
    };

    loadAllPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <div className="max-w-2xl mx-auto p-6">
        <header className="mb-12 text-center">
          <h1 className="text-3xl font-bold mb-2">Daily Thoughts</h1>
          <p className="text-gray-400">A personal diary of reflections</p>
        </header>
        <main>
          {posts.map((post) => (
            <BlogPost
              key={post.slug}
              date={post.date}
              content={post.content}
            />
          ))}
        </main>
      </div>
    </div>
  );
};

export default Blog;
