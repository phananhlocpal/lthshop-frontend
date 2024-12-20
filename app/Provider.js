"use client";

import { Provider } from "react-redux";
import store from "@/store/store";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function ProviderLayout({ children }) {
  return (
    <Provider store={store}>
      <Header />
      {children}
      <Footer />
    </Provider>
  );
}
