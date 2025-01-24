'use server'

import { getAuthToken, getUser } from "@/authentication";
import { getStrapiURL } from "@/lib/utils";
import { revalidateTag } from "next/cache";

export async function getEntries(query) {
    try {
      const response = await fetch(getStrapiURL(`/api/${query}`), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`, 
        },
        next: { revalidate: 20 }
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData)
        throw new Error(errorData.error.message || "Network response was not ok");
      }
  
      const jsonResponse = await response.json();
      const entries = jsonResponse.data; // Accessing the 'data' array
      
      return entries;
  
    } catch (error) {
      console.error("Error:", error);
    }
  }
// 

export async function getWatchList() {
  const user = await getUser();
  const token = await getAuthToken();

    const response = await fetch(getStrapiURL(`/api/watchlists?populate[products][populate][0]=images&filters[user][$eq]=${user?.username}`), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, 
      },
      next: { tags: ['watchlist'], revalidate: 10 } 
    });

    const jsonResponse = await response.json();
    const data = jsonResponse.data; // Accessing the 'data' array
    return data[0];

}

export async function createWatchlist(username) {
  
  if (username) {
    const res = await fetch(getStrapiURL('/api/watchlists'), {
      method: 'POST',
      headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
          'Content-Type': 'application/json',
      },
      body: JSON.stringify( { 
          data: {
            user: username
          }
      })
    });
  
    const { data } = await res.json();
    
    return data;
  }
  return "not signed in."
}
//

export async function save(productId) {
  
  const watchList = await getWatchList();
    
  const watchListId = watchList.documentId;
  const isFav = await isFavourite(productId)
  
  if (isFav) {
    await removeFav(watchListId, productId);
    revalidateTag('watchlist')
  } else {
    await addFav(watchListId, productId);
    revalidateTag('watchlist')
  }
    
}
//

export async function isFavourite(productId) {
  const token = await getAuthToken();
  if (!token) return null
  
  const watchList = await getWatchList();
  const isFav = watchList?.products?.map((product) => {
    return product.documentId;
  }).includes(productId)

  return isFav
}
//

export async function addFav(watchListId, productId) {
  const token = await getAuthToken();
  const res = await fetch(getStrapiURL(`/api/watchlists/${watchListId}`), {
    method: 'PUT',
    headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
    },
    body: JSON.stringify( {
        data: {
            products: {
                connect: [ productId ]
            }
        }
    })
  });

  const data = await res.json();
}
//

export async function removeFav(watchListId, productId) {
  const token = await getAuthToken();
  const res = await fetch(getStrapiURL(`/api/watchlists/${watchListId}`), {
    method: 'PUT',
    headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
    },
    body: JSON.stringify( { 
        data: {
            products: {
                disconnect: [ productId ]
            }
        }
    })
  });

  const data = await res.json();
}

