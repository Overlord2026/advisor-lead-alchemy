
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
  SheetFooter
} from "@/components/ui/sheet";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  Save,
  Plus,
  Trash,
  Sparkles,
  X,
  ArrowUp,
  ArrowDown,
  GripVertical,
  TextQuote,
  ListChecks,
  Check,
  Calendar
} from "lucide-react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { toast } from "sonner";

import { type Questionnaire, type Question } from "./types";

interface QuestionnaireBuilderProps {
  questionnaire?: Questionnaire | null;
  onClose: () => void;
  onSave: (data: Questionnaire) => void;
}

const questionTypes = [
  { value: "text", label: "Text", icon: TextQuote },
  { value: "multiple_choice", label: "Multiple Choice", icon: ListChecks },
  { value: "checkbox", label: "Checkbox", icon: Check },
  { value: "date", label: "Date", icon: Calendar }
];

const questionnaireTypes = [
  "Boutique Family Office Intake",
  "Retirement Planning",
  "Estate Planning",
  "Risk Assessment",
  "Investment Preferences",
  "Custom Questionnaire"
];

export const QuestionnaireBuilder: React.FC<QuestionnaireBuilderProps> = ({
  questionnaire,
  onClose,
  onSave
}) => {
  const [activeTab, setActiveTab] = useState<string>("details");
  const [aiEnhanced, setAiEnhanced] = useState<boolean>(false);

  const defaultValues = questionnaire || {
    id: uuidv4(),
    name: "",
    type: "Custom Questionnaire",
    description: "",
    questions: [],
    completionPercentage: 0,
    status: "draft"
  } as Questionnaire;

  const form = useForm({
    defaultValues
  });

  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: "questions"
  });

  const addQuestion = (type: string) => {
    append({
      id: uuidv4(),
      text: "",
      type: type as any,
      options: type === "multiple_choice" || type === "checkbox" ? ["Option 1"] : undefined,
      required: false
    });
  };

  const addOption = (questionIndex: number) => {
    const question = form.getValues(`questions.${questionIndex}`);
    const options = [...(question.options || []), `Option ${(question.options?.length || 0) + 1}`];
    form.setValue(`questions.${questionIndex}.options`, options);
  };

  const removeOption = (questionIndex: number, optionIndex: number) => {
    const question = form.getValues(`questions.${questionIndex}`);
    const options = [...(question.options || [])];
    options.splice(optionIndex, 1);
    form.setValue(`questions.${questionIndex}.options`, options);
  };

  const moveQuestion = (from: number, direction: "up" | "down") => {
    const to = direction === "up" ? from - 1 : from + 1;
    move(from, to);
  };

  const generateAiSuggestions = () => {
    toast.success("AI suggestions applied to your questionnaire");
  };

  const onSubmit = (data: any) => {
    onSave({
      ...data,
      status: questionnaire?.status || "draft"
    });
  };

  return (
    <Sheet open={true} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="right" className="w-[95%] sm:w-[80%] md:max-w-[800px]">
        <SheetHeader>
          <SheetTitle>{questionnaire ? "Edit Questionnaire" : "Create New Questionnaire"}</SheetTitle>
          <SheetDescription>
            {questionnaire ? "Make changes to your questionnaire" : "Create a new questionnaire for your clients"}
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4 h-[calc(100vh-180px)] overflow-y-auto">
            <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger value="details">Questionnaire Details</TabsTrigger>
                <TabsTrigger value="questions">Questions ({fields.length})</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="space-y-4 pt-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Questionnaire Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter questionnaire name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Questionnaire Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select questionnaire type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {questionnaireTypes.map((type) => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter description"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-sm font-medium">AI Enhancements</h3>
                      <p className="text-xs text-muted-foreground">
                        Use AI to improve your questionnaire
                      </p>
                    </div>
                    <Switch
                      checked={aiEnhanced}
                      onCheckedChange={setAiEnhanced}
                    />
                  </div>
                  
                  {aiEnhanced && (
                    <div className="space-y-3">
                      <div className="p-3 border rounded-md bg-muted/30 flex justify-between items-center">
                        <div>
                          <span className="text-sm font-medium">Generate Questions</span>
                          <p className="text-xs text-muted-foreground">
                            Auto-generate relevant questions based on context
                          </p>
                        </div>
                        <Button 
                          variant="secondary" 
                          size="sm" 
                          onClick={generateAiSuggestions}
                        >
                          <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                          Generate
                        </Button>
                      </div>
                      
                      <div className="p-3 border rounded-md bg-muted/30 flex justify-between items-center">
                        <div>
                          <span className="text-sm font-medium">Optimize Flow</span>
                          <p className="text-xs text-muted-foreground">
                            Improve question order and grouping
                          </p>
                        </div>
                        <Button 
                          variant="secondary" 
                          size="sm"
                          onClick={generateAiSuggestions}
                        >
                          <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                          Optimize
                        </Button>
                      </div>
                      
                      <div className="p-3 border rounded-md bg-muted/30 flex justify-between items-center">
                        <div>
                          <span className="text-sm font-medium">Improve Wording</span>
                          <p className="text-xs text-muted-foreground">
                            Make questions clearer and more conversational
                          </p>
                        </div>
                        <Button 
                          variant="secondary" 
                          size="sm"
                          onClick={generateAiSuggestions}
                        >
                          <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                          Enhance
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="questions" className="pt-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-medium">Questions</h3>
                  <div className="flex gap-2">
                    {questionTypes.map((type) => (
                      <Button
                        key={type.value}
                        variant="outline"
                        size="sm"
                        onClick={() => addQuestion(type.value)}
                        title={`Add ${type.label} Question`}
                      >
                        <type.icon className="h-4 w-4 mr-1" />
                        {type.label}
                      </Button>
                    ))}
                  </div>
                </div>
                
                {fields.length === 0 ? (
                  <div className="text-center p-8">
                    <p className="text-muted-foreground mb-4">No questions added yet</p>
                    <Button variant="outline" onClick={() => addQuestion("text")}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add First Question
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {fields.map((field, index) => (
                      <Card key={field.id} className="relative">
                        <div className="absolute top-3 right-3 flex gap-1">
                          {index > 0 && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => moveQuestion(index, "up")}
                              className="h-7 w-7"
                            >
                              <ArrowUp className="h-4 w-4" />
                            </Button>
                          )}
                          {index < fields.length - 1 && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => moveQuestion(index, "down")}
                              className="h-7 w-7"
                            >
                              <ArrowDown className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => remove(index)}
                            className="h-7 w-7 text-destructive"
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <CardContent className="pt-6 pb-4">
                          <div className="space-y-4">
                            <div className="flex gap-4 items-start">
                              <div className="mt-2 text-muted-foreground">
                                <GripVertical className="h-5 w-5" />
                              </div>
                              
                              <div className="flex-1 grid gap-4">
                                <FormField
                                  control={form.control}
                                  name={`questions.${index}.text`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Question Text</FormLabel>
                                      <FormControl>
                                        <Textarea
                                          placeholder="Enter question text"
                                          className="resize-none"
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                
                                <div className="grid grid-cols-2 gap-4">
                                  <FormField
                                    control={form.control}
                                    name={`questions.${index}.type`}
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Question Type</FormLabel>
                                        <Select
                                          onValueChange={field.onChange}
                                          defaultValue={field.value}
                                        >
                                          <FormControl>
                                            <SelectTrigger>
                                              <SelectValue placeholder="Select type" />
                                            </SelectTrigger>
                                          </FormControl>
                                          <SelectContent>
                                            {questionTypes.map((type) => (
                                              <SelectItem key={type.value} value={type.value}>
                                                {type.label}
                                              </SelectItem>
                                            ))}
                                          </SelectContent>
                                        </Select>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  
                                  <FormField
                                    control={form.control}
                                    name={`questions.${index}.section`}
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Section (Optional)</FormLabel>
                                        <FormControl>
                                          <Input
                                            placeholder="e.g. Basic Info, Risk Assessment"
                                            {...field}
                                            value={field.value || ""}
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                </div>
                                
                                {(form.watch(`questions.${index}.type`) === "multiple_choice" ||
                                  form.watch(`questions.${index}.type`) === "checkbox") && (
                                  <div>
                                    <FormLabel>Options</FormLabel>
                                    <div className="space-y-2 mt-2">
                                      {form.watch(`questions.${index}.options`)?.map(
                                        (option: string, optionIndex: number) => (
                                          <div
                                            key={`${field.id}-option-${optionIndex}`}
                                            className="flex gap-2 items-center"
                                          >
                                            <Input
                                              value={option}
                                              onChange={(e) => {
                                                const newOptions = [
                                                  ...(form.getValues(`questions.${index}.options`) || []),
                                                ];
                                                newOptions[optionIndex] = e.target.value;
                                                form.setValue(
                                                  `questions.${index}.options`,
                                                  newOptions
                                                );
                                              }}
                                              placeholder={`Option ${optionIndex + 1}`}
                                              className="flex-1"
                                            />
                                            <Button
                                              type="button"
                                              variant="ghost"
                                              size="icon"
                                              onClick={() => removeOption(index, optionIndex)}
                                              className="h-9 w-9"
                                            >
                                              <X className="h-4 w-4" />
                                            </Button>
                                          </div>
                                        )
                                      )}
                                      <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => addOption(index)}
                                      >
                                        <Plus className="h-3.5 w-3.5 mr-1.5" />
                                        Add Option
                                      </Button>
                                    </div>
                                  </div>
                                )}
                                
                                <FormField
                                  control={form.control}
                                  name={`questions.${index}.required`}
                                  render={({ field }) => (
                                    <FormItem className="flex items-center justify-between space-x-2 rounded-md border p-3">
                                      <div className="space-y-0.5">
                                        <FormLabel>Required</FormLabel>
                                        <FormDescription>
                                          Is this question mandatory?
                                        </FormDescription>
                                      </div>
                                      <FormControl>
                                        <Switch
                                          checked={field.value}
                                          onCheckedChange={field.onChange}
                                        />
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() => addQuestion("text")}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Another Question
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </form>
        </Form>

        <SheetFooter className="pt-4 border-t">
          <div className="flex justify-between w-full">
            <SheetClose asChild>
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </SheetClose>
            <Button onClick={form.handleSubmit(onSubmit)}>
              <Save className="h-4 w-4 mr-2" />
              Save Questionnaire
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
