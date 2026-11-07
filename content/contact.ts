// /contact copy. The form posts to app/api/contact/route.ts.
export const contact = {
  meta: {
    title: "Contact",
    description: "Questions about Investing Mastery Signals or membership? Send us a message.",
  },
  hero: {
    eyebrow: "Contact",
    title: "Get in *touch*",
    intro:
      "Questions about the method, membership or billing? Send a message. We can't answer questions about your personal portfolio or what you should buy.",
  },
  form: {
    title: "Send a message",
    name: "Name",
    email: "Email",
    message: "Message",
    messageHint: "Please don't include account numbers or other sensitive financial details.",
    submit: "Send message",
    sending: "Sending…",
    success: "Thanks. Your message is in. We'll reply by email [RESPONSE TIME, e.g. within 2 business days].",
    error: "Something went wrong and your message wasn't sent. Please try again, or email us directly.",
  },
  sidebar: {
    emailTitle: "Email",
    socialTitle: "Elsewhere",
    note: "For billing questions, include the email address you joined with.",
  },
};
