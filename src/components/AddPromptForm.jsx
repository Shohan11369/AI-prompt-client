import { Card, CardHeader, Input, Button, Select, ListBox, ListBoxItem, SelectTrigger, SelectValue, SelectIndicator, SelectPopover, TextArea, Form } from "@heroui/react";
import { uploadImage } from "@/utils/uploadImage";

const AddPromptForm = () => {
    const CATEGORIES = ["Creative Writing", "Programming", "Marketing", "Data Analysis", "Education", "Other"];
    const AI_TOOLS = ["ChatGPT", "Claude", "Midjourney", "DALL-E", "Other"];
    const DIFFICULTIES = ["Beginner", "Intermediate", "Pro"];
    const VISIBILITY = ["Public", "Private"];

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Here you would handle image upload, build the prompt object, and send it to your API.
        // const imageUrl = await uploadImage(imageFile);
        // ...
        alert("Prompt added successfully! (Pending approval)");
    };

    return (
        <div className="mt-6 max-w-3xl">
            <Card className="border border-white/5 bg-slate-900/40 backdrop-blur-xl shadow-2xl rounded-2xl" radius="lg">
                <CardHeader className="flex flex-col gap-1 pb-4 border-b border-white/5 p-6">
                    <h3 className="text-xl font-bold text-white">Add a New Prompt</h3>
                    <p className="text-slate-400 text-xs">Fill out the prompt details. Thumbnails are required.</p>
                </CardHeader>
                <div className="p-6">
                    <Form className="space-y-4 w-full" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                            <Input label="Prompt Title" labelPlacement="outside" placeholder="e.g. Creative Story Generator" required className="w-full bg-slate-900/50 border-white/10" />
                            <Input label="Thumbnail Image File" type="file" labelPlacement="outside" required className="w-full bg-slate-900/50 border-white/10" />
                        </div>
                        
                        <div className="flex flex-col gap-2 w-full">
                            <TextArea label="Prompt Description" labelPlacement="outside" placeholder="Short summary of what this prompt does..." required className="w-full bg-slate-900/50 border border-white/10 rounded-xl" />
                        </div>

                        <div className="flex flex-col gap-2 w-full">
                            <TextArea label="Prompt Content" labelPlacement="outside" placeholder="Paste your actual prompt here..." required className="w-full bg-slate-900/50 border border-white/10 rounded-xl min-h-[150px]" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                            <Select label="Category" placeholder="Select" className="w-full" labelPlacement="outside">
                                {CATEGORIES.map((c) => <ListBoxItem key={c}>{c}</ListBoxItem>)}
                            </Select>
                            <Select label="AI Tool" placeholder="Select" className="w-full" labelPlacement="outside">
                                {AI_TOOLS.map((t) => <ListBoxItem key={t}>{t}</ListBoxItem>)}
                            </Select>
                            <Select label="Difficulty" placeholder="Select" className="w-full" labelPlacement="outside">
                                {DIFFICULTIES.map((d) => <ListBoxItem key={d}>{d}</ListBoxItem>)}
                            </Select>
                        </div>

                        <div className="flex flex-col gap-2 w-full">
                            <Select label="Visibility" placeholder="Select" className="w-full" labelPlacement="outside">
                                {VISIBILITY.map((v) => <ListBoxItem key={v}>{v}</ListBoxItem>)}
                            </Select>
                        </div>
                        
                        <Button type="submit" className="bg-gradient-to-r from-pink-500 to-indigo-600 text-white font-bold h-11 px-6 w-full" radius="lg">Add Prompt</Button>
                    </Form>
                </div>
            </Card>
        </div>
    )
}

export default AddPromptForm;
