import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Button, Form } from "react-bootstrap";
import axios from "axios";

import GetSaldo from '../components/GetSaldo';
import { DashboardLayout } from '../components/Layout';

const DaftarPesananCoklat = () => {
  const [idBahan, setIdBahan] = useState([]);
  const [listBahan, setListBahan] = useState([]);
  const [hargaBahan, setHargaBahan] = useState([]);
  const [jumlahBahan, setJumlahBahan] = useState([]);
  const [checkBahan, setCheckBahan] = useState([]);
  const [totalHarga, setTotalHarga] = useState(0);
  let saldo = GetSaldo();
  
  const onLoad = async () => {
    try {
      axios.get('http://localhost:8082/list?harga=true')
      .then((response) => {
        const data = response.data
        console.log(data)     
        data.forEach((element) => {
          setListBahan(oldListBahan => [...oldListBahan, element["nama"]]);
          setHargaBahan(oldHargaBahan => [...oldHargaBahan, element["harga_satuan"]]);
          setJumlahBahan(oldJumlahBahan => [...oldJumlahBahan, 0]);
          setIdBahan(oldIdBahan => [...oldIdBahan, element["id"]]);
          setCheckBahan(oldCheckBahan => [...oldCheckBahan, false]);
        })
      })
    } catch (e) {
      console.log(e);
    }
  }

  const handleChangeHarga = () => {
    let hargaTemp = 0;
    checkBahan.forEach((check, index) => {
      if (check) {
        hargaTemp += hargaBahan[index] * jumlahBahan[index];
      }
    })
    setTotalHarga(hargaTemp);
  }
  
  const onChangeJumlahBahan = (index, value) => {
    let valInt = parseInt(value)
    if (valInt >= 0) {
      // console.log(jumlahBahan);
      let newJumlahBahan = [...jumlahBahan];
      newJumlahBahan[index] = valInt;
      setJumlahBahan(newJumlahBahan);
    }
  }

  const onChangeCheckBahan = (index) => {
    let newCheckBahan = [...checkBahan];
    newCheckBahan[index] = !newCheckBahan[index];
    setCheckBahan(newCheckBahan);
  }

  const formComplete = () => {
    let bahanYangKosong = jumlahBahan.length;
    jumlahBahan.forEach(element => {
      if (element !== 0) {
        bahanYangKosong = bahanYangKosong - 1;
      }
    });
    return bahanYangKosong !== jumlahBahan.length;
  }

  const konfirmasiTransaksi = async () => {
    let jumlahBahanFinal = [...jumlahBahan];
    checkBahan.forEach((element, index) => {
      if (!element) {
        jumlahBahanFinal[index] = 0;
      }
    })
    console.log(jumlahBahanFinal)
    const response = await axios.post('http://localhost:8082/buy-bahan', {
      uang: saldo,
      list_bahan: listBahan,
      list_banyak_bahan: jumlahBahanFinal
    });
    console.log(response);
    return response;
  }

  const tambahBahan = async () => {
    let httpreq = new XMLHttpRequest()
    httpreq.open('POST', 'http://localhost:8081/api/resep-bahan?wsdl', false)
    let arg0 = "";
    let dateExpired = new Date();
    dateExpired.setDate(dateExpired.getDate() + 7);
    let year = '' + dateExpired.getFullYear();
    let month = '' + (dateExpired.getMonth() + 1);
    let day = '' + dateExpired.getDate();
    let dateFormat = [year, month.length<2?'0'+month:month, day.length<2?'0'+day:day].join('-');
    console.log("DATE =>", dateFormat);
    checkBahan.forEach((checked, index) => {
      if (checked) {
        console.log("arg0 =>", arg0);
        const euy = `<arg0 xmlns=\"\">
            <amount>${jumlahBahan[index]}</amount>
            <name>${listBahan[index]}</name> 
            <date>${dateFormat}</date>
          </arg0>`;
        console.log("euy =>", euy);
        arg0 += euy; 
      }
    })
    console.log("arg0 =>", arg0);
    var body =  '<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">' +
                    '<Body>' +
                        '<addBahan xmlns="http://service.willywangky/">' +
                            arg0 +
                        '</addBahan>' +
                    '</Body>' +
                '</Envelope>';
    httpreq.onreadystatechange = () => {
      if (httpreq.readyState === 4 && httpreq.status === 200) {
        let msg = (new DOMParser()).parseFromString(httpreq.responseText, 'text/xml').getElementsByTagName("return")[0].childNodes[0].nodeValue;
        if (msg === 'Success') {
          
        }
      }
    }
    console.log("~~~~~~~BODY~~~~~~~");
    console.log(body);
    httpreq.setRequestHeader('Content-Type', 'text/xml');
    httpreq.send(body);
  }

  const changeSaldo = async () => {
    const newSaldo = saldo - totalHarga;
    let httpreq = new XMLHttpRequest()
    httpreq.open('POST', 'http://localhost:8081/api/saldo?wsdl', false)
    var body =  '<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">' +
                    '<Body>' +
                        '<setSaldo xmlns="http://service.willywangky/">' +
                            '<arg0 xmlns="">' + newSaldo + '</arg0>' +
                        '</setSaldo>' +
                    '</Body>' +
                '</Envelope>';
    httpreq.onreadystatechange = () => {
      if (httpreq.readyState === 4 && httpreq.status === 200) {
        let msg = (new DOMParser()).parseFromString(httpreq.responseText, 'text/xml').getElementsByTagName("return")[0].childNodes[0].nodeValue;
        if (msg === 'Success') {
          const element = <div class='text-success p-3'>Bahan berhasil dibeli, saldo anda sekarang adalah {newSaldo}.</div>;
          ReactDOM.render(element, document.getElementById("saldo"));
        }
      }
    }
    httpreq.setRequestHeader('Content-Type', 'text/xml')
    httpreq.send(body)
  }

  const handleSubmit = async () => {
    if (totalHarga >= saldo) {
      const element = <div class='text-danger p-3'>Saldo anda tidak cukup. (Saldo = {saldo})</div>;
      ReactDOM.render(element, document.getElementById("saldo"));
      return;
    }
    try {
      changeSaldo();
      const response = konfirmasiTransaksi();
      tambahBahan();
      if (response.status === "berhasil") {
        alert("Okegan");
      }
    } catch (e) {
      console.log(e);
    }
    return;
  }


  // notify react buat rerender pas totalHarga ganti
  useEffect(() => {
    onLoad();
  }, [])

  // notify react buat rerender pas checkBahan dan jumlahBahan ganti
  useEffect(() => { 
    handleChangeHarga()
    }, [checkBahan, jumlahBahan])

  // notify react buat rerender pas totalHarga ganti
  useEffect(() => {
    // 
  }, [totalHarga])

  return (
    <DashboardLayout>
      <div className='h2 text-center'>Beli Bahan dari Supplier</div>
      <div className='overflow-auto h-75 mh-75'>
        <form>
          <div className='w-100 mb-10'>
            <a className="dropdown-item bg-secondary text-light mt-3 p-0">          
              <div className="flex flex-row w-100 rounded-t-lg">
                <p className="flex-1 text-center m-3 font-weight-bold">Nama Bahan</p>
                <p className="flex-1 text-center m-3 font-weight-bold">Harga Bahan</p>
                <p className="flex-1 text-center m-3 font-weight-bold">Jumlah Dibeli</p>
              </div>
            </a>

            {
              listBahan.map((value, index) => {
                return (
                  <div className={"bg-white shadow "}>
                    <a className="dropdown-item pt-4 pb-4 pl-0 pr-0">
                      <div className="flex flex-row w-100">
                        <div className="custom-control custom-checkbox flex-1 text-center">
                          <input 
                            type="checkbox" 
                            className="custom-control-input" 
                            id={"checkbox" + (index + 1)} 
                            defaultChecked={checkBahan[index]}
                            onChange={() => onChangeCheckBahan(index)}
                          />
                          <label className="custom-control-label" for={"checkbox" + (index + 1)} value={value}>{value}</label>
                        </div>
                <p className="flex-1 text-center">{hargaBahan[index]}</p>
                        <div className="flex-1 flex flex-row justify-content-center">
                          <Form.Control
                            type="number"
                            className="w-20"
                            value={jumlahBahan[index]}
                            onChange={(e) => onChangeJumlahBahan(index, e.target.value)}
                          />
                        </div>

                      </div>
                    </a>
                  </div>
                )
              })
            }
          </div>
        </form>
      </div>
      <p><span className='h6'>Total Harga:</span> <span>Rp. {totalHarga},00</span></p>
      <div className="flex flex-row justify-content-end">
        <Button block size="lg" className="w-25 mw-25" disabled={!formComplete()} onClick={handleSubmit}>
          Beli
        </Button>
      </div>
      <span id='saldo'></span>
    </DashboardLayout>
  )
}

export default DaftarPesananCoklat;