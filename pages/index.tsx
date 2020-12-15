import { useEffect, useState } from 'react';
import Post from '../components/Post';
import { createClient } from 'contentful';

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

function HomePage() {
  async function fetchEntries() {
    const entries = await client.getEntries({
      content_type: 'trip',
    });
    if (entries.items) return entries.items;
  }

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function getPosts() {
      const allPosts = await fetchEntries();
      setPosts([...allPosts]);
    }
    getPosts();
  }, []);

  return (
    <>
      {posts.length > 0
        ? posts.map(p => (
            <Post
              alt={p.fields.alt}
              date={p.fields.date}
              key={`${p.fields.titel}${p.fields.title}`}
              image={p.fields.image}
              title={p.fields.titel ? p.fields.titel : p.fields.title}
              url={p.fields.url}
              body={p.fields.body}
            />
          ))
        : null}
    </>
  );
}

export default HomePage;
