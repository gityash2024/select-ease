import React, { useState } from 'react';
import styled from 'styled-components';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';

// Styling for the components
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Outfit', sans-serif;
`;

const AccordionSection = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 24px;
  margin-bottom: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const CategoryTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #2c3e50;
  margin-top: 0;
  margin-bottom: 24px;
  font-family: 'Outfit', sans-serif;
  border-bottom: 2px solid #ecf0f1;
  padding-bottom: 12px;
`;

const AccordionItem = styled.div`
  border-bottom: 1px solid #ecf0f1;
  
  &:last-child {
    border-bottom: none;
  }
`;

const AccordionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #f5f5f5;
  }
`;

const AccordionQuestion = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: #2c3e50;
  font-family: 'Outfit', sans-serif;
  line-height: 1.4;
`;

const AccordionIcon = styled.div`
  color:rgb(9, 10, 10);
  font-size: 20px;
`;

const AccordionContent = styled.div`
  height: ${props => (props.isOpen ? 'auto' : '0')};
  overflow: hidden;
  transition: all 0.3s ease-in-out;
  padding-bottom: ${props => (props.isOpen ? '24px' : '0')};
  opacity: ${props => (props.isOpen ? '1' : '0')};
`;

const AccordionAnswer = styled.div`
  font-size: 16px;
  color: #555;
  line-height: 1.7;
  margin-bottom: 8px;
  font-family: 'Outfit', sans-serif;
  padding-left: 20px;
  border-left: 3px solid #3498db;
  font-style: italic;
`;

// Mock data structure for dynamic content
const mockFaqData = [
    {
        id: 1,
        category: "Company",
        faqs: [
            {
                id: 1,
                question: "What is Captions.ai?",
                answer: "Captions.ai is an AI-powered video editing and content creation platform that helps creators automate editing, generate subtitles, and enhance videos using intelligent tools."
            },
            {
                id: 2,
                question: "When was Captions.ai founded?",
                answer: "Captions.ai was founded in 2020 to revolutionize video production with advanced AI technology."
            },
            {
                id: 3,
                question: "Who can use Captions.ai?",
                answer: "Captions.ai is ideal for content creators, marketers, educators, influencers, and businesses seeking fast and professional video editing solutions."
            },
             {
                id: 4,
                question: "Do you offer Software Company monthly subscriptions?",
                answer: "Yes, we offer monthly subscriptions."
            },
        ]
    },
    {
        id: 2,
        category: "Product",
        faqs: [
           {
                id: 5,
                question: "What is InVideo and who owns it?",
                answer: "InVideo is a cloud-based video creation platform that helps users make professional-quality videos with ease. It is privately owned and was founded by Sanket Shah, Harsh Vakharia, and Pankit Chheda."
            },
            {
                id: 6,
                question: "Where is InVideo headquartered?",
                answer: "InVideo is headquartered in Mumbai, India, with a growing global user base and team members across multiple countries."
            },
            {
                id: 7,
                question: "Does Captions.ai support video dubbing?",
                answer: "Yes, Captions.ai includes video translation with synchronized lip movement for multiple languages."
            },
             {
                id: 8,
                question: "Do you offer Software Company monthly subscriptions?",
                answer: "Yes, we offer monthly subscriptions."
            },
        ]
    },
    {
        id: 3,
        category: "Category",
        faqs: [
            {
                id: 9,
                question: "What can I create with InVideo?",
                answer: "With InVideo, you can create marketing videos, social media content, YouTube intros, promo videos, and more using customizable templates and an AI-powered video editor."
            },
            {
                id: 10,
                question: "Does InVideo offer AI video creation tools?",
                answer: "Yes, InVideo features AI tools that help users generate scripts, automate video creation, and enhance editing efficiency, making it ideal for both beginners and professionals."
            },
            {
                id: 11,
                question: "Can I use InVideo on my mobile phone?",
                answer: "Yes, InVideo offers a mobile app for creating videos on the go, along with a fully functional web platform that works on desktops and laptops."
            },
             {
                id: 12,
                question: "Do you offer Software Company monthly subscriptions?",
                answer: "Yes, we offer monthly subscriptions."
            },
        ]
    },
     {
        id: 4,
        category: "Pricing & Subscription",
        faqs: [
            {
                id: 13,
                question: "How much does InVideo cost?",
                answer: "InVideo offers a free plan with limited features, as well as paid plans starting at affordable monthly or annual rates depending on your needs."
            },
            {
                id: 14,
                question: "What features are included in InVideo's free plan?",
                answer: "The free plan includes access to basic templates, limited exports, and watermark branding. It's perfect for trying out the platform before upgrading."
            },
            {
                 id: 15,
                question: "Can I cancel my InVideo subscription at any time?",
                answer: "Yes, you can cancel your InVideo subscription at any time through your account settings. Your access will continue until the end of the billing cycle."
            },
             {
                id: 16,
                question: "Do you offer Software Company monthly subscriptions?",
                answer: "Yes, we offer monthly subscriptions."
            },
        ]
    },
    {
        id: 5,
        category: "Support & Customer Service",
        faqs: [
            {
                id: 17,
                question: "How do I contact InVideo customer support?",
                answer: "You can reach InVideo support through live chat on their website or by submitting a ticket. They offer 24/7 customer assistance."
            },
            {
                id: 18,
                question: "Does InVideo offer tutorials or training for new users?",
                answer: "Yes, InVideo provides a rich library of tutorials, how-to videos, and a learning center to help users get started and master the platform."
            },
            {
                id: 19,
                question: "Is there live chat support available on Captions.ai?",
                answer: "Yes, InVideo has a vibrant online community on platforms like Facebook where users share tips, get support, and showcase their video projects."
            },
             {
                id: 20,
                question: "Do you offer Software Company monthly subscriptions?",
                answer: "Yes, we offer monthly subscriptions."
            },
        ]
    }
];

const AmmplifyDropdown = ({ faqData = mockFaqData }) => {
  // State to track which FAQ items are open
  const [openFaqs, setOpenFaqs] = useState({});

  // Toggle the open/closed state of an FAQ item
  const toggleFaq = (categoryId, faqId) => {
    setOpenFaqs(prev => {
      const key = `${categoryId}-${faqId}`;
      return {
        ...prev,
        [key]: !prev[key]
      };
    });
  };

  // Check if an FAQ item is open
  const isOpen = (categoryId, faqId) => {
    const key = `${categoryId}-${faqId}`;
    return openFaqs[key] || false;
  };

  return (
    <Container>
      {faqData.map(category => (
        <AccordionSection key={category.id}>
          <CategoryTitle>{category.category}</CategoryTitle>
          
          {category.faqs.map(faq => (
            <AccordionItem key={faq.id}>
              <AccordionHeader onClick={() => toggleFaq(category.id, faq.id)}>
                <AccordionQuestion>{faq.question}</AccordionQuestion>
                <AccordionIcon>
                  {isOpen(category.id, faq.id) ? <FaChevronUp /> : <FaChevronDown />}
                </AccordionIcon>
              </AccordionHeader>
              
              <AccordionContent isOpen={isOpen(category.id, faq.id)}>
                <AccordionAnswer>
                  {faq.answer}
                </AccordionAnswer>
              </AccordionContent>
            </AccordionItem>
          ))}
        </AccordionSection>
      ))}
    </Container>
  );
};

export default AmmplifyDropdown;
