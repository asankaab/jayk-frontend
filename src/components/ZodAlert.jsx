
export function ZodAlert({field, isPending}) {
    
    if (isPending) return null

    return (
      <div className=" text-left">
        {field?.map((item, index) =>  {
          return (
            <span key={index} className="text-xs mr-1"><span className="text-red-500">* </span>{item}</span>
          )
        })}
      </div>
    )
  }