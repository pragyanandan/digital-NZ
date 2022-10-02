import Head from 'next/head';
import Link from 'next/link';
import SvgIcon from '@mui/material/SvgIcon';

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}
/* eslint-disable-next-line */
export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>TVNZ Search</title>
      </Head>
      <header style={{ backgroundColor: 'cornflowerblue' }}>
        <div style={{ minHeight: 48, padding: 24 }}>
          <h1>
            <Link href="/">
              <a>
                <HomeIcon />
              </a>
            </Link>{' '}
            <label> The TVNZ Releases Dashboard! </label>
          </h1>
        </div>
      </header>
      <main style={{ padding: 24 }}>{children}</main>
    </>
  );
}
