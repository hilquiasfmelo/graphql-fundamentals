import { gql, useMutation } from "@apollo/client";
import { FormEvent, useState } from "react"

import { GET_USER } from "../App";

const CREATE_USER = gql`
  mutation($name: String!, $email: String!) {
    createUser(name: $name, email: $email) {
      id
      name
      email
    }
  }
`;

export function NewUserForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [createUser, { data, loading, error }] = useMutation(CREATE_USER);

  async function handleCreateUser(event: FormEvent) {
    event.preventDefault();

    if (!name && !email) {
      return;
    }

    await createUser({
      variables: {
        name,
        email
      },
      refetchQueries: [GET_USER]
    });

    console.log(data);
  }

  return (
    <form onSubmit={handleCreateUser}>
      <input type="text" value={name} onChange={e => setName(e.target.value)} /> <br />
      <input type="text" value={email} onChange={e => setEmail(e.target.value)} /> <br />
      <button type="submit">Enviar</button>
    </form>
  )
}