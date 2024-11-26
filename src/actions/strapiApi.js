// ./strapi_content_api.js

import { auth } from "@/auth";
import { getStrapiURL } from "@/lib/utils";
import { url } from "inspector";
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

export async function getWatchList(query) {
  const session = await auth();

    const response = await fetch(getStrapiURL(`/api/watchlists?populate[products][populate][0]=images&filters[userId][$eq]=${session?.user?.id}`), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.jwt}`, 
      },
      next: { tags: ['watchlist'], revalidate: 10 } 
    });

    const jsonResponse = await response.json();
    const data = jsonResponse.data; // Accessing the 'data' array
    return data;

}

export async function createWatchlist() {
  const session = await auth();

  if (session.user) {
    const res = await fetch(getStrapiURL('/api/watchlists'), {
      method: 'POST',
      headers: {
          Authorization: `Bearer ${session.jwt}`,
          'Content-Type': 'application/json',
      },
      body: JSON.stringify( { 
          data: {
            userId: session.user.id
          }
      })
    });
  
    const { data } = await res.json();
    console.log("Watchlist created for ", data?.userId)
    return data;
  }
  return "not signed in."
}
//

export async function save(productId) {
  
  const watchList = await getWatchList();
  revalidateTag('watchlist')

  if (watchList[0]) {
    const watchListId = watchList[0].documentId;

    const isFav = await isFavourite(productId);

      if (isFav) {
        await removeFav(watchListId, productId);
      } else {
        await addFav(watchListId, productId);
      }

  } else {

    const watchList = await createWatchlist()
    const watchListId = await watchList.documentId;
    await addFav(watchListId, productId);
  }
    
}
//

export async function isFavourite(productId) {
  const session = await auth();
  if (!session) return null
  
  const res = await fetch(getStrapiURL(`/api/products/${productId}?populate=watchlists`), {
    method: 'GET',
    headers: {
        Authorization: `Bearer ${session?.jwt}`,
        'Content-Type': 'application/json',
    }
  });

  const data = await res.json();
  const list = data?.data?.watchlists?.map((element) => {
      if (element.userId === session.user.id) {
        return true
      }
  });

  const isFav = list[0]
  console.log({isFav: isFav})

  return isFav
}
//

export async function addFav(watchListId, productId) {
  const session = await auth();
  const res = await fetch(getStrapiURL(`/api/watchlists/${watchListId}`), {
    method: 'PUT',
    headers: {
        Authorization: `Bearer ${session.jwt}`,
        'Content-Type': 'application/json',
    },
    body: JSON.stringify( {
        data: {
            products: {
                connect: [ { documentId: productId } ]
            }
        }
    })
  });

  const data = await res.json();
  console.log({added: data?.data?.documentId})
}
//

export async function removeFav(watchListId, productId) {
  const session = await auth();
  const res = await fetch(getStrapiURL(`/api/watchlists/${watchListId}`), {
    method: 'PUT',
    headers: {
        Authorization: `Bearer ${session.jwt}`,
        'Content-Type': 'application/json',
    },
    body: JSON.stringify( { 
        data: {
            products: {
                disconnect: [ { documentId: productId } ]
            }
        }
    })
  });

  const data = await res.json();
  console.log({removed: data?.data?.documentId})
}

