"use client";

import { Card, CardBody, Image } from "@nextui-org/react";

interface TestHeaderProps {
  quizTitle: string;
  subject: string;
  questions: any[];
  showStudentFields?: boolean;
  totalTime?: string;
}

export default function TestHeader({
  quizTitle,
  subject,
  questions,
  showStudentFields = true,
  totalTime = "1:30 hr.",
}: TestHeaderProps) {
  const totalMarks = questions.reduce(
    (total, question) => total + (question.marks || 0),
    0
  );
  const subjectName = getSubjectName(subject);

  return (
    <div className="mb-8">
      <div className="flex flex-col items-center mb-4">
        <div className="flex items-center gap-4 mb-2">
          <div className="w-16 h-16 relative">
            <Image
              src="/logo.png"
              alt="School Logo"
              className="object-contain"
              width={64}
              height={64}
            />
          </div>
          <h1 className="text-2xl font-bold uppercase">
            EMPOWER LEARNING SYSTEM
          </h1>
        </div>
        <h2 className="text-lg font-medium mb-2">
          {quizTitle || "Tri-Review Quiz (Jan-March 2025)"}
        </h2>
        <div className="flex justify-between w-full">
          <div>Subject: {subjectName || "Not Selected"}</div>
          <div>Time: {totalTime}</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <Card>
          <CardBody className="p-2">
            <div className="grid grid-cols-2">
              <div className="border-r border-b p-2 font-medium">
                Total Marks
              </div>
              <div className="border-b p-2">{totalMarks || 0}</div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="p-2">
            <div className="grid grid-cols-2">
              <div className="border-r border-b p-2 font-medium">
                Obtained Marks
              </div>
              <div className="border-b p-2"></div>
            </div>
          </CardBody>
        </Card>
      </div>

      {showStudentFields && (
        <div className="space-y-3 mb-4">
          <div>
            <div className="font-medium">Name:</div>
            <div className="border-b border-gray-300 mt-1"></div>
          </div>
          <div>
            <div className="font-medium">Father's name:</div>
            <div className="border-b border-gray-300 mt-1"></div>
          </div>
          <div>
            <div className="font-medium">Class: Level-1</div>
            <div className="border-b border-gray-300 mt-1"></div>
          </div>
          <div>
            <div className="font-medium">Campus:</div>
            <div className="border-b border-gray-300 mt-1"></div>
          </div>
          <div>
            <div className="font-medium">Day & Date:</div>
            <div className="border-b border-gray-300 mt-1"></div>
          </div>
          <div>
            <div className="font-medium">For office use only</div>
            <div className="mt-2">
              <div className="font-medium">
                Checked by:{" "}
                <span className="border-b border-gray-300 inline-block w-64"></span>
              </div>
            </div>
            <div className="mt-2">
              <div className="font-medium">
                Rechecked by:{" "}
                <span className="border-b border-gray-300 inline-block w-64"></span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="border-t border-gray-300 my-4"></div>

      <div className="space-y-4">
        <div>
          <h3 className="font-bold uppercase">Instructions</h3>
          <ul className="list-disc pl-6 mt-2 text-sm">
            <li>Answer all questions.</li>
            <li>Use a black or dark blue pen.</li>
            <li>
              Write your name, centre number and candidate number in the boxes
              at the top of the page.
            </li>
            <li>Write your answer to each question in the space provided.</li>
            <li>Do not use an erasable pen or correction fluid.</li>
            <li>Do not write on any bar codes.</li>
            <li>
              You may use an HB pencil for any diagrams, graphs or rough
              working.
            </li>
            <li>
              You must complete the quiz and turn it in within the allotted
              time.
            </li>
            <li>
              Read each question carefully before answering to ensure you
              understand what is being asked.
            </li>
            <li>
              Misinterpreted questions due to rushing may lead to incorrect
              answers.
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold uppercase">Information</h3>
          <ul className="list-disc pl-6 mt-2 text-sm">
            <li>The total mark for this paper is {totalMarks || 50}.</li>
            <li>
              The number of marks for each question or part question is shown in
              brackets [ ].
            </li>
            <li>
              Once the quiz begins, you must finish and submit it no later than
              the given deadline.
            </li>
            <li>If you finish early, review your answers before submitting.</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold uppercase">Final Reminder:</h3>
          <ul className="list-disc pl-6 mt-2 text-sm">
            <li>
              Stay focused, watch the time, and ensure your quiz is submitted
              before time runs out.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function getSubjectName(subjectCode: string): string {
  const subjects: Record<string, string> = {
    math: "Mathematics",
    physics: "Physics",
    chemistry: "Chemistry",
    biology: "Biology",
    english: "English",
    history: "History",
    geography: "Geography",
    cs: "Computer Science",
  };

  return subjects[subjectCode] || "";
}
