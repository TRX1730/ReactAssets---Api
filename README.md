
## 📦 How to Use in Your Project

```
src/
├── hooks/
│   ├── useApi.js
│   └── useCrud.js
└── utils/
    └── apiClient.js
```


```jsx
import { useApi } from './hooks/useApi';

function UsersList() {
  const { data: users, loading, error } = useApi('https://api.example.com/users');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      {users?.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}
```



## 🛠️ API Reference

### useApi(url, options)
```jsx
const { 
  data,       // Response data
  loading,    // Loading state (boolean)
  error,      // Error message (string/null)
  refetch,    // Function to refetch data
  fetchData   // Function for custom calls
} = useApi('https://api.example.com/users', {
  autoFetch: true,    // Auto fetch on mount
  headers: {},        // Custom headers
  // ...other fetch options
});
```

### useCrud(endpoint)
```jsx
const {
  create,     // POST - Create new item
  read,       // GET - Read item(s)
  update,     // PUT - Update item
  remove,     // DELETE - Remove item
  loading,    // Loading state
  error       // Error message
} = useCrud('/api/users');
```

## 🎨 Usage Examples

### Basic data fetching:
```jsx
const { data: posts, loading } = useApi('/api/posts');
```

### Create new item:
```jsx
const { create } = useCrud('/api/posts');

const handleCreate = async () => {
  const newPost = await create({
    title: 'New Post',
    content: 'Post content'
  });
};
```

### Update item:
```jsx
const { update } = useCrud('/api/posts');

const handleUpdate = async (id) => {
  await update(id, {
    title: 'Updated Title'
  });
};
```

### Custom API call:
```jsx
const { fetchData } = useApi();

const customCall = async () => {
  const data = await fetchData('/api/search', {
    method: 'POST',
    body: JSON.stringify({ query: 'react' })
  });
};
```

## 🔧 Advanced Configuration

### Custom API client:
```jsx
import { apiClient } from './utils/apiClient';

// Custom API calls
const users = await apiClient.get('/users');
const newUser = await apiClient.post('/users', { name: 'John' });
```

### Error handling:
```jsx
const { data, error } = useApi('/api/users');

useEffect(() => {
  if (error) {
    showNotification(`API Error: ${error}`, 'error');
  }
}, [error]);
```

## 📁 Project Structure

```
api-handler/
├── src/
│   ├── hooks/
│   │   ├── useApi.js          # Main API hook
│   │   └── useCrud.js         # CRUD operations hook
│   ├── utils/
│   │   └── apiClient.js       # API client class
│   └── App.jsx                # Demo application
├── package.json
└── README.md
```

## 🌐 Supported APIs

Works with any REST API:
- **JSONPlaceholder** (demo data)
- **Your custom backend**
- **Third-party APIs**
- **GraphQL** (with customization)




**Twoja kolekcja React assets rośnie!** 🚀💪

Chcesz zrobić kolejny asset? Może **Form Handler** lub **Authentication System**? 😊
