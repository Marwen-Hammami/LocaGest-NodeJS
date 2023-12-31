// Import the Reservation model
import Reservation from '../models/reservation.js';
// import sendEmailWithAttachment from "../utils/Mailer.js";



import pdf from 'pdfkit';
import fs from 'fs';
import nodemailer from 'nodemailer';

const generateAndSendQRCode = async (req, res) => {
    try {
      const email = req.body.email;
   
  
      
  
      const subject = "Thank You for Your Payment";
      const text = `Hello Thank you for your payment. Please find the QR code attached.\n\nBest regards,\nYour Company`;
  
  
      res.status(200).json({ message: "Payment notification has been sent to your email" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

export async function sendMail(req, res) {
    const email = req.body.email;
   
  
    const subject = "Thank You for Your Payment";
    const text = `Hello Thank you for your payment. Please find the QR code attached.\n\nBest regards,\nYour Company`;

    try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
          }
        });
    
        const info = await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: email,
          subject,
          text,
          //attachments: [{ filename: 'qr_code.png', content: attachment }]
        });
    
        console.log(`Message sent: ${info.messageId}`);
      } catch (error) {
        console.error(error);
        throw error;
      }

  }


// Endpoint pour traiter le paiement et envoyer la facture par e-mail
export async function processPaymentAndSendInvoice(req, res) {
    const { reservationId, email } = req.body;

    try {
        // Trouver la réservation basée sur l'ID
        const reservation = await Reservation.findById(reservationId);

        if (!reservation) {
            return res.status(404).json({ error: 'Réservation non trouvée' });
        }

        // Générer une facture au format PDF
        const doc = new pdf();
        doc.text(`Facture pour la réservation ID: ${reservationId}`);
        const invoicePath = `./invoices/invoice_${reservationId}.pdf`;
        doc.pipe(fs.createWriteStream(invoicePath));
        doc.end();

        // Configurer le service d'e-mail avec nodemailer
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'votre-email@gmail.com',
                pass: 'votre-mot-de-passe-email'
            }
        });

        const mailOptions = {
            from: 'votre-email@gmail.com',
            to: email,
            subject: 'Facture de paiement',
            text: 'Merci pour votre paiement!',
            attachments: [{
                filename: `invoice_${reservationId}.pdf`,
                path: invoicePath
            }]
        };

        // Envoyer l'e-mail avec la facture
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                res.status(500).json({ error: error.message });
            } else {
                console.log('Email sent: ' + info.response);
                res.status(200).json({ message: 'Facture envoyée avec succès par e-mail' });
            }

            // Supprimer le fichier de la facture une fois envoyé
            fs.unlinkSync(invoicePath);
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}



// Create a new reservation
export async function createReservation(req, res) {
    const { DateDebut, DateFin,HeureDebut, HeureFin,Statut, Total } = req.body;

    // Validate input data (e.g., check if required fields are present)
    if (!DateDebut || !DateFin || !HeureDebut || !HeureFin ) {
        return res.status(400).json({ error: 'DateDebut, DateFin, HeureDebut and HeureFin are required fields.' });
    }

    // Create a new reservation instance
    const newReservation = new Reservation({
        DateDebut,
        DateFin,
        HeureDebut,
        HeureFin,
        Statut,
        Total
    });

    // Save the reservation to the database
    try {
        const savedReservation = await newReservation.save();
        res.status(201).json(savedReservation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Retrieve all reservations
export async function getAllReservations(req, res) {
    try {
        const reservations = await Reservation.find();
        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Update a reservation
export async function updateReservation(req, res) {
    const reservationId = req.params.id;
    const { DateDebut, DateFin ,HeureDebut,HeureFin, Statut, Total } = req.body;

    try {
        const updatedReservation = await Reservation.findByIdAndUpdate(reservationId, {
            DateDebut,
            DateFin,
            HeureDebut,
            HeureFin,
            Statut,
            Total
        }, { new: true }); // Return the updated reservation
        res.status(200).json(updatedReservation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}






// Delete a reservation
export async function deleteReservation(req, res) {
    const reservationId = req.params.id;

    // Find the reservation by ID and delete
    try {
        const deletedReservation = await Reservation.findByIdAndDelete(reservationId); // Assuming 'Reservation' is your Mongoose model
        res.status(200).json(deletedReservation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}



// Update a reservation status to 'Payée'
export async function markReservationAsPaid(req, res) {
    const reservationId = req.params.id;

    try {
        // Find the reservation by ID
        const reservation = await Reservation.findById(reservationId);

        // Check if the reservation exists
        if (!reservation) {
            return res.status(404).json({ error: 'Reservation not found' });
        }

        // Check if the current status is 'Reservée'
        if (reservation.Statut !== Reservation.StatutRes.Reservee) {
            return res.status(400).json({ error: 'Reservation must be in status "Reservée" to be marked as "Payée".' });
        }

        // Update the reservation status to 'Payée'
        reservation.Statut = Reservation.StatutRes.Payee;

        // Save the updated reservation to the database
        const updatedReservation = await reservation.save();

        res.status(200).json(updatedReservation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
 


export default {
    generateAndSendQRCode
};
