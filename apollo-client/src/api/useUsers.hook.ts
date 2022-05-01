import { ApolloError, gql, useQuery } from '@apollo/client'

import { User } from '../types/user'

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      email
    }
  }
`

type UsersData = {
  users: User[]
}

type Response = {
  loading: boolean
  error?: ApolloError
  users?: User[]
}

export const useUsers = (): Response => {
  const { loading, error, data } = useQuery<UsersData>(GET_USERS, {
    fetchPolicy: 'cache-first',
  })
  return { loading, error, users: data?.users }
}
