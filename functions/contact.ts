import { Resend } from "resend";

type Env = {
  RESEND_API_KEY: string;
  EMAIL_CONTACT: string;
};

type Details = {
  message: string;
  name: string;
  phone?: string;
  email?: string;
};

export default {
  async fetch(request, env, _ctx) {
    if (request.method !== "POST") {
      const url = new URL(request.url);
      return Response.redirect(url.origin, 308);
    }

    const resend = new Resend(env.RESEND_API_KEY);
    let details: Details;
    try {
      details = await request.json();
    } catch (error) {
      return Response.json({ error });
    }

    const { email, name, phone, message } = details;

    const { data, error } = await resend.emails.send({
      from: `${name} <website@equipadoca.pt>`,
      to: env.EMAIL_CONTACT,
      replyTo: details.email,
      subject: `Mensagem de ${name}`,
      html: `
        <div>
            <p><b>Nome:</b> ${name ?? "-"}</p>
            <p><b>Email:</b> ${email ?? "-"}</p>
            <p><b>Telefone:</b> ${phone ?? "-"}</p>
            <hr/>
            <p style="white-space: pre-wrap;">${message}</p>
        </div>`,
    });

    return Response.json({ data, error });
  },
} satisfies ExportedHandler<Env>;
