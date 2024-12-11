// export interface Task {
//   id: string;
//   status: Status;
//   project: Project;
//   assigned_user: User | null;
//   category: Category | null;
//   title: string;
//   description: string;
//   picked_at: string | null;
//   estimated_duration: string;
//   expected_finalization: string | null;
//   estimated_finalization: string | null;
//   dependencies: TaskDependency[];
// }

// export interface Status {
//   id: string;
//   status: string;
//   active_state: boolean;
// }

// export interface Project {
//   id: string;
//   name: string;
//   description: string;
// }

// export interface User {
//   id: string;
//   name: string;
//   email: string;
// }

// export interface Category {
//   id: string;
//   name: string;
// }

// export interface TaskDependency {
//   id: string;
//   task_id: string;
//   dependency_id: string;
// }

/**
 * CustomUser Interface
 */
export interface CustomUser {
  id: string;
  name: string;
  email: string;
  firstName: string;
  lastName: string;
  isMember: boolean;
  isAdmin: boolean;
  roles: string[];
  permissions: string[];
  avatar: string;
}

/**
 * Category Interface
 */
export interface Category {
  id: string;
  title: string;
  juniorFactor: number;
  seniorFactor: number;
}

/**
 * UserAssignment Interface
 */
export interface UserAssignment {
  id: string;
  user: CustomUser;
  category: Category;
  level: 'Blocked' | 'Junior' | 'Medior' | 'Senior';
}

/**
 * UserAssignmentSimple Interface
 */
export interface UserAssignmentSimple {
  id: string;
  user: string; // Only the user id
  category: string; // Only the category id
  level: 'Blocked' | 'Junior' | 'Medior' | 'Senior';
}

/**
 * Project Interface
 */
export interface Project {
  id: string;
  name: string;
  description: string | null;
}

/**
 * Status Interface
 */
export interface Status {
  id: string;
  status: string;
  activeState: boolean;
}

/**
 * Task Interface
 */
export interface Task {
  id: string;
  title: string;
  description: string | null;
  status: Status;
  project: Project;
  assignedUser: CustomUser | null;
  pickedAt: string | null; // ISO date string
  estimatedDuration: string | null; // ISO 8601 duration (e.g., 'P1D' for one day)
  expectedFinalization: string | null; // ISO date string
  estimatedFinalization: string | null; // ISO date string
  category: Category | null;
  dependencies: string[]; // List of dependent task ids
}

/**
 * TaskSimple Interface
 */
export interface TaskSimple {
  id: string;
  title: string;
  description: string | null;
  status: string; // Only the status id
  project: string; // Only the project id
  assignedUser: string | null; // Only the user id
  pickedAt: string | null; // ISO date string
  estimatedDuration: string; // ISO 8601 duration
  expectedFinalization: string | null; // ISO date string
  estimatedFinalization: string | null; // ISO date string
  category: string | null; // Only the category id
  dependencies: string[]; // List of dependent task ids
}

/**
 * TaskAudit Interface
 */
export interface TaskAudit {
  id: string;
  task: string; // Only the task id
  status: string; // Only the status id
  user: string | null; // Only the user id
  updatedAt: string; // ISO date string
}

/**
 * ScheduleRule Interface
 */
export interface ScheduleRule {
  user: string; // User ID
  dayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6; // Day of the week (0 = Monday, 6 = Sunday)
  factor: number; // Work factor (e.g., 1.0 for full-time)
  startDate: string | null; // ISO date string
  endDate: string | null; // ISO date string
}

/**
 * ScheduleOverride Interface
 */
export interface ScheduleOverride {
  user: string; // User ID
  date: string; // ISO date string
  factor: number; // Override work factor (e.g., 1.0 for full-time)
}
