import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion, useInView, useAnimation } from 'framer-motion';
import { useEffect } from 'react';

const Container = styled(motion.div)`
  width: 100%;
  overflow-x: hidden;
`;

const Section = styled.section`
  width: 100%;
  padding: ${props => props.padding || '60px 0'};
  background: ${props => props.background || 'white'};
  overflow: hidden;
`;

const ContentWrapper = styled(motion.div)`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 2;
`;

const Header = styled(motion.div)`
  text-align: center;
  margin-bottom: 60px;
`;

const Title = styled(motion.h1)`
  font-size: 48px;
  font-weight: 700;
  color: #026283;
  margin-bottom: 16px;
`;

const Subtitle = styled(motion.p)`
  font-size: 18px;
  color: #666;
  max-width: 700px;
  margin: 0 auto;
`;

const LastUpdated = styled(motion.p)`
  font-size: 14px;
  color: #888;
  margin-top: 8px;
`;

const TermsSection = styled(motion.div)`
  margin-bottom: 48px;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 28px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 24px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e5e7eb;
`;

const SectionContent = styled(motion.div)`
  color: #4b5563;
  font-size: 16px;
  line-height: 1.7;

  p {
    margin-bottom: 16px;
  }

  ul, ol {
    margin-bottom: 16px;
    padding-left: 24px;
  }

  li {
    margin-bottom: 8px;
  }

  strong {
    font-weight: 600;
    color: #111827;
  }

  a {
    color: #026283;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const HighlightBox = styled(motion.div)`
  background: #f3f4f6;
  border-left: 4px solid #026283;
  padding: 20px 24px;
  margin: 24px 0;
  border-radius: 0 8px 8px 0;

  p {
    margin-bottom: 0;
  }
`;

const TableOfContents = styled(motion.div)`
  background: #f9fafb;
  padding: 24px 32px;
  border-radius: 12px;
  margin-bottom: 48px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const TOCTitle = styled(motion.h3)`
  font-size: 20px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 16px;
`;

const TOCList = styled(motion.ul)`
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 12px 24px;
`;

const TOCItem = styled(motion.li)`
  a {
    display: flex;
    align-items: center;
    color: #026283;
    text-decoration: none;
    font-size: 15px;
    
    &:hover {
      text-decoration: underline;
    }
    
    &::before {
      content: '•';
      margin-right: 8px;
      color: #026283;
    }
  }
`;

const TermsAndConditions = () => {
  const headerRef = useRef(null);
  const tocRef = useRef(null);
  const sectionRefs = Array(9).fill().map(() => useRef(null));
  
  const headerInView = useInView(headerRef, { once: false, amount: 0.3 });
  const tocInView = useInView(tocRef, { once: false, amount: 0.3 });
  const sectionInViews = sectionRefs.map(ref => useInView(ref, { once: false, amount: 0.2 }));
  
  const headerControls = useAnimation();
  const tocControls = useAnimation();
  const sectionControls = sectionRefs.map(() => useAnimation());
  
  useEffect(() => {
    if (headerInView) headerControls.start("visible");
    if (tocInView) tocControls.start("visible");
    sectionInViews.forEach((inView, i) => {
      if (inView) sectionControls[i].start("visible");
    });
  }, [headerInView, tocInView, ...sectionInViews]);
  
  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: "easeOut" 
      }
    }
  };
  
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        delay: 0.2,
        ease: "easeOut" 
      }
    }
  };
  
  const staggerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: 'smooth'
      });
    }
  };

  const sections = [
    {
      id: 'acceptance',
      title: '1. Acceptance of Terms',
      content: (
        <>
          <p>By accessing or using our comparison and review platform, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you may not access or use our service.</p>
          <p>Our platform provides reviews, comparisons, and information about various AI and software products. We strive to provide accurate and helpful information, but all opinions expressed are subjective and should be considered as such.</p>
        </>
      )
    },
    {
      id: 'user-accounts',
      title: '2. User Accounts',
      content: (
        <>
          <p>When you create an account on our platform, you must provide accurate and complete information. You are responsible for safeguarding your password and for all activities that occur under your account.</p>
          <p>We reserve the right to disable any user account if we determine that you have violated any provision of these Terms and Conditions.</p>
          <HighlightBox
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <p><strong>Important:</strong> You must be at least 18 years old to create an account and use our services.</p>
          </HighlightBox>
        </>
      )
    },
    {
      id: 'user-conduct',
      title: '3. User Conduct',
      content: (
        <>
          <p>When using our platform, you agree not to:</p>
          <ul>
            <li>Violate any applicable laws or regulations</li>
            <li>Impersonate any person or entity</li>
            <li>Submit false or misleading information</li>
            <li>Engage in any activity that interferes with or disrupts the functioning of our platform</li>
            <li>Attempt to gain unauthorized access to our systems or networks</li>
            <li>Post content that is defamatory, obscene, or otherwise objectionable</li>
          </ul>
          <p>We reserve the right to remove any content that we deem to be in violation of these guidelines and to terminate access for users who repeatedly violate our terms.</p>
        </>
      )
    },
    {
      id: 'intellectual-property',
      title: '4. Intellectual Property',
      content: (
        <>
          <p>All content on our platform, including text, graphics, logos, icons, images, audio clips, digital downloads, and software, is the property of our company or our content suppliers and is protected by international copyright laws.</p>
          <p>You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on our platform without our express written consent.</p>
        </>
      )
    },
    {
      id: 'disclaimers',
      title: '5. Disclaimers',
      content: (
        <>
          <p>Our platform provides reviews and comparisons based on our own testing and research. However:</p>
          <ul>
            <li>We do not guarantee the accuracy, completeness, or reliability of any information on our platform</li>
            <li>We are not responsible for any errors or omissions in content</li>
            <li>We may receive commissions when users purchase products through links on our platform</li>
            <li>Product specifications and features may change over time</li>
          </ul>
          <p>Your use of any information or materials on this platform is entirely at your own risk, and we shall not be liable for any actions you take based on such information.</p>
        </>
      )
    },
    {
      id: 'limitation-liability',
      title: '6. Limitation of Liability',
      content: (
        <>
          <p>To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including lost profits, arising out of or relating to your use of our platform.</p>
          <p>In no event shall our total liability to you exceed the amount you paid to us, if any, in the past six months.</p>
        </>
      )
    },
    {
      id: 'governing-law',
      title: '7. Governing Law',
      content: (
        <>
          <p>These Terms and Conditions shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions.</p>
          <p>Any dispute arising out of or relating to these terms shall be subject to the exclusive jurisdiction of the courts in [Your Jurisdiction].</p>
        </>
      )
    },
    {
      id: 'changes-terms',
      title: '8. Changes to Terms',
      content: (
        <>
          <p>We reserve the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting on our platform. Your continued use of our platform after any changes constitute your acceptance of such changes.</p>
          <p>We encourage you to review these Terms and Conditions periodically to stay informed of any updates.</p>
        </>
      )
    },
    {
      id: 'contact',
      title: '9. Contact Information',
      content: (
        <>
          <p>If you have any questions about these Terms and Conditions, please contact us at:</p>
          <p><strong>Email:</strong> support@example.com<br/>
          <strong>Address:</strong> 123 Main Street, Suite 100, San Francisco, CA 94105<br/>
          <strong>Phone:</strong> (555) 123-4567</p>
        </>
      )
    }
  ];

  return (
    <Container 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Section>
        <ContentWrapper>
          <Header
            ref={headerRef}
            variants={sectionVariants}
            initial="hidden"
            animate={headerControls}
          >
            <Title>Terms and Conditions</Title>
            <Subtitle>Please read these terms and conditions carefully before using our platform.</Subtitle>
            <LastUpdated>Last Updated: March 14, 2025</LastUpdated>
          </Header>

          <TableOfContents
            ref={tocRef}
            variants={staggerVariants}
            initial="hidden"
            animate={tocControls}
          >
            <TOCTitle>Quick Navigation</TOCTitle>
            <TOCList>
              {sections.map((section, index) => (
                <TOCItem key={section.id} variants={itemVariants}>
                  <a href={`#${section.id}`} onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(section.id);
                  }}>
                    {section.title}
                  </a>
                </TOCItem>
              ))}
            </TOCList>
          </TableOfContents>

          {sections.map((section, index) => (
            <TermsSection 
              key={section.id}
              id={section.id}
              ref={sectionRefs[index]}
              variants={sectionVariants}
              initial="hidden"
              animate={sectionControls[index]}
            >
              <SectionTitle>{section.title}</SectionTitle>
              <SectionContent variants={contentVariants}>
                {section.content}
              </SectionContent>
            </TermsSection>
          ))}
        </ContentWrapper>
      </Section>
    </Container>
  );
};

export default TermsAndConditions;