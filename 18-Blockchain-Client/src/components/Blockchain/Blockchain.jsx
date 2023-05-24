import { Fragment } from 'react';
import Block from './Block';
import styles from '../../App.module.css';

const Blockchain = ({ blocks, onAddBlock }) => {
  return (
    <>
      <form onSubmit={onAddBlock}>
        <div className={styles['form-controls']}>
          <input type='text' name='data' />
          <button className={styles.btn}>Add Block</button>
        </div>
      </form>
      <ul>
        {blocks.map((block) => (
          <Fragment key={block.hash}>
            <Block block={block} />
          </Fragment>
        ))}
      </ul>
    </>
  );
};

export default Blockchain;
