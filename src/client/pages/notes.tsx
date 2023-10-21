import React, { useEffect } from 'react';
import { NextPage } from 'next';
import { Request } from 'express';

import { typedQuery } from '../app/apollo-client';

export async function getServerSideProps({ req }) {
  const { data } = await typedQuery(
    { notes: { id: true, title: true, content: true, tags: true } },
    req,
  );

  return {
    props: { user: (req as Request).user, notes: data.notes },
  };
}

type Props = ExtractPromiseType<ReturnType<typeof getServerSideProps>>;

const Notes: NextPage<Props['props']> = (props) => {
  useEffect(() => {
    window.gtag('event', 'notesOpened');
  }, []);

  return (
    <div>
      <h1>Notes overview</h1>
      {JSON.stringify(props)}
    </div>
  );
};

export default Notes;
