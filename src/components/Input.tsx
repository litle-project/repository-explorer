import React from "react"

interface IProps {
  type?: string,
  error?: string,
  placeholder?: string,
  handler: (param: string) => void,
}

const Input = (props: IProps) => {
  const {
    type = 'text',
    handler,
    error = '',
    placeholder = 'Input here'
  } = props
  
  return (
    <div className="flex flex-col">
      <input
        type={type}
        className={`w-full px-4 h-10 bg-gray-50 border placeholder-gray-700 text-sm rounded-sm focus:outline-none ${error !== '' ? 'border-red-500' : 'border-gray-300'}`}
        placeholder={placeholder}
        onChange={({ target: { value } }) => handler(value)}
      />
      {error !== '' && <span className="text-xs text-red-500">{error}</span>}
    </div>
  )
}

export default Input