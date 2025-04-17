import Image from "next/image";

interface QuizHeaderProps {
  title: string;
  subject: string;
  time: string;
  totalMarks: number;
  level: string;
}

export default function QuizHeader({
  title,
  subject,
  time,
  totalMarks,
  level,
}: QuizHeaderProps) {
  return (
    <div className="border-b-2 border-gray-300 pb-4 mb-6">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 relative">
            <Image
              src="/logo.png"
              alt="Empower Learning System"
              width={64}
              height={64}
              className="object-contain"
            />
          </div>
          <div>
            <h1 className="text-xl font-bold">EMPOWER LEARNING SYSTEM</h1>
            <p className="text-md">{title}</p>
          </div>
        </div>
        <div className="text-right">
          <p>
            <strong>Time:</strong> {time} hr.
          </p>
        </div>
      </div>

      <div className="flex justify-between mb-4">
        <p>
          <strong>Subject:</strong> {subject}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="border border-black">
          <div className="grid grid-cols-2">
            <div className="border-r border-b border-black p-1">
              <p>Total Marks</p>
            </div>
            <div className="border-b border-black p-1">
              <p>{totalMarks}</p>
            </div>
          </div>
        </div>

        <div className="border border-black">
          <div className="grid grid-cols-2">
            <div className="border-r border-b border-black p-1">
              <p>Obtained Marks</p>
            </div>
            <div className="border-b border-black p-1">
              <p></p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <div>
          <p className="font-medium">Name:</p>
          <div className="border-b border-black h-6"></div>
        </div>

        <div>
          <p className="font-medium">Father's name:</p>
          <div className="border-b border-black h-6"></div>
        </div>

        <div>
          <p className="font-medium">Class: {level}</p>
          <div className="border-b border-black h-6"></div>
        </div>

        <div>
          <p className="font-medium">Campus:</p>
          <div className="border-b border-black h-6"></div>
        </div>

        <div>
          <p className="font-medium">Day & Date:</p>
          <div className="border-b border-black h-6"></div>
        </div>

        <div>
          <p className="font-medium">For office use only</p>
          <div className="mt-2">
            <p className="font-medium">
              Checked by: _______________________________
            </p>
          </div>
          <div className="mt-2">
            <p className="font-medium">
              Rechecked by: _______________________________
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="font-bold uppercase">Instructions</h2>
        <ul className="list-disc pl-6 mt-2">
          <li>Answer all questions.</li>
          <li>Use a black or dark blue pen.</li>
          <li>
            Write your name, centre number and candidate number in the boxes at
            the top of the page.
          </li>
          <li>Write your answer to each question in the space provided.</li>
          <li>Do not use an erasable pen or correction fluid.</li>
          <li>Do not write on any bar codes.</li>
          <li>
            You may use an HB pencil for any diagrams, graphs or rough working.
          </li>
          <li>
            You must complete the quiz and turn it in within the allotted time.
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

        <h2 className="font-bold uppercase mt-4">Information</h2>
        <ul className="list-disc pl-6 mt-2">
          <li>The total mark for this paper is {totalMarks}.</li>
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

        <h2 className="font-bold uppercase mt-4">Final Reminder:</h2>
        <ul className="list-disc pl-6 mt-2">
          <li>
            Stay focused, watch the time, and ensure your quiz is submitted
            before time runs out.
          </li>
        </ul>
      </div>

      <div className="mt-4 text-center text-sm text-gray-500 uppercase">
        <p>
          {subject} {level}
        </p>
        <div className="flex justify-end">
          <p>1</p>
        </div>
      </div>
    </div>
  );
}
