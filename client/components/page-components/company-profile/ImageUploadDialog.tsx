import { useState, ChangeEvent } from "react";
import { X } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onUpload: (file: File) => void;
    title?: string;
    dimensions?: string;
    maxFileSize?: number;
    allowedTypes?: string[];
}

const ImageUploadDialog = ({
    isOpen,
    onClose,
    onUpload,
    title = "Upload Image",
    dimensions,
    maxFileSize = 5,
    allowedTypes = ["jpg", "jpeg", "png"],
}: Props) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [selectedFileSize, setSelectedFileSize] = useState<string>("");
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const file = e.target.files?.[0];
        if (file) {
            // Create file preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);

            // Update file info
            setSelectedFile(file);
            const size = (file.size / (1024 * 1024)).toFixed(2);
            setSelectedFileSize(`${size} MB`);
        }
    };

    const handleUpload = (): void => {
        if (selectedFile && onUpload) {
            onUpload(selectedFile);
            resetState();
            onClose();
        }
    };

    const resetState = (): void => {
        setSelectedFile(null);
        setSelectedFileSize("");
        setPreviewUrl(null);
    };

    const handleClose = (): void => {
        resetState();
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-md min-w-[900px]">
                <DialogHeader className="border-b border-gray-200">
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription />
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Input
                            id="image-upload"
                            type="file"
                            accept=".jpg,.jpeg,.png"
                            onChange={handleFileChange}
                            className="cursor-pointer"
                        />

                        <div className="text-sm text-gray-500 mt-1">
                            {dimensions && <div>Dimension: {dimensions}</div>}
                            <div>File Size: {maxFileSize} mb max</div>
                            <div>Allowed File Types: <span className="uppercase">{allowedTypes.join(", ")}</span></div>
                        </div>

                        {selectedFileSize && (
                            <div className="text-md font-bold text-gray-500 mt-1">
                                Selected File Size: {selectedFileSize}
                            </div>
                        )}
                    </div>

                    {previewUrl && (
                        <div className="relative mt-2">
                            <div className="absolute top-2 right-2 z-10">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70"
                                    onClick={() => {
                                        setPreviewUrl(null);
                                        setSelectedFile(null);
                                        setSelectedFileSize("");
                                    }}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                            <div className="overflow-hidden rounded-md border border-gray-200">
                                <img
                                    src={previewUrl}
                                    alt="Preview"
                                    className="h-auto max-h-64 w-full object-contain"
                                />
                            </div>
                        </div>
                    )}
                </div>

                <DialogFooter className="flex justify-between sm:justify-between">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleClose}
                    >
                        Close
                    </Button>
                    <Button
                        type="button"
                        onClick={handleUpload}
                        disabled={!selectedFile}
                    >
                        Upload
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ImageUploadDialog;