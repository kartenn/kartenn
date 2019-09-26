import { useContext } from "react"
import { ApolloContext } from "react-apollo"

export default function useApolloClient() {
  return useContext(ApolloContext)
}
