import {
  PermissionType,
  TaskPriorityEnumType,
  TaskStatusEnumType,
} from '../constant';

export  password;
export 
  user
    _id;
    currentWorkspace;
  };
};

export 
  email;
  password;
};

// USER TYPE
export 
  name;
  email;
  profilePicture;
  isActive;
  lastLogin;
  createdAt;
  updatedAt;
  currentWorkspace
    _id;
    name;
    owner;
    inviteCode;
  };
};

export 
  user;
};

//******** */ WORLSPACE TYPES ****************
// ******************************************
export 
  name;
  description?;
  owner;
  inviteCode;
};

export 
  description;
};

export 
  data
    name;
    description;
  };
};

export 
  workspace;
};

export 
  workspaces;
};

export 
    userId;
    workspaceId;
    role
      _id;
      name;
      permissions;
    };
    joinedAt;
    createdAt;
  }[];
};

export 
  workspace;
};

export 
  data
    roleId;
    memberId;
  };
};

export 
  members
    _id;
    userId
      _id;
      name;
      email;
      profilePicture;
    };
    workspaceId;
    role
      _id;
      name;
    };
    joinedAt;
    createdAt;
  }[];
  roles;
};

export 
  analytics
    totalTasks;
    overdueTasks;
    completedTasks;
  };
};

export 
  pageSize;
  pageNumber;
  totalPages;
  skip;
  limit;
};

export 
  name;
};
// *********** MEMBER ****************

//******** */ PROJECT TYPES ****************
//****************************************** */
export 
  name;
  emoji;
  description;
  workspace;
  createdBy
    _id;
    name;
    profilePicture;
  };
  createdAt;
  updatedAt;
};

export 
  data
    emoji;
    name;
    description;
  };
};

export 
  project;
};

export 
  projectId;
  data
    emoji;
    name;
    description;
  };
};

//ALL PROJECTS IN WORKSPACE TYPE
export 
  pageNumber?;
  pageSize?;
  keyword?;
  skip?;
};

export 
  projects;
  pagination;
};

// SINGLE PROJECT IN WORKSPACE TYPE
export 
  projectId;
};

//********** */ TASK TYPES ************************
//************************************************* */

export 
  projectId;
  data
    title;
    description;
    priority;
    status;
    assignedTo;
    dueDate;
  };
};


//added new for edtiting of task
export 
  workspaceId;
  projectId;
  data
    title;
    description;
    priority;
    status;
    assignedTo;
    dueDate;
  }>;
};


export 
  title;
  description?;
  project?
    _id;
    emoji;
    name;
  };
  priority;
  status;
  assignedTo
    _id;
    name;
    profilePicture;
  } | null;
  createdBy?;
  dueDate;
  taskCode;
  createdAt?;
  updatedAt?;
};

export 
  projectId?;
  keyword?;
  priority?;
  status?;
  assignedTo?;
  dueDate?;
  pageNumber?;
  pageSize?;
};

export 
  tasks;
  pagination;
};
