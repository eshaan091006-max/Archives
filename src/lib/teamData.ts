import { YearKey } from './themeData';

export interface TeamData {
  department: string;
  photo: string;
  oc: string;
  ogs: string[];
  coordis: string[];
  workforce: string[];
  anchor?: string;
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

export const getTeamData = (department: string, year: YearKey = '2025'): TeamData => {
  if (year === '2023' && (department === 'Admin' || department === 'Administration')) {
    return {
      department: 'Administration',
      photo: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80',
      oc: 'Shashank Shenoy',
      ogs: [
        'Merlyn Rebello',
        'Sheba Mathew',
        'Sybrella Paul',
        'Rachel Chalissery',
        'Darren Chettiar',
        'Aditi Mahambre',
        'Ansh Chainani',
        'Jazeel Ekhlas',
        'Naman Jain',
        'Kaavya Dhavle'
      ],
      coordis: [
        'Avanti Lotlikar',
        'Royce Biju Thomas',
        'Tanishka Vijaykumar'
      ],
      workforce: [
        'Liza Saldanha',
        'Sophie Mascarenhas',
        'Jennifer Jayan P',
        'Ruchika Basutkar',
        'Srijan Mitra',
        'Sanvi Parab',
        'Earlene Fernandes',
        'Aarti Gersappa',
        'Aditi Narvekar',
        'Aleena Aby',
        'Ben Joe Kuriakose',
        'Chris Jestin',
        'Diya Rastogi',
        'Esta Mathew',
        'Harsh Sodhani',
        'Hazel Clement',
        'Joan Fernandes',
        'Megan Monis',
        'Naysa Paul',
        'Pratichi Vidhani',
        'Priya Konar',
        'Rita Lobo',
        'Seanna D\'souza',
        'Tanisha Dharmai',
        'Wiekevi Michelle Nyuthe',
        'Yutika Pathak',
        'Mehal Franklin',
        'Trystan Pereira',
        'Diya Rakesh',
        'Neeraja Gokhale',
        'Yashvi Vora',
        'Leisha Vishal',
        'Gabriel Barros',
        'Dallin Menezes',
        'Arshia Dhole',
        'Prem Jain',
        'Asmi rambhia',
        'Diya Iype',
        'Thanmay Nambiar',
        'Naina Sisodia',
        'Roshni Jain',
        'Parinita Radhwani',
        'Prateek Singh',
        'Anandita Saolapurkar',
        'Yash Patni',
        'Tanisha Savla',
        'Kushagra Patawari',
        'Felin Faby',
        'Binaisha Bharucha',
        'Surya Ashrita Garimella',
        'Nandika Gupta',
        'Natasha Raisinghani',
        'Kirti Shinde',
        'Magnus Nazareth',
        'Abhijay Daga',
        'Raj Sheth',
        'Kinnari Koli',
        'Mahir Antule'
      ]
    };
  }

  if (year === '2023' && (department === 'Indian Performing Arts' || department === 'ipa')) {
    return {
      department: 'Indian Performing Arts',
      photo: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80',
      oc: 'Gauri Jagtap',
      ogs: [
        'Swarangie Pawar',
        'Eesha Jhaveri',
        'Akankshya Patnaik',
        'Maitri Dharod'
      ],
      coordis: [],
      workforce: [
        'Shaurya Sharma',
        'Rosmin Shaju',
        'Manasvi Mehta',
        'Bhoomi Shah',
        'Vilma Xavier',
        'Julia Mary Mathew',
        'Aadishesh Payas',
        'Shravani Mohale',
        'Soha Satam',
        'Kalyani Iyer',
        'Harshita Manohar',
        'Nandana Nair',
        'Kessiya Joseph',
        'Vedant Joshi',
        'Diya Mariam Sam',
        'Shalika Yadav',
        'Arunima Raja Mitra',
        'Gadha girisan',
        'Kriti Bhattacharya',
        'Ishwarie Karanjikar',
        'Sara Gosavi',
        'Merin Mathew',
        'Spruha Joshi',
        'khushi koul',
        'Vaidehi Ponkshe',
        'Neelanjana Arunkumar',
        'Nupur Likhite',
        'Gauri Patil',
        'Tanya Paul',
        'Kunjal Dave',
        'Anusha Newrekar',
        'Shruti Rajendra Salunkhe',
        'Kimaya Kubitkar',
        'Priyanshi Mohapatra',
        'Shambhavi Borkar',
        'Satt Padwal',
        'Shriya Nair',
        'Lekshmi Anil A',
        'Alka Sudeep Mathew',
        'Riya Barmecha',
        'Sera Pereira',
        'Jitvari Chaudhari',
        'Pratha Shah',
        'Anushka Chaubey',
        'Arundhaty Menon',
        'Vrinda Joshi',
        'Alina Mathew',
        'Siddhi Kadam'
      ]
    };
  }

  if (year === '2023' && (department === 'Western Performing Arts' || department === 'wpa')) {
    return {
      department: 'Western Performing Arts',
      photo: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80',
      oc: 'Anvita Vinu',
      ogs: [
        'Megan D\'souza',
        'Jessica Liz George',
        'Maahi Vaidya',
        'Larah Matthew',
        'Swayam Bhowmick',
        'Gauri Sawant'
      ],
      coordis: [],
      workforce: [
        'Naomi Margaret Thomas',
        'Keya Noronha',
        'Arpita Soni',
        'Krish Rathod',
        'Jasmin Thakar',
        'Dave Pulical',
        'Tanisha Soji',
        'Gia Alvares',
        'Elishma Wilson Pinipe',
        'Perpetual Melanie Dcunha',
        'Kimberley Jesson',
        'Shravani kamat',
        'Akriti Banerjee',
        'Christabel Renny',
        'Joshua Thomas',
        'Susanna Eluvathingal',
        'Antara Zaveri',
        'Sakina Banatwala',
        'Maria Soy',
        'Khushee Kadam',
        'Marcelino Fernandez',
        'Evania Cerejo',
        'Shawn DeSouza',
        'Geneive D\'Souza',
        'Pari Raj Gupta',
        'Melissa Mathew',
        'Freya Jalnawala',
        'Kyra Vincent',
        'Rachael Cordeiro',
        'Zara Vincent',
        'Avril George',
        'Michelle Furtado',
        'Jadyn Braganza',
        'Jewel Jomy',
        'Palak Jajoo',
        'Paritosh Takiar',
        'Roshni David',
        'Glen D\'Mello',
        'Diya Choksi',
        'Harsh Tirkey',
        'Angelica Fernandes',
        'Ronan Andrades',
        'Madhura Sarfare',
        'Kriti Bhargavva',
        'Manas Kumar',
        'Samridhi Swarup',
        'Joel Serrao',
        'Malvika Kasturirangan',
        'Keziah Matthews',
        'Rhea Chhabria'
      ]
    };
  }

  if (year === '2023' && (department === 'ETCW' || department === 'etcw' || department === 'etc' || department === 'Creative Writing & Workshops')) {
    return {
      department: 'Creative Writing & Workshops',
      photo: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80',
      oc: 'Hardik Chopra',
      ogs: [
        'Joanne Panicker',
        'Rhea Rodrigues',
        'Saniya Pichholia',
        'Harsh Mate',
        'Tishya Jain',
        'Vaidehi Joshi'
      ],
      coordis: [],
      workforce: [
        'Vedanti',
        'Rehaan Pocha',
        'Lyla Shroff',
        'Soumya Rastogi',
        'Gurmehar Singh',
        'Arushi Dabhade',
        'Tanya katre',
        'Aman Sinha',
        'Khushi Tambi',
        'Anahita Monteiro',
        'Merric Pereira',
        'Avril Braganza',
        'Tusti Arora',
        'Navya Krishnan',
        'Dhruvi Hate',
        'Kavya Gulati',
        'Tanish Jacob-Rego',
        'Johannah Dube',
        'Sujit Kumar Singh',
        'Angela lasrado',
        'Daniel Sujal Rozario',
        'Maana Munshi',
        'Abhishek Cherian',
        'Isaac D\'cruz',
        'Nitya Binu',
        'Jay Kulkarni',
        'Padmaja Rathore',
        'Figo Rodrigues',
        'Joann Fernandes',
        'Jacin Mathew'
      ],
      anchor: 'Surmaiye Singh'
    };
  }

  return {
    ...defaultTeamData,
    department
  };
};
