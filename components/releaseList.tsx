import { gql, request } from "graphql-request";
import { useEffect, useState } from "react";

interface ReleaseItemProps {
  release: Release;
}

/**
 * @dev The metadata from the subgraph are stored as key/value pairs.
 * @param property - A single property consisting of a key/value pair.
 * @param key - The key to lookup in a key/value pair.
 * @returns if it exists, a key/value pair of a single property.
 */
function getMetadataValue(property: Property[], key: string) {
  if (!key) return new Error("OpenFormat: key not set");
  if (!property) return null;

  return property.find((m: Property) => m.key === key)?.value;
}

/**
 * @dev If a piece of metdata is stored on IPFS is it generally prefixed with ipfs://
 * Most browsers can't read this, so we need to use a IPFS gateway service and
 * replace the start of the URL.
 */

function transformURL(url: string) {
  if (!url) return;
  return url.replace("ipfs://", "https://ipfs.infura.io/ipfs/");
}

/**
 * @dev This component displays a list of releases returns from the subgraph
 */
export default function ReleaseList() {
  // We want to check that the factory_id is set in .env.local
  const FACTORY_ID = process.env.NEXT_PUBLIC_FACTORY_ID;
  if (!FACTORY_ID)
    throw new Error(
      "Please set the NEXT_PUBLIC_FACTORY_ID environment variable."
    );

  // A piece of state that stores the releases
  const [releases, setReleases] = useState<Release[]>();

  // Fetch the releases from the subgraph on page render
  useEffect(() => fetchReleases(), []);

  async function fetchReleases() {
    /**
     * @dev The graphql query that fetches data from the subgraph. Pass in a factory_id
     * to only fetch tokens created from this factory.
     * Playground - https://thegraph.com/hosted-service/subgraph/simpleweb/open-format
     */
    const query = gql`
      query ($factory_id: String!) {
        tokens(where: { factory_id: $factory_id }) {
          id
          creator {
            id
          }
          properties {
            key
            value
          }
        }
      }
    `;

    /**
     * @dev the graphql request that calls the subgraph and passes in the query parameters
     * and variables, in this instance the factory_id.
     */

    await request(
      "https://api.thegraph.com/subgraphs/name/simpleweb/open-format",
      query,
      { factory_id: FACTORY_ID }
    ).then((data) => {
      if (data.tokens?.length) {
        setReleases(data.tokens);
      }
    });
  }

  return releases ? (
    <ul className="space-y-2">
      {releases?.map((release, i) => (
        <ReleaseItem key={i} release={release} />
      ))}
    </ul>
  ) : (
    <p>No releases found.</p>
  );
}

/**
 * @dev This component is for a single release.
 * @param release - A single release from the subgraph
 * @returns - A list item component with details about the release
 */

function ReleaseItem({ release }: ReleaseItemProps) {
  const name = getMetadataValue(release.properties, "name");
  const artwork = getMetadataValue(release.properties, "image");

  return (
    <li className="flex items-center space-x-3 rounded-md border-2 border-indigo-500 py-2 px-5 shadow-md">
      <img className="h-16 w-16 rounded-full" src={transformURL(artwork)} />
      <p>{name}</p>
    </li>
  );
}
