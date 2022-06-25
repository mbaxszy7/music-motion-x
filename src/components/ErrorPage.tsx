import React from "react"

const ErrorFound = ({
  resetErrorBoundary,
  error,
}: {
  resetErrorBoundary: () => void
  error: Error
}) => {
  console.log(error)
  return (
    <div className=" text-fg  text-lg mt-[35vh] font-bold text-center">
      <div>
        <span>Oops! There was an error!</span> <span className=" ml-1">:(</span>
      </div>
      <div
        className=" text-secondary mt-1"
        onClick={resetErrorBoundary}
        data-testid="error-btn"
      >
        Try again
      </div>
    </div>
  )
}

export default ErrorFound
