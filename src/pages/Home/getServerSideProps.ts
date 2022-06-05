import { Store } from "redux"
import { increment } from "./reducer"

export const getServerSideProps = async (store: Store) => {
  store.dispatch(increment())
  console.log("store", store.getState())
}
