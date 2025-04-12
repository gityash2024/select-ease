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
        question: "Do you offer Software Company monthly subscriptions?",
        answer: "Currently, all subscription packages are purchased and renewed on an annual basis."
      },
      {
        id: 2,
        question: "Do you offer Software Company monthly subscriptions?",
        answer: "Currently, all subscription packages are purchased and renewed on an annual basis."
      },
      {
        id: 3,
        question: "Do you offer Software Company monthly subscriptions?",
        answer: "Currently, all subscription packages are purchased and renewed on an annual basis."
      },
      {
        id: 4,
        question: "Do you offer Software Company monthly subscriptions?",
        answer: "Currently, all subscription packages are purchased and renewed on an annual basis."
      },
      {
        id: 5,
        question: "Do you offer Software Company monthly subscriptions?",
        answer: "Currently, all subscription packages are purchased and renewed on an annual basis."
      }
    ]
  },
  {
    id: 2,
    category: "Product",
    faqs: [
      {
        id: 6,
        question: "Do you offer Software Company monthly subscriptions?",
        answer: "Currently, all subscription packages are purchased and renewed on an annual basis."
      },
      {
        id: 7,
        question: "Do you offer Software Company monthly subscriptions?",
        answer: "Currently, all subscription packages are purchased and renewed on an annual basis."
      },
      {
        id: 8,
        question: "Do you offer Software Company monthly subscriptions?",
        answer: "Currently, all subscription packages are purchased and renewed on an annual basis."
      },
      {
        id: 9,
        question: "Do you offer Software Company monthly subscriptions?",
        answer: "Currently, all subscription packages are purchased and renewed on an annual basis."
      },
      {
        id: 10,
        question: "Do you offer Software Company monthly subscriptions?",
        answer: "Currently, all subscription packages are purchased and renewed on an annual basis."
      }
    ]
  },
  {
    id: 3,
    category: "Category",
    faqs: [
      {
        id: 11,
        question: "Do you offer Software Company monthly subscriptions?",
        answer: "Currently, all subscription packages are purchased and renewed on an annual basis."
      },
      {
        id: 12,
        question: "Do you offer Software Company monthly subscriptions?",
        answer: "Currently, all subscription packages are purchased and renewed on an annual basis."
      },
      {
        id: 13,
        question: "Do you offer Software Company monthly subscriptions?",
        answer: "Currently, all subscription packages are purchased and renewed on an annual basis."
      },
      {
        id: 14,
        question: "Do you offer Software Company monthly subscriptions?",
        answer: "Currently, all subscription packages are purchased and renewed on an annual basis."
      },
      {
        id: 15,
        question: "Do you offer Software Company monthly subscriptions?",
        answer: "Currently, all subscription packages are purchased and renewed on an annual basis."
      }
    ]
  },
  {
    id: 4,
    category: "Pricing & Subscription",
    faqs: [
      {
        id: 16,
        question: "Do you offer Software Company monthly subscriptions?",
        answer: "Currently, all subscription packages are purchased and renewed on an annual basis."
      },
      {
        id: 17,
        question: "Do you offer Software Company monthly subscriptions?",
        answer: "Currently, all subscription packages are purchased and renewed on an annual basis."
      },
      {
        id: 18,
        question: "Do you offer Software Company monthly subscriptions?",
        answer: "Currently, all subscription packages are purchased and renewed on an annual basis."
      },
      {
        id: 19,
        question: "Do you offer Software Company monthly subscriptions?",
        answer: "Currently, all subscription packages are purchased and renewed on an annual basis."
      },
      {
        id: 20,
        question: "Do you offer Software Company monthly subscriptions?",
        answer: "Currently, all subscription packages are purchased and renewed on an annual basis."
      }
    ]
  },
  {
    id: 5,
    category: "Support & Customer Service",
    faqs: [
      {
        id: 21,
        question: "Do you offer Software Company monthly subscriptions?",
        answer: "Currently, all subscription packages are purchased and renewed on an annual basis."
      },
      {
        id: 22,
        question: "Do you offer Software Company monthly subscriptions?",
        answer: "Currently, all subscription packages are purchased and renewed on an annual basis."
      },
      {
        id: 23,
        question: "Do you offer Software Company monthly subscriptions?",
        answer: "Currently, all subscription packages are purchased and renewed on an annual basis."
      },
      {
        id: 24,
        question: "Do you offer Software Company monthly subscriptions?",
        answer: "Currently, all subscription packages are purchased and renewed on an annual basis."
      },
      {
        id: 25,
        question: "Do you offer Software Company monthly subscriptions?",
        answer: "Currently, all subscription packages are purchased and renewed on an annual basis."
      }
    ]
  }
];

const Dropdwonindividual = ({ faqData = mockFaqData }) => {
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

export default Dropdwonindividual;