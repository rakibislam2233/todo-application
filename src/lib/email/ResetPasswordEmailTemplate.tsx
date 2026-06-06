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

interface ResetPasswordEmailTemplateProps {
  username?: string;
  resetUrl?: string;
  expiresInMinutes?: string;
}

export const ResetPasswordEmailTemplate = ({
  username = "there",
  resetUrl = "https://todo-app.example.com/reset-password?token=xxx",
  expiresInMinutes = "30",
}: ResetPasswordEmailTemplateProps) => {
  const requestedAt = new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date());

  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="bg-[#efeef1] font-sans">
          <Preview>
            Reset your Todo AApplication password — link expires in{" "}
            {expiresInMinutes as string} minutes
          </Preview>

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
                <Column className="[border-bottom:3px_solid_rgb(239,68,68)] w-[180px]" />
                <Column className="[border-bottom:3px_solid_rgb(238,238,238)] w-[200px]" />
              </Row>
            </Section>

            {/* Body */}
            <Section className="pt-[30px] px-[30px] pb-[10px]">
              <Text className="text-[#1a1a2e] text-[22px] font-bold m-0">
                Password Reset Request 🔐
              </Text>
              <Text className="text-[14px] text-[#4b5563] leading-[1.6] mt-[12px]">
                Hi {username},
              </Text>
              <Text className="text-[14px] text-[#4b5563] leading-[1.6]">
                We received a request to reset the password for your Todo
                Application account on{" "}
                <span className="font-semibold text-[#1a1a2e]">
                  {requestedAt}
                </span>
                . If this was you, click the button below to choose a new
                password.
              </Text>

              <Button
                href={resetUrl}
                className="bg-[#ef4444] rounded-[6px] text-white text-[15px] font-bold no-underline text-center block p-[12px] mt-[4px]"
              >
                Reset My Password →
              </Button>

              {/* Warning Box */}
              <Section className="bg-[#fff7f7] border-[1px] border-[#fecaca] rounded-[8px] p-[16px] my-[20px]">
                <Text className="text-[13px] text-[#991b1b] m-0 leading-[1.7]">
                  ⚠️ &nbsp;This link will expire in{" "}
                  <strong>{expiresInMinutes} minutes</strong>. If you did{" "}
                  <strong>NOT</strong> request a password reset, please ignore
                  this email — your password will remain unchanged.
                </Text>
              </Section>

              <Text className="text-[13px] text-[#6b7280] leading-[1.6]">
                If the button above doesn't work, copy and paste this link into
                your browser:
              </Text>
              <Text className="text-[12px] text-[#6366f1] leading-[1.6] break-all">
                {resetUrl}
              </Text>
            </Section>

            {/* Footer */}
            <Section className="border-t-[1px] border-[#e5e7eb] px-[30px] py-[20px]">
              <Text className="text-[12px] text-[#9ca3af] m-0 leading-[1.6]">
                For security reasons, this link expires in {expiresInMinutes}{" "}
                minutes. Need help?{" "}
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

ResetPasswordEmailTemplate.PreviewProps = {
  username: "Rakib",
  resetUrl: "https://todo-app.example.com/reset-password?token=demo123",
  expiresInMinutes: "60",
} as ResetPasswordEmailTemplateProps;

export default ResetPasswordEmailTemplate;