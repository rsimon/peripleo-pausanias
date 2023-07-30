import { ReactNode } from 'react';

interface TextViewProps {

  children: ReactNode;

}

export const TextView = (props: TextViewProps) => {

  return props.children;

}