import '../styles/globals.css';
import { NotesProvider } from '../components/context/NotesContext';

function MyApp({ Component, pageProps }) {
  return (
    <NotesProvider>
      <Component {...pageProps} />
    </NotesProvider>
  );
}

export default MyApp;
