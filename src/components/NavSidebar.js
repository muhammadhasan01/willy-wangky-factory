import { Navigation } from "react-minimal-side-navigation";
import { useHistory, useLocation } from "react-router-dom";
import React from "react";
import Cookies from "universal-cookie";
import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";

export const NavSidebar = () => {
  const history = useHistory();
  const location = useLocation();

  return (
    <React.Fragment>

      <div
        className={`h-100 w-64 bg-white shadow p-3 mb-5 rounded`}
      >
        <div className="flex items-center justify-center mt-10 text-center py-6">
          <span className="mx-2 text-2xl font-semibold text-black">
            Willy Wangky's Factory
          </span>
        </div>

        <Navigation
            // you can use your own router's api to get pathname
            activeItemId={location.pathname}
            onSelect={({ itemId }) => {
                // TODO: Handle logout (itemId = "/login")
                if (itemId === "/login") {
                  let cookies = new Cookies();
                  cookies.remove('username', { path: '/' });
                  cookies.remove('password', { path: '/' });
                  window.location.reload();
                }
                history.push(itemId);
            }}
            items={[
              {
                title: 'Halaman utama',
                itemId: '/home'
              },
              {
                title: 'Lihat Daftar',
                itemId: '/melihat-daftar',
                subNav: [
                  {
                    title: 'Pemesanan Coklat dari WWWeb',
                    itemId: '/melihat-daftar/pesanan-coklat-wweb',
                  },
                  {
                    title: 'Coklat yang Tersedia di Pabrik',
                    itemId: '/melihat-daftar/coklat',
                  },
                  {
                    title: 'Bahan Coklat',
                    itemId: '/melihat-daftar/bahan-coklat',
                  },
                  {
                    title: 'Resep Coklat',
                    itemId: '/melihat-daftar/resep-coklat',
                  },
                  {
                    title: 'Permintaan Penambahan Stok Coklat Pabrik',
                    itemId: '/melihat-daftar/permintaan-tambah-stok'
                  }
                ],
              },
              {
                title: 'Lihat Saldo Pabrik',
                itemId: '/lihat-saldo-pabrik',
              },
              {
                title: 'Beli bahan coklat dari supplier',
                itemId: '/beli-bahan-dari-supplier'
              },
              {
                title: 'Produksi Coklat',
                itemId: '/buat-coklat'
              },
              {
                title: 'Logout',
                itemId: '/login'
              }
            ]}
          />
      </div>
    </React.Fragment>
  );
};
