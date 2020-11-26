import React, { useState } from 'react';

import {DashboardLayout} from '../components/Layout';

const DaftarPesananCoklat = () => {
  const [listBahan, setListBahan] = useState(["Bahan Satu", "Bahan Dua", "Bahan Tiga"]);

  return (
    <DashboardLayout>
      <div className='h2 text-center'>Beli Bahan dari Supplier</div>
      <div className='overflow-auto'>
        <form>
          <div className='w-100'>
            {
              listBahan.map((value, index) => {
                return (
                  <a className="dropdown-item">
                    <div className="custom-control custom-checkbox flex flex-row justify-content-between w-100">
                      <input type="checkbox" className="custom-control-input" id={"checkbox" + (index + 1)} />
                      <label className="custom-control-label" for={"checkbox" + (index + 1)} value={value}>{value}</label>
                      <p className="custom"
                    </div>
                  </a>
                )
              })
            }
          </div>
        </form>
      </div>
      <p><span className='h6'>Total Harga:</span> <span>Rp. 500.000.000,00</span></p>
    </DashboardLayout>
  )
}

export default DaftarPesananCoklat;