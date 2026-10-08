import type { ReactNode } from 'react';

interface Props {
  id: string;
  title: string;
  children: ReactNode;
}

export default function SectionHead({ id, title, children }: Props) {
  return (
    <div className="sec-head">
      <h2 id={id}>{title}</h2>
      <p>{children}</p>
    </div>
  );
}
