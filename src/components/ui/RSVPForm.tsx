import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import type { RSVPData, RSVPRepository } from "../../repositories/rsvp";
import { rsvpSchema } from "./rsvpSchema";

interface RSVPFormProps {
  repository: RSVPRepository;
}

export const RSVPForm = ({ repository }: RSVPFormProps) => {
  const [submitted, setSubmitted] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RSVPData>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: { guests: 1, message: "" },
  });

  const onSubmit = async (data: RSVPData) => {
    setSubmissionError(null);
    try {
      await repository.submit(data);
      setSubmitted(true);
    } catch {
      setSubmissionError(
        "We could not save your reply on this device. Please check your browser settings and try again.",
      );
    }
  };
  const submitForm = handleSubmit(onSubmit);

  if (submitted) {
    return (
      <div className="rsvp-success" role="status" aria-live="polite">
        <span aria-hidden="true">✦</span>
        <strong>Thank you for replying</strong>
        <p>Your response has been saved on this device.</p>
      </div>
    );
  }

  return (
    <form
      className="rsvp-form"
      onSubmit={(event) => {
        void submitForm(event);
      }}
      noValidate
    >
      <div className="field">
        <label htmlFor="rsvp-name">Guest Name</label>
        <input id="rsvp-name" autoComplete="name" {...register("name")} />
        {errors.name && <p role="alert">{errors.name.message}</p>}
      </div>

      <div className="field">
        <label htmlFor="rsvp-guests">Number of Guests</label>
        <input
          id="rsvp-guests"
          type="number"
          min={1}
          max={10}
          inputMode="numeric"
          {...register("guests", { valueAsNumber: true })}
        />
        {errors.guests && <p role="alert">{errors.guests.message}</p>}
      </div>

      <fieldset className="attendance-field">
        <legend>Attendance</legend>
        <label>
          <input type="radio" value="accept" {...register("attendance")} />
          <span>Joyfully Accept</span>
        </label>
        <label>
          <input type="radio" value="decline" {...register("attendance")} />
          <span>Regretfully Decline</span>
        </label>
        {errors.attendance && <p role="alert">{errors.attendance.message}</p>}
      </fieldset>

      <div className="field field-message">
        <label htmlFor="rsvp-message">Message</label>
        <textarea id="rsvp-message" rows={2} maxLength={500} {...register("message")} />
        {errors.message && <p role="alert">{errors.message.message}</p>}
      </div>

      <button className="rsvp-submit" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving…" : "Send RSVP"}
      </button>
      {submissionError && (
        <p className="submission-error" role="alert">
          {submissionError}
        </p>
      )}
    </form>
  );
};
