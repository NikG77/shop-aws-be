export default {
  type: "object",
  properties: {
    id: { type: "string" },
    title: { type: "string" },
    price: { type: "number" },
    description: { type: "string" },
    image: { type: "string" },
  },
} as const;
