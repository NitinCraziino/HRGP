"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import InputWithError from "@/components/form-components/InputWithError";
import TextareaWithError from "@/components/form-components/TextAreaWithError";
import { Card, CardContent } from "@/components/ui/card";
import PrivateContainer from "@/components/hoc/PrivateContainer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from "next/navigation";
import KeyWordSection from "./KeyWordSection";

interface TemplateFormProps {
  initialData?: {
    name: string;
    content: string;
    type?: string;
  };
  isEditing?: boolean;
}

const TemplateForm = ({ initialData, isEditing = false }: TemplateFormProps) => {
  const router = useRouter();
  const [templateName, setTemplateName] = useState(initialData?.name || "");
  const [messageText, setMessageText] = useState(initialData?.content || "");
  const [newKeyword, setNewKeyword] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  // Standard keywords that can be inserted into the template
  const standardKeywords = [
    "City",
    "Company Name",
    "Position",
    "Recipient First Name",
    "Recipient Last Name",
    "Sender First Name",
    "Sender Last Name",
    "State",
  ];

  // Custom keywords that can be added by the user
  const [customKeywords, setCustomKeywords] = useState([
    "askja",
    "DropDownKeyword",
    "DropDownTest",
    "TestKeyword",
    "TextTest",
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Template data to be saved
    const templateData = {
      name: templateName,
      content: messageText,
      type: "email",
    };

    console.log("Saving template:", templateData);

    // Redirect back to templates list
    router.push("/templates");
  };

  const handleCancel = () => {
    router.push("/templates");
  };

  const insertKeyword = (keyword: string) => {
    const formattedKeyword = `[${keyword.replace(/\s+/g, "")}]`;
    setMessageText((prevText) => {
      const textarea = document.getElementById("message-text") as HTMLTextAreaElement;
      const cursorPos = textarea?.selectionStart ?? prevText.length;
      return prevText.substring(0, cursorPos) + formattedKeyword + prevText.substring(cursorPos);
    });
  };

  const addCustomKeyword = () => {
    if (newKeyword.trim() && !customKeywords.includes(newKeyword.trim())) {
      setCustomKeywords([...customKeywords, newKeyword.trim()]);
      setNewKeyword("");
      setIsAdding(false);
    }
  };

  const removeCustomKeyword = (keyword: string) => {
    setCustomKeywords(customKeywords.filter((k) => k !== keyword));
  };

  return (
    <ScrollArea className="h-full">
      <PrivateContainer className="pb-80" title={(isEditing && "Edit Template") || undefined}>
        <Card className="w-full mx-auto">
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2 space-y-6">
                  <div>
                    <InputWithError
                      label="Template Name"
                      value={templateName}
                      onChange={(e) => setTemplateName(e.target.value)}
                      placeholder="Test template"
                      className="mt-1"
                      variant="sm"
                      required
                    />
                  </div>

                  <div>
                    <TextareaWithError
                      label="Message Text"
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      placeholder="Hi [RecipientFirstName], it's [SenderFirstName] [SenderLastName] with [CompanyName]. Are you still considering your career options?"
                      className="mt-1 min-h-40"
                      required
                    />
                  </div>

                  <div className="flex justify-end gap-2 mt-6">
                    <Button type="submit" className="bg-indigo-600 text-white hover:bg-indigo-700">
                      Submit
                    </Button>
                    <Button type="button" onClick={handleCancel}>
                      Cancel
                    </Button>
                  </div>
                </div>

                <KeyWordSection
                  standardKeywords={standardKeywords}
                  customKeywords={customKeywords}
                  insertKeyword={insertKeyword}
                  removeCustomKeyword={removeCustomKeyword}
                  setCustomKeywords={setCustomKeywords}
                />
              </div>
            </form>
          </CardContent>
        </Card>
      </PrivateContainer>
    </ScrollArea>
  );
};

export default TemplateForm;
