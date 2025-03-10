import React from "react"
import Image from "next/image"

interface ILoading {
  status: boolean,
  message: string,
}

interface IProps {
  loading?: ILoading,
  label?: string,
  handler: () => void
}

const Button = (props: IProps) => {
  const {
    loading = { status: false, message: '' },
    label = 'Button',
    handler,
  } = props
  
  return (
    <button
      className={`w-full text-white py-1 cursor-pointer rounded-sm flex items-center gap-2 justify-center ${loading.status ? 'bg-gray-400' : 'bg-blue-400 hover:bg-blue-500'}`}
      type="button"
      disabled={loading.status}
      onClick={handler}
    >
      <Image
        className={`animate-spin ${loading.status ? '' : 'hidden'}`}
        src="/assets/images/spinner.svg"
        alt="loading_icon"
        width={20}
        height={20}
      />
      <span>{label}</span>
    </button>
  )
}

export default Button