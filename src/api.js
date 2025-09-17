// API functions for university assistant system
// These will be replaced with actual Spring Boot backend calls later

export const loginUser = async (email, password) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const users = {
    'student@uni.edu': { password: '1234', name: 'John Doe', role: 'student' },
    'faculty@uni.edu': { password: '1234', name: 'Dr. Jane Smith', role: 'faculty' },
    'admin@uni.edu': { password: 'adminpass', name: 'Admin User', role: 'admin' }
  };
  
  const user = users[email];
  if (user && user.password === password) {
    return { success: true, user: { name: user.name, role: user.role, email } };
  }
  
  throw new Error('Invalid credentials');
};

export const sendChatMessage = async (message) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const responses = [
    "I will connect to backend later. Thanks for your message!",
    "Your query has been received. Backend integration coming soon!",
    "I'm processing your request. Backend connection pending!",
    "Thanks for reaching out! Full functionality will be available once connected to backend."
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
};

export const getExamUpdates = async () => {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return [
    { id: 1, title: 'Mathematics Mid-term', date: '2024-02-15', course: 'MATH101' },
    { id: 2, title: 'Physics Final Exam', date: '2024-02-20', course: 'PHYS201' },
    { id: 3, title: 'Computer Science Quiz', date: '2024-02-12', course: 'CS301' },
    { id: 4, title: 'Chemistry Lab Test', date: '2024-02-18', course: 'CHEM102' }
  ];
};

export const getTimetable = async () => {
  await new Promise(resolve => setTimeout(resolve, 600));
  
  return [
    { id: 1, course: 'Mathematics', day: 'Monday', time: '09:00 - 10:30', room: 'A101' },
    { id: 2, course: 'Physics', day: 'Monday', time: '11:00 - 12:30', room: 'B205' },
    { id: 3, course: 'Computer Science', day: 'Tuesday', time: '10:00 - 11:30', room: 'C301' },
    { id: 4, course: 'Chemistry', day: 'Wednesday', time: '14:00 - 15:30', room: 'D102' },
    { id: 5, course: 'English', day: 'Thursday', time: '09:00 - 10:30', room: 'E201' },
    { id: 6, course: 'History', day: 'Friday', time: '15:00 - 16:30', room: 'F105' }
  ];
};

export const getQuestionPapers = async () => {
  await new Promise(resolve => setTimeout(resolve, 700));
  
  return [
    { id: 1, course: 'Mathematics', year: '2023', downloadUrl: 'https://example.com/math2023.pdf' },
    { id: 2, course: 'Physics', year: '2023', downloadUrl: 'https://example.com/physics2023.pdf' },
    { id: 3, course: 'Computer Science', year: '2022', downloadUrl: 'https://example.com/cs2022.pdf' },
    { id: 4, course: 'Chemistry', year: '2023', downloadUrl: 'https://example.com/chem2023.pdf' },
    { id: 5, course: 'English', year: '2022', downloadUrl: 'https://example.com/eng2022.pdf' }
  ];
};

export const submitComplaint = async (complaint) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // For now, just return success. Later this will post to backend
  return { success: true, id: Date.now(), message: 'Complaint submitted successfully!' };
};

export const searchFaculty = async (department) => {
  await new Promise(resolve => setTimeout(resolve, 900));
  
  const facultyData = {
    'robotics': [
      { id: 1, name: 'Dr. Sarah Johnson', whatsapp: 'https://wa.me/1234567890', specialization: 'AI & Robotics' },
      { id: 2, name: 'Prof. Michael Chen', whatsapp: 'https://wa.me/1234567891', specialization: 'Autonomous Systems' }
    ],
    'computer science': [
      { id: 3, name: 'Dr. Emily Davis', whatsapp: 'https://wa.me/1234567892', specialization: 'Software Engineering' },
      { id: 4, name: 'Prof. David Wilson', whatsapp: 'https://wa.me/1234567893', specialization: 'Data Science' },
      { id: 5, name: 'Dr. Lisa Brown', whatsapp: 'https://wa.me/1234567894', specialization: 'Cybersecurity' }
    ],
    'mathematics': [
      { id: 6, name: 'Prof. Robert Taylor', whatsapp: 'https://wa.me/1234567895', specialization: 'Applied Mathematics' },
      { id: 7, name: 'Dr. Amanda Garcia', whatsapp: 'https://wa.me/1234567896', specialization: 'Statistics' }
    ],
    'physics': [
      { id: 8, name: 'Dr. James Miller', whatsapp: 'https://wa.me/1234567897', specialization: 'Quantum Physics' },
      { id: 9, name: 'Prof. Maria Rodriguez', whatsapp: 'https://wa.me/1234567898', specialization: 'Theoretical Physics' }
    ]
  };
  
  const faculty = facultyData[department.toLowerCase()] || [];
  return faculty;
};