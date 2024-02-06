import emailjs from '@emailjs/browser';
import React, { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Footer } from '../components/Footer';
import { Navbar } from '../components/Navbar';

/*
  Contact Component

  - Imports necessary dependencies and components.
  - Utilizes React hooks (useEffect, useRef) for managing state and side effects.
  - Implements a contact form using EmailJS for email delivery.
  - Displays success or error notifications using React Toastify.
  - Using the service of EmailJS (https://www.emailjs.com/) to be able to receive e-mails.
*/

export const Contact = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [window.location.pathname]);

  const form = useRef();

  const sendEmail = async (e) => {
    e.preventDefault();

    // Check if all required fields are filled
    const requiredFields = ['user_name', 'user_email', 'message'];
    for (const fieldName of requiredFields) {
      if (!form.current[fieldName].value) {
        // Display an error notification if any required field is empty
        toast.error(`Please fill in the required fields`);
        return;
      }
    }

    try {
      // Displaying a notification while sending the message
      toast.info('Sending message...', { autoClose: false });

      const result = await emailjs.sendForm('service_OmniShop', 'template_wdwnt9j', form.current, 'SUFff_EJ-PNqCxJ92');

      // Close the previous notification
      toast.dismiss();

      // Display a success notification
      toast.success('Email sent successfully!');

      // Reset the form
      form.current.reset();

      console.log(result.text);
    } catch (error) {
      // Close the previous notification
      toast.dismiss();

      // Display an error notification
      toast.error('Failed to send email. Please try again.');

      console.error(error.text);
    }
  };

  return (
    <>
      <Navbar />
      <div className="contactContainer container mx-auto my-8 p-6 bg-white shadow-md rounded-md max-w-md">
        <h1 className="text-3xl font-semibold mb-6 select-none">Contact Us</h1>
        <form ref={form} onSubmit={sendEmail} className="space-y-4">
          <div className="flex flex-col">
            <label className="text-gray-600">Name</label>
            <input type="text" name="user_name" className="border border-gray-300 p-2" />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600">Email</label>
            <input type="email" name="user_email" className="border border-gray-300 p-2" />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600">Message</label>
            <textarea name="message" className="border border-gray-300 p-2"></textarea>
          </div>
          <button type="submit" className="bg-gray-600 text-white p-2 rounded-md hover:bg-gray-600">Send Message</button>
        </form>
      </div>

      <div style={{ height: '150px' }}></div>

      <Footer />
    </>
  );
};
