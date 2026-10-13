import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'visualFlow',
  title: 'Visual Flow Chart',
  type: 'object',
  description:
    'A simple visual flow chart: labelled boxes connected top-to-bottom by arrows. Use only where a sequence genuinely benefits from a visual, not for every step list (that is what Flow Diagram is for).',
  fields: [
    defineField({
      name: 'steps',
      title: 'Steps',
      type: 'array',
      of: [{type: 'string'}],
      validation: (Rule) => Rule.required().min(2).max(8),
    }),
  ],
  preview: {
    select: {steps: 'steps'},
    prepare({steps}) {
      return {
        title: `Visual flow chart (${(steps || []).length} steps)`,
        subtitle: (steps || []).join(' → '),
      }
    },
  },
})
