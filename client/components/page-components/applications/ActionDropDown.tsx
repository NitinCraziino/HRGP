import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { FileText, Paperclip, Clock, History, Edit, UserPlus, X, AlignJustify } from "lucide-react";

type ActionDropdownProps<T> = {
    item: T;
    onNote: (item: T) => void;
    onAttach: (item: T) => void;
    onTimeline: (item: T) => void;
    onHistory: (item: T) => void;
    onEdit: (item: T) => void;
    onHire: (item: T) => void;
    onReject: (item: T) => void;
};

export function ActionDropdown<T>({
    item,
    onNote,
    onAttach,
    onTimeline,
    onHistory,
    onEdit,
    onHire,
    onReject,
}: ActionDropdownProps<T>) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full bg-indigo-600 text-white hover:bg-indigo-700"
                >
                    <AlignJustify className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={() => onNote(item)}>
                    <FileText className="mr-2 h-4 w-4" />
                    <span>Note</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onAttach(item)}>
                    <Paperclip className="mr-2 h-4 w-4" />
                    <span>Attach</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onTimeline(item)}>
                    <Clock className="mr-2 h-4 w-4" />
                    <span>Timeline</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onHistory(item)}>
                    <History className="mr-2 h-4 w-4" />
                    <span>Application History</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onEdit(item)}>
                    <Edit className="mr-2 h-4 w-4" />
                    <span>Edit</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onHire(item)}>
                    <UserPlus className="mr-2 h-4 w-4" />
                    <span>Hire</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onReject(item)} className="text-red-500">
                    <X className="mr-2 h-4 w-4" />
                    <span>Reject</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
