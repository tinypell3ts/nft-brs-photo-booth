# 🏭 Open Format factory starter

A basic factory starter template.

## Getting Started

These instructions will give you a copy of the project up and running on your local machine for development and testing purposes.

## Installation

Install JavaScript dependencies

```
yarn install OR npm install
```

Setup your environment variables

```
cp .env.local.example .env.local
```

#### Environment variable configuration

| Variable                        | Description                                                                                                                                                                                                     |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_CHAIN_ID`          | This is the chain id of the network you want to connect to. Open Format currently supports Polygon Mainnet (137) and Polygon Mumbai (80001)                                                                     |
| `NEXT_PUBLIC_NFT_STORAGE_TOKEN` | This starter uses nft.storage to interact with IPFS. You can use any IPFS storage provider. [Get an API Key](https://nft.storage/docs/#get-an-api-token)                                                        |
| `NEXT_PUBLIC_FACTORY_ID`        | This is used for filtering the subgraph to only show tokens created in specific factory frontend. This can be any string value, but for uniqueness, we recommend using [UUIDv4](https://www.uuidgenerator.net/) |

## Development

### Running

```
yarn run dev
```

This will run the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits. You will also see any lint errors in the console.

## Documentation and Support

[Open Format Documentation](https://docs.openformat.simpleweb.co.uk/)

Have a question? Join us on [Discord](https://discord.gg/vmQMTcPmGU)

## Learn More

This project was created using [NextJS](https://nextjs.org/).

Find out more about the packages used in this project:

- [ethers](https://docs.ethers.io/v5/)
- [TailwindCSS](https://tailwindcss.com)
- [OnboardJS](https://docs.blocknative.com/onboard)
- [nft.storage](https://nft.storage/)
