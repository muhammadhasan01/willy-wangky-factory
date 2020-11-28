import React from "react";

import { NavSidebar } from "./NavSidebar";
import BodyWrapper from "./BodyWrapper";

export const DashboardLayout = ({ children }) => {
  return (
    <BodyWrapper>
      <div className="flex min-vh-100 h-100 bg-light">
        <NavSidebar />

        <div className="flex flex-row flex-1">
          <main className="flex content flex-fill p-5">
            <section className="sm:flex-row flex flex-row flex-1">
              <div
                className="content-box"
                style={{ flexGrow: 2, flexBasis: "0%" }}
              >
                {children}
              </div>
            </section>
          </main>
        </div>
      </div>
    </BodyWrapper>
  );
};
