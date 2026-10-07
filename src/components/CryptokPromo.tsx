export default function CryptokPromo() {
  return (
    <div className="my-10 not-prose">
      <a
        href="https://cryptok.online"
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full max-w-sm mx-auto sm:mx-0 hover:opacity-90 transition-opacity"
      >
        <img
          src="/cryptok-banner.png"
          alt="Find the best everyday apps at cryptok.online"
          className="w-full rounded-lg shadow-sm"
        />
      </a>
      <p className="mt-3 text-sm text-muted-foreground">
        Find your everyday apps
      </p>
    </div>
  );
}
