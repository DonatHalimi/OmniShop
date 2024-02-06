import React, { useEffect, useState } from 'react';
import { Footer } from '../components/Footer';
import { Navbar } from '../components/Navbar';

const FAQItem = ({ question, answer, isOpen, toggleAccordion }) => {
    return (
        <div className="mb-4">
            <div
                className="flex items-center justify-between p-4 bg-gray-100 cursor-pointer transition duration-300 ease-in-out"
                onClick={toggleAccordion}
            >
                <div className="font-semibold text-lg">{question}</div>
                <div className="text-gray-500">{isOpen ? '-' : '+'}</div>
            </div>
            {isOpen && (
                <div className="p-4 bg-white border border-t-0 transition duration-700 ease-in-out">
                    <p className="text-gray-700">{answer}</p>
                </div>
            )}
        </div>
    );
};

export const FAQ = () => {
    const [openAccordion, setOpenAccordion] = useState(undefined);

    const toggleAccordion = (index) => {
        setOpenAccordion((prev) => (prev === index ? undefined : index));
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [window.location.pathname]);

    const faqData = [
        {
            question: 'What products do you sell?',
            answer: 'We offer a wide range of products, including tech gadgets, fashion items, home decor, and more.',
        },
        {
            question: 'How can I contact customer support?',
            answer: (
                <p className="text-gray-700" dangerouslySetInnerHTML={{ __html: `You can reach our customer support team through the <a href="/contact" style="text-decoration: underline;">Contact</a> page or by sending us an email at <a href="mailto:omnishop@support.com" style="text-decoration: underline;">omnishop@support.com</a>` }} />
            ),
        },
        {
            question: 'Do you offer international shipping?',
            answer: 'Yes, we provide international shipping services to customers around the world.',
        },
        {
            question: 'How can I track my order?',
            answer: 'Once your order is shipped, you will receive a tracking number via email to monitor your shipment.',
        },
        {
            question: 'What payment methods do you accept?',
            answer: 'We accept various payment methods, including credit cards, PayPal, and other secure payment options.',
        },
        {
            question: 'Is it possible to return or exchange a product?',
            answer: 'Yes, we have a hassle-free return and exchange policy. Please visit our Returns page for more information.',
        },
    ];

    return (
        <>
            <Navbar />
            <div className="container mx-auto my-8 mt-24" style={{ marginTop: '170px' }}>
                <h1 className="text-3xl font-semibold mb-6">Frequently Asked Questions</h1>
                {faqData.map((item, index) => (
                    <FAQItem
                        key={index}
                        question={item.question}
                        answer={item.answer}
                        isOpen={index === openAccordion}
                        toggleAccordion={() => toggleAccordion(index)}
                    />
                ))}
            </div>

            <div style={{ height: '100px' }}></div>

            <Footer />
        </>
    );
};