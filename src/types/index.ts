export type Task = {
  id: string;
  runTime: string;
  title: string;
  message: string;
  platform: "whatsapp" | "telegram" | "slack" | "email";
  recipients: string[];
  runDate: Date;
  repeat: Repeat;
  finalDate?: Date;
};

type Repeat = {
  active: boolean;
  value: {
    value: number | string;
    customValue?: number;
  };
};
