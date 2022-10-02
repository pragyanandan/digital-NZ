import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import React from 'react';
import moment from 'moment';
import { counting } from 'radash';
import { Typography } from '@mui/material';

export class ChartTest {
  constructor() {
    Chart.register(...registerables);
  }

  // methods to actually make the chart per documentation
}

export default function ChartReport(props) {
  console.log(props.data);
  let count: any = null;
  let hostfix: any = null;
  let output: any = null;
  let output2: any = null;

  const result = props.data?.map((o) => ({
    ...o,
    month: `${moment(o.releaseDate).month() + 1}`,
  }));
  if (result) {
    count = counting(result, (g) => g.month);
    hostfix = counting(
      result.filter((t) => t.name.includes('hotfix')),
      (g) => g.month
    );
    console.log('new data', hostfix);

    output = Object.keys(count).map((s) => ({
      Month: moment(s).format('MMMM'),
      Monthcount: count[s],
      hotfix: 0,
    }));
    output2 = Object.keys(hostfix).map((t) => ({
      Month: moment(t).format('MMMM'),
      hotfix: hostfix[t],
    }));

    output2.forEach((obj) => {
      const ob = output.find((o) => o.Month == obj.Month);
      if (ob) {
        ob.hotfix = obj.hotfix;
      }
    });
    console.log('output values..', output, output2);
  }
  const month = output?.map((r) =>
    moment(r.Month).add(1, 'month').format('MMMM')
  );

  return (
    <div>
      <Typography variant="h5" gutterBottom></Typography>
      <div style={{ maxWidth: '650px' }}>
        <Bar
          data={{
            // Name of the variables on x-axies for each bar

            labels: output?.map((a) => a.Month),
            datasets: [
              {
                barThickness: 40,
                maxBarThickness: 80,
                minBarLength: 20,
                // Label for bars
                label: 'Releases count month wise',
                // Data or value of your each variable
                data: output?.map((a) => a.Monthcount),

                //backgroundColor: ['aqua', 'green', 'red', 'yellow'],
                //borderColor: ['aqua', 'green', 'red', 'yellow'],
                //borderWidth: 0,
                backgroundColor: [
                  // 'rgba(255, 99, 132, 0.2)',
                  // 'rgba(255, 159, 64, 0.2)',
                  // 'rgba(255, 205, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  // 'rgba(54, 162, 235, 0.2)',
                  // 'rgba(153, 102, 255, 0.2)',
                  // 'rgba(201, 203, 207, 0.2)',
                ],
                borderColor: [
                  // 'rgb(255, 99, 132)',
                  // 'rgb(255, 159, 64)',
                  // 'rgb(255, 205, 86)',
                  'rgb(75, 192, 192)',
                  // 'rgb(54, 162, 235)',
                  // 'rgb(153, 102, 255)',
                  // 'rgb(201, 203, 207)',
                ],
                borderWidth: 1,
              },
              {
                barThickness: 40,
                maxBarThickness: 80,
                minBarLength: 10,
                // Label for bars
                label: 'Hotfixes',
                // Data or value of your each variable
                data: output?.map((a) => (a.hotfix != 0 ? a.hotfix : null)),

                //backgroundColor: ['aqua', 'green', 'red', 'yellow'],
                //borderColor: ['aqua', 'green', 'red', 'yellow'],
                //borderWidth: 0,
                backgroundColor: ['rgba(255, 99, 132, 0.2)'],
                borderColor: ['rgb(255, 99, 132)'],
                borderWidth: 1,
              },
            ],
          }}
          // Height of graph
          height={500}
          options={{
            maintainAspectRatio: false,
            scales: {
              yAxes: [
                {
                  ticks: {
                    // The y-axis value will start from zero
                    beginAtZero: true,
                  },
                },
              ],
            },
            legend: {
              labels: {
                fontSize: 0.0,
              },
            },
          }}
        />
      </div>
    </div>
  );
}
