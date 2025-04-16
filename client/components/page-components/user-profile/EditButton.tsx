import { Button } from "@/components/ui/button";
import { X, Plus } from "lucide-react";
import { memo } from "react";

const EditButton = ({ isEditing, toggleEdit }: { isEditing: boolean; toggleEdit: () => void }) => {
  return (
    <Button
      variant="ghost"
      className="bg-transparent border-none rounded-full cursor-pointer hover:bg-green-500 hover:text-white"
      type="button"
      size="icon"
      onClick={toggleEdit}
    >
      {isEditing ? <X className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
    </Button>
  );
};

export default memo(EditButton);
