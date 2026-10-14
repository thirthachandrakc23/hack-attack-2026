/**
 * dashboardData.js - Mock data for Learner & Mentor dashboards
 */

export const mockLearnerDashboard = {
  stats: {
    upcomingCount: 2,
    completedHours: 6.5,
    skillsLearned: 5,
  },
  upcomingSessions: [
    {
      id: 'sess-1',
      mentorName: 'Amina Yusuf',
      mentorRole: 'Senior Frontend Engineer',
      slot: 'Tomorrow at 3:00 PM',
      topic: 'React state management and component reusability',
      meetingUrl: 'https://meet.google.com/skillbridge-demo',
      status: 'confirmed',
    },
    {
      id: 'sess-2',
      mentorName: 'Marcus Chen',
      mentorRole: 'Tech Lead',
      slot: 'Friday at 3:30 PM',
      topic: 'Software engineer resume review and internship tips',
      meetingUrl: 'https://meet.google.com/skillbridge-demo',
      status: 'confirmed',
    },
  ],
  learningGoals: [
    {
      id: 'goal-1',
      title: 'Frontend Fundamentals (HTML/CSS & React)',
      category: 'Web Development',
      progress: 75,
      targetDate: 'End of October',
    },
    {
      id: 'goal-2',
      title: 'JavaScript Data Structures & Algorithms',
      category: 'Computer Science',
      progress: 50,
      targetDate: 'Mid November',
    },
    {
      id: 'goal-3',
      title: 'Portfolio Project & Tech Resume',
      category: 'Career Readiness',
      progress: 30,
      targetDate: 'Early December',
    },
  ],
};

export const mockMentorDashboard = {
  stats: {
    studentsMentored: 18,
    volunteerHours: 32.5,
    rating: 5.0,
  },
  pendingRequests: [
    {
      id: 'req-1',
      studentName: 'Zainab Q.',
      education: 'Community College Student',
      requestedSlot: 'Saturday, 2:00 PM',
      topic: 'Guidance on building my first React full-stack project for hackathon',
    },
    {
      id: 'req-2',
      studentName: 'Leo Martinez',
      education: 'Self-Taught Developer',
      requestedSlot: 'Sunday, 11:00 AM',
      topic: 'Mock interview and code review on JavaScript array methods',
    },
  ],
  upcomingMentorships: [
    {
      id: 'm-sess-1',
      studentName: 'Maya Patel',
      education: 'High School Senior',
      slot: 'Thursday at 5:00 PM',
      topic: 'Preparing for CS major university applications',
      meetingUrl: 'https://meet.google.com/skillbridge-demo',
    },
  ],
};
