import React from 'react';

import {DashboardLayout} from '../components/Layout';

const BuatCoklat = () => {
  var chocolates = []
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
          let choco_name = resDoc.getElementsByTagName("name")[i].childNodes[0].nodeValue
          chocolates.push(choco_name)
        }
      }
    }
  }
  xmlhttp.setRequestHeader('Content-Type', 'text/xml')
  xmlhttp.send(sr)

  const handleClickProduksi = () => {
    let cName = document.getElementById("c_name").value
    let bCoklat = document.getElementById("b_coklat").value
    console.log(cName, bCoklat)
    var httpreq = new XMLHttpRequest()
    httpreq.open('POST', 'http://localhost:8081/api/chocolate?wsdl', false)
    var body =  '<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">' +
                    '<Body>' +
                        '<produceChocolate xmlns="http://service.willywangky/">' +
                            '<arg0 xmlns="">' + cName + '</arg0>' +
                            '<arg1 xmlns="">' + bCoklat + '</arg1>' +
                        '</produceChocolate>' +
                    '</Body>' +
                '</Envelope>'
    httpreq.onreadystatechange = function(){
      if (httpreq.readyState === 4) {
        if (httpreq.status === 200) {
            let msg = (new DOMParser()).parseFromString(httpreq.responseText, 'text/xml').getElementsByTagName("return")[0].childNodes[0].nodeValue
            alert(msg);
          }
        }
      }
  
    httpreq.setRequestHeader('Content-Type', 'text/xml')
    httpreq.send(body)
  }

  return (
    <DashboardLayout>
      <div className='h3 text-center'>Produksi Coklat</div>
      <br/><br/>
      <form className='form-control'>
        <div className='h6'>Pilih coklat yang ingin di tambah :</div>
        <select class="custom-select col-6" id="c_name" required>
          {/* <option selected>Choose...</option> */}
          {chocolates.map(function (i) {
            return <option value={i}>{i}</option>;
          })}
        </select>
        <br/><br/>
        <div className='h6'>Banyaknya coklat yang ingin di tambah :</div>
        <div className='item-center text-center'>
          <input id="b_coklat" type="number" className="form-group form-control" placeholder="Banyaknya Coklat" required/>
        </div>
        <br/>
        <button type="submit" onClick={handleClickProduksi} className="form-group btn btn-primary">PRODUKSI</button>
      </form>
    </DashboardLayout>
  )
}

export default BuatCoklat;