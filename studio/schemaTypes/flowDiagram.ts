import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'flowDiagram',
  title: 'Flow Diagram',
  type: 'object',
  description: 'A short numbered sequence of steps, rendered as a consistent visual on the blog. Use for "here\'s what changed" / pipeline-style breakdowns.',
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
        title: `Flow diagram (${(steps || []).length} steps)`,
        subtitle: (steps || []).join(' → '),
      }
    },
  },
})
