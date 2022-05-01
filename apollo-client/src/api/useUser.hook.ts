import { ApolloError, gql, useQuery } from '@apollo/client'

import { User } from '../types/user'

const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      email
    }
  }
`

type UsersData = {
  user: User
}

type UserHookParams = {
  id: number
}

type UserHookReturn = {
  loading: boolean
  error?: ApolloError
  user?: User
}

export const useUser = ({ id }: UserHookParams): UserHookReturn => {
  const { loading, error, data } = useQuery<UsersData>(GET_USER, {
    fetchPolicy: 'cache-first',
    variables: { id },
  })
  return { loading, error, user: data?.user }
}
