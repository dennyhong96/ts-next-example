import { GetServerSideProps } from "next";

const CatchAllPage = () => null;

export default CatchAllPage;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const projectId = query.id;

  // Catch all and re-direct to /projects/:projectId/kanban
  return { redirect: { destination: `/projects/${projectId}/kanban`, permanent: false } };
};
