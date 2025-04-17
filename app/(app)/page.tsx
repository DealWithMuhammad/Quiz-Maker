"use client";

import { useState } from "react";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { Toaster } from "sonner";
import { toast } from "sonner";
import { GripVertical, Plus, FileDown } from "lucide-react";
import QuestionCard from "@/components/Quiz/question-card";
import { generatePDF } from "@/lib/pdf-generator";
import TestHeader from "@/components/Quiz/test-header";

const subjects = [
  { label: "Mathematics", value: "math" },
  { label: "Physics", value: "physics" },
  { label: "Chemistry", value: "chemistry" },
  { label: "Biology", value: "biology" },
  { label: "English", value: "english" },
  { label: "History", value: "history" },
  { label: "Geography", value: "geography" },
  { label: "Computer Science", value: "cs" },
];

const classes = [
  { label: "Level-1", value: "level-1" },
  { label: "Level-2", value: "level-2" },
  { label: "Level-3", value: "level-3" },
  { label: "Level-4", value: "level-4" },
  { label: "Level-5", value: "level-5" },
  { label: "Grade 6", value: "grade-6" },
  { label: "Grade 7", value: "grade-7" },
  { label: "Grade 8", value: "grade-8" },
  { label: "Grade 9", value: "grade-9" },
  { label: "Grade 10", value: "grade-10" },
  { label: "Grade 11", value: "grade-11" },
  { label: "Grade 12", value: "grade-12" },
];

// Define the Question interface
interface Question {
  id: string;
  type: string;
  statement: string;
  marks: number;
  image: string | null;
  options: { id: string; text: string }[];
  answer?: string;
}

export default function QuizMaker() {
  const [quizTitle, setQuizTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [classLevel, setClassLevel] = useState("level-1");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setQuestions((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        const newItems = [...items];
        const [removed] = newItems.splice(oldIndex, 1);
        newItems.splice(newIndex, 0, removed);

        return newItems;
      });
    }

    setActiveId(null);
  };

  const duplicateQuestion = (id: string) => {
    const questionToDuplicate = questions.find((q) => q.id === id);

    if (!questionToDuplicate) {
      toast.error("Question not found");
      return;
    }

    const newQuestion: Question = {
      ...questionToDuplicate,
      id: `question-${Date.now()}`,
      // Duplicate options with new IDs
      options: questionToDuplicate.options.map((option, index) => ({
        ...option,
        id: `option-${Date.now()}-${index + 1}`,
      })),
    };

    const index = questions.findIndex((q) => q.id === id);
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index + 1, 0, newQuestion);

    setQuestions(updatedQuestions);
    toast.success("Question duplicated");
  };

  const addQuestion = () => {
    const newQuestion: Question = {
      id: `question-${Date.now()}`,
      type: "mcq",
      statement: "",
      marks: 1,
      options: [
        { id: `option-${Date.now()}-1`, text: "" },
        { id: `option-${Date.now()}-2`, text: "" },
        { id: `option-${Date.now()}-3`, text: "" },
        { id: `option-${Date.now()}-4`, text: "" },
      ],
      answer: "",
      image: null,
    };

    setQuestions([...questions, newQuestion]);
    toast.success("New question added");
  };

  const updateQuestion = (id: string, updatedQuestion: Partial<Question>) => {
    setQuestions(
      questions.map((q) => (q.id === id ? { ...q, ...updatedQuestion } : q))
    );
  };

  const removeQuestion = (id: string) => {
    setQuestions(questions.filter((q) => q.id !== id));
    toast.success("Question removed");
  };

  const handleExportPDF = () => {
    if (!quizTitle) {
      toast.error("Please add a quiz title");
      return;
    }

    if (questions.length === 0) {
      toast.error("Please add at least one question");
      return;
    }

    generatePDF(
      quizTitle,
      subject,
      classLevel,
      questions,
      calculateTotalMarks()
    );
    toast.success("PDF exported successfully");
  };

  const calculateTotalMarks = () => {
    return questions.reduce(
      (total, question) => total + (question.marks || 0),
      0
    );
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-5xl">
      <Toaster position="top-right" />
      <h1 className="text-3xl font-bold mb-8 text-center">Quiz Maker</h1>

      <div className=" rounded-xl shadow-md p-6 mb-8">
        <TestHeader
          quizTitle={quizTitle}
          subject={subject}
          questions={questions}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Input
            label="Quiz Title"
            placeholder="Enter quiz title"
            value={quizTitle}
            onChange={(e) => setQuizTitle(e.target.value)}
            variant="bordered"
            isRequired
          />

          <Select
            label="Subject"
            placeholder="Select a subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            variant="bordered"
          >
            {subjects.map((subject) => (
              <SelectItem key={subject.value} value={subject.value}>
                {subject.label}
              </SelectItem>
            ))}
          </Select>

          <Select
            label="Class"
            placeholder="Select class level"
            value={classLevel}
            onChange={(e) => setClassLevel(e.target.value)}
            variant="bordered"
            defaultSelectedKeys={["level-1"]}
          >
            {classes.map((cls) => (
              <SelectItem key={cls.value} value={cls.value}>
                {cls.label}
              </SelectItem>
            ))}
          </Select>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Questions</h2>
          <div className="flex gap-2">
            <Button
              color="primary"
              startContent={<Plus size={18} />}
              onClick={addQuestion}
            >
              Add Question
            </Button>
            <Button
              color="secondary"
              startContent={<FileDown size={18} />}
              onClick={handleExportPDF}
            >
              Export PDF
            </Button>
          </div>
        </div>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          modifiers={[restrictToVerticalAxis]}
        >
          <SortableContext
            items={questions.map((q) => q.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-4">
              {questions.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No questions added yet. Click "Add Question" to get started.
                </div>
              ) : (
                questions.map((question, index) => (
                  <SortableQuestionCard
                    key={question.id}
                    question={question}
                    index={index + 1}
                    updateQuestion={updateQuestion}
                    removeQuestion={removeQuestion}
                    duplicateQuestion={duplicateQuestion}
                  />
                ))
              )}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}

interface SortableQuestionCardProps {
  question: Question;
  index: number;
  updateQuestion: (id: string, updates: Partial<Question>) => void;
  removeQuestion: (id: string) => void;
  duplicateQuestion: (id: string) => void;
}

function SortableQuestionCard({
  question,
  index,
  updateQuestion,
  removeQuestion,
  duplicateQuestion,
}: SortableQuestionCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: question.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="relative">
      <div
        className="absolute left-2 top-1/2 -translate-y-1/2 cursor-grab p-2 text-gray-400 hover:text-gray-600"
        {...attributes}
        {...listeners}
      >
        <GripVertical size={20} />
      </div>
      <QuestionCard
        question={question}
        index={index}
        updateQuestion={updateQuestion}
        removeQuestion={removeQuestion}
        duplicateQuestion={duplicateQuestion}
      />
    </div>
  );
}
