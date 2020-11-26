import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import HomePage from './home';
import DaftarPesananCoklat from "./daftar-pesanan-coklat";
import DaftarCoklat from "./daftar-coklat";
import BahanCoklat from "./bahan-coklat";
import ResepCoklat from "./resep-coklat";
import PermintaanTambahStok from './permintaan-tambah-stok';
import SaldoPabrik from './saldo-pabrik';
import BeliBahan from './beli-bahan';
import BuatCoklat from './buat-coklat';
import Login from './login';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/melihat-daftar/pesanan-coklat-wweb">
          <DaftarPesananCoklat />
        </Route>
        <Route path="/melihat-daftar/coklat">
          <DaftarCoklat />
        </Route>
        <Route path="/melihat-daftar/bahan-coklat">
          <BahanCoklat />
        </Route>
        <Route path="/melihat-daftar/resep-coklat">
          <ResepCoklat />
        </Route>
        <Route path="/melihat-daftar/permintaan-tambah-stok">
          <PermintaanTambahStok />
        </Route>
        <Route path="/lihat-saldo-pabrik">
          <SaldoPabrik />
        </Route>
        <Route path="/beli-bahan-dari-supplier">
          <BeliBahan />
        </Route>
        <Route path="/buat-coklat">
          <BuatCoklat />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
