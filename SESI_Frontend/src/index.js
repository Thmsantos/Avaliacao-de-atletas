import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
  // tirando o modo restrito do react pois com ele o useEffect faz duas chamadas ao renderizar a página, com isso são duas requisições além de sobrecarregar o servidor desnecessariamente
);

