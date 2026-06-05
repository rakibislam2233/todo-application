import { getDb } from "@/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import * as schema from "@/db";

export const auth = betterAuth({
  database: drizzleAdapter(getDb(), {
    provider: "pg",
    schema,
  }),
  baseURL: process.env.NEXT_PUBLIC_APP_URL!,
  secret: process.env.BETTER_AUTH_SECRET!,

  // ✅ Email & Password
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    // Forgot password email
    // sendResetPassword: async ({ user, url }) => {
    //   const html = await render(
    //     ResetPassword({ resetUrl: url, userName: user.name })
    //   );
    //   await resend.emails.send({
    //     from: "noreply@yourdomain.com",
    //     to: user.email,
    //     subject: "Reset your password",
    //     html,
    //   });
    // },
  },
  // ✅ Email Verification
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    // sendVerificationEmail: async ({ user, url }) => {
    //   const html = await render(
    //     VerifyEmail({ verificationUrl: url, userName: user.name })
    //   );
    //   await resend.emails.send({
    //     from: "noreply@yourdomain.com",
    //     to: user.email,
    //     subject: "Verify your email",
    //     html,
    //   });
    // },
  },
  // ✅ Social Providers
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google", "github"],
    },
  },
});

export type Auth = typeof auth;
