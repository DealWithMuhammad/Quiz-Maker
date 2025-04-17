"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionItem,
  Button,
  Input,
  Select,
  SelectItem,
  Textarea,
  Chip,
} from "@nextui-org/react";
import {
  Trash2,
  ImageIcon,
  Plus,
  Bold,
  Italic,
  Underline,
  Superscript,
  Subscript,
  Copy,
} from "lucide-react";
import { toast } from "sonner";

const questionTypes = [
  { label: "Multiple Choice", value: "mcq" },
  { label: "Short Answer", value: "short" },
  { label: "Long Answer", value: "long" },
];

interface Question {
  id: string;
  statement: string;
  type: string;
  marks: number;
  image?: string | null;
  options: { id: string; text: string }[];
  answer?: string;
}

interface QuestionCardProps {
  question: Question;
  index: number;
  updateQuestion: (id: string, updates: Partial<Question>) => void;
  removeQuestion: (id: string) => void;
  duplicateQuestion: (id: string) => void;
}

export default function QuestionCard({
  question,
  index,
  updateQuestion,
  removeQuestion,
  duplicateQuestion,
}: QuestionCardProps) {
  const [imagePreview, setImagePreview] = useState(question.image);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const imageData = reader.result;
      setImagePreview(typeof imageData === "string" ? imageData : null);
      if (typeof imageData === "string") {
        updateQuestion(question.id, { image: imageData });
      } else {
        toast.error("Failed to process the image file");
      }
    };
    reader.readAsDataURL(file);
  };

  const addOption = () => {
    if (question.options.length >= 6) {
      toast.error("Maximum 6 options allowed");
      return;
    }

    const newOption = {
      id: `option-${Date.now()}`,
      text: "",
    };

    updateQuestion(question.id, {
      options: [...question.options, newOption],
    });
  };

  const updateOption = (optionId: any, text: any) => {
    const updatedOptions = question.options.map((option) =>
      option.id === optionId ? { ...option, text } : option
    );

    updateQuestion(question.id, { options: updatedOptions });
  };

  const removeOption = (optionId: any) => {
    if (question.options.length <= 2) {
      toast.error("Minimum 2 options required");
      return;
    }

    const updatedOptions = question.options.filter(
      (option) => option.id !== optionId
    );
    updateQuestion(question.id, { options: updatedOptions });
  };

  const insertFormatting = (format: any) => {
    let formattedText = "";

    switch (format) {
      case "bold":
        formattedText = `<b>${question.statement}</b>`;
        break;
      case "italic":
        formattedText = `<i>${question.statement}</i>`;
        break;
      case "underline":
        formattedText = `<u>${question.statement}</u>`;
        break;
      case "superscript":
        formattedText = `${question.statement}<sup>x</sup>`;
        break;
      case "subscript":
        formattedText = `${question.statement}<sub>x</sub>`;
        break;
      case "formula":
        formattedText = `${question.statement} ∫f(x)dx`;
        break;
      default:
        return;
    }

    updateQuestion(question.id, { statement: formattedText });
  };

  return (
    <Accordion variant="bordered" className="pl-10">
      <AccordionItem
        key={question.id}
        aria-label={`Question ${index}`}
        title={
          <div className="flex items-center gap-2">
            <Chip color="primary" variant="flat">
              Q{index}
            </Chip>
            <span className="font-medium">
              {question.statement
                ? question.statement.length > 50
                  ? question.statement.substring(0, 50) + "..."
                  : question.statement
                : "New Question"}
            </span>
            <Chip color="default" size="sm" className="ml-auto">
              {question.marks} {question.marks === 1 ? "mark" : "marks"}
            </Chip>
          </div>
        }
      >
        <div className="space-y-4 p-2">
          <div className="flex flex-wrap gap-2 mb-4">
            <Button
              size="sm"
              variant="flat"
              isIconOnly
              onClick={() => insertFormatting("bold")}
              title="Bold"
            >
              <Bold size={16} />
            </Button>
            <Button
              size="sm"
              variant="flat"
              isIconOnly
              onClick={() => insertFormatting("italic")}
              title="Italic"
            >
              <Italic size={16} />
            </Button>
            <Button
              size="sm"
              variant="flat"
              isIconOnly
              onClick={() => insertFormatting("underline")}
              title="Underline"
            >
              <Underline size={16} />
            </Button>
            <Button
              size="sm"
              variant="flat"
              isIconOnly
              onClick={() => insertFormatting("superscript")}
              title="Superscript"
            >
              <Superscript size={16} />
            </Button>
            <Button
              size="sm"
              variant="flat"
              isIconOnly
              onClick={() => insertFormatting("subscript")}
              title="Subscript"
            >
              <Subscript size={16} />
            </Button>
            <Button
              size="sm"
              variant="flat"
              onClick={() => insertFormatting("formula")}
              title="Insert Formula"
            >
              Formula
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Question Type"
              placeholder="Select question type"
              selectedKeys={[question.type]}
              onChange={(e) =>
                updateQuestion(question.id, { type: e.target.value })
              }
              className="w-full"
            >
              {questionTypes.map((type) => (
                <SelectItem key={type.value || ""} value={type.value || ""}>
                  {type.label}
                </SelectItem>
              ))}
            </Select>

            <Input
              type="number"
              label="Marks"
              placeholder="Enter marks"
              value={String(question.marks)}
              onChange={(e) =>
                updateQuestion(question.id, {
                  marks: Number.parseInt(e.target.value) || 0,
                })
              }
              min={1}
              max={100}
            />
          </div>

          <Textarea
            label="Question Statement"
            placeholder="Enter your question here"
            value={question.statement}
            onChange={(e) =>
              updateQuestion(question.id, { statement: e.target.value })
            }
            minRows={2}
            isRequired
          />

          <div className="space-y-2">
            <p className="text-sm font-medium">Question Image (Optional)</p>
            <div className="flex items-center gap-2">
              <Button
                color="default"
                variant="flat"
                startContent={<ImageIcon size={16} />}
                as="label"
                htmlFor={`image-upload-${question.id}`}
              >
                {imagePreview ? "Change Image" : "Add Image"}
              </Button>
              <input
                id={`image-upload-${question.id}`}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              {imagePreview && (
                <Button
                  color="danger"
                  variant="light"
                  size="sm"
                  onClick={() => {
                    setImagePreview(null);
                    updateQuestion(question.id, { image: null });
                  }}
                >
                  Remove Image
                </Button>
              )}
            </div>
            {imagePreview && (
              <div className="mt-2 border rounded-lg overflow-hidden max-w-md">
                <img
                  src={imagePreview || "/placeholder.svg"}
                  alt="Question image"
                  className="w-full h-auto max-h-48 object-contain"
                />
              </div>
            )}
          </div>

          {question.type === "mcq" && (
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <p className="text-sm font-medium">Options</p>
                <Button
                  size="sm"
                  variant="flat"
                  color="primary"
                  startContent={<Plus size={16} />}
                  onClick={addOption}
                >
                  Add Option
                </Button>
              </div>
              <div className="space-y-2">
                {question.options.map((option, optIndex) => (
                  <div key={option.id} className="flex items-center gap-2">
                    <div className="w-8 h-8 flex items-center justify-center bg-primary-50 text-primary rounded-full font-medium">
                      {String.fromCharCode(97 + optIndex)}
                    </div>
                    <Input
                      placeholder={`Option ${String.fromCharCode(
                        97 + optIndex
                      )}`}
                      value={option.text}
                      onChange={(e) => updateOption(option.id, e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      isIconOnly
                      color="danger"
                      variant="light"
                      onClick={() => removeOption(option.id)}
                      size="sm"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2 mt-4">
            <Button
              color="default"
              variant="light"
              startContent={<Copy size={16} />}
              onClick={() => duplicateQuestion(question.id)}
            >
              Duplicate
            </Button>
            <Button
              color="danger"
              variant="light"
              startContent={<Trash2 size={16} />}
              onClick={() => removeQuestion(question.id)}
            >
              Remove
            </Button>
          </div>
        </div>
      </AccordionItem>
    </Accordion>
  );
}
