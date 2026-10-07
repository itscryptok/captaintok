const ACCESS_KEY = "a9685d36-31f1-4c00-90d2-0cca80005d65";

interface ContactPayload {
  name: string;
  email: string;
  message: string;
  websiteUrl?: string;
}

export async function submitContactForm(data: ContactPayload): Promise<void> {
  const body: Record<string, string> = {
    access_key: ACCESS_KEY,
    name: data.name,
    email: data.email,
    message: data.websiteUrl
      ? `${data.message}\n\nWebsite: ${data.websiteUrl}`
      : data.message,
    subject: `New message from ${data.name} — Captain Tok`,
  };

  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(body),
  });

  const json = await res.json();
  if (!json.success) {
    throw new Error(json.message ?? "Submission failed");
  }
}
