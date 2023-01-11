import { useState } from "react";
import useEurInfo from "./useEurInfo";

type EventHandler = React.ChangeEventHandler<HTMLInputElement>;

export default function useInput(
  initialValue?: string,
  validator?: (value: string) => boolean
): [string, EventHandler, number?] {
  const [value, setValue] = useState(initialValue ?? "");
  const [exchangedKrw, setExchangedKrw] = useState<number>();
  const { data } = useEurInfo();

  const exchangeEurToKrw = (eur: number) =>
    data ? eur * data.basePrice : null;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const regEx = /^\d*.?\d{0,2}$/;
    let input = e.target.value;

    if (!regEx.test(input)) {
      input = input.substring(0, input.length - 1);
    }
    setValue(input);

    let krw = exchangeEurToKrw(Number(input));
    krw != null && setExchangedKrw(Math.floor(krw));
  };

  return [value, onChange, exchangedKrw];
}