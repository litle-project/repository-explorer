import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import Input from "@/components/Input"
import "@testing-library/jest-dom"

describe("Input Component", () => {
  test("renders input with default placeholder", () => {
    render(<Input handler={() => {}} />)
    const inputElement = screen.getByPlaceholderText("Input here")
    expect(inputElement).toBeInTheDocument()
  })

  test("renders input with custom placeholder", () => {
    render(<Input placeholder="Enter your name" handler={() => {}} />)
    expect(screen.getByPlaceholderText("Enter your name")).toBeInTheDocument()
  })

  test("calls handler function on input change", () => {
    const mockHandler = jest.fn()
    render(<Input handler={mockHandler} />)
    
    const inputElement = screen.getByPlaceholderText("Input here")
    fireEvent.change(inputElement, { target: { value: "Hello" } })

    expect(mockHandler).toHaveBeenCalledTimes(1)
    expect(mockHandler).toHaveBeenCalledWith("Hello")
  })

  test("displays error message when error prop is provided", () => {
    render(<Input error="Required field" handler={() => {}} />)
    expect(screen.getByText("Required field")).toBeInTheDocument()
  })

  test("applies error border style when error exists", () => {
    render(<Input error="Error message" handler={() => {}} />)
    const inputElement = screen.getByPlaceholderText("Input here")
    expect(inputElement).toHaveClass("border-red-500")
  })

  test("does not show error message if error prop is empty", () => {
    render(<Input handler={() => {}} />)
    expect(screen.queryByText("Required field")).not.toBeInTheDocument()
  })
})
