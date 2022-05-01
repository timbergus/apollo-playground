import { PrismaClient } from '@prisma/client'
import { ApolloServer, gql } from 'apollo-server'

const prisma = new PrismaClient()

const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    name: String
    surname: String
    age: Int
    gender: String
  }

  type Product {
    id: ID!
    name: String!
    description: String
    color: String
  }

  type Query {
    user(id: ID!): User
    users: [User]
    product(id: ID!): Product
    products: [Product]
  }
`

const resolvers = {
  Query: {
    user: async (_: any, args: { id: number }) =>
      await prisma.user.findUnique({ where: { id: Number(args.id) } }),
    users: async () => await prisma.user.findMany(),
    product: async (_: any, args: { id: number }) =>
      await prisma.product.findUnique({ where: { id: Number(args.id) } }),
    products: async () => await prisma.product.findMany(),
  },
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
