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
    let result = [];
    let uniqueidnum = uniqueId(submissions);
    let scoreTotal = scoreTotal(ag);
    let average;
    let isCorrectCourse = courseChecker(course, ag);
    uniqueidnum.map(element => {
        let score = scoreSum(submissions, element, ag);
        let avg = averageScore(score, scoreTotal);
        result.push({ element.id = element;
            element.avg = avg;
            element.
            

        
        });
    });

    return totalScore;
}
let uniqueidnum = uniqueId(LearnerSubmissions)
console.log(uniqueidnum);

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

function averageScore(scores, scoresTotal){
    return scores / scoresTotal;
}

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
    } else {
        // If the due date is not yet passed, return "notDue"
        return "notDue";
    }
}



const exampleSubmission = LearnerSubmissions[1].submission;
const exampleAssignment = AssignmentGroup.assignments[1];

// console.log(dateChecker(exampleSubmission, exampleAssignment)); 

function scoreSum(submissions, targetLearnerId, assignments) {
    let score = 0;

    submissions.forEach(submission => {
        if (submission.learner_id === targetLearnerId) {
            const assignment = assignments.find(a => a.id === submission.assignment_id);

            const status = dateChecker(submission, assignment);
            
            switch(status) {
                case "onTime":
                    score += submission.submission.score;
                    break;
                case "late":
                    let penalty = submission.submission.score * 0.10; 
                    score += (submission.submission.score - penalty);
                    break;
                // No action needed for "notDue"
            }
        }
    });

    return score;
}

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

function singleScoreAvg(submission, assignmentId, ag){
    let score = 0;
    let assignment = ag.assignments[assignmentId - 1]
    let scoreTotal = ag.assignments[assignmentId].points_possible;
        if (submission.learner_id === targetLearnerId && submission.assignment_id === assignmentId) {

            const status = dateChecker(submission, assignment);
            
            switch(status) {
                case "onTime":
                    score += submission.submission.score;
                    break;
                case "late":
                    let penalty = submission.submission.score * 0.10; 
                    score += (submission.submission.score - penalty);
                    break;
                // No action needed for "notDue"
            };
        };
        return averageScore(score, scoreTotal)
    }

// const totalScore = scoreSum(LearnerSubmissions, 125, AssignmentGroup.assignments);
// console.log("Total Score:", totalScore);



//   function getLearnerData(course, ag, submissions) {
//     // here, we would process this data to achieve the desired result.
  
    // return result;
//   }
  
//   const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
  
//   console.log(result);
  

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