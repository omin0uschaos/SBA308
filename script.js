// The provided course information.
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
  };
  
  // The provided assignment group.
  const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
      {
        id: 1,
        name: "Declare a Variable",
        due_at: "2023-01-25",
        points_possible: 50
      },
      {
        id: 2,
        name: "Write a Function",
        due_at: "2023-02-27",
        points_possible: 150
      },
      {
        id: 3,
        name: "Code the World",
        due_at: "3156-11-15",
        points_possible: 500
      }
    ]
  };
  
  // The provided learner submission data.
  const LearnerSubmissions = [
    {
      learner_id: 125,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-25",
        score: 47
      }
    },
    {
      learner_id: 125,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-02-12",
        score: 150
      }
    },
    {
      learner_id: 125,
      assignment_id: 3,
      submission: {
        submitted_at: "2023-01-25",
        score: 400
      }
    },
    {
      learner_id: 132,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-24",
        score: 39
      }
    },
    {
      learner_id: 132,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-03-07",
        score: 140
      }
    }
  ];

//----------------------------------MY ANSWER--------------------------------

function getLearnerData(course, ag, submissions) {
    // Check if course and assignment group match
    try {
        if(courseChecker(course, ag)){
        }   else{
            throw new Error(`Course Id does not match`);
        }
    } catch (error) {
        console.error(error);
    }
    
    try {
        for (const element of ag.assignments) {
            if (Number.isNaN(parseFloat(element.id))) {
                throw new Error(`Id is not a number!`);
            }
        }
    } catch (error) {
        console.error(error);
    }
    
    try {
        for (const element of ag.assignments) {
            if (Number.isNaN(parseFloat(element.points_possible))) {
                throw new Error(`Points possible is not a number!`);
            }
        }
    } catch (error) {
        console.error(error);
    }

    let result = [];
    let uniqueIds = uniqueId(submissions);
    let totalPoints = scoreTotal(ag);

    uniqueIds.forEach(learnerId => {
        let learnerData = {
            id: learnerId,
            avg: 0
        };
        let totalScore = 0;

        ag.assignments.map(assignment => {
            if (new Date(assignment.due_at) < new Date()) {
                let score = singleScoreAvg(submissions, learnerId, assignment.id, ag);
                learnerData[parseFloat(assignment.id)] = parseFloat(score.toFixed(3));
                totalScore += score * assignment.points_possible;
            }
        });

        learnerData.avg = totalPoints > 0 ? parseFloat((totalScore / totalPoints).toFixed(3)) : 0;
        result.push(learnerData);
    });

    return result;
}


function uniqueId(submissions){
    const learnerIds = [];

    submissions.forEach(element => {
        if(learnerIds.includes(element.learner_id)){
            //Do Nothing
        } else{
                learnerIds.push(element.learner_id);
        }

    });
    return learnerIds;
}

// function averageScore(scores, scoresTotal){
//     return scores / scoresTotal;
// }

function courseChecker(course, ag){
    if(course.id === ag.course_id){
        return true;
    } else{
        return false;
    }
}

function dateChecker(submission, assignment) {
    let submitted = new Date(submission.submitted_at);
    let due = new Date(assignment.due_at);
    let now = new Date();

    // Check if the due date is in the past
    if (due < now) {
        // Check if the submission is late
        return submitted > due ? "late" : "onTime";
    } else if(assignment.points_possible === 0 || due > now) {
        return "notDue"
    } 
}



const exampleSubmission = LearnerSubmissions[1].submission;
const exampleAssignment = AssignmentGroup.assignments[1];

// console.log(dateChecker(exampleSubmission, exampleAssignment)); 

// function scoreSum(submissions, targetLearnerId, assignments) {
//     let score = 0;

//     submissions.forEach(submission => {
//         if (submission.learner_id === targetLearnerId) {
//             const assignment = assignments.find(a => a.id === submission.assignment_id);

//             const status = dateChecker(submission, assignment);
            
//             switch(status) {
//                 case "onTime":
//                     score += submission.submission.score;
//                     break;
//                 case "late":
//                     let penalty = submission.submission.score * 0.10; 
//                     score += (submission.submission.score - penalty);
//                     break;
//                 // No action needed for "notDue"
//             }
//         }
//     });

//     return score;
// }

function scoreTotal(ag) {
    let total = 0;

    ag.assignments.forEach(element => {
        let dueDate = new Date(element.due_at);
        let now = new Date();
    if(dueDate < now){
        total += element.points_possible;
    }

    });

    return total;
}

function singleScoreAvg(submissions, learnerId, assignmentId, ag){
    let assignment = ag.assignments.find(a => a.id === assignmentId);
    if (!assignment) return 0; // Return 0 if assignment is not found

    let score = 0;
    let scoreTotal = assignment.points_possible;



    submissions.forEach(submission => {
        if (submission.learner_id === learnerId && submission.assignment_id === assignmentId) {
            const status = dateChecker(submission.submission, assignment);
            
            switch(status) {
                case "onTime":
                    score += submission.submission.score;
                    break;
                case "late":
                    let penalty = assignment.points_possible * 0.10;
                    score += Math.max(0, submission.submission.score - penalty);
                    break;
                // No action needed for "notDue"
            }
        }
    });

    return score / scoreTotal;
}

// const totalScore = scoreSum(LearnerSubmissions, 125, AssignmentGroup.assignments);
// console.log("Total Score:", totalScore);



//   function getLearnerData(course, ag, submissions) {
//     // here, we would process this data to achieve the desired result.
  
    // return result;
//   }
  
  const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
  
  console.log(result);
  

//   const result = [
//     {
//       id: 125,
//       avg: 0.985, // (47 + 150) / (50 + 150)
//       1: 0.94, // 47 / 50
//       2: 1.0 // 150 / 150
//     },
//     {
//       id: 132,
//       avg: 0.82, // (39 + 125) / (50 + 150)
//       1: 0.78, // 39 / 50
//       2: 0.833 // late: (140 - 15) / 150
//     }
//   ];