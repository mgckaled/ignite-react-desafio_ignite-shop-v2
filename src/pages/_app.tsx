import { globalStyles } from "@/styles/global"
import type { AppProps } from "next/app"
import { Roboto } from "next/font/google"

import { Header } from "@/components/Header"
import { Container } from "../styles/pages/app"

globalStyles()

const roboto = Roboto({
  weight: ["400", "700"],
  style: ["normal"],
  subsets: ["latin"],
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style
        jsx
        global
      >{`
        html {
          font-family: ${roboto.style.fontFamily};
        }
      `}</style>
      <Container>
        <Header/>
        <Component {...pageProps} />
      </Container>
    </>
  )
}
