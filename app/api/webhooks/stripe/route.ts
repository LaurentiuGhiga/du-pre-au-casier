import Stripe from "stripe";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get("stripe-signature");

  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    return new Response("Missing signature or webhook secret", {
      status: 400,
    });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    console.error("Webhook signature verification failed:", error);
    return new Response("Webhook Error", { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    console.log("✅ Payment confirmed:", session.id);

    const items = JSON.parse(session.metadata?.items || "[]");

    await prisma.order.create({
      data: {
        stripeId: session.id,
        email: session.customer_email || "no-email",
        amount: session.amount_total || 0,

        items: {
          create: items.map(
            (item: {
              name: string;
              price: number;
              quantity: number;
            }) => ({
              name: item.name,
              price: Math.round(item.price * 100),
              quantity: item.quantity,
            })
          ),
        },
      },
    });
  }

  return new Response("OK", { status: 200 });
}