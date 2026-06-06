import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Html,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "react-email";

interface VerifyEmailProps {
  username?: string;
  verifyUrl?: string;
  otp?: string;
}

export const VerifyEmailTemplate = ({
  username = "there",
  verifyUrl = "https://todo-app.example.com/verify-email?token=xxx",
  otp,
}: VerifyEmailProps) => {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="bg-[#efeef1] font-sans">
          <Preview>Verify your email to activate your Todo Application account</Preview>

          <Container className="max-w-[580px] my-[30px] mx-auto bg-white">
            {/* Header */}
            <Section className="bg-[#1a1a2e] p-[30px] text-center">
              <Text className="text-white text-[22px] font-bold m-0 tracking-wider">
                ✅ Todo Application
              </Text>
            </Section>

            {/* Accent Bar */}
            <Section className="w-full">
              <Row>
                <Column className="[border-bottom:3px_solid_rgb(238,238,238)] w-[200px]" />
                <Column className="[border-bottom:3px_solid_rgb(16,185,129)] w-[180px]" />
                <Column className="[border-bottom:3px_solid_rgb(238,238,238)] w-[200px]" />
              </Row>
            </Section>

            {/* Body */}
            <Section className="pt-[30px] px-[30px] pb-[10px]">
              <Text className="text-[#1a1a2e] text-[22px] font-bold m-0">
                Verify Your Email Address ✉️
              </Text>
              <Text className="text-[14px] text-[#4b5563] leading-[1.6] mt-[12px]">
                Hi {username},
              </Text>
              <Text className="text-[14px] text-[#4b5563] leading-[1.6]">
                Thanks for signing up for Todo Application! Before you start
                organizing your tasks, we need to verify your email address to
                make sure everything is secure.
              </Text>

              {/* OTP Block — shown only if otp is provided */}
              {otp && (
                <Section className="text-center my-[24px]">
                  <Text className="text-[13px] text-[#6b7280] m-0 mb-[8px]">
                    Your verification code:
                  </Text>
                  <Section className="bg-[#f0fdf4] border-[2px] border-[#10b981] rounded-[10px] py-[16px] px-[30px] inline-block mx-auto">
                    <Text className="text-[32px] font-bold text-[#065f46] tracking-[10px] m-0 text-center">
                      {otp}
                    </Text>
                  </Section>
                  <Text className="text-[12px] text-[#9ca3af] mt-[10px] m-0">
                    This code expires in 10 minutes
                  </Text>
                </Section>
              )}

              {/* CTA Button */}
              <Button
                href={verifyUrl}
                className="bg-[#10b981] rounded-[6px] text-white text-[15px] font-bold no-underline text-center block p-[12px] mt-[4px]"
              >
                Verify My Email →
              </Button>

              {/* Info Box */}
              <Section className="bg-[#f0fdf4] border-[1px] border-[#a7f3d0] rounded-[8px] p-[16px] my-[20px]">
                <Text className="text-[13px] text-[#065f46] m-0 leading-[1.7]">
                  ℹ️ &nbsp;If you didn't create an account with Todo Application,
                  you can safely ignore this email. No account will be activated
                  without verification.
                </Text>
              </Section>

              <Text className="text-[13px] text-[#6b7280] leading-[1.6]">
                If the button above doesn't work, copy and paste this link into
                your browser:
              </Text>
              <Text className="text-[12px] text-[#6366f1] leading-[1.6] break-all">
                {verifyUrl}
              </Text>
            </Section>

            {/* Footer */}
            <Section className="border-t-[1px] border-[#e5e7eb] px-[30px] py-[20px]">
              <Text className="text-[12px] text-[#9ca3af] m-0 leading-[1.6]">
                This verification link expires in 24 hours. Need help?{" "}
                <a
                  href="mailto:support@todo-app.example.com"
                  className="text-[#6366f1]"
                >
                  Contact Support
                </a>
              </Text>
              <Text className="text-[11px] text-[#d1d5db] m-0 mt-[8px]">
                © {new Date().getFullYear()} Todo Application. All rights
                reserved.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

VerifyEmailTemplate.PreviewProps = {
  username: "Rakib",
  verifyUrl: "https://todo-app.example.com/verify-email?token=demo123",
  otp: "847291",
} as VerifyEmailProps;

export default VerifyEmailTemplate;