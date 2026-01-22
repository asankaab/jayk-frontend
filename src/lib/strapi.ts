
export const strapiClient =({token, host}) => {
    return { 
        collection: async(collection)=> {
            try {
                const response = await fetch(`${host}/api/${collection}`, {
                    method: "GET",
                    headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, 
                    },
                    next: { revalidate: 20 }
                });
            
                if (!response.ok) {
                    const errorData = await response.json();
                    console.log(errorData)
                    throw new Error(errorData.error.message || "Network response was not ok");
                }
            
                const jsonResponse = await response.json();
                const entries = jsonResponse.data;
                
                return entries;
            
                } catch (error) {
                console.error("Error:", error);
                }
        }
    }
}

export const strapi = strapiClient({
    token: process.env.NEXT_PUBLIC_STRAPI_TOKEN,
    host: process.env.NEXT_PUBLIC_STRAPI_HOST
})