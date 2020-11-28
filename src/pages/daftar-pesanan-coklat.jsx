import React from 'react';

import MelihatDaftarData from '../components/MelihatDaftarData';
import {DashboardLayout} from '../components/Layout';

const DaftarPesananCoklat = () => {
  const transaction = {
    'Nama Pemesan': [],
    'Coklat': [],
    'Jumlah Pesanan' : [],
    'Total Harga' : [],
    'Alamat':[],
    'Tanggal':[]
  };

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open('GET', 'http://localhost:8083/src/api/get-transaction.php', false);

  xmlhttp.onreadystatechange = () => {
    if (xmlhttp.readyState === 4) {
      if (xmlhttp.status === 200) {
        const coba = JSON.parse(xmlhttp.responseText);
        console.log(coba);
        coba.forEach((element) => {
          transaction["Nama Pemesan"].push(element[0])
          transaction["Coklat"].push(element[1])
          transaction["Jumlah Pesanan"].push(element[2])
          transaction["Total Harga"].push(element[3])
          transaction["Alamat"].push(element[4])
          transaction["Tanggal"].push(element[5])
        });
      }
    }
  }

  xmlhttp.send()

  return (
    <DashboardLayout>
      <div className='h3 text-center'>Daftar Pesanan Coklat</div>
      <MelihatDaftarData data={transaction} />
    </DashboardLayout>
  )
}

export default DaftarPesananCoklat;