import styles from './index.module.css';
import ComboBox from 'libs/tv-releases/ui/src/lib/result-table/result-table';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, Grid } from '@mui/material';

export function Index() {
  const router = useRouter();
  const [count, setCount] = useState(0);

  const handleClick = (num2) => {
    console.log('current date...', num2);
    setCount((current) => num2);
  };

  return (
    <div className={styles.page}>
      <div>
        <div className="container">
          <div id="welcome">
            <h1>Welcome tv-releases 👋</h1>
          </div>

          <div className="text-container">
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                '& > :not(style)': {
                  m: 1,
                  width: 128,
                  height: 128,
                },
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={10}>
                  <ComboBox handleClick={handleClick} />
                </Grid>
                <Grid item xs={4}>
                  <Button
                    variant="contained"
                    onClick={() => router.push(`/search-report?id=${count}`)}
                  >
                    Search
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
