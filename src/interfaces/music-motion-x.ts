import type { Context } from "koa"
import type { QueryClient } from "react-query"
import type { Store } from "@reduxjs/toolkit"

export type FetchServerSideProps = ({
  store,
  ctx,
  queryClient,
}: {
  queryClient: QueryClient
  ctx: Context
  store: Store
}) => void
