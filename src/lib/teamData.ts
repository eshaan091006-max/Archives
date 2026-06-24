export interface TeamData {
  department: string;
  photo: string;
  oc: string;
  ogs: string[];
  coordis: string[];
  workforce: string[];
}

// Fallback placeholder data if a specific department isn't defined yet
export const defaultTeamData: TeamData = {
  department: 'Department Team',
  photo: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80',
  oc: 'John Doe',
  ogs: ['Alice Smith', 'Bob Jones', 'Charlie Brown'],
  coordis: ['David', 'Eve', 'Frank', 'Grace', 'Heidi', 'Ivan', 'Judy', 'Kevin'],
  workforce: [
    'Ishaan Roy', 'Rohan Verma', 'Diya Kapoor', 'Aryan Mehta', 
    'Sara Iyer', 'Kabir Nair', 'Mira Joshi', 'Tara Singh', 
    'Veer Malhotra', 'Naina Pillai', 'Dev Khanna', 'Riya Bhatt', 
    'Arjun Saxena'
  ]
};

export const getTeamData = (department: string): TeamData => {
  // You can easily add specific teams here later by matching the department string!
  return {
    ...defaultTeamData,
    department
  };
};
