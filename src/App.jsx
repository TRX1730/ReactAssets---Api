import React from 'react';
import { useApi } from './hooks/useApi';
import { useCrud } from './hooks/useCrud';

function App() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      
      <div style={{
        width: '100%',
        maxWidth: '800px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        
        <h1 style={{ 
          marginBottom: '40px', 
          color: '#1f2937',
          fontSize: '2.5rem',
          textAlign: 'center'
        }}>
          🌐 API Handler Demo
        </h1>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '30px',
          width: '100%'
        }}>
          <UsersDemo />
          <PostsDemo />
        </div>
      </div>
    </div>
  );
}

const UsersDemo = () => {
  const { data: users, loading, error, refetch } = useApi(
    'https://jsonplaceholder.typicode.com/users'
  );

  if (loading) return <DemoCard title="👥 Users" content="Loading..." />;
  if (error) return <DemoCard title="👥 Users" content={`Error: ${error}`} />;

  return (
    <DemoCard title="👥 Users (useApi)">
      <div style={{ marginBottom: '15px' }}>
        <button 
          onClick={refetch}
          style={buttonStyle('#3b82f6')}
        >
          🔄 Refetch
        </button>
      </div>
      {users?.slice(0, 3).map(user => (
        <div key={user.id} style={itemStyle}>
          <strong>{user.name}</strong>
          <br />
          <small>{user.email}</small>
        </div>
      ))}
    </DemoCard>
  );
};

const PostsDemo = () => {
  const { read, create, loading, error } = useCrud('/posts');

  const [posts, setPosts] = React.useState([]);

  const loadPosts = async () => {
    try {
      const data = await read();
      setPosts(data.slice(0, 3));
    } catch (err) {
      console.error('Failed to load posts:', err);
    }
  };

  const addPost = async () => {
    try {
      const newPost = {
        title: 'New Post',
        body: 'This is a new post created via API',
        userId: 1,
      };
      await create(newPost);
      loadPosts();
    } catch (err) {
      console.error('Failed to create post:', err);
    }
  };

  React.useEffect(() => {
    loadPosts();
  }, []);

  return (
    <DemoCard title="📝 Posts (useCrud)">
      <div style={{ marginBottom: '15px', display: 'flex', gap: '10px' }}>
        <button onClick={loadPosts} style={buttonStyle('#10b981')}>
          📥 Load Posts
        </button>
        <button onClick={addPost} style={buttonStyle('#f59e0b')}>
          ➕ Add Post
        </button>
      </div>
      
      {loading && <div>Loading...</div>}
      {error && <div style={{ color: '#ef4444' }}>Error: {error}</div>}
      
      {posts.map(post => (
        <div key={post.id} style={itemStyle}>
          <strong>{post.title}</strong>
          <br />
          <small>{post.body.slice(0, 50)}...</small>
        </div>
      ))}
    </DemoCard>
  );
};

const DemoCard = ({ title, children }) => (
  <div style={{
    padding: '25px',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  }}>
    <h3 style={{ marginBottom: '20px', color: '#1f2937' }}>{title}</h3>
    {children}
  </div>
);

const buttonStyle = (color) => ({
  padding: '10px 16px',
  backgroundColor: color,
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: '600',
});

const itemStyle = {
  padding: '12px',
  border: '1px solid #e5e7eb',
  borderRadius: '6px',
  marginBottom: '8px',
  backgroundColor: '#f9fafb'
};

export default App;