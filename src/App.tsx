// import { useState } from 'react';
import { Header } from './components/Header.tsx';
import { Tasks } from './components/Tasks.tsx';

import './global.css'
import styles from './App.module.css'

export function App() {
  return (
    <div>
       <Header/>
       <div className={styles.wrapper}>
        <Tasks/>
     </div>
   </div>
    )
}
