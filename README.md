# Kıvılcım Creative Collective

Kıvılcım is a full-stack community platform for a fictional creative technology
and social-impact collective. It was rebuilt as a portfolio project with an
original editorial identity, realistic product flows, and demo-ready content.

## Product scope

- Responsive, motion-led public showcase
- Database-managed project portfolio
- Studio journal with shareable story pages
- Multi-step collective application flow
- Role-based studio authentication
- Application, project, and publishing dashboards
- Curated sample content for an empty database state

## Stack

Next.js 15, React 19, TypeScript, Tailwind CSS 4, Framer Motion, Prisma,
PostgreSQL/Neon, Better Auth, and BlockNote.

## Local setup

```bash
npm install
npx prisma generate
npx prisma migrate deploy
npm run dev
```

Your `.env` file must define `DATABASE_URL`, `BETTER_AUTH_SECRET`, and
`BETTER_AUTH_URL` at minimum.

## Access model

The public application form creates accounts with the `user` role. Only an
`admin` account can enter the studio dashboard. Projects and journal stories
are published from the protected workspace.
