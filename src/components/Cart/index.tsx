import * as Dialog from "@radix-ui/react-dialog"
import { X } from "phosphor-react"

import { CartButton } from "../CartButton"

import { CartClose, CartContent, CartFinalization, CartProduct, CartProductDetails, CartProductImage, FinalizationDetails } from "./styles"
import Image from "next/image"

export function Cart() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <CartButton />
      </Dialog.Trigger>

      <Dialog.Portal>
        <CartContent>
          <CartClose>
            <X
              size={24}
              weight='bold'
            />
          </CartClose>
          <h2>Sacola de compras</h2>

          <section>
            {/* <p>Parece que ser carrinho está vazio</p> */}

            <CartProduct>
              <CartProductImage>
                <Image
                  width={100}
                  height={93}
                  alt={""}
                  src={""}
                />
              </CartProductImage>
              <CartProductDetails>
                <p>Produto 1</p>
                <strong>R$ 50,00</strong>
                <button>Remover</button>
              </CartProductDetails>
            </CartProduct>
            <CartProduct>
              <CartProductImage>
                <Image
                  width={100}
                  height={93}
                  alt={""}
                  src={""}
                />
              </CartProductImage>
              <CartProductDetails>
                <p>Produto 2</p>
                <strong>R$ 60,00</strong>
                <button>Remover</button>
              </CartProductDetails>
            </CartProduct>
          </section>

          <CartFinalization>
            <FinalizationDetails>
              <div>
                <span>Quantidade</span>
                <p>2 itens</p>
              </div>
              <div>
                <span>Valor total</span>
                <p>R$ 110,00</p>
              </div>
            </FinalizationDetails>
            <button>Finalizar compra</button>
          </CartFinalization>
        </CartContent>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
