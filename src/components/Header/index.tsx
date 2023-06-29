import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"

import logoImg from "../../assets/logo.svg"
import { Cart } from "../Cart"

import { HeaderContainer } from "./styles"

export function Header() {
  const { pathname } = useRouter()

  const showCartButton = pathname !== "/success"

  return (
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
      {showCartButton && <Cart />}
    </HeaderContainer>
  )
}
