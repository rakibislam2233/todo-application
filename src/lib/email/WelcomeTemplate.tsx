import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "react-email";

interface WelcomeEmailProps {
  username?: string;
}

export const WelcomeEmailTemplate = ({ username = "there" }: WelcomeEmailProps) => {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="bg-[#efeef1] font-sans">
          <Preview>Welcome to Todo Application — Let's get things done!</Preview>

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
                <Column className="[border-bottom:3px_solid_rgb(99,102,241)] w-[180px]" />
                <Column className="[border-bottom:3px_solid_rgb(238,238,238)] w-[200px]" />
              </Row>
            </Section>

            {/* Body */}
            <Section className="pt-[30px] px-[30px] pb-[10px]">
              <Text className="text-[#1a1a2e] text-[24px] font-bold m-0">
                Welcome, {username}! 🎉
              </Text>
              <Text className="text-[14px] text-[#4b5563] leading-[1.6] mt-[12px]">
                Your account has been successfully created. We're thrilled to
                have you on board. With Todo Application, you can organize your
                tasks, boost productivity, and never miss a deadline again.
              </Text>
              <Text className="text-[14px] text-[#4b5563] leading-[1.6]">
                Here's what you can do to get started:
              </Text>

              {/* Feature List */}
              <Section className="bg-[#f8f9ff] border-[1px] border-[#e0e7ff] rounded-[8px] p-[20px] my-[16px]">
                <Text className="text-[13px] text-[#374151] m-0 leading-[2]">
                  ✔️ &nbsp; Create and organize your tasks
                </Text>
                <Text className="text-[13px] text-[#374151] m-0 leading-[2]">
                  ✔️ &nbsp; Set priorities and due dates
                </Text>
                <Text className="text-[13px] text-[#374151] m-0 leading-[2]">
                  ✔️ &nbsp; Track your progress in real-time
                </Text>
              </Section>

              <Button
                href="https://todo-app.example.com/dashboard"
                className="bg-[#6366f1] rounded-[6px] text-white text-[15px] font-bold no-underline text-center block p-[12px] mt-[8px]"
              >
                Go to Your Dashboard →
              </Button>
            </Section>

            {/* Footer */}
            <Section className="border-t-[1px] border-[#e5e7eb] px-[30px] py-[20px]">
              <Text className="text-[12px] text-[#9ca3af] m-0 leading-[1.6]">
                If you didn't create this account, you can safely ignore this
                email. Need help?{" "}
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

WelcomeEmailTemplate.PreviewProps = {
  username: "Rakib",
} as WelcomeEmailProps;

export default WelcomeEmailTemplate;