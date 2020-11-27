import React from 'react';

import MelihatDaftarData from '../components/MelihatDaftarData';
import { DashboardLayout } from '../components/Layout';

const BahanCoklat = () => {
  const bahan = {
    'Nama Bahan' : [],
    'Banyaknya' : []
  }

  let xmlhttp = new XMLHttpRequest();
  xmlhttp.open('POST', 'http://localhost:8081/api/resep-bahan?wsdl', false);
  let sr = '<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">' +
          '<Body>' +
            '<getAllBahan xmlns="http://service.willywangky/"/>' +
          '</Body>' +
        '</Envelope>'
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState === 4) {
      if (xmlhttp.status === 200) {
        let res = xmlhttp.responseText;
        // console.log(res)

        let parser = new DOMParser();
        let resDoc = parser.parseFromString(res, 'text/xml');
        for (let i = 0; i < resDoc.getElementsByTagName("return").length; i++) {
          bahan["Nama Bahan"].push(resDoc.getElementsByTagName("name")[i].childNodes[0].nodeValue)
          bahan["Banyaknya"].push(resDoc.getElementsByTagName("amount")[i].childNodes[0].nodeValue)
        }
      }
    }
  }    
  xmlhttp.setRequestHeader('Content-Type', 'text/xml');
  xmlhttp.send(sr);

  return (
    <DashboardLayout>
      <div className='h3 text-center'>Bahan Coklat</div>
      <MelihatDaftarData data={bahan} />
    </DashboardLayout>
  )
}

export default BahanCoklat;