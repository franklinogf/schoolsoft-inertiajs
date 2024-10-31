import {
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Tailwind,
  Text,
} from "@react-email/components";

export interface ContactEmailProps {
  name: string;
  lastname: string;
  email: string;
  message: string;
}

export const ContactEmail = ({ name, lastname, email, message }: ContactEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>{email} is trying to contact</Preview>
      <Tailwind>
        <Container className="px-2">
          <Heading as="h1" className="text-center tracking-tight">
            Schoolsoft
          </Heading>
          <Text className="text-lg">{`Nombre: ${name} ${lastname}`}</Text>
          <Text className="text-xl">{`Email: ${email}`}</Text>
          <Hr />
          <Text className="text-[18px]">Mensaje:</Text>
          <Text className="text-[16px]">{message}</Text>
        </Container>
      </Tailwind>
    </Html>
  );
};

ContactEmail.PreviewProps = {
  name: "Franklin",
  lastname: "Gonzalez Flores",
  email: "franklinomarflores@gmail.com",
  message: "Mensaje desde el formulario de contacto",
} satisfies ContactEmailProps;

export default ContactEmail;
