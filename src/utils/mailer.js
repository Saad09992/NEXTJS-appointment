import nodemailer from "nodemailer";

export const sendMail = async ({ email, userId, sTime, eTime }) => {
  try {
    console.log(process.env.EMAIL);
    console.log(process.env.PASS);

    var transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587, // or 465 for SSL
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
      tls: {
        rejectUnauthorized: false, // Ignore self-signed certificates
      },
    });
    const verificationTokenURL = `${process.env.DOMAIN}/booked-appointment/${userId}`;
    const mailOptions = {
      from: "no-reply@NEXT-SM.com",
      to: email,
      subject: "Booking Confirmed",
      html: `<h1>Booking Confirmed</h1>
             <p>This is your UserId: ${userId} use it to see your bookings</p>
             <p>Your appointment is confirmed for ${sTime} to ${eTime}</p>
             <a href="${verificationTokenURL}">${verificationTokenURL}</a>`,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error) {
    throw new Error(error.message);
  }
};
