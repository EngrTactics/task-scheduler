export type Task = {
  id: string;
  runTime: string;
  title: string;
  message: string;
  platform: "whatsapp" | "telegram" | "slack" | "email";
  recipients: string[];

  runDate: string;
  repeat: Repeat;
  finalDate: string;
};

type Repeat = {
  active: boolean;
  value: {
    value: number;
    unit: string;
  };
};
