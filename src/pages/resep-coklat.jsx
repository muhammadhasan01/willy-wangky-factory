import React, { useEffect } from 'react';

import {DashboardLayout} from '../components/Layout';
import MelihatDaftarData from '../components/MelihatDaftarData';

const ResepCoklat = () => {
  let bahan = []

  // useEffect(() => {
    var xmlhttp = new XMLHttpRequest()
    xmlhttp.open('POST', 'http://localhost:8081/api/resep-bahan?wsdl', false)
    
    var sr = '<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">' +
                '<Body>' +
                  '<getAllResep xmlns="http://service.willywangky/"/>' +
                '</Body>' +
              '</Envelope>'
      
    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState === 4) {
        if (xmlhttp.status === 200) {
          let parser = new DOMParser()
          let resDoc = parser.parseFromString(xmlhttp.responseText, 'text/xml')
          // console.log(resDoc.getElementsByTagName("return")[0]);
          let returnResult = resDoc.getElementsByTagName("return");
          // console.log(resDoc.getElementsByTagName("amount")[0].childNodes[0].nodeValue)
          for (let i = 0; i < returnResult.length; i++) {
            bahan.push({})
            bahan[i]["detailBahan"] = {
              "name" : [],
              "amount" : []
            }
            bahan[i]["coklat"] = returnResult[i].getElementsByTagName("chocolateName")[0].innerHTML 
            for (let j = 0; j < returnResult[i].getElementsByTagName("bahan").length; j++) {
              bahan[i]["detailBahan"]["name"].push(returnResult[i].getElementsByTagName("bahan")[j].getElementsByTagName("name")[0].innerHTML)
              bahan[i]["detailBahan"]["amount"].push(returnResult[i].getElementsByTagName("bahan")[j].getElementsByTagName("amount")[0].innerHTML)
            }
          }
        }
      }
    }
    xmlhttp.setRequestHeader('Content-Type', 'text/xml')
    xmlhttp.send(sr)
  // })

  return (
    <DashboardLayout>
      <div className='h3 text-center'>Resep Coklat</div>
      {
        bahan.map((elemen) => {
          console.log(elemen["detailBahan"])
          return (
            <div>
              <p className="h5">Resep {elemen.coklat}</p>
              <MelihatDaftarData data={elemen["detailBahan"]} />
            </div>
          )
        })
      }
    </DashboardLayout>
  )
}

export default ResepCoklat;