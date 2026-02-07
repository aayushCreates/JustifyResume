
export type Project = {
  name?: string;
  description?: string;
  techStack?: string[];
  link?: string;
}

export type ParsedResume = {
    name?: string;
    email?: string;
    phone?: string;
    skills?: string[];
    experience?: {
      company: string;
      role: string;
      duration?: string;
      description?: string;
    }[];
    education?: {
      institution: string;
      branch?: string;
      course?: string;
      year?: string;
      percentage?: string;
      cgpa?: string;
    }[];
    links?: {
      github?: string;
      portfolio?: string;
      linkedin?: string;
    };
    projects?: Project[];
  };
  