import Image from "next/image"
import Link from "next/link"

import logoImg from "../../assets/logo.svg"

import { CartButton } from "../CartButton"
import { HeaderContainer } from "./styles"

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContainer>
        <Link href={"/"}>
          <Image
            src={logoImg}
            alt='logo app image: Ignite Shop'
            width={130}
            height={52}
            priority
          />
        </Link>
        <CartButton />
      </HeaderContainer>
    </HeaderContainer>
  )
}
