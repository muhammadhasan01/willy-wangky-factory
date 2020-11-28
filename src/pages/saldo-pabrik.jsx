import React from 'react';
import GetSaldo from '../components/GetSaldo';

import {DashboardLayout} from '../components/Layout';

const SaldoPabrik = () => {
  const saldo = GetSaldo();
  return (
    <DashboardLayout>
      <div className='h3 text-center'>Saldo Pabrik sekarang adalah:<br/>{saldo}</div>
    </DashboardLayout>
  )
}

export default SaldoPabrik;