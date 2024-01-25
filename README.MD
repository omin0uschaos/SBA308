# Readme: SBA 308 - JavaScript Fundamentals Project

## Overview

This project is part of the "SBA 308: JavaScript Fundamentals" course, aimed at demonstrating a practical application of JavaScript concepts through a specific assignment. The task involves creating a script that processes provided data, handling various complexities such as data validation, error handling, and conditional logic.

## Description

The script `getLearnerData()` is designed to process three types of input data:

1. **CourseInfo**: Contains basic information about the course.
2. **AssignmentGroup**: Includes details about assignment groups related to the course.
3. **LearnerSubmissions**: An array of objects representing each learner's submissions.

The script's primary objective is to analyze and transform this data into an array of objects. Each object represents a learner's performance, including their ID, weighted average score, and individual scores on assignments.

## Key Functions and Features

- **Data Validation and Error Handling**: The script incorporates robust data validation and error handling to ensure the integrity of the input data. For instance, it checks for course and assignment group mismatches and handles unexpected data types.

- **Date and Score Processing**: It handles various complexities related to date comparisons and score calculations. For example, it checks whether an assignment is due and applies penalties for late submissions.

- **Dynamic Result Calculation**: The script dynamically calculates each learner's average scores based on the weighted importance of each assignment. It also handles edge cases like assignments not yet due or zero points possible.

## How It Works

1. **Matching Course and Assignment Group**: The script first verifies that the course ID in `CourseInfo` matches the course ID in `AssignmentGroup`. If not, it throws an error.

2. **Data Integrity Checks**: It performs checks to ensure that IDs and points possible in assignments are valid numbers.

3. **Calculation of Average Scores**: For each learner, the script calculates the average score across all assignments, considering the weight of each assignment and whether it's due. Late submissions incur a penalty.

4. **Result Formation**: The final output is an array where each object corresponds to a learner, detailing their ID, overall average score, and individual assignment scores.

## Usage

To use this script, provide the `CourseInfo`, `AssignmentGroup`, and `LearnerSubmissions` objects as inputs. The function `getLearnerData()` will process these inputs and return the formatted result.

```javascript
const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
console.log(result);
```
