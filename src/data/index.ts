import { devopsQuestions } from './devopsQuestions';
import { breakQuestions } from './breakQuestions';
import { getToKnowQuestions } from './getToKnowEachOtherQuestions';
import { funIcebreakerQuestions } from './funIcebreakerQuestions';
import { lakeflowConnectQuestions } from './lakeflowConnectQuestions';
import { lakeflowJobsQuestions } from './lakeflowJobsQuestions';
import { knowledgeCheckQuestions } from './knowledgeCheckQuestions';
import { sparkDeclarativeQuestions } from './sparkDeclarativeQuestions';
import { generalDatabricksQuestions } from './generalDatabricksQuestions';
import { feedbackQuestions } from './feedbackQuestions';

export const orderedCategories = [
    { key: 'getToKnowEachOtherQuestions', value: getToKnowQuestions },
    { key: 'breakQuestions', value: breakQuestions },
    { key: 'funIcebreakerQuestions', value: funIcebreakerQuestions },
    { key: 'generalDatabricksQuestions', value: generalDatabricksQuestions },
    { key: 'lakeflowConnectQuestions', value: lakeflowConnectQuestions },
    { key: 'lakeflowJobsQuestions', value: lakeflowJobsQuestions },
    { key: 'sparkDeclarativeQuestions', value: sparkDeclarativeQuestions },
    { key: 'devopsQuestions', value: devopsQuestions },
    { key: 'feedbackQuestions', value: feedbackQuestions },
];

export * from './devopsQuestions';
export * from './breakQuestions';
export * from './getToKnowEachOtherQuestions';
export * from './funIcebreakerQuestions';
export * from './lakeflowConnectQuestions';
export * from './lakeflowJobsQuestions';
export * from './knowledgeCheckQuestions';
export * from './sparkDeclarativeQuestions';
export * from './generalDatabricksQuestions';
export * from './feedbackQuestions';
