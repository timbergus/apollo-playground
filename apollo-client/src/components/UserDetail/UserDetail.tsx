import { FC } from 'react'

import { useUser } from '../../api/useUser.hook'

type UserDetailProps = {
  id: string
}

export const UserDetail: FC<UserDetailProps> = ({ id }) => {
  const { loading, error, user } = useUser({ id: Number(id) })

  if (loading) return <div>Loading...</div>

  if (error) return <div>Error!</div>

  return <div>{user?.email}</div>
}
