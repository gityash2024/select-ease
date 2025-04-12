import React, { useState } from 'react';
import styled from 'styled-components';
import TotalLeads from '../assets/TotalLeads.svg';
import LeadsPending from '../assets/LeadsPending.svg';
import LeadsUtilized from '../assets/LeadsUtilized.svg';
import Impressions from '../assets/Impressions.svg';
import TotalRequests from '../assets/TotaRequests.svg';
import AverageAttemptTime from '../assets/AverageAttemptTime.svg';
import TotalConversionRate from '../assets/TotalConversionRate.svg';
import footerLogo from '../assets/header.svg';

import {
    FaHome,
    FaHeartbeat,
    FaUsers,
    FaBoxOpen,
    FaInfoCircle,
    FaQuestionCircle,
    FaCreditCard,
    FaCog,
    FaCaretDown,
    FaCalendarAlt,
    FaUserCircle,
} from 'react-icons/fa';

const DashboardContainer = styled.div`
    display: flex;
    height: auto;
`;

const Sidebar = styled.div`
    background-color: #2c3e50;
    color: #fff;
    width: 250px;
    padding: 20px;
    display: flex;
    flex-direction: column;
`;

const SidebarLogoContainer = styled.div`
    margin-bottom: 30px;
`;

const SidebarLogo = styled.img`
    width: 179px;
    height: 32px;
    display: block;
`;

const SidebarItem = styled.div`
    display: flex;
    align-items: center;
    padding: 10px;
    margin-bottom: 10px;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #34495e;
    }

    &.active {
        background-color: #1abc9c;
        font-weight: bold;
    }

    svg {
        margin-right: 10px;
        font-size: 18px;
    }

    span {
        font-size: 16px;
    }
`;

const MainContent = styled.div`
    flex: 1;
    background-color: #FFFFFF;
    padding: 20px;
    display: flex;
    flex-direction: column;
`;

const UserContainer = styled.div`
    background-color: #FFFFFF;
    padding: 20px;
    margin-left: 820px;
    margin-bottom: 30px;
`;

const HeaderContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    border: 1px solid #ddd;
`;

const OverviewSection = styled.div`
    border: 1px solid #ddd;
    width: auto;
    height: 48px;
    display: flex;
    align-items: center;
    padding: 0 15px;
    margin-right: 10px;
`;

const OverviewText = styled.h2`
    font-size: 14px;
    font-weight: 400;
    color: #333;
`;

const HeaderRightSection = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;

const UserProfile = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;

    svg {
        font-size: 24px;
        margin-right: 8px;
        color: #777;
    }

    span {
        color: #555;
    }
`;

const HeaderDropdownContainer = styled.div`
    position: relative;
     margin-left: 830px;

`;

const HeaderDropdownButton = styled.div`
    background-color: #FFFFFF;
    color: #555;
    padding: 10px 15px;
    border-radius: 5px;
   
    cursor: pointer;
    display: flex;
    align-items: center;

    svg {
        margin-left: 5px;
    }
`;

const CalendarDropdown = styled.div`
    color: black;
    position: absolute;
    top: calc(100% + 5px);
    right: 0;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    z-index: 10;
    padding: 15px;
    width: 400px;
`;

const DropdownOptions = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0 0 10px 0;

    li {
        padding: 8px 10px;
        cursor: pointer;

        &:hover {
            background-color: #f0f0f0;
        }
    }
`;

const CalendarContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 5px;
    margin-bottom: 10px;
`;

const CalendarHeader = styled.div`
    grid-column: 1 / -1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
`;

const CalendarControls = styled.div`
    display: flex;
    align-items: center;
`;

const CalendarButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    padding: 5px;
    margin: 0 5px;
`;

const CalendarGrid = styled.div`
    grid-column: 1 / -1;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 5px;
`;

const CalendarDay = styled.div`
    text-align: center;
    padding: 8px;
    border-radius: 3px;
    cursor: pointer;

    &.selected {
        background-color: #3498db;
        color: white;
    }

    &:hover {
        background-color: #f0f0f0;
    }
`;

const CalendarActions = styled.div`
    display: flex;
    justify-content: flex-end;
`;

const ActionButton = styled.button`
    background: none;
    border: 1px solid #ccc;
    border-radius: 3px;
    padding: 8px 12px;
    margin-left: 10px;
    cursor: pointer;

    &:hover {
        background-color: #f0f0f0;
    }

    &.apply {
        background-color: #3498db;
        color: white;
        border-color: #3498db;
    }
`;

const InfoGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: min-content;
    gap: 2px;
    margin-top: -20px;
    border: 1px solid #ddd;
`;

const InfoGrids = styled.div`
    display: grid;
    margin-top: 30px;
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: min-content;
    gap: 10px;
`;

const InfoCard = styled.div`
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;

    @media (max-width: 768px) {
        grid-column: span 1;
    }
`;

const CardHeader = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 5px; /* Space between icon/title and value */
`;

const CardIcon = styled.div`
    margin-right: 10px; /* Space between icon and title */
    margin-bottom: -20px;

    img {
        width: 55px;
        height: 55px;
    }
`;

const CardTitle = styled.h3`
    font-size: 18px;
    color: #333;
    margin-bottom: 5px; 
`;

const CardValue = styled.span`
    font-size: 28px;
    font-weight: bold;
    color: #555;
    margin-bottom: 5px;
`;

const CardDescription = styled.p`
    font-size: 14px;
    color: #777;
    
`;

const Dashboard = () => {
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);

    const toggleCalendar = () => {
        setIsCalendarOpen(!isCalendarOpen);
    };

    return (
        <DashboardContainer>
            <Sidebar>
                <SidebarLogoContainer>
                    <SidebarLogo src={footerLogo} alt="Footer Logo" />
                </SidebarLogoContainer>
                <SidebarItem className="active">
                    <FaHome /> <span>Dashboard</span>
                </SidebarItem>
                <SidebarItem><FaHeartbeat /> <span>Account Health</span></SidebarItem>
                <SidebarItem><FaUsers /> <span>Manage Leads</span></SidebarItem>
                <SidebarItem><FaBoxOpen /> <span>Manage Product</span></SidebarItem>
                <SidebarItem><FaInfoCircle /> <span>Company Information</span></SidebarItem>
                <SidebarItem><FaQuestionCircle /> <span>Help & Support</span></SidebarItem>
                <SidebarItem><FaCreditCard /> <span>Manage Subscription</span></SidebarItem>
                <SidebarItem><FaCog /> <span>Settings</span></SidebarItem>
            </Sidebar>

            <MainContent>
                <UserContainer>
                    <UserProfile>
                        <FaUserCircle />
                        <span>Olivia Martin</span>
                    </UserProfile>
                </UserContainer>

                <HeaderContainer>
                    <OverviewSection>
                        <OverviewText>Overview</OverviewText>
                    </OverviewSection>
                    <HeaderDropdownContainer>
                        <HeaderDropdownButton onClick={toggleCalendar}>
                            Today <FaCaretDown />
                        </HeaderDropdownButton>
                        {isCalendarOpen && (
                            <CalendarDropdown>
                                <DropdownOptions>
                                    <li>Today</li>
                                    <li>Yesterday</li>
                                    <li>Last 7 Days</li>
                                    <li>Last 30 Days</li>
                                    <li>Last 60 Days</li>
                                    <li>Last 90 Days</li>
                                    <li>This Month</li>
                                    <li>Last Month</li>
                                    <li>Custom Range</li>
                                </DropdownOptions>
                                <CalendarContainer>
                                    <CalendarHeader>
                                        <CalendarControls>
                                            <CalendarButton>&lt;</CalendarButton>
                                            <span>Apr 2025</span>
                                            <CalendarButton>&gt;</CalendarButton>
                                        </CalendarControls>
                                    </CalendarHeader>
                                    <CalendarGrid>
                                        {Array.from({ length: 35 }).map((_, i) => {
                                            const day = i + 1;
                                            const firstDay = new Date(2025, 3, 1).getDay();
                                            if (i < firstDay) return <CalendarDay key={`empty-${i}`}></CalendarDay>;
                                            if (day <= 30) return <CalendarDay key={day}>{day}</CalendarDay>;
                                            return <CalendarDay key={`empty-end-${i}`}></CalendarDay>;
                                        })}
                                    </CalendarGrid>
                                </CalendarContainer>
                                <CalendarActions>
                                    <ActionButton>Cancel</ActionButton>
                                    <ActionButton className="apply">Apply</ActionButton>
                                </CalendarActions>
                            </CalendarDropdown>
                        )}
                    </HeaderDropdownContainer>
                </HeaderContainer>

                <InfoGrid>
                    <InfoCard>
                        <CardHeader>
                            <CardIcon><img src={TotalLeads} alt="Total Leads" /></CardIcon>
                            <CardTitle>Total Leads</CardTitle>
                        </CardHeader>
                        <CardValue>12,350</CardValue>
                    </InfoCard>
                    <InfoCard>
                        <CardHeader>
                            <CardIcon><img src={LeadsPending} alt="Leads Pending" /></CardIcon>
                            <CardTitle>Leads Pending</CardTitle>
                        </CardHeader>
                        <CardValue>12,350</CardValue>
                    </InfoCard>
                    <InfoCard>
                        <CardHeader>
                            <CardIcon><img src={LeadsUtilized} alt="Leads Utilized" /></CardIcon>
                            <CardTitle>Leads Utilized</CardTitle>
                        </CardHeader>
                        <CardValue>85,000</CardValue>
                    </InfoCard>
                </InfoGrid>

                <InfoGrids>
                    <InfoCard>
                        <CardHeader>
                            <CardIcon><img src={Impressions} alt="Impressions" /></CardIcon>
                            <CardTitle>Impressions</CardTitle>
                        </CardHeader>
                        <CardValue>1,000</CardValue>
                        <CardDescription>Number of times your products are shown...</CardDescription>
                    </InfoCard>
                    <InfoCard>
                        <CardHeader>
                            <CardIcon><img src={TotalRequests} alt="Total Requests" /></CardIcon>
                            <CardTitle>Total Requests</CardTitle>
                        </CardHeader>
                        <CardValue>50</CardValue>
                        <CardDescription>Number of potential users who requested...</CardDescription>
                    </InfoCard>
                    <InfoCard>
                        <CardHeader>
                            <CardIcon><img src={AverageAttemptTime} alt="Average Attempt Time" /></CardIcon>
                            <CardTitle>Average Attempt Time</CardTitle>
                        </CardHeader>
                        <CardValue>2m 35sec</CardValue>
                        <CardDescription>Average time taken by you to connect...</CardDescription>
                    </InfoCard>
                    <InfoCard>
                        <CardHeader>
                            <CardIcon><img src={TotalConversionRate} alt="Conversion Rate" /></CardIcon>
                            <CardTitle>Total Conversion Rate</CardTitle>
                        </CardHeader>
                        <CardValue>78%</CardValue>
                        <CardDescription>Conversion rate for your total leads...</CardDescription>
                    </InfoCard>
                </InfoGrids>
            </MainContent>
        </DashboardContainer>
    );
};

export default Dashboard;