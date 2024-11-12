
## Requirement

- Node.js v20.9.0+

## Getting Started

Clone this project to your local machine, and run:

```bash
npm install
```

Create a `.env` file and add the following code:

```
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://api.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID='<your_project_id_appwrite>'
NEXT_PUBLIC_DATABASE_APPWRITE_ID=<your_database_id_appwrite>
NEXT_PUBLIC_COLLECTION_PRODUK_ID=<your_collection_id_appwrite>
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Our Priority

- **Low Budget**
    - Appwrite: Free, $15 if you want to scale the project.
    - Vercel: Free, $20 if you want to scale the project.

- **Privacy**
    - In this project, we are starting to implement encryption for important data before storing it in the database.

- **Technology Minimization**
    - Appwrite: Covers database, OAuth, and cloud file storage, everything needed for this project.
    - Vercel: Used for hosting the Next.js application.

