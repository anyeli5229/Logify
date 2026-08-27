import { transport } from "../config/nodemailer";

type EmailType = {
    email: string,
    name: string,
    token: string
}

export class AuthEmail {
    static sendConfirmationEmail = async (user: EmailType) => {
        await transport.sendMail({
            from: "Logify <admin@logify.com>",
            to: user.email,
            subject: "Logify - Confirma tu cuenta",
            text: `Hola ${user.name}, confirma tu cuenta en Logify ingresando el siguiente código: ${user.token}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb; border-radius: 8px;">
                    <div style="background-color: #ffffff; padding: 30px; border-radius: 8px; border: 1px solid #e5e7eb;">
                        <h1 style="color: #4f46e5; text-align: center; margin-bottom: 24px; font-size: 28px;">Logify</h1>
                        
                        <h2 style="color: #111827; font-size: 20px; margin-bottom: 16px;">¡Hola, ${user.name}!</h2>
                        
                        <p style="color: #4b5563; font-size: 16px; line-height: 1.5; margin-bottom: 24px;">
                            Gracias por registrarte en Logify. Para completar el registro de tu cuenta y verificar tu dirección de correo electrónico, utiliza el siguiente código de confirmación:
                        </p>
                        
                        <div style="text-align: center; margin: 32px 0;">
                            <span style="display: inline-block; background-color: #f3f4f6; color: #4f46e5; font-size: 32px; font-weight: bold; letter-spacing: 6px; padding: 16px 32px; border-radius: 8px; border: 1px dashed #4f46e5;">
                                ${user.token}
                            </span>
                        </div>
                        
                        <p style="color: #6b7280; font-size: 14px; line-height: 1.5; margin-bottom: 8px;">
                            Este código de confirmación expira en <strong>15 minutos</strong>.
                        </p>
                        
                        <p style="color: #9ca3af; font-size: 13px; line-height: 1.5; margin-top: 24px; border-top: 1px solid #e5e7eb; padding-top: 16px;">
                            Si tú no creaste esta cuenta, puedes ignorar este correo de manera segura.
                        </p>
                    </div>
                    
                    <div style="text-align: center; margin-top: 16px;">
                        <p style="color: #9ca3af; font-size: 12px;">© ${new Date().getFullYear()} Logify. Todos los derechos reservados.</p>
                    </div>
                </div>
            `
        });
    }
}