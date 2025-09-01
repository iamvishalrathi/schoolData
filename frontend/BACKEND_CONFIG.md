# Backend Configuration

## How to Switch Between Local and Deployed Backend

The frontend can work with both your local backend server and the deployed backend on Render.

### Current Configuration

The API configuration is controlled by the `NEXT_PUBLIC_API_URL` environment variable in `.env.local`.

### To Use Local Backend (Default)

Make sure your `.env.local` file has:
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### To Use Deployed Backend

Update your `.env.local` file to:
```
NEXT_PUBLIC_API_URL=https://schooldata-f8m3.onrender.com
```

### Running the Frontend

After making changes to `.env.local`:

1. Restart your development server:
   ```bash
   npm run dev
   ```

2. The frontend will now use the configured backend URL for all API calls.

### Note

- Remember to restart the development server after changing environment variables
- The deployed backend URL is: https://schooldata-f8m3.onrender.com
- The local backend should be running on: http://localhost:5000
