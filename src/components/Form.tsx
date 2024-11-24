import { ReactNode } from 'react';

export default function Form({children}: {children: ReactNode}) {
  return (
    <form onSubmit={e => e.preventDefault()}>
      {children}
    </form> )
}