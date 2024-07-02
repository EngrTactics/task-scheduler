import { Task } from "@/types";

export const tasks: Task[] = [
  {
    time: "2:50",
    title: "Appointment letter",
    count: 1,
    message:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio repudiandae cum nostrum possimus consequatur dolor deserunt eum odit beatae est. Commodi placeat qui numquam hic eum nostrum architecto delectus! Accusamus!",
    platform: "Whatsapp",
    recipients: ["+123533969", "+3673533..."],
    runTime: "May 2, 02:50",
    repeat: {
      active: true,
      value: {
        value: 2,
        unit: "days",
      },
    },
    finalDate: "30, Jul",
    runDate: "2022-07-30",
  },
  {
    time: "3:30",
    title: "Meeting Reminder",
    count: 2,
    message: "Don't forget about the team meeting at 4pm today.",
    platform: "Email",
    recipients: ["john@example.com", "jane@example.com"],
    runTime: "May 2, 03:30",
    repeat: {
      active: true,
      value: {
        value: 2,
        unit: "days",
      },
    },
    finalDate: "30, Jul",
    runDate: "2022-07-30",
  },
  {
    time: "4:00",
    title: "Project Deadline",
    count: 3,
    message: "The project deadline is approaching. Please submit your work.",
    platform: "Slack",
    recipients: ["#general"],
    runTime: "May 2, 04:00",
    repeat: {
      active: false,
      value: {
        value: 0,
        unit: "",
      },
    },
    finalDate: "30, Jul",
    runDate: "2022-07-30",
  },
];
