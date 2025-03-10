import Image from "next/image"
import React from "react"

const Empty = () => {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH

  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center">
        <Image src={`${basePath}/assets/images/empty.svg`} className="text-gray-300" alt="empty" width={100} height={100} />
        <span className="font-bold text-gray-400">No Content Found</span>
      </div>
    </div>
  )
}

export default Empty