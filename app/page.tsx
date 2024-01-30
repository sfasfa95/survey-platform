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
} from "@mui/material";

export default function Home() {
  const ratingCount = 10;
  const [ratingSelected, setRating] = React.useState(0);

  const handleRatingClick = (rating: number) => {
    setRating(rating);
  };
  return (
    <>
      <div className="container max-w-screen-lg bg-slate-100 mx-auto p-4">
        <section className="mt-5">
          <div>1. Question</div>
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
          <div>2. Apakah layanan ini menyelesaikan masalah Anda?</div>
          <div>
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue=""
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
          <div>3. Question</div>
          <div>Jawaban</div>
        </section>
      </div>
    </>
  );
}
