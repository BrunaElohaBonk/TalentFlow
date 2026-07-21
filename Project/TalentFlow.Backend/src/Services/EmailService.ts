import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});


export class EmailService {

  static async enviarEmail(
    email: string,
    linkReset: string
  ) {

    await transporter.sendMail({

      from: process.env.EMAIL_USER,

      to: email,

      subject: "Recuperação de senha - TalentFlow",

      html: `
        <h2>Recuperação de senha</h2>

        <p>Clique no link abaixo:</p>

        <a href="${linkReset}">
          Redefinir senha
        </a>
      `

    });

  }

}