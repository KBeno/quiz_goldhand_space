import { PredefinedQuestion } from "./predefinedQuestions";

export const knowledgeCheckQuestions: PredefinedQuestion[] = [
  {
    id: "know_1",
    question_text: "Am I wrong??",
    question_type: "multiple_choice",
    options: [
      "No",
      "Yes",
      ]
  },
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
  }
];
