import { createRoot } from 'react-dom/client';

export const App = () => {

  return (
    <div>Hello World</div>
  )

}

const root = createRoot(document.getElementById('app'));
root.render(<App />);