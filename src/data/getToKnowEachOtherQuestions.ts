import { PredefinedQuestion } from "./predefinedQuestions";

export const getToKnowQuestions: PredefinedQuestion[] = [
  {
    id: "gk_1",
    question_text: "Where are you joining from?",
    question_type: "word_cloud",
    options: []
  },
  {
    id: "gk_2",
    question_text: "What is your current job title?",
    question_type: "multiple_choice",
    options: ["Data Engineer", "Data Scientist", "Data Analyst", "Machine Learning Engineer", "Software Engineer", "Manager/Lead", "Student", "Other"]
  },
  {
    id: "gk_3",
    question_text: "Which field do you work in?",
    question_type: "multiple_choice",
    options: ["Finance", "Telco", "Healthcare", "Manufacturing", "Retail", "Technology", "Other"]
  },
  {
    id: "gk_4",
    question_text: "How many Databricks courses have you attended before?",
    question_type: "multiple_choice",
    options: ["None", "1-2", "3-5", "More than 5"]
  },
  {
    id: "db_2",
    question_text: "How much time have you spent in the Databricks Workspace?",
    question_type: "multiple_choice",
    options: ["None yet", "A few hours", "A few days", "Months", "Years"]
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
    question_type: "multiple_choice",
    options: ["Learn Databricks basics", "Prepare for certification", "Learn advanced data engineering", "Explore ML capabilities", "Get hands-on experience", "Other"]
  },
  {
    id: "gk_7",
    question_text: "How familiar are you with cloud platforms? (e.g., AWS, Azure, GCP)",
    question_type: "multiple_choice",
    options: ["Not familiar", "Somewhat familiar", "Very familiar"]
  },
  {
    id: "gk_9",
    question_text: "Have you previously worked with big data tools?",
    question_type: "multiple_choice",
    options: ["Yes", "No"]
  },



  // Databricks Experience Questions
  {
    id: "db_1",
    question_text: "How much overall experience do you have with Databricks?",
    question_type: "multiple_choice",
    options: ["Complete beginner", "Novice (played around)", "Intermediate (regular use)", "Advanced (production pipelines)"]
  },
  {
    id: "db_3",
    question_text: "How many Databricks Jobs/Workflows have you created?",
    question_type: "multiple_choice",
    options: ["0", "1-5", "6-20", "More than 20"]
  },
  {
    id: "db_4",
    question_text: "Have you ever created a compute cluster in Databricks?",
    question_type: "multiple_choice",
    options: ["Yes, many times", "Yes, a few times", "No, someone else does it", "No, never"]
  },
  // Technical Background Questions
  {
    id: "tech_1",
    question_text: "Which programming languages do you use most often?",
    question_type: "multiple_choice",
    options: ["Python", "SQL", "Scala", "R", "Java", "Other"]
  },
  {
    id: "tech_2",
    question_text: "How would you rate your Python skills?",
    question_type: "multiple_choice",
    options: ["Beginner", "Intermediate", "Advanced", "I don't use Python"]
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
    question_text: "Which data engineering tools are you most familiar with?",
    question_type: "multiple_choice",
    options: ["Apache Spark", "dbt", "Airflow", "Kafka", "Snowflake", "Other", "None"]
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
    question_text: "Are you familiar with machine learning frameworks?",
    question_type: "multiple_choice",
    options: ["Yes (Scikit-Learn, PyTorch, etc.)", "Yes (MLflow)", "No, but want to learn", "No"]
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
];