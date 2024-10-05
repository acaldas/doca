import { useState, type FormEvent } from "react";

type State = "INITIAL" | "SENDING" | "SUCCESS" | "ERROR";

export default function ContactForm() {
  const [state, setState] = useState<State>("INITIAL");
  const isSending = state === "SENDING";

  async function onSubmitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      setState("SENDING");
      const body = JSON.stringify(data);
      const response = await fetch("/contact", {
        mode: "no-cors",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      if (result.error) {
        throw new Error(result.error);
      }
      setState("SUCCESS");
    } catch (error) {
      setState("ERROR");
      console.error(error);
    }

    return false;
  }

  return (
    <form
      className="lg:max-w-xl flex flex-col"
      method="POST"
      onSubmit={onSubmitForm}
    >
      <h3 className="text-green font-semibold text-3xl alternate mb-1">
        Contacte-nos
      </h3>
      <label
        htmlFor="message"
        className="form-label alternate text-sm sm:text-md"
      >
        Para marcação ou mais informações
      </label>
      <textarea
        id="message"
        name="message"
        className="flex-1 resize-none w-full min-h-[120px] max-h-[230px] rounded form-input placeholder:text-green mb-4"
        placeholder="Envie uma mensagem"
        required
      ></textarea>
      <label htmlFor="name" className="form-label">
        Nome
      </label>
      <input
        required
        type="text"
        id="name"
        name="name"
        className="form-input w-full mb-4"
      />
      <div className="flex gap-6">
        <div className="flex-1">
          <label htmlFor="phone" className="form-label">
            Telefone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="form-input w-full"
          />
        </div>
        <div className="flex-1">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="text"
            id="email"
            name="email"
            className="form-input w-full"
          />
        </div>
      </div>
      <div className="mt-10 self-end w-full">
        <input
          disabled={isSending}
          type="submit"
          className={`bg-green hover:bg-green/90 rounded shadow-md text-white text-sm sm:text-md py-2 px-4 w-full mb-2 ${
            isSending ? "animate-fade" : ""
          }`}
          value="Enviar"
        />
        {state === "SUCCESS" ? (
          <p className="text-green">Mensagem enviada!</p>
        ) : state === "ERROR" ? (
          <p className="text-green">Ocorreu um erro ao enviar mensagem</p>
        ) : null}
      </div>
    </form>
  );
}
