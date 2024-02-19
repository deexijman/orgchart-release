import nodemailer from "nodemailer";

export const sendMail = async (subject, text, email) => {
    try {
        let transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: "hafeeluddeen@gmail.com",
                pass: "ijrh nokj cxlj zxcc",
            },
        });

        // Define email options
        let mailOptions = {
            from: "hafeeluddeen@gmail.com", // Sender address
            to: email, // List of recipients
            subject: subject, // Subject line
            text: text, // Plain text body
        };

        // Send email
        let info = await transporter.sendMail(mailOptions);
        console.log("Email sent successfully!");
        console.log("Message ID:", info.messageId);
    } catch (error) {
        console.error("Failed to send email:", error);
        throw new Error("Failed to send email");
    }
};
