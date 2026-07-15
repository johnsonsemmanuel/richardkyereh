import { defineType, defineField } from "sanity";

export const bookingSubmission = defineType({
  name: "bookingSubmission",
  title: "Booking Submission",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Full Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
    }),
    defineField({
      name: "company",
      title: "Company",
      type: "string",
    }),
    defineField({
      name: "service",
      title: "Service",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "date",
      title: "Preferred Date",
      type: "string",
    }),
    defineField({
      name: "time",
      title: "Preferred Time",
      type: "string",
    }),
    defineField({
      name: "videoCall",
      title: "Video Call Preference",
      type: "string",
    }),
    defineField({
      name: "message",
      title: "Message",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "questions",
      title: "Additional Questions",
      type: "object",
      fields: [
        defineField({ name: "question1", title: "Question 1", type: "string" }),
        defineField({ name: "answer1", title: "Answer 1", type: "string" }),
        defineField({ name: "question2", title: "Question 2", type: "string" }),
        defineField({ name: "answer2", title: "Answer 2", type: "string" }),
      ],
    }),
    defineField({
      name: "createdAt",
      title: "Submitted At",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "New", value: "new" },
          { title: "Contacted", value: "contacted" },
          { title: "Confirmed", value: "confirmed" },
          { title: "Cancelled", value: "cancelled" },
        ],
      },
      initialValue: "new",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "service",
      date: "createdAt",
    },
    prepare(selection) {
      const { title, subtitle, date } = selection;
      return { title, subtitle: `${subtitle} - ${date ? new Date(date).toLocaleString() : ""}` };
    },
  },
});
