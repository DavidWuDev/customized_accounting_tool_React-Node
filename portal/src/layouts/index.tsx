import React from 'react';
import MainLayout from './main-layout';

export const withLayout = (Component: any, Layout?: any) => <T extends {}>(props: T) => {
  if (!Layout) {
    Layout = MainLayout;
  }

  return (
    <Layout>
      <Component {...props} />
    </Layout>
  );
};
