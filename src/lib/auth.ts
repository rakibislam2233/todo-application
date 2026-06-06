import { getDb } from "@/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import * as schema from "@/db/schema";
import resend from "./resend";
import ResetPasswordEmailTemplate from "./email/ResetPasswordEmailTemplate";
import VerifyEmailTemplate from "./email/VerifyEmailTemplate";

export function getAuth(env: any) {
  const db = getDb(env);
  return betterAuth({
    database: drizzleAdapter(db, {
      provider: "pg",
      schema,
    }),
    baseURL: env.NEXT_PUBLIC_APP_URL || process.env.NEXT_PUBLIC_APP_URL!,
    secret: env.BETTER_AUTH_SECRET || process.env.BETTER_AUTH_SECRET!,
    // ✅ Email & Password
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: true,
      disableSignUp: false,
      autoSignIn: true,
      sendResetPassword: async ({ user, url, token }) => {
        console.log("Reset Url", url);
        // Send reset password email to user
        await resend.emails.send({
          from: "Todo App <0dE0u@example.com>",
          to: user.email,
          subject: "Reset your Todo Application password",
          react: ResetPasswordEmailTemplate({
            username: user.name,
            resetUrl: url,
            expiresInMinutes: "60",
          }),
        });
      },
      resetPasswordTokenExpiresIn: 3600, // 1 hour
    },
    // ✅ Email Verification
    emailVerification: {
      sendOnSignUp: true,
      autoSignInAfterVerification: true,
      sendVerificationEmail: async ({ user, url, token }) => {
        console.log("Verification Url", url);
        // Send verification email to user
        await resend.emails.send({
          from: "Todo App <0dE0u@example.com>",
          to: user.email,
          subject: "Verify your email for Todo Application",
          react: VerifyEmailTemplate({
            username: user.name,
            verifyUrl: url,
          }),
        });
      },
      expiresIn: 3600, // 1 hour
      onEmailVerification: async (user) => {
        console.log("user verified:", user.emailVerified);
        // Handle post-verification logic (e.g., welcome email, analytics, etc.)
        await env.EMAIL_QUEUE.send(
          {
            type: "welcome_email",
            payload: {
              email: user.email,
              name: user.name,
            },
          },
          { delaySeconds: 600 }, //delay for 10 minutes
        );
      },
    },
    // ✅ Social Providers
    socialProviders: {
      google: {
        clientId: env.GOOGLE_CLIENT_ID || process.env.GOOGLE_CLIENT_ID!,
        clientSecret:
          env.GOOGLE_CLIENT_SECRET || process.env.GOOGLE_CLIENT_SECRET!,
      },
      github: {
        clientId: env.GITHUB_CLIENT_ID || process.env.GITHUB_CLIENT_ID!,
        clientSecret:
          env.GITHUB_CLIENT_SECRET || process.env.GITHUB_CLIENT_SECRET!,
      },
    },
    account: {
      accountLinking: {
        enabled: true,
        trustedProviders: ["google", "github"],
      },
    },
  });
}
export type Auth = ReturnType<typeof getAuth>;
