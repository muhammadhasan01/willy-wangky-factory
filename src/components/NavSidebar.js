import { Navigation } from "react-minimal-side-navigation";
import { useHistory, useLocation } from "react-router-dom";
import React from "react";
import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";

export const NavSidebar = () => {
  const history = useHistory();
  const location = useLocation();

  return (
    <React.Fragment>

      <div
        className={`inset-y-0 left-0 z-30 w-64 translate-x-0 bg-gray-100 border-r-2 lg:translate-x-0 lg:static lg:inset-0`}
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
                title: 'Buat Coklat',
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
