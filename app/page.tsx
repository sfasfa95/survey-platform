"use client";
import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  FormGroup,
  CircularProgress,
  TextField,
} from "@mui/material";
import { useRouter } from "next/navigation";

const selectOptions = [
  {
    question:
      "3. Regarding this customer service consultation, which of the following aspects do you think need to be improved/optimized?",
    checkbox: [
      {
        label: "Answers that are complicated and difficult to understand",
        value: "3.1.1",
      },
      {
        label: "Unfriendly attitude",
        value: "3.1.2",
      },
      {
        label: "Solution is ineffective",
        value: "3.1.3",
      },
      {
        label: "Failed to understand the question",
        value: "3.1.4",
      },
      {
        label: "IVR content is hard to understand",
        value: "3.1.5",
      },
      {
        label: "Not considerate enough",
        value: "3.1.6",
      },
      {
        label: "Weak customer service skills",
        value: "3.1.7",
      },
      {
        label: "Other",
        value: "3.1.8",
      },
    ],
  },
  {
    question:
      "3. You are relatively satisfied with this customer service consultation experience. Which of the following aspects are you mainly satisfied with?",
    checkbox: [
      {
        label: "Thoughtful and considerate",
        value: "3.2.1",
      },
      {
        label: "Good customer service attitude",
        value: "3.2.2",
      },
      {
        label: "Answers are concise and easy to understand",
        value: "3.2.3",
      },
      {
        label: "IVR content is easy to understand",
        value: "3.2.4",
      },
      {
        label: "Understand the problem quickly",
        value: "3.2.5",
      },
      {
        label: "Strong customer service skills",
        value: "3.2.6",
      },
      {
        label: "Effective solution",
        value: "3.2.7",
      },
      {
        label: "Other",
        value: "3.2.8",
      },
    ],
  },
];

export default function Home() {
  const router = useRouter();
  const ratingCount = 10;
  const [ratingSelected, setRating] = React.useState(0);
  const [selectedCheckboxes, setSelectedCheckboxes] = React.useState<string[]>(
    []
  );
  const [selectedRadioValue, setSelectedRadioValue] =
    React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [otherSuggestion, setOtherSuggestion] = React.useState("");
  const [otherCheckboxInput, setOtherCheckboxInput] = React.useState("");

  const handleRatingClick = (rating: number) => {
    setSelectedCheckboxes([]);
    setRating(rating);
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRadioValue(event.target.value);
  };

  const handleCheckboxChange = (value: string) => {
    const updatedSelection = selectedCheckboxes.includes(value)
      ? selectedCheckboxes.filter((item) => item !== value)
      : [...selectedCheckboxes, value];

    setSelectedCheckboxes(updatedSelection);
  };

  const questionSelected =
    ratingSelected > 8 && selectedRadioValue == "solved"
      ? selectOptions[1]
      : selectOptions[0];

  const handleTextareaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOtherSuggestion(event.target.value);
  };

  const handlerOtherCheckboxInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setOtherCheckboxInput(event.target.value);
  };

  const showOtherCheckbox =
    selectedCheckboxes.includes("3.1.8") || selectedCheckboxes.includes("3.2.8")
      ? true
      : false;

  const handleSubmit = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/success");
    }, 1000);
    console.log({ ratingSelected });
    console.log({ selectedCheckboxes });
    console.log({ selectedRadioValue });
    console.log({ otherSuggestion });
    console.log({ otherCheckboxInput });
  };
  return (
    <>
      <div className="container max-w-screen-lg  mx-auto p-4">
        <section className="mt-7">
          <div>
            <h2 className="text-lg font-bold">
              1. How satisfied are you with this customer service consultation?
            </h2>
            <p className="text-sm">
              Please rate based on your level of satisfaction. On a scale of
              1-10, 1 means "dissatisfied" and 10 means "very satisfied"
            </p>
          </div>
          <div className="mt-10">
            <div className="md:flex relative">
              <span className="absolute left-0 top-[-25px] text-sm px-2">
                Dissatisfied
              </span>
              <span className="absolute right-0 top-[-25px] text-sm px-2">
                Very Satisfied
              </span>
              {Array.from({ length: ratingCount }, (_, index) => (
                <div
                  key={index + 1}
                  className={
                    "inline-block text-center m-2 p-2 min-w-10 flex-auto cursor-pointer rounded " +
                    (index + 1 <= ratingSelected
                      ? "bg-[#ffc915] text-white"
                      : "bg-gray-100 text-black")
                  }
                  onClick={() => handleRatingClick(index + 1)}
                  style={{ margin: "5px" }}
                >
                  {index + 1}
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="mt-7">
          <h2 className="text-lg font-bold">
            2. Has this service solved your problem?
          </h2>
          <div>
            <FormControl component="fieldset">
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                value={selectedRadioValue}
                onChange={handleRadioChange}
                name="radio-buttons-group"
                className="text-sm"
              >
                <FormControlLabel
                  value="solved"
                  control={<Radio />}
                  label="Solved"
                />
                <FormControlLabel
                  value="unsolved"
                  control={<Radio />}
                  label="Unsolved"
                />
              </RadioGroup>
            </FormControl>
          </div>
        </section>
        <section className="mt-7">
          <h2 className="text-lg font-bold">{questionSelected.question}</h2>
          <div className="mt-2">
            <FormGroup>
              {questionSelected.checkbox.map((checkbox: any, index: number) => (
                <FormControlLabel
                  key={index}
                  control={
                    <Checkbox
                      value={checkbox.value}
                      checked={selectedCheckboxes.includes(checkbox.value)}
                      onChange={() => handleCheckboxChange(checkbox.value)}
                    />
                  }
                  label={checkbox.label}
                />
              ))}
              {showOtherCheckbox && (
                <TextField
                  multiline
                  rows={4}
                  fullWidth
                  placeholder="Please type here..."
                  value={otherCheckboxInput}
                  onChange={handlerOtherCheckboxInput}
                />
              )}
            </FormGroup>
          </div>
        </section>

        <section className="mt-7">
          <h2 className="text-lg font-bold">
            4. Do you have any other comment or suggestion of realme customer
            service hotline?
          </h2>
          <div className="mt-4">
            <TextField
              multiline
              rows={4}
              fullWidth
              placeholder="Please type here..."
              value={otherSuggestion}
              onChange={handleTextareaChange}
            />
          </div>
        </section>

        <section className="mt-8 text-center">
          <Button
            disabled={isLoading}
            variant="outlined"
            className="text-lg min-w-60 bg-[#ffc915] hover:bg-[#ffc915] text-white border-white hover:border-[#ffc915]"
            onClick={() => handleSubmit()}
          >
            {isLoading && (
              <CircularProgress size={24} className="text-white text-sm mr-2" />
            )}
            <span className="text-white">Submit</span>
          </Button>
        </section>
      </div>
    </>
  );
}
