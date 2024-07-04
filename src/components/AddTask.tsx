import { Separator } from "@/components/ui/separator";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { v4 as uuidv4 } from "uuid";
import { Button } from "./ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "./ui/calender";
import { format } from "date-fns";
import { cn } from "../lib/utils";
import { useForm } from "react-hook-form";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import { validationSchema } from "../validations/validation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { motion } from "framer-motion";
import { closeAddModal } from "../redux/modal/modalAction";
import { useDispatch } from "react-redux";
import { addTask, updatePendingAndPastTask } from "../redux/tasks/tasksAction";

import { Switch } from "./ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";

const AddTask = () => {
  const defaultValues = {
    time: "",
    scheduleDate: new Date(),
    messageTitle: "",
    message: "",
    recipients: [""],
    repeat: "",
    repeatActive: false,
    platform: "",
    finalDate: undefined,
    custom: 0,
  };
  const form = useForm({
    mode: "onTouched",
    defaultValues,
    resolver: zodResolver(validationSchema),
  });
  const dispatch = useDispatch();
  const [recipient, setRecipient] = useState<string>();
  const [recipients, setRecipients] = useState<string[]>([]);
  const [repeatActive, setRepeatActive] = useState<boolean>(true);
  const addRecipient = (e: any) => {
    e.preventDefault();
    if (recipient) {
      setRecipients([...recipients, recipient]);
      setRecipient("");
      form.setValue("recipients", recipients);
    }
  };
  const handleSubmit = (data: typeof defaultValues) => {
    const taskToAdd = {
      id: uuidv4(),
      title: data.messageTitle,
      message: data.message,
      platform: data.platform,
      recipients: data.recipients,
      runTime: data.time,
      repeat: {
        active: data.repeatActive,
        value: {
          value: data.repeatActive ? data.repeat : null,
          customValue: data.custom,
        },
      },
      finalDate: data.finalDate,
      runDate: data.scheduleDate,
    };
    dispatch(addTask(taskToAdd as any));
    dispatch(updatePendingAndPastTask());

    dispatch(closeAddModal());
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-30 flex items-center justify-center bg-black/65 backdrop-blur"
    >
      <motion.div
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.2 }}
        transition={{ duration: 0.3 }}
        className="max-h-[97%] max-w-[420px] overflow-scroll rounded-md bg-white p-4 md:w-[420px]"
      >
        <h1 className="mb-1 font-semibold">Add Task</h1>
        <Separator className="mx-auto" />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="pt-4 md:px-4"
          >
            <div className="flex flex-col space-y-4">
              <div className="flex gap-4 *:grow *:basis-0">
                {/* send time field */}
                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm">Send Time</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
                {/* schedule date field */}
                <FormField
                  control={form.control}
                  name="scheduleDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm">Scheduled Date</FormLabel>
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-[240px] pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground",
                                )}
                              >
                                {field.value.getDate() ==
                                new Date().getDate() ? (
                                  <span>Today</span>
                                ) : field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => {
                                const today = new Date();
                                today.setHours(0, 0, 0, 0);
                                return date < today;
                              }}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              {/* message title field */}
              <FormField
                control={form.control}
                name="messageTitle"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel className="text-sm">Message Title</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              {/* message field */}
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem className="">
                    <Label className="text-sm">Message</Label>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              {/* Recipient field */}

              <div className="flex min-w-[20rem] flex-col space-y-1">
                <Label className="text-sm" htmlFor="recipient">
                  Recipient(s)
                </Label>

                <div className="flex w-full flex-wrap items-center space-x-3 rounded-md border border-gray-300 p-2 text-sm">
                  {recipients.map((recipient, index) => (
                    <div
                      className="rounded-md bg-slate-800 px-3 py-1 text-white"
                      key={index}
                    >
                      {recipient}
                    </div>
                  ))}
                  <input
                    id="recipient"
                    className="w-32 rounded-md border border-gray-400 px-3 py-1 outline-none hover:border-gray-600 focus:border-gray-800"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                  />
                  <button
                    className="rounded-full border-2 border-slate-800 bg-slate-800 px-2 py-0.5 text-white hover:bg-slate-900"
                    onClick={addRecipient}
                  >
                    Add
                  </button>
                </div>
              </div>

              <div className="flex justify-between gap-4">
                <div>
                  <FormField
                    control={form.control}
                    name="repeatActive"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center gap-3">
                        <FormLabel>Repeat</FormLabel>

                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            onClick={() => {
                              setRepeatActive(field.value);
                            }}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  {/* repeat field */}
                  <FormField
                    control={form.control}
                    name="repeat"
                    render={({ field }) => (
                      <FormItem className="">
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            disabled={repeatActive}
                            className="mt-2 gap-2"
                          >
                            <div className="flex items-center gap-x-2">
                              <RadioGroupItem value="daily" id="daily" />
                              <Label
                                className="text-sm font-light"
                                htmlFor="daily"
                              >
                                Daily
                              </Label>
                            </div>
                            <div className="flex items-center gap-x-2">
                              <RadioGroupItem value="weekly" id="weekly" />
                              <Label
                                className="text-sm font-light"
                                htmlFor="weekly"
                              >
                                Weekly
                              </Label>
                            </div>
                            <div className="flex items-center gap-x-2">
                              <RadioGroupItem value="monthly" id="monthly" />
                              <Label
                                className="text-sm font-light"
                                htmlFor="monthly"
                              >
                                Monthly
                              </Label>
                            </div>
                            <div className="flex items-center gap-x-2">
                              <RadioGroupItem value="custom" id="custom" />
                              <Label
                                className="flex items-center gap-1 text-sm font-light"
                                htmlFor="custom"
                              >
                                <span>Every</span>{" "}
                                <FormField
                                  control={form.control}
                                  name="custom"
                                  render={({ field }) => (
                                    <FormItem className="">
                                      <FormControl>
                                        <Input
                                          className="my-0 h-8 w-16 py-0 text-sm"
                                          type="number"
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormMessage className="text-xs" />
                                    </FormItem>
                                  )}
                                />
                                minutes
                              </Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <Separator
                  orientation="vertical"
                  className="my-auto h-[120px]"
                />
                <div className="w-1/2">
                  {/* platform field */}
                  <FormField
                    control={form.control}
                    name="platform"
                    render={({ field }) => (
                      <FormItem>
                        <div>
                          <FormLabel className="text-sm">Platform</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select a service" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="whatsapp">
                                  Whatsapp
                                </SelectItem>
                                <SelectItem value="slack">Slack</SelectItem>
                                <SelectItem value="email">Gmail</SelectItem>
                                <SelectItem value="telegram">
                                  Telegram
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                        </div>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  {/* final date field */}
                  <FormField
                    control={form.control}
                    name="finalDate"
                    render={({ field }) => (
                      <FormItem className="mt-3">
                        <FormLabel className="mb-3 text-sm">
                          Select final date{" "}
                          <span className="font-thin italic">(optional)</span>
                        </FormLabel>
                        <Popover>
                          <PopoverTrigger disabled={repeatActive} asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-[150px] pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground",
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => {
                                const today = form.getValues().scheduleDate;
                                today.setHours(0, 0, 0, 0);
                                return date < today;
                              }}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            <Separator className="mx-auto mb-2 mt-4 w-[95%]" />
            <div className="flex items-center justify-between">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(closeAddModal());
                }}
                className="rounded-full border-2 border-rose-700 px-5 py-1 text-rose-700 hover:border-rose-900 hover:text-rose-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-full border-2 border-slate-800 bg-slate-800 px-5 py-1 text-white hover:bg-slate-900"
              >
                Add Task
              </button>
            </div>
          </form>
        </Form>
      </motion.div>
    </motion.div>
  );
};

export default AddTask;
