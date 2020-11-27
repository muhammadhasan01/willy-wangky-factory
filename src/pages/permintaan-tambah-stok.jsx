import React, { useState } from 'react';
import {DashboardLayout} from '../components/Layout';
import MelihatDaftarData from '../components/MelihatDaftarData';


const PermintaanTambahStok = () => {
  const requestAddStock = {
    'Nama Coklat': [],
    'Banyaknya': [],
    'Kirim Coklat': []
  };
  
  const ApprovedButton = (id) => {
    const handleClick = () => {
      var httpreq = new XMLHttpRequest()
      httpreq.open('POST', 'http://localhost:8081/api/stock?wsdl', false)
      var body =  '<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">' +
                      '<Body>' +
                          '<approveAddStock xmlns="http://service.willywangky/">' +
                              '<arg0 xmlns="">' + id + '</arg0>' +
                          '</approveAddStock>' +
                      '</Body>' +
                  '</Envelope>'
      httpreq.onreadystatechange = function(){
        if (httpreq.readyState === 4) {
          if (httpreq.status === 200) {
            let msg = (new DOMParser()).parseFromString(httpreq.responseText, 'text/xml').getElementsByTagName("return")[0].childNodes[0].nodeValue
            alert(msg);
            if (msg === 'Permintaan berhasil disetujui') {
              document.getElementById(id).innerHTML = "APPROVED";
              document.getElementById(id).style.backgroundColor = "green";
              document.getElementById(id).disabled = true;
            }
          }
        }
      }
      httpreq.setRequestHeader('Content-Type', 'text/xml')
      httpreq.send(body)
    };
  
    return (
      <button id={id} class={`btn btn-primary text-center`} onClick={handleClick}>
      APPROVE
      </button>
    )
  };
  
  // const handleChangeRequest = (newAddStock) => {
  //   if (requestAddStock["Nama Coklat"] !== newAddStock["Nama Coklat"]
  //     || requestAddStock["Banyaknya"] !== newAddStock["Banyaknya"]
  //     || requestAddStock["Kirim Coklat"] !== newAddStock["Kirim Coklat"]
  //   ) {
  //     changeRequestAddStock(newAddStock);
  //   }
  // }

  var xmlhttp = new XMLHttpRequest()
  xmlhttp.open('POST', 'http://localhost:8081/api/stock?wsdl', false)
  
  var sr = '<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">' +
              '<Body>' +
                '<getAllReqAddStock xmlns="http://service.willywangky/"/>' +
              '</Body>' +
            '</Envelope>'
    
  xmlhttp.onreadystatechange = function(){
    if (xmlhttp.readyState === 4){
      if (xmlhttp.status === 200){
        let parser = new DOMParser()
        let resDoc = parser.parseFromString(xmlhttp.responseText, 'text/xml')
        console.log(resDoc.getElementsByTagName("return").length)
        // var newRequestAddStock = JSON.parse(JSON.stringify(requestAddStock));
        for (let i = 0; i < resDoc.getElementsByTagName("return").length; i++) {
          requestAddStock["Nama Coklat"].push(resDoc.getElementsByTagName("chocolateName")[i].childNodes[0].nodeValue)
          requestAddStock["Banyaknya"].push(resDoc.getElementsByTagName("amount")[i].childNodes[0].nodeValue)
          // changeRequestAddStock(newRequestAddStock)
          requestAddStock["Kirim Coklat"].push(ApprovedButton(resDoc.getElementsByTagName("id")[i].childNodes[0].nodeValue))
          // handleChangeRequest(newRequestAddStock);
        }
      }
    }
  }
  xmlhttp.setRequestHeader('Content-Type', 'text/xml')
  xmlhttp.send(sr)
  return (
    <DashboardLayout>
      <div className='h3 text-center'>Permintaan Tambah Stok</div>
      <br/>
      <MelihatDaftarData data={requestAddStock} />
    </DashboardLayout>
  )
}

export default PermintaanTambahStok;