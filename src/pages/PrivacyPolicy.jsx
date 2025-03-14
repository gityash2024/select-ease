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

const PolicySection = styled(motion.div)`
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

const InfoCard = styled(motion.div)`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 24px;
  margin: 32px 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const InfoCardTitle = styled.h4`
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 8px;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  
  .icon {
    color: #026283;
    font-size: 24px;
    min-width: 24px;
  }
  
  .content {
    flex: 1;
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

const DataTable = styled(motion.table)`
  width: 100%;
  border-collapse: collapse;
  margin: 24px 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  overflow: hidden;
  
  th, td {
    padding: 12px 16px;
    text-align: left;
    border-bottom: 1px solid #e5e7eb;
  }
  
  th {
    background-color: #f3f4f6;
    font-weight: 600;
    color: #111827;
  }
  
  tr:last-child td {
    border-bottom: none;
  }
  
  tr:nth-child(even) {
    background-color: #f9fafb;
  }
`;

const PrivacyPolicy = () => {
  const headerRef = useRef(null);
  const tocRef = useRef(null);
  const sectionRefs = Array(10).fill().map(() => useRef(null));
  
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

  const tableVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        delay: 0.3,
        ease: "easeOut" 
      }
    }
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
      id: 'introduction',
      title: '1. Introduction',
      content: (
        <>
          <p>This Privacy Policy describes how we collect, use, process, and disclose your information, including personal information, in conjunction with your access to and use of our AI tools comparison and review platform.</p>
          <p>By using our platform, you understand that we will collect and use your personal information as described in this Privacy Policy. If you do not agree with any part of this Privacy Policy, you should not access or use our services.</p>
        </>
      )
    },
    {
      id: 'information-we-collect',
      title: '2. Information We Collect',
      content: (
        <>
          <p>We collect several types of information from and about users of our platform, including:</p>
          <DataTable
            variants={tableVariants}
            initial="hidden"
            animate="visible"
          >
            <thead>
              <tr>
                <th>Category</th>
                <th>Types of Data</th>
                <th>Purpose</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Personal Identifiers</td>
                <td>Name, email address, IP address</td>
                <td>Account creation, authentication</td>
              </tr>
              <tr>
                <td>Account Information</td>
                <td>Username, password, profile details</td>
                <td>Account management, personalization</td>
              </tr>
              <tr>
                <td>Usage Data</td>
                <td>Pages visited, features used, time spent</td>
                <td>Improving user experience, analytics</td>
              </tr>
              <tr>
                <td>Device Information</td>
                <td>Browser type, operating system, device type</td>
                <td>Optimization, security</td>
              </tr>
              <tr>
                <td>User Content</td>
                <td>Reviews, comments, feedback</td>
                <td>Platform functionality, community features</td>
              </tr>
            </tbody>
          </DataTable>
          <p>We collect this information directly from you when you provide it to us, automatically as you navigate through the site, and from third parties such as our business partners and analytics providers.</p>
        </>
      )
    },
    {
      id: 'how-we-use',
      title: '3. How We Use Your Information',
      content: (
        <>
          <p>We use the information we collect about you for various purposes, including to:</p>
          <ul>
            <li>Provide, maintain, and improve our platform</li>
            <li>Process transactions and send related information</li>
            <li>Send administrative messages, updates, and security alerts</li>
            <li>Respond to your comments and questions</li>
            <li>Understand how users interact with our platform</li>
            <li>Personalize your experience and deliver content relevant to your interests</li>
            <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
            <li>Comply with our legal obligations</li>
          </ul>
          <HighlightBox
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <p><strong>Note:</strong> We will only use your personal information for the purposes for which we collected it, unless we reasonably consider that we need to use it for another reason compatible with the original purpose.</p>
          </HighlightBox>
        </>
      )
    },
    {
      id: 'information-sharing',
      title: '4. Information Sharing',
      content: (
        <>
          <p>We may share your personal information with:</p>
          <ul>
            <li><strong>Service Providers:</strong> Third-party vendors who perform services on our behalf, such as web hosting, data analysis, payment processing, and customer service.</li>
            <li><strong>Business Partners:</strong> Companies with whom we partner to offer products or services.</li>
            <li><strong>Legal Requirements:</strong> When required by law or to respond to legal process, to protect our customers, to protect lives, to maintain the security of our platform, and to protect our rights.</li>
          </ul>
          <p>We do not sell or rent your personal information to third parties for their marketing purposes without your explicit consent.</p>
        </>
      )
    },
    {
      id: 'security-measures',
      title: '5. Security Measures',
      content: (
        <>
          <p>We implement appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, please note that no electronic transmission or storage of information can be entirely secure, and we cannot guarantee absolute security.</p>
          <p>We regularly review our security measures to identify and address potential vulnerabilities. Some of our security practices include:</p>
          <ul>
            <li>Encryption of sensitive data in transit and at rest</li>
            <li>Regular security assessments and penetration testing</li>
            <li>Access controls and authentication requirements</li>
            <li>Employee training on security and privacy practices</li>
            <li>Incident response procedures</li>
          </ul>
        </>
      )
    },
    {
      id: 'cookies-tracking',
      title: '6. Cookies and Tracking Technologies',
      content: (
        <>
          <p>We use cookies and similar tracking technologies to collect information about your browsing activities over time and across different websites. Cookies are small data files stored on your device that help us improve our platform and your experience, see which areas and features are popular, and count visits.</p>
          <p>We use the following types of cookies:</p>
          <ul>
            <li><strong>Essential Cookies:</strong> Required for the operation of our platform</li>
            <li><strong>Analytical Cookies:</strong> Allow us to recognize and count visitors and see how they move around our platform</li>
            <li><strong>Functionality Cookies:</strong> Enable us to personalize content for you</li>
            <li><strong>Targeting Cookies:</strong> Record your visit to our platform, the pages you have visited, and the links you have followed</li>
          </ul>
          <p>You can set your browser to refuse all or some browser cookies, or to alert you when cookies are being sent. However, if you disable or refuse cookies, please note that some parts of the platform may become inaccessible or not function properly.</p>
        </>
      )
    },
    {
      id: 'your-rights',
      title: '7. Your Rights and Choices',
      content: (
        <>
          <p>Depending on your location, you may have certain rights regarding your personal information, including the right to:</p>
          <ul>
            <li>Access the personal information we hold about you</li>
            <li>Correct inaccurate personal information</li>
            <li>Delete your personal information</li>
            <li>Object to or restrict our processing of your personal information</li>
            <li>Receive a copy of your personal information in a structured, machine-readable format</li>
            <li>Withdraw your consent at any time where we rely on consent to process your personal information</li>
          </ul>
          <p>To exercise these rights, please contact us using the information provided in the "Contact Information" section below. We will respond to your request within the timeframe required by applicable law.</p>
          <InfoCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <InfoCardTitle>How to Update Your Information</InfoCardTitle>
            <InfoItem>
              <div className="icon">⚙️</div>
              <div className="content">
                <p><strong>Account Settings:</strong> You can update your account information directly through your profile settings.</p>
              </div>
            </InfoItem>
            <InfoItem>
              <div className="icon">📧</div>
              <div className="content">
                <p><strong>Email Request:</strong> Send an email to privacy@example.com with your request.</p>
              </div>
            </InfoItem>
            <InfoItem>
              <div className="icon">🔒</div>
              <div className="content">
                <p><strong>Privacy Portal:</strong> Use our dedicated privacy management portal at example.com/privacy-portal.</p>
              </div>
            </InfoItem>
          </InfoCard>
        </>
      )
    },
    {
      id: 'international-transfers',
      title: '8. International Data Transfers',
      content: (
        <>
          <p>We are based in [Your Country], and the information we collect is governed by [Your Country's] law. If you are accessing our platform from outside [Your Country], please be aware that information collected through the platform may be transferred to, processed, stored, and used in [Your Country] and other jurisdictions.</p>
          <p>Your use of our platform or provision of any information constitutes your consent to the transfer to and processing, storage, and use of your information in [Your Country] and other jurisdictions where the privacy laws may not be as comprehensive as those in your country.</p>
          <p>Where we transfer personal information from the European Economic Area, United Kingdom, or Switzerland to countries that have not been deemed to provide an adequate level of protection, we use specific contractual clauses approved by the European Commission or other appropriate safeguards to permit such transfers.</p>
        </>
      )
    },
    {
      id: 'childrens-privacy',
      title: '9. Children\'s Privacy',
      content: (
        <>
          <p>Our platform is not intended for children under the age of 16, and we do not knowingly collect personal information from children under 16. If we learn we have collected or received personal information from a child under 16 without verification of parental consent, we will delete that information.</p>
          <p>If you believe we might have any information from or about a child under 16, please contact us using the information provided in the "Contact Information" section below.</p>
        </>
      )
    },
    {
      id: 'changes-policy',
      title: '10. Changes to This Privacy Policy',
      content: (
        <>
          <p>We may update this Privacy Policy from time to time in response to changing legal, technical, or business developments. When we update our Privacy Policy, we will take appropriate measures to inform you, consistent with the significance of the changes we make.</p>
          <p>We will obtain your consent to any material Privacy Policy changes if and where this is required by applicable data protection laws. You can see when this Privacy Policy was last updated by checking the "Last Updated" date displayed at the top of this Privacy Policy.</p>
        </>
      )
    },
    {
      id: 'contact-info',
      title: '11. Contact Information',
      content: (
        <>
          <p>If you have any questions or concerns about this Privacy Policy or our privacy practices, please contact us at:</p>
          <p><strong>Email:</strong> privacy@example.com<br/>
          <strong>Address:</strong> 123 Main Street, Suite 100, San Francisco, CA 94105<br/>
          <strong>Phone:</strong> (555) 123-4567</p>
          <p>If you have an unresolved privacy or data use concern that we have not addressed satisfactorily, please contact our third-party dispute resolution provider (free of charge) at [Dispute Resolution Provider].</p>
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
            <Title>Privacy Policy</Title>
            <Subtitle>This Privacy Policy explains how we collect, use, and protect your personal information.</Subtitle>
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
              {sections.map((section) => (
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
            <PolicySection 
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
            </PolicySection>
          ))}
        </ContentWrapper>
      </Section>
    </Container>
  );
};

export default PrivacyPolicy;