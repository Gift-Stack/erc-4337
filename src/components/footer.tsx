export const Footer = () => {
  return (
    <div className="sm:flex sm:flex-col sm:items-center sm:justify-center mb-8">
      <p className="sm:text-base text-[#999]">
        A ERC-4337 experiment built by{" "}
        <a href="https://twitter.com/thenameisgifted">@thenameisgifted</a>
      </p>
      <p className="sm:text-base text-[#999] mt-1.5">
        <a href="https://github.com/gift-stack/erc-4337" target="_blank">
          Github Repo
        </a>
      </p>
    </div>
  );
};
