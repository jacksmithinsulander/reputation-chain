import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './App.module.css';
import Blockchain from './components/Blockchain/Blockchain';

const App = () => {
  const [blockchain, setBlockchain] = useState([]);
  const url = 'http://localhost:5001/api/1/blocks';

  const loadBlockchain = async () => {
    const { data } = await axios.get(url);
    console.log(data);
    setBlockchain(data);
  };

  useEffect(() => {
    loadBlockchain();
  }, []);

  const onAddBlockHandler = async (e) => {
    e.preventDefault();
    const data = e.target.data.value;
    const newBlock = { data };
    const response = await axios.post(url, newBlock);
    console.log(response);
    loadBlockchain();
  };

  return (
    <main>
      <article className={styles.container}>
        <h1>Blockchain Client</h1>
        <section>
          <Blockchain blocks={blockchain} onAddBlock={onAddBlockHandler} />
        </section>
      </article>
    </main>
  );
};

export default App;
