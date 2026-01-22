import { gql } from "@apollo/client";
import { query } from "./ApolloClient";

export const getProducts = async () => {

  const queryString = gql
  `query Products {
    products {
      documentId
      content
      beds
      bathrooms
      featured
      images {
        hash
        formats
        caption
      }
      slug
      price
      title
    }
  }`

  const { data } = await query({ query: queryString });
  return data.products;
}

export const getGuides = async () => {

  const queryString = gql
  `query Guides {
    guides {
      title
      slug
      documentId
    }
  }`

  const { data } = await query({ query: queryString });
  return data.guides;
}

export const getContact = async () => {

  const queryString = gql
  `query Contact {
    contact {
      cardTitle
      cardSubTitle
      description
      name
      phone
      picture {
        formats
        hash
      }
      position
      title
    }
  }`

  const { data } = await query({ query: queryString });
  return data.contact;
}

export const getBrand = async () => {

  const queryString = gql
  `query Brand {
    brand {
      logos {
        formats
        name
      }
    }
  }`

  const { data } = await query({ query: queryString });
  return data.brand;
}