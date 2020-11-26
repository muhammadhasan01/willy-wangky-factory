import React from 'react';
import {DashboardLayout} from '../components/Layout';

const HomePage = () => {
  return (
    <DashboardLayout>
      <div class="text-center">
        <div className='h2'>Selamat Datang di Web Willy Wangky Factory!</div>
        <div className='text-muted'>Pada web ini Anda bisa mengatur segala operasi yang berkaitan dengan pabrik :)</div>
    </div>
    </DashboardLayout>
  )
}

export default HomePage;