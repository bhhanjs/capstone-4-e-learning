import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const newQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
    },
  },
});
createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <QueryClientProvider client={newQueryClient}>
        <StrictMode>
          <App />
          <ReactQueryDevtools initialIsOpen={false} />
        </StrictMode>
      </QueryClientProvider>
    </BrowserRouter>
  </Provider>
);
