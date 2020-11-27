import React from 'react';

import MelihatDaftarData from '../components/MelihatDaftarData';
import {DashboardLayout} from '../components/Layout';

const DaftarCoklat = () => {

  const chocolates = {
    'Nama Coklat': [],
    'Banyaknya': []
  };

  var xmlhttp = new XMLHttpRequest()
  xmlhttp.open('POST', 'http://localhost:8081/api/chocolate?wsdl', false)
  
  var sr = '<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">' +
              '<Body>' +
                '<getAllChcolate xmlns="http://service.willywangky/"/>' +
              '</Body>' +
            '</Envelope>'
    
  xmlhttp.onreadystatechange = () => {
    if (xmlhttp.readyState === 4) {
      if (xmlhttp.status === 200) {
        let parser = new DOMParser()
        let resDoc = parser.parseFromString(xmlhttp.responseText, 'text/xml')
        console.log(resDoc.getElementsByTagName("return"));
        for (let i = 0; i < resDoc.getElementsByTagName("return").length; i++) {
          chocolates["Nama Coklat"].push(resDoc.getElementsByTagName("name")[i].childNodes[0].nodeValue)
          chocolates["Banyaknya"].push(resDoc.getElementsByTagName("amount")[i].childNodes[0].nodeValue)
        }
      }
    }
  }
  xmlhttp.setRequestHeader('Content-Type', 'text/xml')
  xmlhttp.send(sr)

  return (
    <DashboardLayout>
      <div className="h3 text-center">Daftar Coklat</div>
      <MelihatDaftarData data={chocolates} />
    </DashboardLayout>
  )
}

export default DaftarCoklat;