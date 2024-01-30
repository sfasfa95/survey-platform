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
} from "@mui/material";
import { useRouter } from "next/navigation";

const selectOptions = [
  {
    question: "3. Question A",
    checkbox: [
      {
        label: "Checkbox 1a",
        value: "checkbox1a",
      },
      {
        label: "Checkbox 2a",
        value: "checkbox2a",
      },
      {
        label: "Checkbox 3a",
        value: "checkbox3a",
      },
      {
        label: "Checkbox 4a",
        value: "checkbox4a",
      },
    ],
  },
  {
    question: "3. Question B",
    checkbox: [
      {
        label: "Checkbox 1b",
        value: "checkbox1b",
      },
      {
        label: "Checkbox 2b",
        value: "checkbox2b",
      },
      {
        label: "Checkbox 3b",
        value: "checkbox3b",
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
    ratingSelected > 5 ? selectOptions[0] : selectOptions[1];

  const handleSubmit = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/success");
    }, 1000);
    console.log({ ratingSelected });
    console.log({ selectedCheckboxes });
    console.log({ selectedRadioValue });
  };
  return (
    <>
      <div className="container max-w-screen-lg bg-slate-100 mx-auto p-4">
        <section className="mt-5">
          <div className="text-lg font-bold">1. Question</div>
          <div className="mt-3">
            {Array.from({ length: ratingCount }, (_, index) => (
              <button
                key={index + 1}
                className={
                  "inline-block text-center m-2 p-2 min-w-10 " +
                  (index + 1 <= ratingSelected
                    ? "bg-[#ffc915]"
                    : "bg-yellow-100")
                }
                onClick={() => handleRatingClick(index + 1)}
                style={{ margin: "5px" }}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </section>
        <section className="mt-5">
          <div className="text-lg font-bold">
            2. Apakah layanan ini menyelesaikan masalah Anda?
          </div>
          <div>
            <FormControl component="fieldset">
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                value={selectedRadioValue}
                onChange={handleRadioChange}
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value="terselesaikan"
                  control={<Radio />}
                  label="Terselesaikan"
                />
                <FormControlLabel
                  value="belum-terselesaikan"
                  control={<Radio />}
                  label="Belum Terselesaikan"
                />
              </RadioGroup>
            </FormControl>
          </div>
        </section>
        <section className="mt-5">
          <div className="text-lg font-bold">{questionSelected.question}</div>
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
            </FormGroup>
          </div>
        </section>
        <section className="mt-8">
          <Button
            disabled={isLoading}
            variant="outlined"
            className="text-lg min-w-60"
            onClick={() => handleSubmit()}
          >
            {isLoading && (
              <CircularProgress
                size={24}
                className="text-gray-400 text-sm mr-2"
              />
            )}
            Submit
          </Button>
        </section>
      </div>
    </>
  );
}
