import { defineType, defineField } from "sanity";

export const newsletterSubscription = defineType({
  name: "newsletterSubscription",
  title: "Newsletter Subscription",
  type: "document",
  fields: [
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "subscribedAt",
      title: "Subscribed At",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "source",
      title: "Source",
      type: "string",
      description: "Where the subscription came from (e.g., footer, popup)",
    }),
  ],
  preview: {
    select: {
      title: "email",
      subtitle: "subscribedAt",
    },
  },
});
