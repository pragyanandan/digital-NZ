import styles from './index.module.css';
import { useQuery } from 'react-query';
import axios from 'axios';

/* eslint-disable-next-line */
const fetchreport = (id) => {
  return axios.get(
    `https://tvnztech.atlassian.net/rest/api/3/project/${id}/versions`
  );
};

const ReportUrl = (id) => {
  return useQuery(['', id], () => fetchreport(id));
};

export const Report = (req) => {
  const query = req.query;
  const { count } = query;
  const { isLoading, data, isError, error } = ReportUrl(count);

  if (isLoading) {
    return <h2>isLoading.....</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return <div>{data?.data.name}</div>;
};
