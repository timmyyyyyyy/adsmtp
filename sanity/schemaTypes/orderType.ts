import { BasketIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const orderType = defineType({
  name: "order",
  title: "Encomenda",
  type: "document",
  icon: BasketIcon,
  fields: [
    defineField({
      name: "orderNumber",
      title: "Número da Encomenda",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "customerName",
      title: "Nome do Cliente",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      title: "E-mail do Cliente",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "phone",
      title: "Telefone",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "products",
      title: "Produtos",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "product",
              title: "Produto",
              type: "reference",
              to: [{ type: "product" }],
            }),
            defineField({
              name: "quantity",
              title: "Quantidade",
              type: "number",
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "totalPrice",
      title: "Preço Total",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "currency",
      title: "Moeda",
      type: "string",
      initialValue: "MT",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "address",
      title: "Endereço de Entrega",
      type: "object",
      fields: [
        defineField({ name: "address", title: "Endereço", type: "string" }),
        defineField({ name: "city", title: "Cidade", type: "string" }),
        defineField({ name: "notes", title: "Notas", type: "string" }),
      ],
    }),
    defineField({
      name: "status",
      title: "Estado da Encomenda",
      type: "string",
      options: {
        list: [
          { title: "Pendente", value: "pending" },
          { title: "Confirmada", value: "confirmed" },
          { title: "Enviada", value: "shipped" },
          { title: "Entregue", value: "delivered" },
          { title: "Cancelada", value: "cancelled" },
        ],
      },
      initialValue: "pending",
    }),
    defineField({
      name: "paymentMethod",
      title: "Método de Pagamento",
      type: "string",
      options: {
        list: [
          { title: "WhatsApp", value: "whatsapp" },
          { title: "Dinheiro na Entrega", value: "cash_on_delivery" },
          { title: "Transferência Bancária", value: "bank_transfer" },
          { title: "M-Pesa", value: "mpesa" },
          { title: "E-Mola", value: "emola" },
        ],
      },
      initialValue: "whatsapp",
    }),
    defineField({
      name: "orderDate",
      title: "Data da Encomenda",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "notes",
      title: "Notas",
      type: "text",
    }),
  ],
  preview: {
    select: {
      name: "customerName",
      amount: "totalPrice",
      currency: "currency",
      orderId: "orderNumber",
      status: "status",
    },
    prepare(select) {
      const statusMap: Record<string, string> = {
        pending: "🔴 Pendente",
        confirmed: "🟢 Confirmada",
        shipped: "🚚 Enviada",
        delivered: "✅ Entregue",
        cancelled: "❌ Cancelada",
      };
      return {
        title: `${select.name} (${select.orderId})`,
        subtitle: `${statusMap[select.status] || select.status} | ${select.amount} ${select.currency}`,
        media: BasketIcon,
      };
    },
  },
});