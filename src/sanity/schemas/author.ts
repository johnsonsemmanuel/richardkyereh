import { defineType, defineField } from "sanity";

export const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 100 },
    }),
    defineField({
      name: "avatar",
      title: "Avatar",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "blockContent",
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "object",
      fields: [
        defineField({ name: "linkedin", title: "LinkedIn URL", type: "url" }),
        defineField({ name: "twitter", title: "X (Twitter) URL", type: "url" }),
        defineField({ name: "website", title: "Website URL", type: "url" }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "avatar",
    },
  },
});
