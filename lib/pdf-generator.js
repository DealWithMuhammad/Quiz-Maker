import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const generatePDF = (
  title,
  subject,
  classLevel,
  questions,
  totalMarks
) => {
  // Create a temporary div to render the quiz
  const tempDiv = document.createElement("div");
  tempDiv.className = "pdf-container";
  tempDiv.style.width = "210mm";
  tempDiv.style.padding = "10mm";
  tempDiv.style.backgroundColor = "white";
  tempDiv.style.position = "absolute";
  tempDiv.style.left = "-9999px";
  tempDiv.style.fontFamily = "Arial, sans-serif";
  document.body.appendChild(tempDiv);

  // Create the header
  const header = document.createElement("div");
  header.style.marginBottom = "20px";

  // Logo and title
  const titleRow = document.createElement("div");
  titleRow.style.display = "flex";
  titleRow.style.alignItems = "center";
  titleRow.style.marginBottom = "5px";

  // Logo
  const logoDiv = document.createElement("div");
  logoDiv.style.marginRight = "10px";

  const logo = document.createElement("img");
  logo.src = "logo.png";
  logo.style.width = "60px";
  logo.style.height = "60px";

  logoDiv.appendChild(logo);
  titleRow.appendChild(logoDiv);

  // Title
  const titleDiv = document.createElement("div");
  const mainTitle = document.createElement("h1");
  mainTitle.textContent = "EMPOWER LEARNING SYSTEM";
  mainTitle.style.fontSize = "18px";
  mainTitle.style.fontWeight = "bold";
  mainTitle.style.margin = "0";

  titleDiv.appendChild(mainTitle);
  titleRow.appendChild(titleDiv);

  header.appendChild(titleRow);

  // Subtitle
  const subtitle = document.createElement("div");
  subtitle.textContent = title || "Tri-Review Quiz (Jan-March 2025)";
  subtitle.style.textAlign = "center";
  subtitle.style.fontSize = "14px";
  subtitle.style.marginBottom = "10px";

  header.appendChild(subtitle);

  // Subject and time
  const subjectTimeRow = document.createElement("div");
  subjectTimeRow.style.display = "flex";
  subjectTimeRow.style.justifyContent = "space-between";
  subjectTimeRow.style.marginBottom = "10px";

  const subjectSpan = document.createElement("span");
  const subjectName = getSubjectName(subject);
  subjectSpan.textContent = `Subject: ${subjectName || "Not Selected"}`;

  const timeSpan = document.createElement("span");
  timeSpan.textContent = "Time: 1:30 hr.";

  subjectTimeRow.appendChild(subjectSpan);
  subjectTimeRow.appendChild(timeSpan);

  header.appendChild(subjectTimeRow);

  // Marks tables
  const tablesRow = document.createElement("div");
  tablesRow.style.display = "flex";
  tablesRow.style.justifyContent = "space-between";
  tablesRow.style.marginBottom = "15px";

  // Total marks table
  const totalMarksTable = document.createElement("table");
  totalMarksTable.style.width = "48%";
  totalMarksTable.style.borderCollapse = "collapse";

  const totalMarksTr = document.createElement("tr");

  const totalMarksLabelTd = document.createElement("td");
  totalMarksLabelTd.textContent = "Total Marks";
  totalMarksLabelTd.style.border = "1px solid black";
  totalMarksLabelTd.style.padding = "5px";

  const totalMarksValueTd = document.createElement("td");
  totalMarksValueTd.textContent = totalMarks || "50";
  totalMarksValueTd.style.border = "1px solid black";
  totalMarksValueTd.style.padding = "5px";
  totalMarksValueTd.style.width = "60%";

  totalMarksTr.appendChild(totalMarksLabelTd);
  totalMarksTr.appendChild(totalMarksValueTd);
  totalMarksTable.appendChild(totalMarksTr);

  // Obtained marks table
  const obtainedMarksTable = document.createElement("table");
  obtainedMarksTable.style.width = "48%";
  obtainedMarksTable.style.borderCollapse = "collapse";

  const obtainedMarksTr = document.createElement("tr");

  const obtainedMarksLabelTd = document.createElement("td");
  obtainedMarksLabelTd.textContent = "Obtained Marks";
  obtainedMarksLabelTd.style.border = "1px solid black";
  obtainedMarksLabelTd.style.padding = "5px";

  const obtainedMarksValueTd = document.createElement("td");
  obtainedMarksValueTd.textContent = "";
  obtainedMarksValueTd.style.border = "1px solid black";
  obtainedMarksValueTd.style.padding = "5px";
  obtainedMarksValueTd.style.width = "60%";

  obtainedMarksTr.appendChild(obtainedMarksLabelTd);
  obtainedMarksTr.appendChild(obtainedMarksValueTd);
  obtainedMarksTable.appendChild(obtainedMarksTr);

  tablesRow.appendChild(totalMarksTable);
  tablesRow.appendChild(obtainedMarksTable);

  header.appendChild(tablesRow);

  // Student information fields
  const studentInfoDiv = document.createElement("div");

  // Name field
  const nameField = document.createElement("div");
  nameField.style.marginBottom = "10px";

  const nameLabel = document.createElement("span");
  nameLabel.textContent = "Name:";
  nameLabel.style.fontWeight = "bold";

  nameField.appendChild(nameLabel);
  nameField.appendChild(document.createElement("br"));

  const nameLine = document.createElement("div");
  nameLine.style.borderBottom = "1px solid black";
  nameLine.style.height = "1.5em";

  nameField.appendChild(nameLine);
  studentInfoDiv.appendChild(nameField);

  // Father's name field
  const fatherField = document.createElement("div");
  fatherField.style.marginBottom = "10px";

  const fatherLabel = document.createElement("span");
  fatherLabel.textContent = "Father's name:";
  fatherLabel.style.fontWeight = "bold";

  fatherField.appendChild(fatherLabel);
  fatherField.appendChild(document.createElement("br"));

  const fatherLine = document.createElement("div");
  fatherLine.style.borderBottom = "1px solid black";
  fatherLine.style.height = "1.5em";

  fatherField.appendChild(fatherLine);
  studentInfoDiv.appendChild(fatherField);

  // Class field
  const classField = document.createElement("div");
  classField.style.marginBottom = "10px";

  const classLabel = document.createElement("span");
  const className = getClassName(classLevel);
  classLabel.textContent = `Class: ${className}`;
  classLabel.style.fontWeight = "bold";

  classField.appendChild(classLabel);
  classField.appendChild(document.createElement("br"));

  const classLine = document.createElement("div");
  classLine.style.borderBottom = "1px solid black";
  classLine.style.height = "1.5em";

  classField.appendChild(classLine);
  studentInfoDiv.appendChild(classField);

  // Campus field
  const campusField = document.createElement("div");
  campusField.style.marginBottom = "10px";

  const campusLabel = document.createElement("span");
  campusLabel.textContent = "Campus:";
  campusLabel.style.fontWeight = "bold";

  campusField.appendChild(campusLabel);
  campusField.appendChild(document.createElement("br"));

  const campusLine = document.createElement("div");
  campusLine.style.borderBottom = "1px solid black";
  campusLine.style.height = "1.5em";

  campusField.appendChild(campusLine);
  studentInfoDiv.appendChild(campusField);

  // Day & Date field
  const dateField = document.createElement("div");
  dateField.style.marginBottom = "10px";

  const dateLabel = document.createElement("span");
  dateLabel.textContent = "Day & Date:";
  dateLabel.style.fontWeight = "bold";

  dateField.appendChild(dateLabel);
  dateField.appendChild(document.createElement("br"));

  const dateLine = document.createElement("div");
  dateLine.style.borderBottom = "1px solid black";
  dateLine.style.height = "1.5em";

  dateField.appendChild(dateLine);
  studentInfoDiv.appendChild(dateField);

  // Office use section
  const officeUseDiv = document.createElement("div");
  officeUseDiv.style.marginBottom = "15px";

  const officeUseLabel = document.createElement("div");
  officeUseLabel.textContent = "For office use only";
  officeUseLabel.style.fontWeight = "bold";
  officeUseLabel.style.marginBottom = "5px";

  officeUseDiv.appendChild(officeUseLabel);

  // Checked by field
  const checkedByField = document.createElement("div");
  checkedByField.style.marginBottom = "5px";

  const checkedByLabel = document.createElement("span");
  checkedByLabel.textContent = "Checked by: ";
  checkedByLabel.style.fontWeight = "bold";

  const checkedByLine = document.createElement("span");
  checkedByLine.style.borderBottom = "1px solid black";
  checkedByLine.style.display = "inline-block";
  checkedByLine.style.width = "200px";
  checkedByLine.innerHTML = "&nbsp;";

  checkedByField.appendChild(checkedByLabel);
  checkedByField.appendChild(checkedByLine);
  officeUseDiv.appendChild(checkedByField);

  // Rechecked by field
  const recheckedByField = document.createElement("div");

  const recheckedByLabel = document.createElement("span");
  recheckedByLabel.textContent = "Rechecked by: ";
  recheckedByLabel.style.fontWeight = "bold";

  const recheckedByLine = document.createElement("span");
  recheckedByLine.style.borderBottom = "1px solid black";
  recheckedByLine.style.display = "inline-block";
  recheckedByLine.style.width = "200px";
  recheckedByLine.innerHTML = "&nbsp;";

  recheckedByField.appendChild(recheckedByLabel);
  recheckedByField.appendChild(recheckedByLine);
  officeUseDiv.appendChild(recheckedByField);

  studentInfoDiv.appendChild(officeUseDiv);

  header.appendChild(studentInfoDiv);

  // Divider
  const divider = document.createElement("hr");
  divider.style.margin = "0 0 15px 0";
  divider.style.border = "none";
  divider.style.borderTop = "1px solid black";
  header.appendChild(divider);

  // Instructions
  const instructionsDiv = document.createElement("div");
  instructionsDiv.style.marginBottom = "15px";

  const instructionsTitle = document.createElement("div");
  instructionsTitle.textContent = "INSTRUCTIONS";
  instructionsTitle.style.fontWeight = "bold";
  instructionsTitle.style.marginBottom = "5px";
  instructionsDiv.appendChild(instructionsTitle);

  const instructionsList = document.createElement("ul");
  instructionsList.style.margin = "0";
  instructionsList.style.paddingLeft = "20px";

  const instructions = [
    "Answer all questions.",
    "Use a black or dark blue pen.",
    "Write your name, centre number and candidate number in the boxes at the top of the page.",
    "Write your answer to each question in the space provided.",
    "Do not use an erasable pen or correction fluid.",
    "Do not write on any bar codes.",
    "You may use an HB pencil for any diagrams, graphs or rough working.",
    "You must complete the quiz and turn it in within the allotted time.",
    "Read each question carefully before answering to ensure you understand what is being asked.",
    "Misinterpreted questions due to rushing may lead to incorrect answers.",
  ];

  instructions.forEach((instruction) => {
    const li = document.createElement("li");
    li.textContent = instruction;
    li.style.fontSize = "12px";
    li.style.marginBottom = "2px";
    instructionsList.appendChild(li);
  });

  instructionsDiv.appendChild(instructionsList);
  header.appendChild(instructionsDiv);

  // Information
  const infoDiv = document.createElement("div");
  infoDiv.style.marginBottom = "15px";

  const infoTitle = document.createElement("div");
  infoTitle.textContent = "INFORMATION";
  infoTitle.style.fontWeight = "bold";
  infoTitle.style.marginBottom = "5px";
  infoDiv.appendChild(infoTitle);

  const infoList = document.createElement("ul");
  infoList.style.margin = "0";
  infoList.style.paddingLeft = "20px";

  const infoItems = [
    `The total mark for this paper is ${totalMarks || 50}.`,
    "The number of marks for each question or part question is shown in brackets [ ].",
    "Once the quiz begins, you must finish and submit it no later than the given deadline.",
    "If you finish early, review your answers before submitting.",
  ];

  infoItems.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    li.style.fontSize = "12px";
    li.style.marginBottom = "2px";
    infoList.appendChild(li);
  });

  infoDiv.appendChild(infoList);
  header.appendChild(infoDiv);

  // Final reminder
  const reminderDiv = document.createElement("div");
  reminderDiv.style.marginBottom = "15px";

  const reminderTitle = document.createElement("div");
  reminderTitle.textContent = "FINAL REMINDER:";
  reminderTitle.style.fontWeight = "bold";
  reminderTitle.style.marginBottom = "5px";
  reminderDiv.appendChild(reminderTitle);

  const reminderList = document.createElement("ul");
  reminderList.style.margin = "0";
  reminderList.style.paddingLeft = "20px";

  const reminderItem = document.createElement("li");
  reminderItem.textContent =
    "Stay focused, watch the time, and ensure your quiz is submitted before time runs out.";
  reminderItem.style.fontSize = "12px";
  reminderList.appendChild(reminderItem);

  reminderDiv.appendChild(reminderList);
  header.appendChild(reminderDiv);

  tempDiv.appendChild(header);

  // Create the questions
  const questionsContainer = document.createElement("div");
  questionsContainer.style.fontSize = "14px";
  questionsContainer.style.marginTop = "20px";

  questions.forEach((question, index) => {
    const questionDiv = document.createElement("div");
    questionDiv.style.marginBottom = "20px";

    // Question number, statement and marks - all inline
    const questionHeader = document.createElement("div");

    // Question number in bold and inline with statement
    const questionText = document.createElement("span");
    questionText.innerHTML = `<strong>Question No ${index + 1}:</strong> ${
      question.statement
    } <span style="float: right;">[${question.marks} ${
      question.marks === 1 ? "mark" : "marks"
    }]</span>`;

    questionHeader.appendChild(questionText);
    questionDiv.appendChild(questionHeader);

    // Question image if exists
    if (question.image) {
      const imageContainer = document.createElement("div");
      imageContainer.style.textAlign = "center";
      imageContainer.style.margin = "10px 0";

      const image = document.createElement("img");
      image.src = question.image;
      image.style.maxWidth = "100%";
      image.style.maxHeight = "200px";

      imageContainer.appendChild(image);
      questionDiv.appendChild(imageContainer);
    }

    // Question type specific rendering
    if (question.type === "mcq") {
      const optionsDiv = document.createElement("div");
      optionsDiv.style.marginLeft = "20px";
      optionsDiv.style.marginTop = "10px";

      question.options.forEach((option, optIndex) => {
        const optionElement = document.createElement("div");
        optionElement.style.marginBottom = "5px";
        optionElement.textContent = `${String.fromCharCode(97 + optIndex)}) ${
          option.text
        }`;
        optionsDiv.appendChild(optionElement);
      });

      questionDiv.appendChild(optionsDiv);
    } else if (question.type === "short" || question.type === "long") {
      const answerSpace = document.createElement("div");
      answerSpace.style.marginTop = "10px";

      // Create dotted lines for answers
      const lines = question.type === "short" ? 3 : 10;
      for (let i = 0; i < lines; i++) {
        const line = document.createElement("div");
        line.style.borderBottom = "1px dotted #aaa";
        line.style.height = "20px";
        line.style.marginBottom = "5px";
        answerSpace.appendChild(line);
      }

      questionDiv.appendChild(answerSpace);
    }

    questionsContainer.appendChild(questionDiv);
  });

  tempDiv.appendChild(questionsContainer);

  // Add footer with page number
  const footer = document.createElement("div");
  footer.style.position = "absolute";
  footer.style.bottom = "10mm";
  footer.style.right = "10mm";
  footer.style.fontSize = "10px";
  footer.style.color = "#666";
  footer.textContent = "1";

  tempDiv.appendChild(footer);

  // Generate PDF
  html2canvas(tempDiv, { scale: 2 }).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    const imgX = 0; // No centering, align to left
    const imgY = 0;

    pdf.addImage(
      imgData,
      "PNG",
      imgX,
      imgY,
      imgWidth * ratio,
      imgHeight * ratio
    );
    pdf.save(`${title.replace(/\s+/g, "_")}.pdf`);

    // Clean up
    document.body.removeChild(tempDiv);
  });
};

function getSubjectName(subjectCode) {
  const subjects = {
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

function getClassName(classCode) {
  const classes = {
    "level-1": "Level-1",
    "level-2": "Level-2",
    "level-3": "Level-3",
    "level-4": "Level-4",
    "level-5": "Level-5",
    "grade-6": "Grade 6",
    "grade-7": "Grade 7",
    "grade-8": "Grade 8",
    "grade-9": "Grade 9",
    "grade-10": "Grade 10",
    "grade-11": "Grade 11",
    "grade-12": "Grade 12",
  };

  return classes[classCode] || "Level-1";
}
