import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const data = await req.json();
  const { name, email, project, budget, message, timeline } = data;

  if (!name || !email || !message) {
    return NextResponse.json(
      { success: false, error: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: process.env.GMAIL_USER,
      subject: `New Contact Message from ${name}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Project:</strong> ${project || "Not specified"}</p>
        <p><strong>Budget:</strong> ${budget || "Not specified"}</p>
        <p><strong>Timeline:</strong> ${timeline || "Not specified"}</p>
        <p><strong>Message:</strong><br/>${message.replace(/\n/g, "<br/>")}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send email" },
      { status: 500 }
    );
  }
}
