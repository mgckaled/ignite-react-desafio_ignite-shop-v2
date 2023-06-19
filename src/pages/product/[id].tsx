import axios from "axios"
import { GetStaticPaths, GetStaticProps } from "next"
import Image from "next/image"
import { useState } from "react"
import Stripe from "stripe"

import Head from "next/head"
import { stripe } from "../../lib/stripe"
import { ImageContainer, ProductContainer, ProductDetails } from "../../styles/pages/product"

interface ProductProps {
  product: {
    id: string
    name: string
    imageUrl: string
    price: string
    description: string
    defaultPriceId: string
  }
}

export default function Product({ product }: ProductProps) {
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)

  async function handleBuyButton() {
    try {
      setIsCreatingCheckoutSession(true)

      const response = await axios.post("/api/checkout", {
        priceId: product.defaultPriceId,
      })

      const { checkoutUrl } = response.data

      window.location.href = checkoutUrl
    } catch (err) {
      setIsCreatingCheckoutSession(false)

      alert("Falha ao redirecionar ao checkout!")
    }
  }

  return (
    <>
      <Head>
        <title>{`${product.name} | Ignite Shop}`}</title>
      </Head>

      <ProductContainer>
        <ImageContainer>
          <Image
            src={product.imageUrl}
            width={520}
            height={480}
            alt={`Imagem da ${product.name}`}
            priority
            style={{ width: "85%", height: "85%" }}
          />
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.price}</span>

          <p>{product.description}</p>

          <button
            disabled={isCreatingCheckoutSession}
            onClick={handleBuyButton}
          >
            Comprar agora
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: { id: "prod_O2U0hARx6a3oJS" },
      },
    ],
    fallback: "blocking",
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
  if (!params) {
    return {
      notFound: true, // Caso não exista parametros, retorna um 404
    }
  }
  const productId = params.id

  const product = await stripe.products.retrieve(productId, {
    expand: ["default_price"],
  })

  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(price.unit_amount ? price.unit_amount / 100 : 0),
        description: product.description,
        defaultPriceId: price.id,
      },
    },
    revalidate: 60 * 60 * 2, // 2 hours
  }
}
