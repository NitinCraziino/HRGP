import { MAILGUN_API_KEY, MAILGUN_DOMAIN, MAILGUN_FROM_EMAIL } from "../config";
import Mailgun from "mailgun.js";
import FormData from "form-data";
import { InternalServerError } from "../types/CustomError";
import logger from "../utils/logger";

interface EmailData {
  to: string;
  subject: string;
  text: string;
}

export default class EmailService {
  private mailgun: any;

  constructor() {
    this.mailgun = new Mailgun(FormData);
    this.mailgun = this.mailgun.client({
      username: "api",
      key: MAILGUN_API_KEY,
      domain: MAILGUN_DOMAIN,
    });
  }

  async sendEmail({ to, subject, text }: EmailData) {
    try {
      const emailData = {
        from: `HRGP Admin <${MAILGUN_FROM_EMAIL}>`,
        to: [to],
        subject: subject,
        text: text,
      };

      const result = await this.mailgun.messages.create(MAILGUN_DOMAIN, emailData);
      return result;
    } catch (error) {
      logger.error(error);
      throw new InternalServerError("Failed to send email");
    }
  }
}

// Export the instance of EmailService for usage in other parts of your application
export const emailService = new EmailService();
