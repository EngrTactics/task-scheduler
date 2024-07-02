import { Separator } from "@/components/ui/separator";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Form, FormControl, FormField, FormLabel } from "./components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./components/ui/popover";
import { Button } from "./components/ui/button";
import { CalendarIcon, PlusCircle } from "lucide-react";
import { Calendar } from "./components/ui/calender";
import { format } from "date-fns";
import { cn } from "./lib/utils";
import { useForm } from "react-hook-form";
import { Textarea } from "./components/ui/textarea";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import { RadioGroup, RadioGroupItem } from "./components/ui/radio-group";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { closeEditModal } from "./redux/edit-modal/modalAction";

const EditTask = () => {
  const form = useForm();
  const dispatch = useDispatch();
  const [recipient, setRecipient] = useState<string>();
  const [recipients, setRecipients] = useState<string[]>([]); // Specify the type of 'recipients' as an array of strings
  const addRecipient = (e: any) => {
    e.preventDefault();
    if (recipient) {
      setRecipients([...recipients, recipient]); // Remove the unnecessary type assertion
      setRecipient("");
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 flex items-center justify-center bg-black/65 backdrop-blur"
    >
      <motion.div
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.2 }}
        transition={{ duration: 0.3 }}
        className="w-[400px] rounded-md bg-white p-4"
      >
        <h1 className="mb-1 font-bold">Edit Task</h1>
        <Separator className="mx-auto" />
        <Form {...form}>
          <form className="px-4 pt-4">
            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <div className="flex flex-col space-y-4">
                  <div className="flex gap-4 *:grow *:basis-0">
                    <div>
                      <Label className="text-sm">Send Time</Label>
                      <Input type="time" />
                    </div>
                    <div>
                      <FormLabel className="text-sm">Scheduled Date</FormLabel>
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
                              const today = new Date();
                              today.setHours(0, 0, 0, 0);
                              return date < today;
                            }}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  <div className="">
                    <Label className="text-sm">Message Title</Label>
                    <Input type="text" />
                  </div>
                  <div className="">
                    <Label className="text-sm">Message</Label>
                    <Textarea />
                  </div>

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
                      <div
                        id="recipient"
                        className="min-w-32 rounded-md border border-gray-400 px-3 py-1 outline-none hover:border-gray-600 focus:border-gray-800"
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) =>
                          setRecipient(e.currentTarget.textContent || "")
                        }
                      >
                        {recipient}
                      </div>
                      <button
                        className="top-5 transition-all duration-100 hover:scale-105 active:scale-100"
                        onClick={addRecipient}
                      >
                        <PlusCircle />
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between gap-4">
                    <div className="">
                      <Label className="text-sm">Repeat</Label>
                      <RadioGroup className="mt-2 gap-2" defaultValue="daily">
                        <div className="flex items-center gap-x-2">
                          <RadioGroupItem value="daily" id="daily" />
                          <Label className="text-sm font-light" htmlFor="daily">
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
                            className="text-sm font-light"
                            htmlFor="custom"
                          >
                            Every (x) days
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <Separator
                      orientation="vertical"
                      className="my-auto h-[120px]"
                    />
                    <div className="w-1/2">
                      <div>
                        <Label className="text-sm">Platform</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="whatsapp">Whatsapp</SelectItem>
                            <SelectItem value="slack">Slack</SelectItem>
                            <SelectItem value="email">Gmail</SelectItem>
                            <SelectItem value="telegram">Telegram</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="mt-3">
                        <FormLabel className="mb-3 text-sm">
                          Select final date{" "}
                          <span className="font-thin italic">(optional)</span>
                        </FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
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
                                const today = new Date();
                                today.setHours(0, 0, 0, 0);
                                return date < today;
                              }}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            />
            <Separator className="mx-auto mb-2 mt-4 w-[95%]" />
            <div className="flex items-center justify-between">
              {" "}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(closeEditModal());
                }}
                className="rounded-full border-2 border-rose-700 px-5 py-1 text-rose-700 hover:border-rose-900 hover:text-rose-900"
              >
                Cancel
              </button>
              <button className="rounded-full bg-slate-800 px-5 py-1 text-white hover:bg-slate-900">
                Save
              </button>
            </div>
          </form>
        </Form>
      </motion.div>
    </motion.div>
  );
};

export default EditTask;
