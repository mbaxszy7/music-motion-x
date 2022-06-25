import { FC, ReactNode } from "react"
import { Provider } from "react-redux"
import getReduxStore from "../../src/store"
import { BrowserRouter } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "react-query"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
})

const App: FC<{ children?: ReactNode }> = ({ children }) => {
  return (
    <Provider store={getReduxStore({})} serverState={{}}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter> {children}</BrowserRouter>
      </QueryClientProvider>
    </Provider>
  )
}

export default App
