import React, { useState } from 'react';
import styles from './AddItemForm.module.scss';

const AddItemForm = () => {
  const [keyword, setKeyword] = useState<string>('');

  //   const onSearch = () => {

  // }

  const onChangeSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  return (
    <div className={styles.container}>
      <h1 className="headingOne">Add Item</h1>
      <form className={styles.form}>
        <div className={styles.formItem}>
          <label>Search by keyword</label>
          <input type="text" onChange={onChangeSearchText} value={keyword} />
        </div>
      </form>
    </div>
  );
};

export default AddItemForm;
