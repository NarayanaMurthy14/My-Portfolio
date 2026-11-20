"use client";
// @flow strict
import { isValidEmail } from '@/utils/check-email';
import { personalData } from '@/utils/data/personal-data';
import emailjs from '@emailjs/browser';
import { useState } from 'react';
import { TbMailForward } from "react-icons/tb";
import { toast } from 'react-toastify';

function ContactWithoutCaptcha() {
  const [input, setInput] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [error, setError] = useState({
    email: false,
    required: false,
  });
  const [emailFallback, setEmailFallback] = useState(false);

  const checkRequired = () => {
    if (input.email && input.message && input.name) {
      setError({ ...error, required: false });
    }
  };

  const handleSendMail = async (e) => {
    e.preventDefault();
    if (!input.email || !input.message || !input.name) {
      setError({ ...error, required: true });
      return;
    } else if (error.email) {
      return;
    } else {
      setError({ ...error, required: false });
    };

    const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceID || !templateID || !publicKey) {
      const subject = `Portfolio message from ${input.name}`;
      const body = `Name: ${input.name}\nEmail: ${input.email}\n\n${input.message}`;
      const params = new URLSearchParams({
        view: 'cm',
        fs: '1',
        to: personalData.email,
        su: subject,
        body,
      });
      window.open(`https://mail.google.com/mail/?${params.toString()}`, '_blank', 'noopener,noreferrer');
      setEmailFallback(true);
      return;
    }

    try {
      const res = await emailjs.send(serviceID, templateID, {
        to_name: 'Venkata Narayana Murthy Kilari',  // Update with recipient's name if needed
        name: input.name,
        email: input.email,
        message: input.message,
      }, { publicKey });

      if (res.status === 200) {
        toast.success('Message sent successfully!');
        setInput({
          name: '',
          email: '',
          message: '',
        });
      };
    } catch (error) {
      toast.error(error?.text || error);
    };
  };

  return (
    <div className="">
      <p className="section-title mb-5 mt-5">
     Get in touch
      </p>
      <div className="contact-form-card max-w-3xl text-white rounded-lg border p-3 lg:p-5">
        <p className="text-sm text-[#d3d8e8]">
          {"If you have any questions, ideas, or opportunities you'd like to discuss, feel free to reach out to me. I'm always open to new collaborations and projects that align with my skills and passions."}
        </p>
        <div className="mt-6 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-base">Name : </label>
            <input
              className="contact-input w-full border rounded-md ring-0 outline-0 transition-all duration-300 px-3 py-2"
              type="text"
              maxLength="100"
              required={true}
              onChange={(e) => setInput({ ...input, name: e.target.value })}
              onBlur={checkRequired}
              value={input.name}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-base">Email Address : </label>
            <input
              className="contact-input w-full border rounded-md ring-0 outline-0 transition-all duration-300 px-3 py-2"
              type="email"
              maxLength="100"
              required={true}
              value={input.email}
              onChange={(e) => setInput({ ...input, email: e.target.value })}
              onBlur={() => {
                checkRequired();
                setError({ ...error, email: !isValidEmail(input.email) });
              }}
            />
            {error.email &&
              <p className="text-sm text-red-400">Please provide a valid email!</p>
            }
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-base">Query / Suggestion / Message : </label>
            <textarea
              className="contact-input w-full border rounded-md ring-0 outline-0 transition-all duration-300 px-3 py-2"
              maxLength="500"
              name="message"
              required={true}
              onChange={(e) => setInput({ ...input, message: e.target.value })}
              onBlur={checkRequired}
              rows="4"
              value={input.message}
            />
          </div>
          <div className="flex flex-col items-center gap-2">
            {error.required &&
              <p className="text-sm text-red-400">
                Email and Message are required!
              </p>
            }
            {emailFallback &&
              <p className="max-w-full break-words text-center text-sm text-amber-300" role="status">
                Gmail draft opened. Click Send in Gmail to deliver your message.
              </p>
            }
            <button
              className="contact-submit flex items-center gap-2 rounded-full px-5 md:px-12 py-2.5 md:py-3 text-center text-xs md:text-sm font-semibold uppercase tracking-wider no-underline transition-all duration-200 ease-out"
              role="button"
              onClick={handleSendMail}
            >
              <span>Talk to Kilari</span>
              <TbMailForward className="mt-1" size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactWithoutCaptcha;