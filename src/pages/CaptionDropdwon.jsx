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
const faqData = [
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
          answer: ""
        }
      ]
    },
    {
      id: 2,
      category: "Product",
      faqs: [
        {
          id: 1,
          question: "What does Captions.ai do?",
          answer: "Captions.ai offers AI video editing, automatic subtitles, eye contact correction, avatar generation, and video translation to streamline the creative process."
        },
        {
          id: 2,
          question: "Can Captions.ai automatically generate subtitles?",
          answer: "Yes, it supports auto-captioning in over 29 languages for accurate and accessible video content."
        },
        {
          id: 3,
          question: "Does Captions.ai support video dubbing?",
          answer: "Yes, Captions.ai includes video translation with synchronized lip movement for multiple languages."
        },
        {
          id: 4,
          question: "Do you offer Software Company monthly subscriptions?",
          answer: ""
        }
      ]
    },
    {
      id: 3,
      category: "Category",
      faqs: [
        {
          id: 1,
          question: "What is AI-powered video editing?",
          answer: "AI-powered video editing uses artificial intelligence to automate video tasks like trimming, adding subtitles, enhancing visuals, and more."
        },
        {
          id: 2,
          question: "How does AI improve video content creation?",
          answer: "AI saves time, increases accuracy, and enhances engagement through smart features like auto-clipping, facial tracking, and translation."
        },
        {
          id: 3,
          question: "Is AI video editing suitable for beginners?",
          answer: "Yes, tools like Captions.ai are designed for ease of use, making it accessible for both professionals and first-time editors."
        },
        {
          id: 4,
          question: "Do you offer Software Company monthly subscriptions?",
          answer: ""
        }
      ]
    },
    {
      id: 4,
      category: "Pricing & Subscription",
      faqs: [
        {
          id: 1,
          question: "Is Captions.ai free to use?",
          answer: "Yes, Captions.ai offers a free plan with basic editing tools and manual export options."
        },
        {
          id: 2,
          question: "What are the paid plans available on Captions.ai?",
          answer: "Captions.ai offers three main plans—Pro ($9.99/month), Max ($24.99/month), and Scale ($69.99/month) with increasing features and performance."
        },
        {
          id: 3,
          question: "Does Captions.ai offer a free trial?",
          answer: "Yes, new users can explore features with a free plan before upgrading."
        },
        {
          id: 4,
          question: "Do you offer Software Company monthly subscriptions?",
          answer: ""
        }
      ]
    },
    {
      id: 5,
      category: "Support & Customer Service",
      faqs: [
        {
          id: 1,
          question: "How do I contact Captions.ai support?",
          answer: "Users can reach out through the Help & Support section on the platform or via email for technical or billing queries."
        },
        {
          id: 2,
          question: "Does Captions.ai offer tutorials or training materials?",
          answer: "Yes, Captions.ai provides tutorials, FAQs, and a blog to help users maximize their editing experience."
        },
        {
          id: 3,
          question: "Is there live chat support available on Captions.ai?",
          answer: "Currently, there is no live chat, but the platform offers email support and self-help documentation."
        },
        {
          id: 4,
          question: "Do you offer Software Company monthly subscriptions?",
          answer: ""
        }
      ]
    }
  ];

const CaptionDropdwon = ({ faqData = mockFaqData }) => {
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

export default CaptionDropdwon;