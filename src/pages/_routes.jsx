import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Redirect } from "react-router-dom";
import Cookies from "universal-cookie";

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
  const checkCookie = (target, redirect) => {
    let cookies = new Cookies();
    let username = cookies.get('username');
    let password = cookies.get('password');
    let temp = "";
    let return_val = false;
    if (username !== undefined && password !== undefined) {
      let http = new XMLHttpRequest();
      http.open('POST', 'http://localhost:8081/api/login?wsdl', false);
      let body = `
      <Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
          <Body>
              <isUserExist xmlns="http://service.willywangky/">
                  <arg0 xmlns="">${username}</arg0>
                  <arg1 xmlns="">${password}</arg1>
              </isUserExist>
          </Body>
      </Envelope>`;
      http.onreadystatechange = () => {
          if (http.readyState === 4 && http.status === 200) {
              let msg = (new DOMParser()).parseFromString(http.responseText, 'text/xml')
              temp = msg;
              return_val = msg.getElementsByTagName("return")[0].innerHTML !== "false";
          }
      }
      http.setRequestHeader('Content-Type', 'text/xml');
      http.send(body);
      console.log(temp);
      console.log(return_val);
      return return_val
    }
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/melihat-daftar/pesanan-coklat-wweb">
          { checkCookie(<DaftarPesananCoklat />, <Redirect to="/login"/>) }
        </Route>
        <Route path="/melihat-daftar/coklat">
          { checkCookie(<DaftarCoklat />, <Redirect to="/login"/>) }
        </Route>
        <Route path="/melihat-daftar/bahan-coklat">
          { checkCookie(<BahanCoklat />, <Redirect to="/login"/>) }
        </Route>
        <Route path="/melihat-daftar/resep-coklat">
          { checkCookie(<ResepCoklat />, <Redirect to="/login"/>) }
        </Route>
        <Route path="/melihat-daftar/permintaan-tambah-stok">
          { checkCookie(<PermintaanTambahStok />, <Redirect to="/login"/>) }
        </Route>
        <Route path="/lihat-saldo-pabrik">
          { checkCookie(<SaldoPabrik />, <Redirect to="/login"/>) }
        </Route>
        <Route path="/beli-bahan-dari-supplier">
          { checkCookie(<BeliBahan />, <Redirect to="/login"/>) }
        </Route>
        <Route path="/buat-coklat">
          { checkCookie(<BuatCoklat />, <Redirect to="/login"/>) }
        </Route>
        <Route path="/login">
          { checkCookie(<Redirect to="/" />, <Login />) ? <Redirect to="/" /> : <Login /> }
        </Route>
        {/* TODO: Handle Logout */}
        <Route path="/">
          { checkCookie(<HomePage />, <Redirect to="/login"/>) }
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
