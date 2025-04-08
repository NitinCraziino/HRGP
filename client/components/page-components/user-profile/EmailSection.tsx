'use client';

import { Table, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";

const AboutSection = ({ emails }: { emails: string[]; }) => {
    const [isEditing, setIsEditing] = useState(false);
    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

    return (
        <div className="bg-white rounded-lg p-4 text-gray-600 text-sm relative">
            <h2 className="text-xl font-bold">Emails</h2>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableHead>Email</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {emails.map((email, index) => (
                        <TableRow key={index}>
                            <TableCell>{email}</TableCell>
                            <TableCell>
                                <Button variant="ghost" size="icon">
                                    <Pencil className="h-5 w-5" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                    <Trash className="h-5 w-5" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default AboutSection;