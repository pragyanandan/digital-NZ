import { useQuery } from 'react-query';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import React, { useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import Typography from '@mui/material/Typography';

import moment from 'moment';
import TableData from './table';
import ChartReport from './chartReport';
import axios from 'axios';
import { parse } from 'path/posix';
import { Box, Grid, MenuItem, Select } from '@mui/material';
import { response } from 'express';
import { strings } from '@material/textfield';

/* eslint-disable-next-line */
const fetchreport = (id) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const axios = require('axios').default;
  return axios({
    method: 'get',
    url: 'http://localhost:3333/api',
    params: { level: id },
    crossOriginIsolated: true,
  });
  
};


const ReportUrl = (id) => {
  return useQuery(['', id], () => fetchreport(id));
};

export const SearchReport = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [value, setValue] = React.useState([null, null]);
  const [value1, setValue1] = React.useState([null, null]);
  const [result, setResult] = React.useState(null);
  const [origin, setOrigin] = React.useState(null);
  const [release, setRelease] = React.useState('true');

  const [startdate, setStartDate] = React.useState(() => {
    return null;
  });
  const [enddate, setEndDate] = React.useState(() => {
    return null;
  });
  useEffect(() => {
    if (value)
      setStartDate(
        moment(JSON.parse(JSON.stringify(value))).format('YYYY-MM-DD')
      );
    if (value1)
      setEndDate(
        moment(JSON.parse(JSON.stringify(value1))).format('YYYY-MM-DD')
      );
  }, [value, value1, startdate]);

  const router = useRouter();
  const query = router.query;
  const { isLoading, data, isError, error } = ReportUrl(query.id);

  useEffect(() => {
    if (data?.data?.body) {
      setResult(JSON.parse(data?.data?.body));
      if (startdate != null || enddate != null) {
        setResult(
          result?.filter(
            (t) =>
              t.releaseDate >= startdate &&
              t.releaseDate <= enddate &&
              String(t.released) == release
          )
        );
        if (release != '') {
          //setResult(result?.filter((t) => t.released === release));
        }
      }
      setOrigin(JSON.parse(data?.data?.body));
    }
  }, [data]);

  if (isLoading) {
    return <h2>isLoading.....</h2>;
  }

  if (isError) {
  }

  const handleClick = (event) => {
    event.preventDefault();
    if (value[0] === null && value[1] === null) return;
    setResult(
      origin?.filter(
        (item) =>
          item.releaseDate >= startdate &&
          item.releaseDate <= enddate &&
          String(item.released) === release
      )
    );
    if (release != '') {
      //setResult(result.filter((t) => t.name.includes('hotfix')));
    }
    console.log('release...', result);
  };
  const handleReleaseChange = (event) => {
    setRelease(event.target.value);
  };

  return (
    <div>
      <Stack spacing={2} direction="row">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Start Date"
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="End Date"
            value={value1}
            onChange={(newValue1) => {
              setValue1(newValue1);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <Box sx={{ minWidth: 120 }}>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={release}
            label="Release Data"
            onChange={handleReleaseChange}
          >
            <MenuItem value={'true'}>Released</MenuItem>
            <MenuItem value={'false'}>Unreleased</MenuItem>
          </Select>
        </Box>
        <Button variant="contained" onClick={handleClick}>
          Filter
        </Button>
      </Stack>
      <>
        <br />
      </>
      <Typography variant="h5" gutterBottom>
        Total No of Releases: {result ? result.length : 0}
      </Typography>
      <br />
      {result && <ChartReport data={result} />}
      <br />
      {result && <TableData test={result} />}
    </div>
  );
};
export default SearchReport;
