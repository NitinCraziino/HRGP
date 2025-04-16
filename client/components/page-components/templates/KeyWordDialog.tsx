import React, { useState, useEffect } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash, Plus } from "lucide-react";

interface KeyWordDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (keyword: string, type: "Text" | "Dropdown", values?: string[]) => void;
  initialKeyword?: string;
  initialType?: "Text" | "Dropdown";
  initialValues?: string[];
  isEditing?: boolean;
}

const KeyWordDialog = ({
  isOpen,
  onClose,
  onSave,
  initialKeyword = "",
  initialType = "Text",
  initialValues = [],
  isEditing = false,
}: KeyWordDialogProps) => {
  const [keyword, setKeyword] = useState(initialKeyword);
  const [keywordType, setKeywordType] = useState<"Text" | "Dropdown">(initialType);
  const [keywordValues, setKeywordValues] = useState<string[]>(initialValues);
  const [newValue, setNewValue] = useState("");

  // Reset form when dialog opens with new values
  useEffect(() => {
    if (isOpen) {
      setKeyword(initialKeyword);
      setKeywordType(initialType);
      setKeywordValues(initialValues);
      setNewValue("");
    }
  }, [isOpen, initialKeyword, initialType, initialValues]);

  const handleAddValue = () => {
    if (newValue.trim()) {
      setKeywordValues([...keywordValues, newValue.trim()]);
      setNewValue("");
    }
  };

  const handleRemoveValue = (index: number) => {
    const updatedValues = [...keywordValues];
    updatedValues.splice(index, 1);
    setKeywordValues(updatedValues);
  };

  const handleSubmit = () => {
    if (keyword.trim()) {
      onSave(keyword.trim(), keywordType, keywordValues);
      resetForm();
    }
  };

  const resetForm = () => {
    setKeyword("");
    setKeywordType("Text");
    setKeywordValues([]);
    setNewValue("");
  };

  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          onClose();
          resetForm();
        }
      }}
    >
      <AlertDialogContent className="sm:max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-bold">
            {isEditing ? "Edit Keyword" : "Add Keyword"}
          </AlertDialogTitle>
        </AlertDialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="askja"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="col-span-1 w-ful"
            />

            <Select
              value={keywordType}
              onValueChange={(value) => setKeywordType(value as "Text" | "Dropdown")}
            >
              <SelectTrigger className="col-span-1 w-full">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Text">Text</SelectItem>
                <SelectItem value="Dropdown">Dropdown</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {keywordType === "Dropdown" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">Keyword Value</h3>
                <div className="flex items-center">
                  <span className="mr-2 text-gray-500">Add</span>
                  <Button
                    type="button"
                    onClick={handleAddValue}
                    className="bg-indigo-600 hover:bg-indigo-700 rounded-full h-8 w-8 p-0"
                  >
                    <Plus size={16} className="text-white" />
                  </Button>
                </div>
              </div>

              {keywordValues.map((value, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="font-medium">Value</span>
                  <div className="flex-1 flex items-center gap-2">
                    <Input
                      value={value}
                      onChange={(e) => {
                        const newValues = [...keywordValues];
                        newValues[index] = e.target.value;
                        setKeywordValues(newValues);
                      }}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => handleRemoveValue(index)}
                      className="bg-indigo-600 hover:bg-indigo-700 h-10 w-10 p-0"
                    >
                      <Trash size={16} className="text-white" />
                    </Button>
                  </div>
                </div>
              ))}

              {/* Input for new value */}
              <div className="flex items-center gap-2">
                <span className="font-medium">Value</span>
                <Input
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value)}
                  placeholder="Value"
                  className="flex-1"
                />
              </div>
            </div>
          )}
        </div>

        <AlertDialogFooter>
          <div className="flex justify-end gap-2 w-full">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                onClose();
                resetForm();
              }}
              className="bg-black rounded-sm text-white hover:bg-gray-800"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleSubmit}
              className="bg-indigo-600 rounded-sm text-white hover:bg-indigo-700"
            >
              Submit
            </Button>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default KeyWordDialog;
