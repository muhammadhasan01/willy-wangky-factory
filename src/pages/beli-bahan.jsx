import React, { useState } from 'react';
import { Button, Form } from "react-bootstrap";

import { DashboardLayout } from '../components/Layout';

const DaftarPesananCoklat = () => {
  const [listBahan, setListBahan] = useState(["Bahan Satu", "Bahan Dua", "Bahan Tiga", "Bahan Tiga"]);
  const [jumlahBahan, setJumlahBahan] = useState([0, 0, 0, 0])

  const onChangeJumlahBahan = (index, value) => {
    let newJumlahBahan = [...jumlahBahan];
    newJumlahBahan[index] = value;
    setJumlahBahan(newJumlahBahan);
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

  const handleSubmit = () => {
    return
  }

  return (
    <DashboardLayout>
      <div className='h2 text-center'>Beli Bahan dari Supplier</div>
      <div className='overflow-auto h-75 mh-75'>
        <form>
          <div className='w-100 mb-10'>
          <a className="dropdown-item bg-light mt-3 p-0">          
            <div className="flex flex-row w-100 rounded-t-lg">
              <p className="flex-1 text-center m-3 font-weight-bold">Nama Coklat</p>
              <p className="flex-1 text-center m-3 font-weight-bold">Harga Coklat</p>
              <p className="flex-1 text-center m-3 font-weight-bold">Jumlah Dibeli</p>
            </div>
          </a>

            {
              listBahan.map((value, index) => {
                return (
                  <div className={"bg-white"}>
                    <a className="dropdown-item pt-4 pb-4 pl-0 pr-0">
                      <div className="flex flex-row w-100">
                        <div className="custom-control custom-checkbox flex-1 text-center">
                          <input type="checkbox" className="custom-control-input" id={"checkbox" + (index + 1)} />
                          <label className="custom-control-label" for={"checkbox" + (index + 1)} value={value}>{value}</label>
                        </div>
                        <p className="flex-1 text-center">Yoi</p>
                        <div className="flex-1 flex flex-row justify-content-center">
                          <Form.Control
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
      <p><span className='h6'>Total Harga:</span> <span>Rp. 500.000.000,00</span></p>
      <div className="flex flex-row justify-content-end">
        <Button block size="lg" className="w-25 mw-25" disabled={!formComplete()} onClick={handleSubmit}>
          Beli
        </Button>
      </div>
    </DashboardLayout>
  )
}

export default DaftarPesananCoklat;