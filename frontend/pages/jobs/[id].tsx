import Layout from "@/components/layout/Layout";
import JobDetails from "@/components/job/JobDetails";
import NotFound from "@/components/layout/NotFound";

import axios from "axios";

export default function JobDetailsPage({
  job,
  candidates,
  access_token,
  error,
}) {
  // console.log(job, candidates);
  // console.log(error);

  if (error?.includes("Not found")) return <NotFound />;
  return (
    <Layout title={job.title}>
      <JobDetails
        job={job}
        candidates={candidates}
        access_token={access_token}
      />
    </Layout>
  );
}

export async function getServerSideProps({ req, params }) {

  console.log("params:", params);

  try {
    const res = await axios.get(
      `${process.env.API_URL}/api/jobs/${params.id}/`
    );
    console.log(res.data);
    console.log(res.data.job);
    const job = res.data.job;
    const candidates = res.data.candidates;

    const access_token = req.cookies.access || "";

    return {
      props: {
        job,
        candidates,
        access_token,
      },
    };
  } catch (error) {
    return {
      props: {
        error: error.response.data.detail,
      },
    };
  }
}
