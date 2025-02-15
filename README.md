## Tech Stack

- Next.js 15 + React 18
- Tailwind CSS + Shadcn (Rechart, Radix UI,React Hook Form, etc.)
- Supabase
- React Dropzone
- Zod

## Requirement

- Node.js 18.18+

## Getting Started

Clone this project to your local machine, and run:

```bash
npm install
```

Create a `.env` file and add the following code:

```
NEXT_PUBLIC_SUPABASE_URL='<your_supabase_project>'
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your_supabase_anon_key>
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Our Priority

- **Low Budget**

  - Supabase: Free, $25 if you want to scale up.
  - Vercel: Free, $20 if you want to scale up.

- **Technology Minimization**
  - Supabase: Covers database, OAuth, and cloud file storage, everything needed for this project.
  - Vercel: Used for hosting the Next.js application.

- ENV EXAMPLE
```
NODE_ENV =development
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
DATABASE_URL=
# DOMAIN_URL =yourdomain.vercel.app
DOMAIN_URL=http://localhost:3000/
NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY=
```
