export type Task = {
  time: string;
  title: string;
  count: number;
  message: string;
  platform: "Whatsapp" | "Telegram" | "Slack" | "Email";
  recipients: string[];
  runTime: string;
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
