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
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const CategoryTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin-top: 0;
  margin-bottom: 24px;
  font-family: 'Outfit', sans-serif;
`;

const AccordionItem = styled.div`
  border-bottom: 1px solid #eee;
  
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
`;

const AccordionQuestion = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #333;
  font-family: 'Outfit', sans-serif;
`;

const AccordionIcon = styled.div`
  color: #333;
  font-size: 16px;
`;

const AccordionContent = styled.div`
  height: ${props => (props.isOpen ? 'auto' : '0')};
  overflow: hidden;
  transition: all 0.3s ease;
  padding-bottom: ${props => (props.isOpen ? '16px' : '0')};
`;

const AccordionAnswer = styled.div`
  font-size: 14px;
  color: #555;
  line-height: 1.6;
  margin-bottom: 8px;
  font-family: 'Outfit', sans-serif;
`;

// Mock data structure for dynamic content
const mockFaqData = [
    {
      id: 1,
      category: "Company",
      faqs: [
        {
          id: 1,
          question: "What is Napkin AI?",
          answer: "Napkin AI is an AI-powered platform designed to help users transform complex ideas into visually appealing diagrams, flowcharts, and presentations in seconds—no design experience needed."
        },
        {
          id: 2,
          question: "Who is behind Napkin AI?",
          answer: "Napkin AI is developed by a team of entrepreneurs and engineers passionate about simplifying visual communication through the power of artificial intelligence."
        },
        {
          id: 3,
          question: "Is Napkin AI a trusted company?",
          answer: "Yes, Napkin AI has been positively reviewed by users and featured on trusted AI product directories for its innovative approach to visual idea mapping."
        }
      ]
    },
    {
      id: 2,
      category: "Product",
      faqs: [
        {
          id: 1,
          question: "What does Napkin AI do?",
          answer: "Napkin AI turns your written concepts or notes into visual diagrams, slide decks, and structured frameworks using AI."
        },
        {
          id: 2,
          question: "Can I create flowcharts or mind maps with Napkin AI?",
          answer: "Yes, Napkin AI specializes in creating structured visual formats like flowcharts, mind maps, strategy outlines, and more."
        },
        {
          id: 3,
          question: "Does Napkin AI require design skills?",
          answer: "No design experience is needed. The platform is built for simplicity and automation, making it ideal for non-designers."
        }
      ]
    },
    {
      id: 3,
      category: "Category",
      faqs: [
        {
          id: 1,
          question: "What is AI-powered diagramming?",
          answer: "AI-powered diagramming automates the creation of visual structures like flowcharts, maps, and diagrams from plain text using artificial intelligence."
        },
        {
          id: 2,
          question: "How is Napkin AI different from tools like Canva or Miro?",
          answer: "Unlike Canva or Miro, which require manual design work, Napkin AI generates visuals from your ideas with minimal input, focusing on speed and automation."
        },
        {
          id: 3,
          question: "Who can benefit from AI visualization tools like Napkin AI?",
          answer: "Product managers, educators, strategists, startup founders, and students can all benefit by saving time and improving clarity in their visual thinking."
        }
      ]
    },
    {
      id: 4,
      category: "Pricing & Subscription",
      faqs: [
        {
          id: 1,
          question: "Is Napkin AI free to use?",
          answer: "Napkin AI offers a free trial or freemium model with limited features. Premium plans unlock more advanced tools and export options."
        },
        {
          id: 2,
          question: "What are Napkin AI's subscription options?",
          answer: "Napkin AI provides monthly and yearly subscription plans. Pricing varies based on feature access and usage limits."
        },
        {
          id: 3,
          question: "Can I cancel my subscription anytime?",
          answer: "Yes, Napkin AI allows users to cancel subscriptions anytime via the account settings dashboard."
        }
      ]
    },
    {
      id: 5,
      category: "Support & Customer Service",
      faqs: [
        {
          id: 1,
          question: "How do I contact Napkin AI support?",
          answer: "You can reach out to Napkin AI’s support via the official website’s contact form or help section."
        },
        {
          id: 2,
          question: "Does Napkin AI offer live chat or email support?",
          answer: "Currently, Napkin AI offers support through email, and they are actively building a live chat option."
        },
        {
          id: 3,
          question: "Is there a help center or knowledge base?",
          answer: "Yes, Napkin AI provides users with a growing knowledge base including FAQs, tutorials, and product walkthroughs."
        }
      ]
    }
  ];
const NipkinDropdwon = ({ faqData = mockFaqData }) => {
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
                  A. {faq.answer}
                </AccordionAnswer>
              </AccordionContent>
            </AccordionItem>
          ))}
        </AccordionSection>
      ))}
    </Container>
  );
};

export default NipkinDropdwon;