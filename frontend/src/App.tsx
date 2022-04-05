import { gql, useQuery } from "@apollo/client"
import { NewUserForm } from "./components/NewUserForm";

type IUserProps = {
  id: string;
  name: string;
  email: string;
}

export const GET_USER = gql`
  query {
    users {
      id
      name
      email
    }
  }
`;

export default function App() {
  const { data, loading } = useQuery<{ users: IUserProps[] }>(GET_USER);

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <>
      {data?.users.map(user => (
        <ul key={user.id}>
          <li >{user.name}</li>
          <li>{user.email}</li>
        </ul>
      ))}

      <NewUserForm />
    </>
  )
}

