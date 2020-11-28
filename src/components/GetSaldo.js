import React, { useEffect } from 'react';

const GetSaldo = () => {
  let retSaldo = 0;
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open('POST', 'http://localhost:8081/api/saldo?wsdl', false);
  
  var sr = '<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">' +
              '<Body>' +
              '<getSaldo xmlns="http://service.willywangky/"/>' +
              '</Body>' +
              '</Envelope>';
    
  xmlhttp.onreadystatechange = () => {
    if (xmlhttp.readyState === 4) {
      if (xmlhttp.status === 200) {
        let parser = new DOMParser()
        let resDoc = parser.parseFromString(xmlhttp.responseText, 'text/xml')
        let saldo = resDoc.getElementsByTagName("return")[0].innerHTML;
        retSaldo = saldo;
      }
    }
  };
  xmlhttp.setRequestHeader('Content-Type', 'text/xml');
  xmlhttp.send(sr);
  return retSaldo;
}

export default GetSaldo;