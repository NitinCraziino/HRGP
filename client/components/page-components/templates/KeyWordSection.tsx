import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import KeyWordDialog from './KeyWordDialog';

const KeyWordSection = ({
    standardKeywords,
    customKeywords,
    insertKeyword,
    removeCustomKeyword,
    setCustomKeywords
}: {
    standardKeywords: string[];
    customKeywords: string[];
    insertKeyword: (keyword: string) => void;
    removeCustomKeyword: (keyword: string) => void;
    setCustomKeywords: (keywords: string[]) => void;
}) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingKeyword, setEditingKeyword] = useState<{ index: number, name: string, type: 'Text' | 'Dropdown', values?: string[]; } | null>(null);

    // Convert simple string keywords to KeywordItem objects (assuming all existing are Text type)
    const keywordObjects = customKeywords.map(keyword => ({
        name: keyword,
        type: 'Text' as const
    }));

    const handleOpenAddDialog = () => {
        setEditingKeyword(null);
        setIsDialogOpen(true);
    };

    const handleOpenEditDialog = (index: number) => {
        // In a real implementation, you'd have the full keyword object with type and values
        setEditingKeyword({
            index,
            name: customKeywords[index],
            type: 'Text', // This would come from your data
            values: [] // This would come from your data
        });
        setIsDialogOpen(true);
    };

    const handleSaveKeyword = (keyword: string, type: 'Text' | 'Dropdown', values: string[] = []) => {
        if (editingKeyword !== null) {
            // Update existing keyword
            const updatedKeywords = [...customKeywords];
            updatedKeywords[editingKeyword.index] = keyword;
            setCustomKeywords(updatedKeywords);
        } else {
            // Add new keyword
            setCustomKeywords([...customKeywords, keyword]);
        }
        setIsDialogOpen(false);
        setEditingKeyword(null);
    };

    return (
        <div className="space-y-6 bg-gray-50 text-gray-600 p-4 rounded-md text-sm">
            <div>
                <h3 className="font-semibold mb-2 text-gray-800">Standard Keywords</h3>
                <div className="space-y-2">
                    {standardKeywords.map((keyword, index) => (
                        <p
                            key={index}
                            onClick={() => insertKeyword(keyword)}
                            className="cursor-pointer hover:text-indigo-600"
                        >
                            {keyword}
                        </p>
                    ))}
                </div>
            </div>

            <div>
                <div className="flex justify-start items-center mb-2">
                    <h3 className="font-semibold text-gray-800">Custom Keywords</h3>
                    <Button
                        type="button"
                        variant="ghost"
                        size="xs"
                        className="p-1 h-8 w-8 rounded-full"
                        onClick={handleOpenAddDialog}
                    >
                        <Plus size={16} />
                    </Button>
                </div>

                <div className="space-y-2">
                    {customKeywords.map((keyword, index) => (
                        <div
                            key={index}
                            className="flex justify-between items-center py-1"
                        >
                            <span
                                onClick={() => insertKeyword(keyword)}
                                className="cursor-pointer hover:text-indigo-600"
                            >
                                {keyword}
                            </span>
                            <div className="flex gap-1">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="xs"
                                    className="h-5 w-5"
                                    onClick={() => handleOpenEditDialog(index)}
                                >
                                    <i className='fas fa-pencil-alt text-gray-500'></i>
                                </Button>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="xs"
                                    className="h-5 w-5"
                                    onClick={() => removeCustomKeyword(keyword)}
                                >
                                    <i className='fas fa-trash-alt text-gray-500'></i>
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <KeyWordDialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                onSave={handleSaveKeyword}
                initialKeyword={editingKeyword ? editingKeyword.name : ""}
                initialType={editingKeyword ? editingKeyword.type : "Text"}
                initialValues={editingKeyword?.values || []}
                isEditing={!!editingKeyword}
            />
        </div>
    );
};

export default KeyWordSection;