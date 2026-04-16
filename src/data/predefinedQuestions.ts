export interface PredefinedQuestion {
  id: string;
  question_text: string;
  question_type: 'multiple_choice' | 'number_scale' | 'word_cloud' | 'free_text';
  options?: string[];
  correct_answer?: string;
  explanation?: string;
}

export interface QuestionCategory {
  name: string;
  questions: PredefinedQuestion[];
}

// All question data has been split into topic files for maintainability.
// Use `index.ts` in this folder to import all questions.
        question_text: "What is the main goal of DevOps in data engineering?",
        question_type: "multiple_choice",
        options: [
          "Increase manual deployments",
          "Automate and streamline development, testing, and deployment",
          "Reduce collaboration between teams",
          "Focus only on infrastructure"
        ],
        correct_answer: "Automate and streamline development, testing, and deployment",
        explanation: "DevOps aims to automate and integrate processes for faster, more reliable delivery."
      },
      {
        id: "devops_2",
        question_text: "Which tool is commonly used for version control in Databricks projects?",
        question_type: "multiple_choice",
        options: [
          "Jenkins",
          "Git",
          "Docker",
          "Terraform"
        ],
        correct_answer: "Git",
      },
      {
        id: "devops_3",
        question_text: "What is CI/CD?",
        question_type: "multiple_choice",
        options: [
          "Continuous Integration and Continuous Deployment",
          "Cluster Initialization and Configuration Deployment",
          "Code Inspection and Continuous Debugging",
          "Cloud Infrastructure and Container Development"
        ],
        correct_answer: "Continuous Integration and Continuous Deployment",
        explanation: "CI/CD automates code integration, testing, and deployment to production."
      },
      {
        id: "devops_4",
        question_text: "Which Databricks feature supports automated job deployment?",
        question_type: "multiple_choice",
        options: [
          "Databricks Jobs API",
          "Databricks Notebooks",
          "Databricks MLflow",
          "Databricks Delta Lake"
        ],
        correct_answer: "Databricks Jobs API",
        explanation: "The Jobs API allows programmatic creation, management, and automation of jobs."
      },
      {
        id: "devops_5",
        question_text: "What is Infrastructure as Code (IaC)?",
        question_type: "multiple_choice",
        options: [
          "Writing code for data pipelines",
          "Managing infrastructure using configuration files and code",
          "Manual server provisioning",
          "Only used for networking"
        ],
        correct_answer: "Managing infrastructure using configuration files and code",
        explanation: "IaC enables automated, repeatable infrastructure setup using tools like Terraform."
      },
      {
        id: "devops_6",
        question_text: "Which tool is commonly used for IaC in Databricks environments?",
        question_type: "multiple_choice",
        options: [
          "Jenkins",
          "Terraform",
          "Airflow",
          "MLflow"
        ],
        correct_answer: "Terraform",
        explanation: "Terraform is widely used to manage Databricks workspaces, clusters, and resources as code."
      },
      {
        id: "devops_7",
        question_text: "What is the benefit of using automated testing in Databricks workflows?",
        question_type: "multiple_choice",
        options: [
          "Increases manual errors",
          "Ensures code quality and reliability before deployment",
          "Slows down development",
          "Only works for ML models"
        ],
        correct_answer: "Ensures code quality and reliability before deployment",
        explanation: "Automated tests catch issues early and improve code quality."
      },
      {
        id: "devops_8",
        question_text: "How can secrets and credentials be securely managed in Databricks?",
        question_type: "multiple_choice",
        options: [
          "Store in plain text files",
          "Use Databricks Secrets API",
          "Email credentials to team members",
          "Hard-code in notebooks"
        ],
        correct_answer: "Use Databricks Secrets API",
        explanation: "The Secrets API securely stores and retrieves sensitive information."
      },
      {
        id: "devops_9",
        question_text: "What is the purpose of monitoring and logging in DevOps for Databricks?",
        question_type: "multiple_choice",
        options: [
          "To ignore errors",
          "To track system health, performance, and troubleshoot issues",
          "To slow down jobs",
          "To increase costs"
        ],
        correct_answer: "To track system health, performance, and troubleshoot issues",
        explanation: "Monitoring and logging are essential for maintaining reliable data pipelines."
      },
      {
        id: "devops_10",
        question_text: "Which practice helps ensure reproducibility and consistency in Databricks deployments?",
        question_type: "multiple_choice",
        options: [
          "Manual configuration",
          "Infrastructure as Code and version control",
          "Ad-hoc scripting",
          "Ignoring environment differences"
        ],
        correct_answer: "Infrastructure as Code and version control",
        explanation: "IaC and version control ensure deployments are consistent and reproducible."
      }
    ]
  },
  {
    name: "Coming Back After Break",
    questions: [
      {
        id: "break_1",
        question_text: "Are you ready to continue?",
        question_type: "multiple_choice",
        options: ["Yes, let's go!", "Almost there", "Need a bit more time", "Not yet"]
      },
      {
        id: "break_2",
        question_text: "How are you feeling after the break?",
        question_type: "multiple_choice",
        options: ["Energized!", "Good", "Neutral", "Still tired"]
      },
      {
        id: "break_3",
        question_text: "Rate your readiness to continue (0 = not ready, 10 = fully ready)",
        question_type: "number_scale",
        options: []
      },
      {
        id: "break_4",
        question_text: "Can we start the next session?",
        question_type: "multiple_choice",
        options: ["Yes!", "Give me 2 minutes", "Give me 5 minutes", "Not ready"]
      },
      {
        id: "break_5",
        question_text: "How would you describe your current state? (Type 3 words)",
        question_type: "word_cloud",
        options: []
      },
      {
        id: "break_6",
        question_text: "Did you enjoy the break?",
        question_type: "multiple_choice",
        options: ["Very much", "Yes", "It was okay", "Not really"]
      },
      {
        id: "break_7",
        question_text: "Rate how refreshed you feel (0 = exhausted, 10 = completely refreshed)",
        question_type: "number_scale",
        options: []
      }
    ]
  },
  {
    name: "Fun Facts",
    questions: [
      {
        id: "fun_1",
        question_text: "What's your favorite pizza topping?",
        question_type: "multiple_choice",
        options: ["Pepperoni", "Mushrooms", "Pineapple (yes!)", "Cheese only"]
      },
      {
        id: "fun_2",
        question_text: "If you could have any superpower, what would it be?",
        question_type: "multiple_choice",
        options: ["Flying", "Invisibility", "Time travel", "Super strength"]
      },
      {
        id: "fun_3",
        question_text: "Coffee or tea?",
        question_type: "multiple_choice",
        options: ["Coffee all the way", "Tea please", "Both!", "Neither"]
      },
      {
        id: "fun_4",
        question_text: "How much do you like cats? (0 = not at all, 10 = crazy cat person)",
        question_type: "number_scale",
        options: []
      }
    ]
  },
  {
    name: "Course Question Bank: Get-to-know-each-other",
    questions: [
      {
        id: "gk_1",
        question_text: "Where are you joining from?",
        question_type: "word_cloud",
        options: []
      },
      {
        id: "gk_2",
        question_text: "What is your current job title?",
        question_type: "word_cloud",
        options: []
      },
      {
        id: "gk_3",
        question_text: "Which field do you work in?",
        question_type: "multiple_choice",
        options: ["Data Analyst", "Data Scientist", "Data Engineer", "ML Engineer", "BI Developer", "Software Engineer", "Student", "Other"]
      },
      {
        id: "gk_4",
        question_text: "How many Databricks courses have you attended before?",
        question_type: "multiple_choice",
        options: ["None", "1-2", "3-5", "More than 5"]
      },
      {
        id: "gk_5",
        question_text: "Why are you here today?",
        question_type: "multiple_choice",
        options: ["My company sent me", "I joined by personal interest", "I want to reskill", "I’m exploring new opportunities", "Other"]
      },
      {
        id: "gk_6",
        question_text: "What are your expectations for this course?",
        question_type: "word_cloud",
        options: []
      },
      {
        id: "gk_7",
        question_text: "How familiar are you with cloud platforms? (e.g., AWS, Azure, GCP)",
        question_type: "multiple_choice",
        options: ["Not familiar", "Somewhat familiar", "Very familiar"]
      },
      {
        id: "gk_8",
        question_text: "Which industry do you work in?",
        question_type: "multiple_choice",
        options: ["Finance", "Telco", "Healthcare", "Manufacturing", "Other"]
      },
      {
        id: "gk_9",
        question_text: "Have you previously worked with big data tools?",
        question_type: "multiple_choice",
        options: ["Yes", "No"]
      }
    ]
  },
  {
    name: "Course Question Bank: Technical Background",
    questions: [
      {
        id: "tech_1",
        question_text: "Which programming languages do you use regularly?",
        question_type: "word_cloud",
        options: []
      },
      {
        id: "tech_2",
        question_text: "How would you rate your Python skills?",
        question_type: "multiple_choice",
        options: ["Beginner", "Intermediate", "Advanced"]
      },
      {
        id: "tech_3",
        question_text: "How comfortable are you with SQL?",
        question_type: "multiple_choice",
        options: ["Not comfortable", "Somewhat comfortable", "Very comfortable"]
      },
      {
        id: "tech_4",
        question_text: "Have you used Spark before?",
        question_type: "multiple_choice",
        options: ["Yes", "No"]
      },
      {
        id: "tech_5",
        question_text: "Which data engineering tools have you worked with?",
        question_type: "word_cloud",
        options: []
      },
      {
        id: "tech_6",
        question_text: "How familiar are you with version control (Git)?",
        question_type: "multiple_choice",
        options: ["Not familiar", "Somewhat familiar", "Very familiar"]
      },
      {
        id: "tech_7",
        question_text: "Do you have experience with CI/CD?",
        question_type: "multiple_choice",
        options: ["Yes", "No"]
      },
      {
        id: "tech_8",
        question_text: "Have you worked with machine learning frameworks?",
        question_type: "word_cloud",
        options: []
      },
      {
        id: "tech_9",
        question_text: "Which IDE do you usually code in?",
        question_type: "multiple_choice",
        options: ["VS Code", "PyCharm", "Databricks Notebook", "Jupyter", "Other"]
      },
      {
        id: "tech_10",
        question_text: "How comfortable are you with Linux/command line tools?",
        question_type: "multiple_choice",
        options: ["Not comfortable", "Somewhat comfortable", "Very comfortable"]
      },
      {
        id: "tech_11",
        question_text: "Have you used Delta Lake before?",
        question_type: "multiple_choice",
        options: ["Yes", "No"]
      },
      {
        id: "tech_12",
        question_text: "Do you know how to build ETL/ELT pipelines?",
        question_type: "multiple_choice",
        options: ["Yes", "No"]
      },
      {
        id: "tech_13",
        question_text: "Which cloud provider do you use most often?",
        question_type: "multiple_choice",
        options: ["AWS", "Azure", "GCP", "None"]
      },
      {
        id: "tech_14",
        question_text: "Do you have experience with data warehousing?",
        question_type: "multiple_choice",
        options: ["Yes", "No"]
      },
      {
        id: "tech_15",
        question_text: "Have you deployed a project using CI/CD tools before?",
        question_type: "multiple_choice",
        options: ["Yes", "No"]
      }
    ]
  },
  {
    name: "Course Question Bank: Fun / Icebreaker Questions",
    questions: [
      {
        id: "fun_1",
        question_text: "If you could instantly master any programming language, which one would it be and why?",
        question_type: "word_cloud",
        options: []
      },
      {
        id: "fun_2",
        question_text: "If Python were an animal, what animal would it be?",
        question_type: "word_cloud",
        options: []
      },
      {
        id: "fun_3",
        question_text: "Would you rather debug code for 3 hours or sit through a 3-hour meeting?",
        question_type: "multiple_choice",
        options: ["Debug code", "Sit through meeting"]
      },
      {
        id: "fun_4",
        question_text: "If your life were a dataset, what would the schema look like?",
        question_type: "word_cloud",
        options: []
      },
      {
        id: "fun_5",
        question_text: "What’s the strangest thing you've ever Googled while coding?",
        question_type: "word_cloud",
        options: []
      },
      {
        id: "fun_6",
        question_text: "If AI could do one of your chores forever, which one would you choose?",
        question_type: "word_cloud",
        options: []
      },
      {
        id: "fun_7",
        question_text: "Tabs or spaces? Defend your answer.",
        question_type: "multiple_choice",
        options: ["Tabs", "Spaces"]
      },
      {
        id: "fun_8",
        question_text: "If you could work from anywhere in the world for one week, where would it be?",
        question_type: "word_cloud",
        options: []
      },
      {
        id: "fun_9",
        question_text: "What is the most unusual snack you’ve eaten during a coding session?",
        question_type: "word_cloud",
        options: []
      },
      {
        id: "fun_10",
        question_text: "If your personality were a programming error, which one? (SyntaxError, KeyError, TimeoutError, etc.)",
        question_type: "word_cloud",
        options: []
      }
    ]
  },
  {
    name: "Data ingestion with Lakeflow Connect",
    questions: [
      {
        id: "lakeflow_1",
        question_text: "What is the primary purpose of Lakeflow Connect in Databricks?",
        question_type: "multiple_choice",
        options: [
          "Manage cluster compute profiles",
          "Simplify and accelerate data ingestion from various sources",
          "Generate dashboards automatically",
          "Replace Delta Live Tables"
        ],
        correct_answer: "Simplify and accelerate data ingestion from various sources",
        explanation: "Lakeflow Connect provides managed pipelines that connect to many data sources, handle authentication, schema drift, and ingestion logic while hiding infrastructure complexity."
      },
      {
        id: "lakeflow_2",
        question_text: "What are the two main categories of connectors in Lakeflow Connect?",
        question_type: "multiple_choice",
        options: [
          "Manual connectors and Automated connectors",
          "Streaming connectors and Batch connectors",
          "Standard connectors and Managed connectors",
          "Bronze connectors and Silver connectors"
        ],
        correct_answer: "Standard connectors and Managed connectors",
        explanation: "Standard connectors read from cloud file storage (S3, ADLS, GCS). Managed connectors integrate with enterprise systems (Salesforce, Oracle, SAP, SaaS) using fully managed, zero-code ingestion."
      },
      {
        id: "lakeflow_3",
        question_text: "Which three ingestion methods are common in Lakeflow Connect Standard Connectors?",
        question_type: "multiple_choice",
        options: [
          "MERGE INTO, DLT, COPY INTO",
          "CTAS, COPY INTO, Auto Loader",
          "Spark Streaming, DLT, Snowpipe",
          "Unity Catalog, MLflow, Auto Loader"
        ],
        correct_answer: "CTAS, COPY INTO, Auto Loader",
        explanation: "These are the three fundamental ingestion techniques used for initial loads (CTAS), incremental batch loads (COPY INTO), and continuous streaming ingestion (Auto Loader)."
      },
      {
        id: "lakeflow_4",
        question_text: "What is the primary goal of the Medallion Architecture?",
        question_type: "multiple_choice",
        options: [
          "Reduce cluster usage",
          "Organize data into structured quality layers",
          "Optimize SQL query cost",
          "Replace data warehouses"
        ],
        correct_answer: "Organize data into structured quality layers",
        explanation: "The Bronze → Silver → Gold layering improves quality, reliability, lineage, and reusability across analytics and ML workloads."
      },
      {
        id: "lakeflow_5",
        question_text: "What is the purpose of metadata columns added during ingestion?",
        question_type: "multiple_choice",
        options: [
          "Improve write throughput",
          "Track ingestion time and file lineage",
          "Reduce storage cost",
          "Partition the data automatically"
        ],
        correct_answer: "Track ingestion time and file lineage",
        explanation: "Metadata such as _ingestion_timestamp and _source_file enables auditing, troubleshooting, and governance across ingestion pipelines."
      },
      {
        id: "lakeflow_6",
        question_text: "What is the rescued data column used for?",
        question_type: "multiple_choice",
        options: [
          "Storing deleted records",
          "Capturing malformed or schema-mismatched records",
          "Tracking cluster crash logs",
          "Holding checkpoint data"
        ],
        correct_answer: "Capturing malformed or schema-mismatched records",
        explanation: "When a record doesn’t fit the schema, it is stored in the _rescued_data column rather than being dropped, preserving data integrity and supporting schema evolution."
      },
      {
        id: "lakeflow_7",
        question_text: "How does Auto Loader differ from COPY INTO?",
        question_type: "multiple_choice",
        options: [
          "Auto Loader is only for batch workloads",
          "COPY INTO supports schema evolution",
          "Auto Loader supports continuous ingestion with automatic file discovery",
          "COPY INTO uses serverless compute only"
        ],
        correct_answer: "Auto Loader supports continuous ingestion with automatic file discovery",
        explanation: "Auto Loader scales to millions of files, handles schema drift automatically, and is ideal for streaming or continuous ingestion. COPY INTO is best for incremental batch ingestion."
      },
      {
        id: "lakeflow_8",
        question_text: "What is a major benefit of using Managed Connectors for enterprise ingestion?",
        question_type: "multiple_choice",
        options: [
          "They eliminate the need for Unity Catalog",
          "They provide zero-code connection to systems like SAP, Salesforce, Oracle",
          "They run only on classic compute",
          "They bypass security controls for faster performance"
        ],
        correct_answer: "They provide zero-code connection to systems like SAP, Salesforce, Oracle",
        explanation: "Managed Connectors provide built-in reliability, schema management, error handling, credential management, and external system integration with no coding required."
      },
      {
        id: "lakeflow_9",
        question_text: "When should you use the Delta Lake MERGE INTO command?",
        question_type: "multiple_choice",
        options: [
          "When performing streaming ingestion from cloud storage",
          "When needing to synchronize or upsert data",
          "For schema evolution",
          "For bulk initial table creation"
        ],
        correct_answer: "When needing to synchronize or upsert data",
        explanation: "MERGE INTO is used for change data capture (CDC), Slowly Changing Dimensions (SCD), and upserting new or updated records into Delta tables."
      },
      {
        id: "lakeflow_10",
        question_text: "What is the Databricks Marketplace used for?",
        question_type: "multiple_choice",
        options: [
          "Deploying clusters and jobs",
          "Sharing notebooks with other users",
          "Subscribing to external datasets and applications",
          "Running ML models directly on partner platforms"
        ],
        correct_answer: "Subscribing to external datasets and applications",
        explanation: "The Marketplace provides third-party and open datasets that can be directly integrated into the Lakehouse, accelerating analytics and reducing ingestion overhead."
      }
    ]
  },
  {
    name: "Deploy workloads with Lakeflow Jobs",
    questions: [
      {
        id: "lakejob_1",
        question_text: "What is the main purpose of a Lakeflow Job in Databricks?",
        question_type: "multiple_choice",
        options: [
          "Storing raw data in Unity Catalog",
          "Orchestrating and automating end-to-end data and AI workflows",
          "Managing user permissions and access control",
          "Replacing all notebooks with SQL-only pipelines"
        ],
        correct_answer: "Orchestrating and automating end-to-end data and AI workflows",
        explanation: "A Lakeflow Job coordinates multiple tasks (notebooks, SQL, scripts, pipelines) and runs them in the right order on a schedule or trigger to implement full pipelines."
      },
      {
        id: "lakejob_2",
        question_text: "In a Lakeflow Job, what is a task?",
        question_type: "multiple_choice",
        options: [
          "A full application deployed on a cluster",
          "A single step in the workflow, such as running a notebook or SQL query",
          "A separate Databricks workspace",
          "A Delta table with metadata"
        ],
        correct_answer: "A single step in the workflow, such as running a notebook or SQL query",
        explanation: "Tasks represent individual units of work inside a job, for example ingest, transform, validate, or publish, and are connected to form the job’s DAG."
      },
      {
        id: "lakejob_3",
        question_text: "Which compute type is best suited for ad-hoc analysis and development, not for cost-efficient production jobs?",
        question_type: "multiple_choice",
        options: [
          "Job clusters",
          "Serverless",
          "Interactive (all-purpose) clusters",
          "SQL Warehouse"
        ],
        correct_answer: "Interactive (all-purpose) clusters",
        explanation: "Interactive clusters are shared and ideal for exploration and development, but keeping them running continuously is usually not cost-efficient for production workloads."
      },
      {
        id: "lakejob_4",
        question_text: "Why are job clusters often preferred over interactive clusters for production Lakeflow Jobs?",
        question_type: "multiple_choice",
        options: [
          "They support only SQL workloads",
          "They automatically terminate when the job finishes",
          "They cannot scale automatically",
          "They are required for Unity Catalog access"
        ],
        correct_answer: "They automatically terminate when the job finishes",
        explanation: "Job clusters are created for a specific run and shut down afterwards, which reduces idle time and typically lowers compute cost for production pipelines."
      },
      {
        id: "lakejob_5",
        question_text: "What is a key benefit of using serverless compute for Lakeflow Jobs?",
        question_type: "multiple_choice",
        options: [
          "Manual cluster sizing and capacity planning",
          "No support for autoscaling",
          "Fully managed infrastructure with faster startup and lower operational overhead",
          "It disables monitoring to save costs"
        ],
        correct_answer: "Fully managed infrastructure with faster startup and lower operational overhead",
        explanation: "Serverless lets Databricks manage the infrastructure, providing quick startup, autoscaling, and simplified operations, which can reduce total cost of ownership."
      },
      {
        id: "lakejob_6",
        question_text: "What is a key characteristic of SQL Warehouse as a compute option in Databricks?",
        question_type: "multiple_choice",
        options: [
          "It only runs Python code",
          "It is optimized for high-concurrency SQL and BI workloads",
          "It cannot be used by Lakeflow Jobs",
          "It does not support autoscaling"
        ],
        correct_answer: "It is optimized for high-concurrency SQL and BI workloads",
        explanation: "SQL Warehouses are purpose-built for SQL queries, dashboards, and BI, offering concurrency, autoscaling, and features like intelligent workload management."
      },
      {
        id: "lakejob_7",
        question_text: "What is the main difference between a schedule and a trigger in Lakeflow Jobs?",
        question_type: "multiple_choice",
        options: [
          "Schedules are manual; triggers are automatic",
          "Schedules are time-based; triggers can be time- or event-based",
          "Schedules only apply to development jobs",
          "Triggers can only be used with SQL tasks"
        ],
        correct_answer: "Schedules are time-based; triggers can be time- or event-based",
        explanation: "Schedules run jobs at specific times, while triggers can fire based on time or data events, such as table updates or new files."
      },
      {
        id: "lakejob_8",
        question_text: "Which scenario is best suited for a table-update trigger in Lakeflow Jobs?",
        question_type: "multiple_choice",
        options: [
          "Running a job every Monday at 8 AM",
          "Running a job whenever any cluster becomes idle",
          "Running a job as soon as upstream Delta tables receive new data",
          "Running a job when a user opens a notebook"
        ],
        correct_answer: "Running a job as soon as upstream Delta tables receive new data",
        explanation: "Table-update triggers fire when Unity Catalog tables change, ideal for reactive pipelines that must process data immediately after it lands."
      },
      {
        id: "lakejob_9",
        question_text: "Which configuration option helps make a Lakeflow Job more resilient to transient failures?",
        question_type: "multiple_choice",
        options: [
          "Using only interactive clusters",
          "Setting retries and retry intervals on tasks",
          "Disabling all error handling",
          "Removing dependencies between tasks"
        ],
        correct_answer: "Setting retries and retry intervals on tasks",
        explanation: "Configuring retries and delays allows tasks to recover from temporary issues such as brief network or service interruptions."
      },
      {
        id: "lakejob_10",
        question_text: "In a Lakeflow Job, how are dependencies between tasks typically represented and managed?",
        question_type: "multiple_choice",
        options: [
          "As SQL foreign-key constraints",
          "As a directed acyclic graph (DAG) showing which tasks run after others",
          "As a single linear execution list with no branching",
          "As cluster tags in the workspace"
        ],
        correct_answer: "As a directed acyclic graph (DAG) showing which tasks run after others",
        explanation: "Lakeflow Jobs visualize task dependencies as a DAG, letting you define branches, order, and conditions that control how the workflow executes."
      }
    ]
  },
  {
    name: "Fun / Icebreaker Questions (Extra)",
    questions: [
      {
        id: "fun_9",
        question_text: "What's your favorite season?",
        question_type: "multiple_choice",
        options: ["Spring", "Summer", "Fall", "Winter"]
      },
      {
        id: "fun_10",
        question_text: "Describe your mood right now in 3 words",
        question_type: "word_cloud",
        options: []
      },
      {
        id: "fun_11",
        question_text: "Dogs or cats?",
        question_type: "multiple_choice",
        options: ["Dogs!", "Cats!", "Both!", "Neither"]
      },
      {
        id: "fun_12",
        question_text: "What's your favorite movie genre?",
        question_type: "multiple_choice",
        options: ["Action", "Comedy", "Drama", "Sci-Fi"]
      }
    ]
  },
  {
    name: "Technical Background",
    questions: [
      {
        id: "tech_1",
        question_text: "How would you rate your Python knowledge? (0 = beginner, 10 = expert)",
        question_type: "number_scale",
        options: []
      },
      {
        id: "tech_2",
        question_text: "How many Databricks courses have you completed?",
        question_type: "multiple_choice",
        options: ["None", "1-2 courses", "3-5 courses", "More than 5"]
      },
      {
        id: "tech_3",
        question_text: "What Databricks courses have you already created or participated in? (Please share details)",
        question_type: "word_cloud",
        options: []
      },
      {
        id: "tech_4",
        question_text: "What is your goal in this course? (Please describe)",
        question_type: "word_cloud",
        options: []
      },
      {
        id: "tech_5",
        question_text: "Why did you choose to take this course? (Please share your motivation)",
        question_type: "word_cloud",
        options: []
      },
      {
        id: "tech_6",
        question_text: "How would you rate your Spark knowledge? (0 = beginner, 10 = expert)",
        question_type: "number_scale",
        options: []
      },
      {
        id: "tech_7",
        question_text: "What is your experience with data engineering? (0 = no experience, 10 = very experienced)",
        question_type: "number_scale",
        options: []
      }
    ]
  },
  {
    name: "Knowledge Check",
    questions: [
      {
        id: "know_1",
        question_text: "What is lazy evaluation in Spark?",
        question_type: "multiple_choice",
        options: [
          "Spark executes transformations immediately",
          "Spark delays execution until an action is called",
          "Spark evaluates only half of the data",
          "Spark skips unnecessary computations randomly"
        ],
        correct_answer: "Spark delays execution until an action is called",
        explanation: "Lazy evaluation means Spark doesn't execute transformations immediately. Instead, it builds a DAG (Directed Acyclic Graph) of operations and only executes them when an action (like collect(), count(), or save()) is called. This allows Spark to optimize the execution plan."
      },
      {
        id: "know_2",
        question_text: "What are the main components of Apache Spark? (Select the correct ones)",
        question_type: "multiple_choice",
        options: [
          "Spark Core, Spark SQL, Spark Streaming, MLlib, GraphX",
          "Spark Core, Hadoop, Hive, Kafka",
          "Driver, Executor, Cluster Manager only",
          "RDD, DataFrame, Dataset only"
        ],
        correct_answer: "Spark Core, Spark SQL, Spark Streaming, MLlib, GraphX",
        explanation: "The main components of Spark are: Spark Core (foundation), Spark SQL (structured data), Spark Streaming (real-time processing), MLlib (machine learning), and GraphX (graph processing). Driver, Executor, and Cluster Manager are architectural components, not main modules."
      },
      {
        id: "know_3",
        question_text: "What is the Medallion Architecture in data engineering?",
        question_type: "multiple_choice",
        options: [
          "A three-tier architecture with Bronze, Silver, and Gold layers",
          "A security framework for data protection",
          "A type of database indexing strategy",
          "A machine learning model deployment pattern"
        ],
        correct_answer: "A three-tier architecture with Bronze, Silver, and Gold layers",
        explanation: "The Medallion Architecture is a data design pattern used to organize data in a lakehouse. It consists of three layers: Bronze (raw data), Silver (cleaned and validated data), and Gold (business-level aggregated data ready for analytics)."
      },
      {
        id: "know_4",
        question_text: "What is the Bronze layer in the Medallion Architecture?",
        question_type: "multiple_choice",
        options: [
          "Contains raw, unprocessed data ingested from sources",
          "Contains cleaned and validated data",
          "Contains aggregated data ready for business use",
          "Contains archived historical data"
        ],
        correct_answer: "Contains raw, unprocessed data ingested from sources",
        explanation: "The Bronze layer stores raw data exactly as it was ingested from source systems. No transformations are applied - it's a complete, unaltered history of all data. This enables data recovery and reprocessing if needed."
      },
      {
        id: "know_5",
        question_text: "What is the Silver layer in the Medallion Architecture?",
        question_type: "multiple_choice",
        options: [
          "Contains raw data from sources",
          "Contains cleaned, validated, and enriched data",
          "Contains business-level aggregated data",
          "Contains machine learning models"
        ],
        correct_answer: "Contains cleaned, validated, and enriched data",
        explanation: "The Silver layer contains data that has been cleaned, validated, deduplicated, and enriched. Data quality checks are applied, and the data is structured for efficient querying. It serves as the foundation for downstream analytics."
      },
      {
        id: "know_6",
        question_text: "What is the Gold layer in the Medallion Architecture?",
        question_type: "multiple_choice",
        options: [
          "Contains raw historical data",
          "Contains cleaned operational data",
          "Contains business-level aggregated data optimized for analytics and reporting",
          "Contains backup copies of all data"
        ],
        correct_answer: "Contains business-level aggregated data optimized for analytics and reporting",
        explanation: "The Gold layer contains highly refined, aggregated data that is optimized for specific business use cases, dashboards, and reports. It's designed for end-user consumption and provides the fastest query performance."
      },
      {
        id: "know_7",
        question_text: "What is an RDD in Spark?",
        question_type: "multiple_choice",
        options: [
          "Resilient Distributed Dataset - the fundamental data structure in Spark",
          "Rapid Data Distribution - a data transfer protocol",
          "Remote Database Driver - a connection interface",
          "Real-time Data Delivery - a streaming component"
        ],
        correct_answer: "Resilient Distributed Dataset - the fundamental data structure in Spark",
        explanation: "RDD (Resilient Distributed Dataset) is Spark's core abstraction - an immutable, distributed collection of objects that can be processed in parallel. RDDs are fault-tolerant and can be recreated if a partition is lost."
      },
      {
        id: "know_8",
        question_text: "What is the difference between a transformation and an action in Spark?",
        question_type: "multiple_choice",
        options: [
          "Transformations are lazy and return RDDs, actions trigger execution and return values",
          "Transformations modify data, actions read data",
          "Transformations are fast, actions are slow",
          "There is no difference"
        ],
        correct_answer: "Transformations are lazy and return RDDs, actions trigger execution and return values",
        explanation: "Transformations (like map, filter, join) are lazy operations that return new RDDs without immediate execution. Actions (like count, collect, save) trigger the actual computation and return results to the driver or write to storage."
      },
      {
        id: "know_9",
        question_text: "What is a DataFrame in Spark?",
        question_type: "multiple_choice",
        options: [
          "A distributed collection of data organized into named columns",
          "A local pandas DataFrame",
          "A visualization tool",
          "A file format for storing data"
        ],
        correct_answer: "A distributed collection of data organized into named columns",
        explanation: "A DataFrame is a distributed collection of data organized into named columns, similar to a table in a relational database. It provides a higher-level API than RDDs and enables optimizations through Spark's Catalyst optimizer."
      },
      {
        id: "know_10",
        question_text: "What is partitioning in Spark?",
        question_type: "multiple_choice",
        options: [
          "Dividing data into smaller chunks that can be processed in parallel across nodes",
          "Creating backup copies of data",
          "Sorting data alphabetically",
          "Encrypting sensitive data"
        ],
        correct_answer: "Dividing data into smaller chunks that can be processed in parallel across nodes",
        explanation: "Partitioning divides data into logical chunks (partitions) that can be processed independently and in parallel across different nodes in a cluster. Proper partitioning is crucial for performance optimization."
      },
      {
        id: "know_11",
        question_text: "What is the purpose of the Spark Driver?",
        question_type: "multiple_choice",
        options: [
          "Coordinates the execution of Spark applications and manages executors",
          "Stores all the data being processed",
          "Performs all the actual computations",
          "Provides a user interface for Spark"
        ],
        correct_answer: "Coordinates the execution of Spark applications and manages executors",
        explanation: "The Spark Driver runs the main() function of the application, creates SparkContext, divides tasks, schedules them on executors, and coordinates their execution. It's the brain of the Spark application."
      },
      {
        id: "know_12",
        question_text: "What is caching in Spark?",
        question_type: "multiple_choice",
        options: [
          "Storing intermediate results in memory to avoid recomputation",
          "Saving data permanently to disk",
          "Compressing data to save space",
          "Removing duplicate records"
        ],
        correct_answer: "Storing intermediate results in memory to avoid recomputation",
        explanation: "Caching (or persistence) stores RDDs or DataFrames in memory across operations. When you reuse the same dataset multiple times, caching prevents Spark from recomputing it each time, significantly improving performance."
      },
      {
        id: "know_13",
        question_text: "What is a shuffle operation in Spark?",
        question_type: "multiple_choice",
        options: [
          "Redistributing data across partitions, often expensive",
          "Randomly sorting data",
          "Removing duplicates from datasets",
          "Converting data types"
        ],
        correct_answer: "Redistributing data across partitions, often expensive",
        explanation: "A shuffle is the process of redistributing data across partitions, required for operations like groupBy, join, and reduceByKey. Shuffles involve disk I/O, data serialization, and network I/O, making them expensive operations to avoid when possible."
      },
      {
        id: "know_14",
        question_text: "What is Apache Spark's Catalyst optimizer?",
        question_type: "multiple_choice",
        options: [
          "A query optimization engine that optimizes DataFrame and SQL operations",
          "A compression algorithm",
          "A machine learning model",
          "A data visualization tool"
        ],
        correct_answer: "A query optimization engine that optimizes DataFrame and SQL operations",
        explanation: "Catalyst is Spark's query optimizer that optimizes logical and physical execution plans for DataFrames and SQL queries. It applies rule-based and cost-based optimizations to generate efficient execution plans."
      },
      {
        id: "know_15",
        question_text: "What is broadcast join in Spark?",
        question_type: "multiple_choice",
        options: [
          "Sending a small table to all worker nodes to avoid shuffle during join",
          "Joining tables over a network broadcast",
          "A type of outer join operation",
          "Broadcasting results to multiple outputs"
        ],
        correct_answer: "Sending a small table to all worker nodes to avoid shuffle during join",
        explanation: "A broadcast join copies a small DataFrame to all worker nodes, allowing joins to happen locally without shuffling the large dataset. This is extremely efficient when joining a large table with a small lookup table."
      },
      {
        id: "know_16",
        question_text: "What is the purpose of window functions in Spark SQL?",
        question_type: "multiple_choice",
        options: [
          "Perform calculations across a set of rows related to the current row",
          "Create graphical windows for visualization",
          "Filter data based on time windows",
          "Partition data into fixed-size windows"
        ],
        correct_answer: "Perform calculations across a set of rows related to the current row",
        explanation: "Window functions operate on a group of rows (a window) and return a value for each row based on the group. Examples include running totals, moving averages, and ranking functions (ROW_NUMBER, RANK, DENSE_RANK)."
      },
      {
        id: "know_17",
        question_text: "What is Delta Lake?",
        question_type: "multiple_choice",
        options: [
          "An open-source storage layer that brings ACID transactions to data lakes",
          "A type of database",
          "A machine learning framework",
          "A data visualization tool"
        ],
        correct_answer: "An open-source storage layer that brings ACID transactions to data lakes",
        explanation: "Delta Lake is an open-source storage layer built on Parquet that provides ACID transactions, scalable metadata handling, time travel, and schema enforcement for data lakes. It's the foundation of the Lakehouse architecture."
      }
    ]
  },
  {
    name: "LakeFlow Spark Declarative Pipelines",
    questions: [
      {
        id: "sparkdecl_1",
        question_text: "What is a Spark declarative pipeline?",
        question_type: "multiple_choice",
        options: [
          "A pipeline defined by explicit step-by-step instructions",
          "A pipeline defined by describing desired outcomes and transformations",
          "A pipeline that only uses SQL",
          "A pipeline for streaming data only"
        ],
        correct_answer: "A pipeline defined by describing desired outcomes and transformations",
        explanation: "Declarative pipelines focus on what should be done, not how, allowing Spark to optimize execution."
      },
      {
        id: "sparkdecl_2",
        question_text: "Which language(s) can be used to define Spark declarative pipelines in Databricks?",
        question_type: "multiple_choice",
        options: [
          "Only Python",
          "Only SQL",
          "Python, SQL, and Scala",
          "Only Scala"
        ],
        correct_answer: "Python, SQL, and Scala",
        explanation: "Spark supports declarative pipeline definitions in Python, SQL, and Scala."
      },
      {
        id: "sparkdecl_3",
        question_text: "What is the main benefit of using declarative pipelines over imperative ones?",
        question_type: "multiple_choice",
        options: [
          "More control over execution details",
          "Easier optimization and maintenance",
          "Requires more code",
          "Only works for batch jobs"
        ],
        correct_answer: "Easier optimization and maintenance",
        explanation: "Declarative pipelines allow Spark to optimize execution plans and simplify code maintenance."
      },
      {
        id: "sparkdecl_4",
        question_text: "Which Spark component is most associated with declarative pipeline development?",
        question_type: "multiple_choice",
        options: [
          "RDDs",
          "DataFrames and SQL",
          "MLlib",
          "GraphX"
        ],
        correct_answer: "DataFrames and SQL",
        explanation: "DataFrames and SQL APIs are designed for declarative data processing."
      },
      {
        id: "sparkdecl_5",
        question_text: "What is a transformation in a Spark declarative pipeline?",
        question_type: "multiple_choice",
        options: [
          "An operation that triggers computation",
          "An operation that defines how data is changed",
          "An operation that saves data to disk",
          "An operation that creates a cluster"
        ],
        correct_answer: "An operation that defines how data is changed",
        explanation: "Transformations describe how data should be processed, but do not trigger execution."
      },
      {
        id: "sparkdecl_6",
        question_text: "How does Spark optimize declarative pipelines?",
        question_type: "multiple_choice",
        options: [
          "By running all steps in sequence",
          "By using the Catalyst optimizer to generate efficient execution plans",
          "By skipping transformations",
          "By using only one node"
        ],
        correct_answer: "By using the Catalyst optimizer to generate efficient execution plans",
        explanation: "The Catalyst optimizer analyzes and optimizes declarative queries for performance."
      },
      {
        id: "sparkdecl_7",
        question_text: "What is a common action in Spark pipelines?",
        question_type: "multiple_choice",
        options: [
          "map()",
          "filter()",
          "collect()",
          "select()"
        ],
        correct_answer: "collect()",
        explanation: "Actions like collect() trigger the execution of the pipeline and return results."
      },
      {
        id: "sparkdecl_8",
        question_text: "Which of the following is true about lazy evaluation in Spark declarative pipelines?",
        question_type: "multiple_choice",
        options: [
          "Transformations are executed immediately",
          "Actions are executed immediately",
          "Transformations are only executed when an action is called",
          "All operations are executed at once"
        ],
        correct_answer: "Transformations are only executed when an action is called",
        explanation: "Spark builds a logical plan and only executes it when an action is triggered."
      },
      {
        id: "sparkdecl_9",
        question_text: "What is the role of schema enforcement in Spark declarative pipelines?",
        question_type: "multiple_choice",
        options: [
          "It slows down processing",
          "It ensures data consistency and quality",
          "It is only used for streaming data",
          "It is optional for all pipelines"
        ],
        correct_answer: "It ensures data consistency and quality",
        explanation: "Schema enforcement helps maintain data integrity throughout the pipeline."
      },
      {
        id: "sparkdecl_10",
        question_text: "Which Databricks feature helps visualize and monitor Spark declarative pipelines?",
        question_type: "multiple_choice",
        options: [
          "Unity Catalog",
          "Jobs UI",
          "MLflow",
          "Delta Lake"
        ],
        correct_answer: "Jobs UI",
        explanation: "The Jobs UI provides visualization, monitoring, and management for pipeline runs."
      }
    ]
  }
];