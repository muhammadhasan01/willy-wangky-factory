import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import {DashboardLayout} from '../components/Layout';

const SaldoPabrik = () => {
  useEffect(() => {
    var xmlhttp = new XMLHttpRequest()
    xmlhttp.open('POST', 'http://localhost:8081/api/saldo?wsdl', false)
    
    var sr = '<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">' +
                '<Body>' +
                '<getSaldo xmlns="http://service.willywangky/"/>' +
                '</Body>' +
                '</Envelope>'
      
    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState === 4) {
        if (xmlhttp.status === 200) {
          let saldo = "0"
          let parser = new DOMParser()
          let resDoc = parser.parseFromString(xmlhttp.responseText, 'text/xml')
          saldo = resDoc.getElementsByTagName("return")[0].innerHTML
          const element = (
            <span>{saldo}</span>
          )
          ReactDOM.render(element, document.getElementById("saldo"))
        }
      }
    }
    xmlhttp.setRequestHeader('Content-Type', 'text/xml')
    xmlhttp.send(sr)
  })


  return (
    <DashboardLayout>
      <div className='h3 text-center'>Saldo Pabrik sekarang adalah:<br/><span id="saldo"></span></div>
    </DashboardLayout>
  )
}

export default SaldoPabrik;