import nodemailer from 'nodemailer'

export const sendTrainerAssignmentEmail = async (trainerEmail: string, courseDetails: any) => {
    const transporter = nodemailer.createTransport({
        host: 'localhost',
        port: 1025,
        secure: false,
    });

    const message = {
        from: '"Seminar Management" <noreply@solumentics.com>',
        to: trainerEmail,
        subject: `Course Assignment: ${courseDetails.name}`,
        text: `
      Dear Trainer,

      You have been assigned to the course "${courseDetails.name}" scheduled on ${courseDetails.date}.
      Location: ${courseDetails.location}.
      
      Please prepare accordingly.

      Best regards,
      Seminar Management Team
    `,
    };

    await transporter.sendMail(message);
}