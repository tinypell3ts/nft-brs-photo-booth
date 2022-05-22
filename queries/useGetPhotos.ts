import { gql, request } from "graphql-request";
import { useQuery } from "react-query";
import { FACTORY_ID, SUBGRAPH_ENDPOINT } from "../constants";

export default function useGetPhotos(refetchInterval = 0) {
  return useQuery(
    ["tokens"],
    async () => {
      const data = await request(
        SUBGRAPH_ENDPOINT,
        gql`
          query {
            tokens(where: { factory_id: "${FACTORY_ID}" }, orderBy: createdAt, orderDirection: desc) {
              id
              creator {
                id
              }
              properties {
                key
                value
              }
              saleData {
                salePrice
                maxSupply
                totalSold
              }
            }
          }
        `
      );

      return data;
    },
    { refetchInterval }
  );
}
