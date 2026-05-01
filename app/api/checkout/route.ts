import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

type CheckoutItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

export async function POST(req: Request) {
  try {
    const { items } = (await req.json()) as { items: CheckoutItem[] };

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: items.map((item) => ({
        quantity: item.quantity,
        price_data: {
          currency: "eur",
          unit_amount: Math.round(item.price * 100),
          product_data: {
            name: item.name,
          },
        },
      })),
      metadata: {
    items: JSON.stringify(items),
  },
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/commande/succes`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cart`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("STRIPE CHECKOUT ERROR FULL:", error);

    return NextResponse.json(
      {
        error: "Unable to create checkout session",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}