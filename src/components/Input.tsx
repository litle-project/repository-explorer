import React from "react"

interface IProps {
  type?: string,
  error?: string,
  placeholder?: string,
  eventKey?: (param: string) => void,
  handler: (param: string) => void,
}

const Input = (props: IProps) => {
  const {
    type = 'text',
    handler,
    error = '',
    eventKey = () => {},
    placeholder = 'Input here'
  } = props

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const inputValue = (event.target as HTMLInputElement).value;
    if (event.key === "Enter") {
      eventKey(inputValue)
    }
  };

  return (
    <div className="flex flex-col">
      <input
        type={type}
        className={`w-full px-4 h-10 bg-gray-50 border placeholder-gray-700 text-sm rounded-sm focus:outline-1 ${error !== '' ? 'border-red-500' : 'border-gray-300'}`}
        placeholder={placeholder}
        onKeyUp={handleKeyDown}
        onChange={({ target: { value } }) => handler(value)}
      />
      {error !== '' && <span className="text-xs text-red-500">{error}</span>}
    </div>
  )
}

export default Input