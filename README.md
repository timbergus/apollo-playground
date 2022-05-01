# Apollo Playground

This is a project to test a Apollo based architecture. We have a server based on Apollo Server and Prisma over SQLite, and an application based on Apollo Client.

We are going to use Apollo client as a state manager too, creating reactive variables to store the application internal data, and reading it using `useQuery`.

## Apollo Server

To have a GraphQL playground to test your queries, you just need to navigate to the server [URL](http://localhost:4000).

## Prisma

If you do changes the Prisma schema, you need to push them to the database using the Prisma CLI: `npx prisma push`.

## Scripts

First of all, install the dependencies: `npm install`.

The first time you install the packages you need to generate the server, so `cd apollo-server` and then run `npx prisma generate`.

Then run the server: `npm run server`.

And finally, run the client: `npm run client`.

## Additional Scripts

To modify the database you can use Prisma CLI: `npx prisma studio`, inside the `apollo-server` folder.

## Resources

[Reactive variables](https://www.apollographql.com/docs/react/local-state/reactive-variables/)
