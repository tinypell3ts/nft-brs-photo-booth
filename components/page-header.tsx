import Image from "next/image";

interface Props {
  title: string;
}

function PageHeader({ title }: Props) {
  return (
    <header>
      <div className="mb-12 flex justify-center">
        <Image
          src="/nftbrs-logo.jpg"
          width={113}
          height={68}
          alt="NFT BRS logo"
          className="invert"
        />
      </div>
      <h1 className="mb-4 text-center font-display text-3xl font-bold text-zinc-200">
        {title}
      </h1>
    </header>
  );
}

export default PageHeader;
