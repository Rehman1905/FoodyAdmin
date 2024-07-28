'use client'
import './globals.css'
import { Provider } from "react-redux";
import DataContext from "./context/context";
import store from './store/store'
export default function ClientLayout({ children }) {
    return (
        <>
        <DataContext>
            <html lang="en">
                <body>
                    <Provider store={store}>
                    <main>{children}</main>
                    </Provider>
                </body>
            </html>
        </DataContext>
        </>
    )
}