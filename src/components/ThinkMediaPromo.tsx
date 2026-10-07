export default function ThinkMediaPromo() {
  return (
    <div className="my-10 not-prose">
      <a
        href="https://thinskmedia.com"
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full max-w-sm mx-auto sm:mx-0 hover:opacity-90 transition-opacity"
      >
        <img
          src="/thinsk-media-marketing.png"
          alt="Thinsk Media — AI-Powered Marketing for DFW Businesses"
          className="w-full rounded-lg shadow-sm"
        />
      </a>
      <p className="mt-3 text-sm text-muted-foreground">
        Smart marketing solutions for your business.
      </p>
    </div>
  );
}
